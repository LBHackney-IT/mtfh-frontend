import { rest } from "msw";

import { generateMockReferenceDataV1 } from "./data";

import { ReferenceData } from "@mtfh/common/lib/api/reference-data/v1";

export const mockReferenceDataV1 = generateMockReferenceDataV1();

export const getReferenceDataV1 = (data: any[], code = 200) => {
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
  return rest.get("/api/v1/reference-data", (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(response));
  });
};
