import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { html } from "hono/html";

const app = new Hono();

const redirectUrl = "example://foo/bar?baz=xxx";
const indexHtml = html`
  <!DOCTYPE html>
  <html>
    <body>
      <h1>Link to Custom Scheme</h1>
      <div>
        <a href="${redirectUrl}" data-testid="redirect-link">${redirectUrl}</a>
      </div>
    </body>
  </html>
`;

app.get("/", (c) => c.html(indexHtml));
app.get("/redirect", (c) => c.redirect(redirectUrl));
app.get("/redirect-twice", (c) => c.redirect("/redirect"));

serve(app);
