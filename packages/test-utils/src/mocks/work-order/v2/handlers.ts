import { HttpResponse, http } from "msw";

import { config } from "@mtfh/common/lib/config";

import { mockWorkOrders } from "./data";

export const getWorkOrdersV2 = (data: any = mockWorkOrders, code = 200) =>
  http.get(`${config.repairsHubApiUrl}/workOrders`, ({ request }) => {
    return HttpResponse.json(typeof data === "function" ? data(request) : data, {
      status: code,
    });
  });
