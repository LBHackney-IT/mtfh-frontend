import { HttpResponse, http } from "msw";

import { config } from "@mtfh/common/lib/config";

import { generateMockTenureV1 } from "./data";

export const mockActiveTenureV1 = generateMockTenureV1({ isActive: true });
export const mockInactiveTenureV1 = generateMockTenureV1({ isActive: false });
export const mockPendingTenureV1 = generateMockTenureV1({
  isActive: true,
  startOfTenureDate: "2030-01-01",
});

export const getTenureV1 = (data: any = mockActiveTenureV1, code = 200) =>
  http.get(`${config.tenureApiUrlV1}/tenures/:id`, () => {
    return HttpResponse.json(data, { status: code });
  });

export const patchTenure = (data: any = {}, code = 200) =>
  http.patch(`${config.tenureApiUrlV1}/tenures/:id`, async ({ request }) => {
    const payload = (await request.json()) as Record<string, any>;
    return HttpResponse.json({ ...data, ...payload }, { status: code });
  });

export const postTenure = (data: any = mockActiveTenureV1, code = 200) =>
  http.post(`${config.tenureApiUrlV1}/tenures`, async ({ request }) => {
    const payload = (await request.json()) as Record<string, any>;
    return HttpResponse.json({ ...data, ...payload }, { status: code });
  });

export const patchTenurePersonV1 = (data: any = {}, code = 200) =>
  http.patch(
    `${config.tenureApiUrlV1}/tenures/:id/person/:personId`,
    async ({ request }) => {
      const payload = (await request.json()) as Record<string, any>;
      return HttpResponse.json({ ...data, ...payload }, { status: code });
    },
  );

export const deleteTenurePersonV1 = (code = 200) =>
  http.delete(`${config.tenureApiUrlV1}/tenures/:id/person/:personId`, () => {
    return new HttpResponse(null, { status: code });
  });
