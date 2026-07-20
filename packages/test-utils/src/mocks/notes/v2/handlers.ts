import { HttpResponse, http } from "msw";

import type { Comment } from "@mtfh/common/lib/api/comments/v2";
import { config } from "@mtfh/common/lib/config";

import { generateMockCommentV2 } from "./data";
import { dynamoDbQuery } from "../../../utils/dynamo-db-query";

export const mockCommentV2 = generateMockCommentV2();

export const mockCommentsV2 = Array.from({ length: 20 }).map(() =>
  generateMockCommentV2(),
);

export const getCommentV2 = (data: any = mockCommentsV2, code = 200) =>
  http.get(`${config.notesApiUrlV2}/notes`, ({ request }) => {
    const result = code === 200 ? dynamoDbQuery(request, data) : data;
    return HttpResponse.json(result, { status: code });
  });

const mockPostResponse = async (request: Request) => {
  const body = (await request.json()) as Partial<Comment>;
  return generateMockCommentV2(body);
};

export const postCommentV2 = (data: any = mockPostResponse, code = 200) =>
  http.post(`${config.notesApiUrlV2}/notes`, async ({ request }) => {
    const result = typeof data === "function" ? await data(request) : data;
    return HttpResponse.json(result, { status: code });
  });
