import { faker } from "@faker-js/faker/locale/en";
import { HttpResponse, http } from "msw";

import { config } from "@mtfh/common/lib/config";

import {
  generateMockContactDetailCorrespondenceAddressV2,
  generateMockContactDetailEmailV2,
  generateMockContactDetailPhoneV2,
  generateMockContactDetailV2,
  generateMockContactDetailsV2,
} from "./data";

export const mockContactDetailV2 = generateMockContactDetailV2();
export const mockContactDetailEmailV2 = generateMockContactDetailEmailV2();
export const mockContactDetailCorrespondenceAddressV2 =
  generateMockContactDetailCorrespondenceAddressV2();
export const mockContactDetailPhoneV2 = generateMockContactDetailPhoneV2();
export const mockContactDetailsV2 = generateMockContactDetailsV2(
  mockContactDetailPhoneV2,
  mockContactDetailCorrespondenceAddressV2,
  mockContactDetailEmailV2,
);

export const getContactDetailsV2 = (data: any = mockContactDetailsV2, code = 200) =>
  http.get(`${config.contactDetailsApiUrlV2}/contactDetails`, ({ request }) => {
    return HttpResponse.json(typeof data === "function" ? data(request) : data, {
      status: code,
    });
  });

export const postContactDetailV2 = (responseData: any = {}, code = 200) =>
  http.post(`${config.contactDetailsApiUrlV2}/contactDetails`, async ({ request }) => {
    const body = (await request.json()) as Record<string, any>;
    return HttpResponse.json(
      {
        ...body,
        id: faker.string.uuid(),
        isActive: true,
        createdBy: {
          createdBy: new Date().toISOString(),
          id: faker.string.uuid(),
          fullName: faker.person.firstName(),
          email: faker.internet.email(),
        },
        ...(typeof responseData === "function" ? responseData(request) : responseData),
      },
      { status: code },
    );
  });
