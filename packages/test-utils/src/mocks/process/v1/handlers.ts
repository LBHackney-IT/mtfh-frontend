import { HttpResponse, http } from "msw";

import { config } from "@mtfh/common/lib/config";

import { generateMockProcessV1 } from "./data";

export const mockProcessV1 = generateMockProcessV1();

export const getProcessV1 = (data: any = mockProcessV1, code = 200) => {
  return http.get(`${config.processApiUrlV1}/process/:processName/:id`, () => {
    return HttpResponse.json(data, { status: code });
  });
};

export const postProcessV1 = (data: any = mockProcessV1, code = 200) => {
  return http.post(`${config.processApiUrlV1}/process/:processName`, () => {
    return HttpResponse.json(data, { status: code });
  });
};

export const patchProcessV1 = (data: any = mockProcessV1, code = 200) =>
  http.patch(
    `${config.processApiUrlV1}/process/:processName/:id/:processTrigger`,
    async ({ request }) => {
      const payload = (await request.json()) as Record<string, any>;
      return HttpResponse.json({ ...data, ...payload }, { status: code });
    },
  );
