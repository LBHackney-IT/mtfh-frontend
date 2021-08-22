import React, { isValidElement } from "react"
import { queries } from "@hackney/mtfh-system"
import {
  RenderOptions,
  RenderResult,
  render as rtlRender,
} from "@testing-library/react"
import { RunOptions } from "axe-core"
import { MemoryHistory, createMemoryHistory } from "history"
import { axe, toHaveNoViolations } from "jest-axe"
import MatchMediaMock from "jest-matchmedia-mock"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { Route, Router } from "react-router-dom"

expect.extend(toHaveNoViolations)

export const server = setupServer()
let matchMedia: MatchMediaMock

beforeAll(() => {
  matchMedia = new MatchMediaMock()
  server.listen({
    onUnhandledRequest: "warn",
  })
})

afterEach(async () => {
  matchMedia.clear()
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

type UI = Parameters<typeof rtlRender>[0]
type TestA11YOptions = RenderOptions & { axeOptions?: RunOptions }

interface RouteRenderConfig {
  url: string
  path: string
  query: keyof typeof queries
}

export const render = (
  ui: UI | Element,
  options?: Partial<RouteRenderConfig>,
): { render: RenderResult; history: MemoryHistory } => {
  const config: RouteRenderConfig = {
    url: "/",
    path: "/",
    query: "lg",
    ...options,
  }

  matchMedia.useMediaQuery(`(min-width: 0px)`)
  const history = createMemoryHistory<unknown>()
  history.push(config.url)
  matchMedia.useMediaQuery(queries[config.query])

  return {
    render: rtlRender(
      <Router history={history}>
        <Route path={config.path}>{ui}</Route>
      </Router>,
    ),
    history,
  }
}

export const testA11y = async (
  ui: UI | Element,
  { axeOptions, ...options }: TestA11YOptions = {},
): Promise<void> => {
  const container = isValidElement(ui) ? rtlRender(ui, options).container : ui

  const results = await axe(container, axeOptions)

  expect(results).toHaveNoViolations()
}

type RestRequest = {
  method?: keyof typeof rest
  path: string
  data: unknown
  code?: number
}

export const request = ({
  method = "get",
  path,
  data,
  code = 200,
}: RestRequest): void => {
  server.use(
    rest[method](path, (req, res, ctx) => {
      return res.once(ctx.status(code), ctx.json(data))
    }),
  )
}

export const networkFailure = ({
  method = "get",
  path,
}: Omit<RestRequest, "data" | "code">): void => {
  server.use(
    rest[method](path, (req, res) => res.networkError("FAILED TO CONNECT")),
  )
}

window.HTMLElement.prototype.scrollIntoView = jest.fn()

export { axe }
