import React, { isValidElement } from "react";
import { Route } from "react-router-dom";

import { queries } from "@hackney/mtfh-system";
import { RenderOptions, RenderResult, render as rtlRender } from "@testing-library/react";
import { JestAxeConfigureOptions, axe, toHaveNoViolations } from "jest-axe";
import MatchMediaMock from "jest-matchmedia-mock";
import { HttpResponse, http, type JsonBodyType } from "msw";
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
  const mediaQuery =
    typeof query === "string" && query in queries
      ? queries[query as keyof typeof queries]
      : query;

  return matchMedia.useMediaQuery(mediaQuery);
};

type UI = Parameters<typeof rtlRender>[0];
type TestA11YOptions = RenderOptions & { axeOptions?: JestAxeConfigureOptions };

interface RouteRenderConfig {
  url: string;
  path: string;
  query: keyof typeof queries;
}

type PropsWithChildren = { children?: React.ReactNode };

const SWRConfigProvider = SWRConfig as React.FC<
  React.ComponentProps<typeof SWRConfig> & PropsWithChildren
>;
const AppRouter = ConfirmationRouter as React.FC<PropsWithChildren>;

export const render = (ui: UI, options?: Partial<RouteRenderConfig>): RenderResult => {
  const config: RouteRenderConfig = {
    url: "/",
    path: "/",
    query: "lg",
    ...options,
  };

  setMediaQuery(config.query);
  window.history.pushState(null, "", config.url);

  return rtlRender(
    <SWRConfigProvider
      value={{
        provider: () => new Map(),
        dedupingInterval: 0,
        errorRetryCount: 0,
      }}
    >
      <AppRouter>
        <Route path={config.path}>{ui as React.ReactNode}</Route>
      </AppRouter>
    </SWRConfigProvider>,
  );
};

export const testA11y = async (
  ui: UI | Element,
  { axeOptions, ...options }: TestA11YOptions = {},
): Promise<void> => {
  const container = isValidElement(ui) ? rtlRender(ui, options).container : ui;
  const results = await axe(container as HTMLElement, axeOptions);

  expect(results).toHaveNoViolations();
};

export type RestRequest = {
  method?: keyof typeof http;
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
    http[method](path, () => {
      return HttpResponse.json(data as JsonBodyType, { status: code });
    }),
  );
};

export const networkFailure = ({
  method = "get",
  path,
}: Omit<RestRequest, "data" | "code">): void => {
  server.use(http[method](path, () => HttpResponse.error()));
};

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

export { axe };
