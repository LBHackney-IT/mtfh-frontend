import { HttpResponse, http } from "msw";

import { config } from "@mtfh/common/lib/config";

export const deleteContactDetailV1 = (data: any = {}, code = 200) =>
  http.delete(`${config.contactDetailsApiUrlV1}/contactDetails`, ({ request }) => {
    const url = new URL(request.url);
    return HttpResponse.json(
      {
        id: url.searchParams.get("id"),
        targetId: url.searchParams.get("targetId"),
        isActive: false,
        ...(typeof data === "function" ? data(request) : data),
      },
      { status: code },
    );
  });
