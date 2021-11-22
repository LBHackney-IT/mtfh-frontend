import { rest } from "msw";

import { ReferenceData } from "@mtfh/common/lib/api/reference-data/v1";
import { config } from "@mtfh/common/lib/config";

export const getReferenceDataV1 = (
  data: ReferenceData[] | Record<string, ReferenceData[]> = {},
  code = 200,
) => {
  return rest.get(`${config.referenceDataApiUrlV1}/reference-data`, (req, res, ctx) => {
    let response = data;
    const category = req.url.searchParams.get("category");
    const subCategory = req.url.searchParams.get("subCategory");

    // If the data is an array, it could contain multiple categories and subCategories
    if (Array.isArray(data)) {
      response = data.reduce((accum, ref) => {
        if (ref.category !== category) {
          return accum;
        }
        if (subCategory && subCategory !== ref.subCategory) {
          return accum;
        }
        if (!accum[ref.subCategory]) {
          accum[ref.subCategory] = [];
        }
        accum[ref.subCategory].push(ref);

        return accum;
      }, {} as Record<string, ReferenceData[]>);
      // If the data is a single object, it should only have a single category
    } else if (subCategory) {
      response = Object.entries(data).reduce((accum, [subKey, refs]) => {
        if (subKey !== subCategory) {
          return accum;
        }
        accum[subCategory] = refs;
        return accum;
      }, {} as Record<string, ReferenceData[]>);
    }

    return res(ctx.status(code), ctx.json(response));
  });
};
