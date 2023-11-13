import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { FC } from "hono/jsx";

const app = new Hono();

const redirectUrl = "example://foo/bar?baz=xxx";
const IndexPage: FC = () => {
  return (
    <html>
      <body>
        <h1>Link to Custom Scheme</h1>
        <div>
          <a href={redirectUrl} data-testid="redirect-link">
            {redirectUrl}
          </a>
        </div>
      </body>
    </html>
  );
};

app.get("/", (c) => c.html(<IndexPage />));
app.get("/redirect", (c) => c.redirect(redirectUrl));
app.get("/redirect-twice", (c) => c.redirect("/redirect"));

serve(app);
