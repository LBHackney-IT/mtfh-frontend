import { HttpResponse, http } from "msw";

import { config } from "@mtfh/common/lib/config";

import { generateMockPersonV1 } from "./data";

export const mockPersonV1 = generateMockPersonV1();

export const getPersonV1 = (data: any = mockPersonV1, code = 200) =>
  http.get(`${config.personApiUrlV1}/persons/:id`, () => {
    return HttpResponse.json(data, { status: code });
  });

export const patchPersonV1 = (data: any = mockPersonV1, code = 200) =>
  http.patch(`${config.personApiUrlV1}/persons/:id`, async ({ request }) => {
    const payload = (await request.json()) as Record<string, any>;
    return HttpResponse.json({ ...data, ...payload }, { status: code });
  });

export const postPersonV1 = (data: any = mockPersonV1, code = 200) =>
  http.post(`${config.personApiUrlV1}/persons`, () => {
    return HttpResponse.json(data, { status: code });
  });
