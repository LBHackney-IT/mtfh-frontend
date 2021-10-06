import { RestRequest, rest } from "msw";

import { dynamoDbQuery } from "../../../utils/dynamo-db-query";
import { generateMockCommentV2 } from "./data";

import type { Comment } from "@mtfh/common/lib/api/comments/v2";

export const mockCommentV2 = generateMockCommentV2();

export const mockCommentsV2 = Array.from({ length: 20 }).map(() =>
  generateMockCommentV2(),
);

export const getCommentV2 = (data: any = mockCommentsV2, code = 200) =>
  rest.get("/api/v2/notes", (req, res, ctx) => {
    const result = code === 200 ? dynamoDbQuery(req, data) : data;
    return res(ctx.status(code), ctx.json(result));
  });

const mockPostResponse = (req: RestRequest) =>
  generateMockCommentV2(req.body as Partial<Comment>);

export const postCommentV2 = (data: any = mockPostResponse, code = 200) =>
  rest.post("/api/v2/notes", (req, res, ctx) => {
    return res(ctx.status(code), ctx.json(typeof data === "function" ? data(req) : data));
  });
