import { rest } from "msw";
import { dynamoDbQuery } from "../../../utils/dynamo-db-query";
import { generateMockCommentV2 } from "./data";

export const mockCommentV2 = generateMockCommentV2();

export const mockCommentsV2 = Array.from({ length: 20 }).map(() =>
  generateMockCommentV2(),
);

export const getCommentV2 = (data: any = mockCommentsV2, code = 200) =>
  rest.get("/api/v2/notes", (req, res, ctx) => {
    const result = code === 200 ? dynamoDbQuery(req, data) : data;
    return res(ctx.status(code), ctx.json(result));
  });
