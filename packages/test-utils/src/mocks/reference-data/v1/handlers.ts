import { rest } from "msw";

import {
  generateMockReferenceDataV1,
  mockEqualityInformationReferenceData,
} from "./data";

import { ReferenceData } from "@mtfh/common/lib/api/reference-data/v1";
import { config } from "@mtfh/common/lib/config";

export const EQUALITY_INFORMATION_CATEGORY = "equality-information";

export const mockReferenceDataV1 = generateMockReferenceDataV1();

export const getReferenceDataV1 = (data: any, code = 200) => {
  let response = data;

  if (Array.isArray(data)) {
    response = data.reduce((accum, ref) => {
      if (!accum[ref.subCategory]) {
        accum[ref.subCategory] = [];
      }
      accum[ref.subCategory].push(ref);

      return accum;
    }, {} as Record<string, ReferenceData[]>);
  }
  return rest.get(`${config.referenceDataApiUrlV1}/reference-data`, (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(response));
  });
};

export const getEqualityInformationReferenceData = (
  data: any = mockEqualityInformationReferenceData,
  code = 200,
) =>
  rest.get(`${config.referenceDataApiUrlV1}/reference-data`, (req, res, ctx) => {
    if (req.url.search.indexOf(EQUALITY_INFORMATION_CATEGORY) !== -1)
      return res(ctx.status(code), ctx.json(data));
    return res(ctx.status(code), ctx.json({}));
  });
