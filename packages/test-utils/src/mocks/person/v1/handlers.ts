import { rest } from "msw";

import { generateMockPersonV1 } from "./data";

export const mockPersonV1 = generateMockPersonV1();

export const getPersonV1 = (data: any = mockPersonV1, code = 200) =>
  rest.get("/api/v1/persons/:id", (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(data));
  });

export const patchPerson = (data: any = mockPersonV1, code = 200) =>
  rest.patch("/api/v1/persons/:id", (req, res, ctx) => {
    const payload = req.body as Record<string, any>;
    return res(ctx.status(code), ctx.json({ ...data, ...payload }));
  });

export const postPerson = (data: any = mockPersonV1, code = 200) =>
  rest.post("/api/v1/persons", (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(data));
  });

export const postPersonV2 = (data: any = mockPersonV1, code = 200) =>
  rest.post("/api/v2/persons", (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(data));
  });
