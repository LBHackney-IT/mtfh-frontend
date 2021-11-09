import { rest } from "msw";

import { TENURE_TYPES } from "../../../constants";
import {
  generateMockReferenceDataV1,
  mockEqualityInformationReferenceData,
} from "./data";

import { ReferenceData } from "@mtfh/common/lib/api/reference-data/v1";
import { config } from "@mtfh/common/lib/config";

export const EQUALITY_INFORMATION_CATEGORY = "equality-information";

export const mockReferenceDataV1 = generateMockReferenceDataV1();

export const mockTenureTypeReferences: ReferenceData[] = TENURE_TYPES.map(
  (referenceType) => ({
    ...mockReferenceDataV1,
    ...referenceType,
  }),
);

export const getReferenceDataV1 = (
  data?: ReferenceData[] | Record<string, ReferenceData[]>,
  code = 200,
) => {
  return rest.get(`${config.referenceDataApiUrlV1}/reference-data`, (req, res, ctx) => {
    let response = data;
    const category = req.url.searchParams.get("category");
    const subCategory = req.url.searchParams.get("subCategory");

    if (Array.isArray(data)) {
      response = data.reduce((accum, ref) => {
        if (ref.category !== category) return accum;
        if (!accum[ref.subCategory]) {
          accum[ref.subCategory] = [];
        }
        accum[ref.subCategory].push(ref);

        return accum;
      }, {} as Record<string, ReferenceData[]>);
    }

    if (category === "tenure" && subCategory === "type") {
      return res(
        ctx.status(code),
        ctx.json(response || { type: mockTenureTypeReferences }),
      );
    }
    if (category === "equality-information") {
      return res(
        ctx.status(code),
        ctx.json(response || mockEqualityInformationReferenceData),
      );
    }
    if (category === "error-code") {
      return res(ctx.status(code), ctx.json({}));
    }

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
