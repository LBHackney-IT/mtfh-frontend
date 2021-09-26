import { rest } from "msw";

import { generateMockTenureV1 } from "./data";

export const mockActiveTenureV1 = generateMockTenureV1({ isActive: true });
export const mockInactiveTenureV1 = generateMockTenureV1({ isActive: false });
export const mockPendingTenureV1 = generateMockTenureV1({
  isActive: true,
  startOfTenureDate: "2030-01-01",
});

export const getTenureV1 = (data: any = mockActiveTenureV1, code = 200) =>
  rest.get("/api/v1/tenures/:id", (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(data));
  });

export const patchTenure = (data: any = {}, code = 200) =>
  rest.patch("/api/v1/tenures/:id", (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(data));
  });

export const postTenure = (data: any = mockActiveTenureV1, code = 200) =>
  rest.post("/api/tenures", (req, res, ctx) => {
    const payload = req.body as Record<string, any>;
    return res(ctx.status(code), ctx.json({ ...data, ...payload }));
  });
