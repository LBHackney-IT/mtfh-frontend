import { HttpResponse, http } from "msw";

import { config } from "@mtfh/common/lib/config";

import { mockPersonV1 } from "../v1";

export const postPersonV2 = (data: any = mockPersonV1, code = 200) =>
  http.post(`${config.personApiUrlV2}/persons`, () => {
    return HttpResponse.json(data, { status: code });
  });
