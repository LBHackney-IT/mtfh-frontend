import { rest } from "msw";

import { generateMockErrorsReferenceData } from "./data";

export const mockErrorsReferenceData = generateMockErrorsReferenceData();

export const getMockErrorsReferenceDataV1 = (
  data: any = mockErrorsReferenceData,
  code = 200,
) =>
  rest.get(
    "/api/v1/reference-data?category=error-code&subCategory=mmh",
    (req, res, ctx) => {
      return res(ctx.status(code), ctx.json(data));
    },
  );
