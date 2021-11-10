import { rest } from "msw";

import { mockRepairWorkOrders } from "./data";

import { config } from "@mtfh/common/lib/config";

export const getRepairWorkOrdersV1 = (data: any = mockRepairWorkOrders, code = 200) =>
  rest.get(`${config.repairsHubApiUrl}/worksOrders`, (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(data));
  });
