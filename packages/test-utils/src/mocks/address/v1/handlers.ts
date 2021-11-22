import { rest } from "msw";

import { config } from "@mtfh/common/lib/config";

import { mockAddresses } from "./data";

export const getAddressV1 = (data: any = mockAddresses, code = 200) =>
  rest.get(`${config.addressApiUrlV1}/addresses`, (req, res, ctx) => {
    return res(
      ctx.status(code),
      ctx.json(typeof data === "function" ? data(req) : { data: { address: data } }),
    );
  });
