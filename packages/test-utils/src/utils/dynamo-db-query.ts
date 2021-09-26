export const dynamoDbQuery = (req: any, data: any[]) => {
  const paginationToken = req.url.searchParams.get("paginationToken");
  const token = paginationToken ? Number(paginationToken) : 0;
  const size = Number(req.url.searchParams.get("pageSize"));

  return {
    results: data.slice(token * size, token * size + size),
    paginationDetails: {
      nextToken: token * size + size >= data.length ? null : String(token + 1),
    },
  };
};
