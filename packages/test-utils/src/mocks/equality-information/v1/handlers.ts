import { faker } from "@faker-js/faker/locale/en";
import { HttpResponse, http } from "msw";

import { config } from "@mtfh/common/lib/config";

import { generateMockEqualityDataV1 } from "./data";

export const mockEqualityInformationV1 = generateMockEqualityDataV1();

export const getEqualityInformationV1 = (
  data: any = mockEqualityInformationV1,
  code = 200,
) =>
  http.get(
    `${config.equalityInformationApiUrlV1}/equality-information`,
    ({ request }) => {
      return HttpResponse.json(typeof data === "function" ? data(request) : data, {
        status: code,
      });
    },
  );

export const getEqualityInformationByIdV1 = (
  data: any = mockEqualityInformationV1,
  code = 200,
) =>
  http.get(
    `${config.equalityInformationApiUrlV1}/equality-information/:id`,
    ({ request }) => {
      return HttpResponse.json(typeof data === "function" ? data(request) : data, {
        status: code,
      });
    },
  );

export const postEqualityInformationV1 = (responseData: any = {}, code = 200) =>
  http.post(
    `${config.equalityInformationApiUrlV1}/equality-information`,
    async ({ request }) => {
      const body = (await request.json()) as Record<string, any>;
      return HttpResponse.json(
        {
          ...body,
          id: faker.string.uuid(),
          ...(typeof responseData === "function" ? responseData(request) : responseData),
        },
        { status: code },
      );
    },
  );

export const patchEqualityInformationV1 = (responseData: any = {}, code = 200) =>
  http.patch(
    `${config.equalityInformationApiUrlV1}/equality-information/:id`,
    async ({ request }) => {
      const body = (await request.json()) as Record<string, any>;
      return HttpResponse.json(
        {
          ...body,
          ...(typeof responseData === "function" ? responseData(request) : responseData),
        },
        { status: code },
      );
    },
  );
