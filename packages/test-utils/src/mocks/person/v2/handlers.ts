import { rest } from "msw";

import { mockPersonV1 } from "../v1";

import { config } from "@mtfh/common/lib/config";

export const postPersonV2 = (data: any = mockPersonV1, code = 200) =>
  rest.post(`${config.personApiUrlV2}/persons`, (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(data));
  });
