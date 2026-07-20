export const dynamoDbQuery = (request: Request, data: any[]) => {
  const url = new URL(request.url);
  const paginationToken = url.searchParams.get("paginationToken");
  const token = paginationToken ? Number(paginationToken) : 0;
  const size = Number(url.searchParams.get("pageSize"));

  return {
    results: data.slice(token * size, token * size + size),
    paginationDetails: {
      nextToken: token * size + size >= data.length ? null : String(token + 1),
    },
  };
};
