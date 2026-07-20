import { HttpResponse, http } from "msw";

import { Comment } from "@mtfh/common/lib/api/comments/v1";
import { config } from "@mtfh/common/lib/config";

import { generateMockCommentV1 } from "./data";
import { dynamoDbQuery } from "../../../utils/dynamo-db-query";

export const mockCommentV1 = generateMockCommentV1();

export const mockCommentsV1 = Array.from({ length: 20 }).map(() =>
  generateMockCommentV1(),
);

export const getCommentV1 = (data: any = mockCommentsV1, code = 200) =>
  http.get(`${config.notesApiUrlV1}/notes`, ({ request }) => {
    const result = code === 200 ? dynamoDbQuery(request, data) : data;
    return HttpResponse.json(result, { status: code });
  });

const mockPostResponse = async (request: Request) => {
  const body = (await request.json()) as Partial<Comment>;
  return generateMockCommentV1(body);
};

export const postCommentV1 = (data: any = mockPostResponse, code = 200) =>
  http.post(`${config.notesApiUrlV1}/notes`, async ({ request }) => {
    const result = typeof data === "function" ? await data(request) : data;
    return HttpResponse.json(result, { status: code });
  });
