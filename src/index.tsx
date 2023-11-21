import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { html } from "hono/html";
import type { FC } from "hono/jsx";

const app = new Hono();

const redirectUrl = "example://foo/bar?baz=xxx";
const Layout = (props: { children?: any }) => html`
  <!DOCTYPE html>
  <html>
    <body>
      <h1>Link to Custom Scheme</h1>
      <div>${props.children}</div>
    </body>
  </html>
`;
const RedirectLink: FC<{ redirectUrl: string; testId: string }> = (props: {
  redirectUrl: string;
  testId: string;
}) => (
  <a href={props.redirectUrl} data-testid={props.testId}>
    {props.redirectUrl}
  </a>
);
const IndexPage: FC<{ redirectUrl: string }> = (props: {
  redirectUrl: string;
}) => (
  <Layout>
    <h1>Link to Custom Scheme</h1>
    <div>
      <RedirectLink redirectUrl={props.redirectUrl} testId="redirect-link" />
    </div>
  </Layout>
);

app.get("/", (c) => c.html(<IndexPage redirectUrl={redirectUrl} />));
app.get("/redirect", (c) => c.redirect(redirectUrl));
app.get("/redirect-twice", (c) => c.redirect("/redirect"));

serve(app);
