import { rest } from "msw";
import { config } from "@mtfh/common/lib/config";

import { generateMockProcessV1 } from "./data";

export const mockProcessV1 = generateMockProcessV1();

export const postProcessV1 = (data: any = mockProcessV1, code = 200) => {
  return rest.get(`${config.processApiUrlV1}/process/:processName`, (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(data));
  });
};

export const patchProcessV1 = (data: any = mockProcessV1, code = 200) =>
  rest.patch(`${config.processApiUrlV1}/process/:id`, (req, res, ctx) => {
    const payload = req.body as Record<string, any>;
    return res(ctx.status(code), ctx.json({ ...data, ...payload }));
  });
