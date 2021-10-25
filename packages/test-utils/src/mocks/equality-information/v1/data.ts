import faker from "faker";

import { EqualityData } from "@mtfh/common/lib/api/equality-information/v1";

export const generateMockEqualityDataV1 = (): EqualityData => ({
  id: faker.datatype.uuid(),
  targetId: faker.datatype.uuid(),
  gender: {
    genderValue: faker.random.arrayElement(["m", "f"]),
    genderValueIfOther: faker.random.arrayElement(["gender fluid", "alien", ""]),
    genderDifferentToBirthSex: faker.datatype.boolean(),
  },
  nationality: faker.random.arrayElement(["british", "spanish"]),
  ethnicity: {
    ethnicGroupValue: faker.random.arrayElement([
      "white",
      "black",
      "yellow",
      "red",
      "transparent",
    ]),
    ethnicGroupValueIfOther: faker.random.arrayElement(["fremen", "naboo", ""]),
  },
  religionOrBelief: {
    religionOrBeliefValue: faker.random.arrayElement(["christian", "muslim"]),
    religionOrBeliefValueIfOther: faker.random.arrayElement(["Jediism", ""]),
  },
  sexualOrientation: {
    sexualOrientationValue: faker.random.arrayElement(["heterosexual", "homosexual"]),
    sexualOrientationValueIfOther: faker.random.arrayElement(["queer", ""]),
  },
  marriageOrCivilPartnership: {
    married: faker.datatype.boolean(),
    civilPartnership: faker.datatype.boolean(),
  },
  pregnancyOrMaternity: [
    {
      pregnancyDate: new Date().toISOString(),
      pregnancyValidUntil: new Date().toISOString(),
    },
  ],
  nationalInsuranceNumber: `${faker.datatype.string(2)}${faker.datatype.number(
    99999,
  )}${faker.datatype.string(1)}`,
  languages: [
    {
      language: faker.random.arrayElement(["english", "spanish", "french", "indian"]),
      isPrimary: faker.datatype.boolean(),
    },
  ],
  caringResponsibilities: {
    provideUnpaidCare: faker.datatype.boolean(),
    hoursSpentProvidingUnpaidCare: faker.datatype.number(99999).toString(),
  },
  disabled: faker.datatype.boolean(),
  communicationRequirements: [
    faker.lorem.lines(faker.datatype.number(3)),
    faker.lorem.lines(faker.datatype.number(3)),
  ],
  economicSituation: {
    economicSituationValue: faker.random.arrayElement(["rich", "poor", ""]),
    economicSituationValueIfOther: faker.random.arrayElement(["normal", ""]),
  },
  homeSituation: {
    homeSituationValue: faker.random.arrayElement(["homeless", "flat", ""]),
    homeSituationValueIfOther: faker.random.arrayElement(["mansion", ""]),
  },
  armedForces: faker.random.arrayElement(["armed", "unarmed", ""]),
});

export const mockEqualityDataV1 = Array.from({ length: 3 }).map(() =>
  generateMockEqualityDataV1(),
);
