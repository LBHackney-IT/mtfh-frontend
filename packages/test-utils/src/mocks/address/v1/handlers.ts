import { HttpResponse, http } from "msw";

import { config } from "@mtfh/common/lib/config";

import { mockAddresses } from "./data";

export const getAddressV1 = (data: any = mockAddresses, code = 200) =>
  http.get(`${config.addressApiUrlV1}/addresses`, ({ request }) => {
    return HttpResponse.json(
      typeof data === "function" ? data(request) : { data: { address: data } },
      { status: code },
    );
  });
