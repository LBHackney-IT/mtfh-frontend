import { rest } from "msw";
import { dynamoDbQuery } from "../../../utils/dynamo-db-query";
import { generateMockCommentV1 } from "./data";

export const mockCommentV1 = generateMockCommentV1();

export const mockCommentsV1 = Array.from({ length: 20 }).map(() =>
  generateMockCommentV1(),
);

export const getCommentV1 = (data: any = mockCommentsV1, code = 200) =>
  rest.get("/api/v1/notes", (req, res, ctx) => {
    const result = code === 200 ? dynamoDbQuery(req, data) : data;
    return res(ctx.status(code), ctx.json(result));
  });

export const postCommentV1 = (data: any = mockCommentsV1, code = 200) =>
  rest.post("/api/v1/notes", (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(data));
  });
