import { rest } from "msw";

import { config } from "@mtfh/common/lib/config";

export const mockAlertV1 = {
  propertyReference: "12345",
  uprn: null,
  addressNumber: null,
  alerts: [
    {
      dateModified: "12/02/2022",
      modifiedBy: "GoogleSheet",
      startDate: "12/02/2022",
      endDate: null,
      alertCode: null,
      description: "Domestic Abuse Case - please seek advice",
      reason: null,
      assureReference: "123456",
      personName: "FAKE_Alice FAKE_Rowe",
      personId: null,
      alertId: "445091a6-71bf-492c-b5c5-04816a6ae491",
      isActive: true,
    },
  ],
};

export const getAlertsByAlertIdV1 = (data: any = mockAlertV1, code = 200) => {
  return rest.get(
    `${config.cautionaryApiUrlV1}/cautionary-alerts/alert/:cautionaryAlertId`,
    (req, res, ctx) => res(ctx.status(code), ctx.json(data)),
  );
};
