import { rest } from "msw";

import { config } from "@mtfh/common/lib/config";

export const deleteContactDetailV1 = (data: any = {}, code = 200) =>
  rest.delete(`${config.contactDetailsApiUrlV1}/contactDetails`, (req, res, ctx) => {
    return res(
      ctx.status(code),
      ctx.json({
        id: req.url.searchParams.get("id"),
        targetId: req.url.searchParams.get("targetId"),
        isActive: false,
        ...data,
      }),
    );
  });
