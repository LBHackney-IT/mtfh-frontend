import React, { isValidElement } from "react";
import { Route } from "react-router-dom";

import { queries } from "@hackney/mtfh-system";
import { RenderOptions, RenderResult, render as rtlRender } from "@testing-library/react";
import { JestAxeConfigureOptions, axe, toHaveNoViolations } from "jest-axe";
import MatchMediaMock from "jest-matchmedia-mock";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { SWRConfig } from "swr";

import { ConfirmationRouter } from "@mtfh/common/lib/components/confirmation-router";

export * from "./mocks";
export * from "./constants";

expect.extend(toHaveNoViolations);

export const server = setupServer();
let matchMedia: MatchMediaMock;

beforeAll(() => {
  matchMedia = new MatchMediaMock();
  server.listen({
    onUnhandledRequest: "warn",
  });
});

afterEach(async () => {
  matchMedia.clear();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

export const setMediaQuery = (query: keyof typeof queries | string) => {
  return matchMedia.useMediaQuery(queries[query] || query);
};

type UI = Parameters<typeof rtlRender>[0];
type TestA11YOptions = RenderOptions & { axeOptions?: JestAxeConfigureOptions };

interface RouteRenderConfig {
  url: string;
  path: string;
  query: keyof typeof queries;
}

export const render = (
  ui: UI | Element,
  options?: Partial<RouteRenderConfig>,
): RenderResult => {
  const config: RouteRenderConfig = {
    url: "/",
    path: "/",
    query: "lg",
    ...options,
  };

  setMediaQuery(config.query);
  window.history.pushState(null, "", config.url);

  return rtlRender(
    <SWRConfig
      value={{
        provider: () => new Map(),
        dedupingInterval: 0,
        errorRetryCount: 0,
      }}
    >
      <ConfirmationRouter>
        <Route path={config.path}>{ui}</Route>
      </ConfirmationRouter>
    </SWRConfig>,
  );
};

export const testA11y = async (
  ui: UI | Element,
  { axeOptions, ...options }: TestA11YOptions = {},
): Promise<void> => {
  const container = isValidElement(ui) ? rtlRender(ui, options).container : ui;
  const results = await axe(container, axeOptions);

  expect(results).toHaveNoViolations();
};

export type RestRequest = {
  method?: keyof typeof rest;
  path: string;
  data?: unknown;
  code?: number;
};

export const request = ({
  method = "get",
  path,
  data = {},
  code = 200,
}: RestRequest): void => {
  server.use(
    rest[method](path, (req, res, ctx) => {
      return res(ctx.status(code), ctx.json(data));
    }),
  );
};

export const networkFailure = ({
  method = "get",
  path,
}: Omit<RestRequest, "data" | "code">): void => {
  server.use(rest[method](path, (req, res) => res.networkError("FAILED TO CONNECT")));
};

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

export { axe };
