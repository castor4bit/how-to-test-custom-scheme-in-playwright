import { test, expect } from "@playwright/test";

test.describe("when using Request", () => {
  test("redirected to custom scheme", async ({ request }) => {
    const response = await request.get("/redirect", {
      maxRedirects: 0,
    });
    expect(response.status()).toBe(302);

    const redirectedUrl = response.headers()["location"];
    const { protocol, hostname, pathname, search } = new URL(redirectedUrl);
    const params = new URLSearchParams(search);

    expect(protocol).toBe("example:");
    expect(hostname).toBe("foo");
    expect(pathname).toBe("/bar");
    expect(params.get("baz")).toBe("xxx");
  });
});

test.describe("when using Page", () => {
  test("click link to custom scheme", async ({ page }) => {
    let redirectedUrl = null;

    page.on("requestfailed", async (request) => {
      redirectedUrl = request.url();
    });

    await page.goto("/");
    await page.getByTestId("redirect-link").click();

    const { protocol, hostname, pathname, search } = new URL(redirectedUrl);
    const params = new URLSearchParams(search);

    expect(protocol).toBe("example:");
    expect(hostname).toBe("foo");
    expect(pathname).toBe("/bar");
    expect(params.get("baz")).toBe("xxx");
  });

  test("redirected to custom scheme", async ({ page }) => {
    let redirectedUrl = null;

    page.on("requestfailed", async (request) => {
      redirectedUrl = request.url();
    });

    await page.goto("/redirect").catch((e) => console.debug(e));

    const { protocol, hostname, pathname, search } = new URL(redirectedUrl);
    const params = new URLSearchParams(search);

    expect(protocol).toBe("example:");
    expect(hostname).toBe("foo");
    expect(pathname).toBe("/bar");
    expect(params.get("baz")).toBe("xxx");
  });

  test("multiple redirects led to custom scheme", async ({ page }) => {
    let redirectedUrl = null;

    page.on("requestfailed", async (request) => {
      redirectedUrl = request.url();
    });

    await page.goto("/redirect-twice").catch((e) => console.debug(e));

    const { protocol, hostname, pathname, search } = new URL(redirectedUrl);
    const params = new URLSearchParams(search);

    expect(protocol).toBe("example:");
    expect(hostname).toBe("foo");
    expect(pathname).toBe("/bar");
    expect(params.get("baz")).toBe("xxx");
  });
});
