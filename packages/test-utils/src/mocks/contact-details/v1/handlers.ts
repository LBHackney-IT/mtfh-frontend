import faker from "faker";
import { rest } from "msw";

import {
  generateMockContactDetailCorrespondenceAddressV1,
  generateMockContactDetailEmailV1,
  generateMockContactDetailPhoneV1,
  generateMockContactDetailV1,
  generateMockContactDetailsV1,
} from "./data";

import { config } from "@mtfh/common/lib/config";

export const mockContactDetailV1 = generateMockContactDetailV1();
export const mockContactDetailEmailV1 = generateMockContactDetailEmailV1();
export const mockContactDetailCorrespondenceAddressV1 =
  generateMockContactDetailCorrespondenceAddressV1();
export const mockContactDetailPhoneV1 = generateMockContactDetailPhoneV1();
export const mockContactDetailsV1 = generateMockContactDetailsV1(
  mockContactDetailPhoneV1,
  mockContactDetailCorrespondenceAddressV1,
  mockContactDetailEmailV1,
);

export const getContactDetailsV1 = (data: any = mockContactDetailsV1, code = 200) =>
  rest.get(`${config.contactDetailsApiUrlV1}/contactDetails`, (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(data));
  });

export const postContactDetailV1 = (responseData: any = {}, code = 200) =>
  rest.post(`${config.contactDetailsApiUrlV1}/contactDetails`, (req, res, ctx) => {
    const data = req.body as Record<string, any>;
    return res(
      ctx.status(code),
      ctx.json({
        ...data,
        id: faker.datatype.uuid(),
        isActive: true,
        createdBy: {
          createdBy: new Date().toISOString(),
          id: faker.datatype.uuid(),
          fullName: faker.name.firstName(),
          email: faker.internet.email,
        },
        ...responseData,
      }),
    );
  });

export const deleteContactDetailV1 = (data: any = {}, code = 200) =>
  rest.delete(`${config.contactDetailsApiUrlV1}/contactDetails`, (req, res, ctx) => {
    return res(
      ctx.status(code),
      ctx.json({
        id: req.url.searchParams.get("id"),
        targetId: req.url.searchParams.get("targetId"),
        isActive: false,
        ...data,
      }),
    );
  });
