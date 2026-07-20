import { faker } from "@faker-js/faker/locale/en";
import { addYears, parseISO } from "date-fns";

import { HouseholdMember, Tenure } from "@mtfh/common/lib/api/tenure/v1";

import { TENURE_TYPES } from "../../../constants";

export const generateMockHouseholdMemberV1 = (
  data: Partial<HouseholdMember> = {},
): HouseholdMember => {
  const isResponsible =
    data.isResponsible !== undefined ? data.isResponsible : faker.datatype.boolean();
  return {
    id: faker.string.uuid(),
    type: "Person",
    fullName: [
      faker.person.prefix(),
      faker.person.firstName(),
      faker.person.lastName(),
    ].join(" "),
    isResponsible,
    dateOfBirth: faker.date.past().toISOString(),
    personTenureType: isResponsible
      ? faker.helpers.arrayElement(["Tenant", "Leaseholder", "Freeholder"])
      : "HouseholdMember",
    ...data,
  };
};

export const generateMockTenureV1 = (data: Partial<Tenure> = {}): Tenure => {
  const tenureType =
    data.tenureType ||
    faker.helpers.arrayElement(
      TENURE_TYPES.map(({ code, value }) => ({ code, description: value })),
    );
  const namedTenureHolderType = "Tenant";
  const isActive = data.isActive !== undefined ? data.isActive : faker.datatype.boolean();
  const startOfTenureDate = data.startOfTenureDate
    ? parseISO(data.startOfTenureDate)
    : faker.date.between({ from: "2010-01-01", to: "2020-01-01" });
  return {
    id: faker.string.uuid(),
    paymentReference: faker.string.alphanumeric(10),
    householdMembers: [
      ...Array.from({
        length: faker.number.int({ min: 1, max: 4 }),
      }).map(() =>
        generateMockHouseholdMemberV1({
          isResponsible: true,
          personTenureType: namedTenureHolderType,
        }),
      ),
      ...Array.from({ length: faker.number.int({ min: 1, max: 8 }) }).map(() =>
        generateMockHouseholdMemberV1({ isResponsible: false }),
      ),
    ],
    tenuredAsset: {
      id: faker.string.uuid(),
      type: faker.helpers.arrayElement(["Dwelling", "LettableNonDwelling"]),
      fullAddress: [faker.location.streetAddress(), faker.location.zipCode()].join(", "),
      uprn: faker.string.alphanumeric(10),
      propertyReference: faker.string.alphanumeric(10),
    },
    startOfTenureDate: startOfTenureDate.toISOString(),
    endOfTenureDate: !isActive ? addYears(startOfTenureDate, 1).toISOString() : null,
    tenureType,
    isActive,
    isTenanted: null,
    terminated: { isTerminated: false, reasonForTermination: "" },
    successionDate: "1900-01-01T00:00:00",
    evictionDate: "1900-01-01T00:00:00",
    potentialEndDate: "1900-01-01T00:00:00",
    isMutualExchange: false,
    informHousingBenefitsForChanges: false,
    isSublet: false,
    subletEndDate: "1900-01-01T00:00:00",
    accountType: { code: "S", description: "Service Charge" },
    subsidiaryAccountsReferences: [""],
    masterAccountTenureReference: "",
    rentCostCentre: "",
    charges: {
      rent: 0,
      currentBalance: 0,
      billingFrequency: "01",
      paymentReference: "299049788",
      rentGroupCode: "LSC",
      rentGroupDescription: "LH Serv Charges",
      serviceCharge: 0,
      otherCharges: 0,
      combinedServiceCharges: 0,
      combinedRentCharges: 0,
      tenancyInsuranceCharge: 0,
      originalRentCharge: 0,
      originalServiceCharge: 0,
      storageCharge: null,
      rentAdjustment: null,
      rentAdjustmentReason: null,
      isSuspended: null,
    },
    notices: [
      {
        type: "",
        servedDate: "1900-01-01T00:00:00",
        expiryDate: "1900-01-01T00:00:00",
        effectiveDate: "1900-01-01T00:00:00",
        endDate: "null",
      },
    ],
    legacyReferences: [
      { name: "uh_tag_ref", value: "0905836/01" },
      { name: "u_saff_tenancy", value: "" },
    ],
    agreementType: { code: "M", description: "Master Account" },
  };
};
