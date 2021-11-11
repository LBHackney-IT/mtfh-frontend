import { rest } from "msw";

import { mockWorkOrders } from "./data";

import { config } from "@mtfh/common/lib/config";

export const getWorkOrdersV2 = (data: any = mockWorkOrders, code = 200) =>
  rest.get(`${config.repairsHubApiUrl}/workOrders`, (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(typeof data === "function" ? data(req) : data));
  });
