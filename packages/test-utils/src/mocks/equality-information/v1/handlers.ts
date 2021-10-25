import faker from "faker";
import { rest } from "msw";

import { mockEqualityDataV1 } from "./data";

import { config } from "@mtfh/common/lib/config";

export const mockEqualityInformationV1 = { equalityData: mockEqualityDataV1 };

export const getEqualityInformationV1 = (
  data: any = mockEqualityInformationV1,
  code = 200,
) =>
  rest.get(
    `${config.equalityInformationApiUrlV1}/equality-information`,
    (req, res, ctx) => {
      return res(
        ctx.status(code),
        ctx.json(typeof data === "function" ? data(req) : data),
      );
    },
  );

export const getEqualityInformationByIdV1 = (
  data: any = mockEqualityDataV1[0],
  code = 200,
) =>
  rest.get(
    `${config.equalityInformationApiUrlV1}/equality-information/:id`,
    (req, res, ctx) => {
      return res(
        ctx.status(code),
        ctx.json(typeof data === "function" ? data(req) : data),
      );
    },
  );

export const postEqualityInformationV1 = (responseData: any = {}, code = 200) =>
  rest.post(
    `${config.equalityInformationApiUrlV1}/equality-information`,
    (req, res, ctx) => {
      const data = req.body as Record<string, any>;
      return res(
        ctx.status(code),
        ctx.json({
          ...data,
          id: faker.datatype.uuid(),
          ...(typeof responseData === "function" ? responseData(req) : responseData),
        }),
      );
    },
  );

export const patchEqualityInformationV1 = (responseData: any = {}, code = 200) =>
  rest.patch(
    `${config.equalityInformationApiUrlV1}/equality-information/:id`,
    (req, res, ctx) => {
      const data = req.body as Record<string, any>;
      return res(
        ctx.status(code),
        ctx.json({
          ...data,
          ...(typeof responseData === "function" ? responseData(req) : responseData),
        }),
      );
    },
  );
