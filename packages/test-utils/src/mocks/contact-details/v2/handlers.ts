import faker from "faker";
import { rest } from "msw";

import {
  generateMockContactDetailCorrespondenceAddressV2,
  generateMockContactDetailEmailV2,
  generateMockContactDetailPhoneV2,
  generateMockContactDetailV2,
  generateMockContactDetailsV2,
} from "./data";

import { config } from "@mtfh/common/lib/config";

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
  rest.get(`/api/v2/contactDetails`, (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(typeof data === "function" ? data(req) : data));
  });

export const postContactDetailV2 = (responseData: any = {}, code = 200) =>
  rest.post(`/api/v2/contactDetails`, (req, res, ctx) => {
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
        ...(typeof responseData === "function" ? responseData(req) : responseData),
      }),
    );
  });
