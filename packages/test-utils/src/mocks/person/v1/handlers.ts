import { rest } from "msw";

import { config } from "@mtfh/common/lib/config";

import { generateMockPersonV1 } from "./data";

export const mockPersonV1 = generateMockPersonV1();

export const getPersonV1 = (data: any = mockPersonV1, code = 200) =>
  rest.get(`${config.personApiUrlV1}/persons/:id`, (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(data));
  });

export const patchPersonV1 = (data: any = mockPersonV1, code = 200) =>
  rest.patch(`${config.personApiUrlV1}/persons/:id`, (req, res, ctx) => {
    const payload = req.body as Record<string, any>;
    return res(ctx.status(code), ctx.json({ ...data, ...payload }));
  });

export const postPersonV1 = (data: any = mockPersonV1, code = 200) =>
  rest.post(`${config.personApiUrlV1}/persons`, (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(data));
  });
