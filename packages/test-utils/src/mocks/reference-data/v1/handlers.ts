import { rest } from "msw";
import { dynamoDbQuery } from "../../../utils/dynamo-db-query";

import { generateMockReferenceDataV1 } from "./data";

export const mockReferenceDataV1 = generateMockReferenceDataV1();
export const mockReferenceDatasV1 = Array.from({ length: 10 }).map(() =>
  generateMockReferenceDataV1(),
);

export const getReferenceDataV1 = (data: any = mockReferenceDatasV1, code = 200) =>
  rest.get("/api/v1/reference-data", (req, res, ctx) => {
    const result = code === 200 ? dynamoDbQuery(req, data) : data;
    return res(ctx.status(code), ctx.json(result));
  });
