import faker from "faker/locale/en";

import { EqualityData } from "@mtfh/common/lib/api/equality-information/v1";

export const generateMockEqualityDataV1 = (): EqualityData => ({
  id: faker.datatype.uuid(),
  targetId: faker.datatype.uuid(),
  ageGroup: faker.random.arrayElement(["underSixteen", "eightyFiveandPlus"]),
  gender: {
    genderValue: faker.random.arrayElement(["m", "f", "o"]),
    genderValueIfOther: faker.random.arrayElement(["gender fluid", "alien", ""]),
    genderDifferentToBirthSex: faker.random.arrayElement(["yes", "no", "preferNotToSay"]),
  },
  nationality: faker.random.arrayElement(["british", "spanish"]),
  ethnicity: {
    ethnicGroupValue: faker.random.arrayElement([
      "mixedBackground",
      "other",
      "whiteOrWhiteBritish",
      "other",
    ]),
    ethnicGroupValueIfOther: faker.random.arrayElement(["fremen", "naboo", ""]),
  },
  religionOrBelief: {
    religionOrBeliefValue: faker.random.arrayElement(["other", "secularBeliefs", "sikh"]),
    religionOrBeliefValueIfOther: faker.random.arrayElement(["Jediism", ""]),
  },
  sexualOrientation: {
    sexualOrientationValue: faker.random.arrayElement([
      "bisexual",
      "heterosexual",
      "gayMan",
      "lesbianOrGayWoman",
      "other",
    ]),
    sexualOrientationValueIfOther: faker.random.arrayElement(["queer", ""]),
  },
  marriageOrCivilPartnership: {
    married: faker.random.arrayElement(["yes", "no", "preferNotToSay"]),
    civilPartnership: faker.random.arrayElement(["yes", "no", "preferNotToSay"]),
  },
  pregnancyOrMaternity: [
    {
      pregnancyDate: faker.date.between("2010-01-01", "2020-01-01").toISOString(),
      pregnancyValidUntil: faker.date.between("2010-01-01", "2021-01-01").toISOString(),
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
    provideUnpaidCare: faker.random.arrayElement(["yes", "no", "preferNotToSay"]),
    hoursSpentProvidingUnpaidCare: faker.random.arrayElement([
      "zeroToFourHours",
      "fiveToNineHours",
      "tenToNineteenHours",
      "twentyToThirtyFourHours",
      "thirtyFiveToFortyNineHours",
      "overFiftyHours",
    ]),
  },
  disabled: faker.random.arrayElement(["yes", "no", "preferNotToSay"]),
  communicationRequirements: [
    faker.lorem.lines(faker.datatype.number(3)),
    faker.lorem.lines(faker.datatype.number(3)),
  ],
  economicSituation: {
    economicSituationValue: faker.random.arrayElement([
      "employedFullTime",
      "employedPartTime",
      "selfEmployedFullTime",
      "selfEmployedPartTime",
      "unemployedAndAvailableForWork",
      "longTermSickOrDisabled",
      "retired",
      "other",
    ]),
    economicSituationValueIfOther: faker.random.arrayElement(["normal", ""]),
  },
  homeSituation: {
    homeSituationValue: faker.random.arrayElement([
      "ownerOccupier",
      "rentedFromHackneyCouncil",
      "TemporaryAccommodationPlacedByHackneyCouncil",
      "rentedFromRegisteredProvider",
      "rentedFromPrivateLandlord",
      "sharedOwnership",
      "residentialHome",
      "other",
    ]),
    homeSituationValueIfOther: faker.random.arrayElement(["mansion", ""]),
  },
  armedForces: faker.random.arrayElement([
    "servingMemberOfTheArmedForces",
    "formerMemberOfTheArmedForces",
  ]),
});
