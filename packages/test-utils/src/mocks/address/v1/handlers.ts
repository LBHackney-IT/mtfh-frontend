import { rest } from "msw";

import { mockAddresses } from "./data";

import { config } from "@mtfh/common/lib/config";

export const getAddressV1 = (data: any = mockAddresses, code = 200) =>
  rest.get(`${config.addressApiUrlV1}/addresses`, (req, res, ctx) => {
    return res(
      ctx.status(code),
      ctx.json(
        typeof data === "function" ? data(req) : { data: { address: mockAddresses } },
      ),
    );
  });
