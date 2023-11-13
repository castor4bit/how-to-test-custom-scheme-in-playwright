import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { FC } from "hono/jsx";

const app = new Hono();

const redirectUrl = "example://test";
const IndexPage: FC = () => {
  return (
    <html>
      <body>
        <h1>Link to Custom Scheme</h1>
        <div>
          <a href={redirectUrl}>{redirectUrl}</a>
        </div>
      </body>
    </html>
  );
};

app.get("/", (c) => c.html(<IndexPage />));
app.get("/redirect", (c) => c.redirect(redirectUrl));

serve(app);
