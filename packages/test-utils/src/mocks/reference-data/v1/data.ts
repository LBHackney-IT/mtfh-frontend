import faker from "faker";

import { TENURE_TYPES } from "../../../constants";

import { ReferenceData } from "@mtfh/common/lib/api/reference-data/v1";

faker.seed(1);

export const generateMockReferenceDataV1 = (
  data: Partial<ReferenceData> = {},
): ReferenceData => {
  return {
    id: faker.datatype.uuid(),
    category: faker.random.arrayElement([
      "error-code",
      "tenure",
      "person",
      "asset",
      "equality-information",
    ]),
    subCategory: faker.random.arrayElement(["mmh", "type"]),
    code: faker.datatype.string(),
    value: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    isActive: faker.datatype.boolean(),
    createdAt: faker.date.past().toISOString(),
    tags: ["Housing"],
    ...data,
  };
};

export const mockTenureTypeReferencesV1: ReferenceData[] = TENURE_TYPES.map(
  (referenceType) =>
    generateMockReferenceDataV1({
      category: "tenure",
      subCategory: "type",
      ...referenceType,
    }),
);

const equalityInfo = {
  "age-bracket": [
    { code: "eightyFiveandPlus", value: "85+" },
    { code: "underSixteen", value: "Under 16" },
  ],
  answers: [
    { code: "no", value: "No" },
    { code: "yes", value: "Yes" },
    { code: "preferNotToSay", value: "Prefer not to say" },
  ],
  "armed-forces-c": [
    {
      code: "formerMemberOfTheArmedForces",
      value: "A former member of the armed forces",
    },
    {
      code: "servingMemberOfTheArmedForces",
      value: "A serving member of the armed forces",
    },
  ],
  "ethnic-group-a": [
    { code: "mixedBackground", value: "Mixed background" },
    { code: "other", value: "Other - please describe" },
    { code: "whiteOrWhiteBritish", value: "White or White British" },
  ],
  gender: [
    { code: "f", value: "Female" },
    { code: "m", value: "Male" },
    { code: "o", value: "Other" },
  ],
  "hours-spent-caring-b": [
    { code: "zeroToFourHours", value: "0 to 4 hours" },
    { code: "tenToNineteenHours", value: "10 to 19 hours" },
  ],
  "religion-belief": [
    { code: "other", value: "Other" },
    { code: "secularBeliefs", value: "Secular beliefs" },
    { code: "sikh", value: "Sikh" },
  ],
  "sexual-orientation": [
    { code: "bisexual", value: "Bisexual" },
    { code: "heterosexual", value: "Heterosexual" },
    { code: "gayMan", value: "Gay man" },
    { code: "lesbianOrGayWoman", value: "Lesbian or Gay woman" },
    { code: "other", value: "Other" },
  ],
};

export const mockEqualityInformationReferenceDataV1 = Object.entries(equalityInfo).reduce(
  (accum, [key, items]) => {
    return accum.concat(
      items.map((data) =>
        generateMockReferenceDataV1({
          category: "equality-information",
          subCategory: key,
          ...data,
        }),
      ),
    );
  },
  [] as ReferenceData[],
);
