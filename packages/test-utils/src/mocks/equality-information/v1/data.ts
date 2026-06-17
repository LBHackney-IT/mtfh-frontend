import { faker } from "@faker-js/faker/locale/en";

import { EqualityData } from "@mtfh/common/lib/api/equality-information/v1";

export const generateMockEqualityDataV1 = (): EqualityData => ({
  id: faker.string.uuid(),
  targetId: faker.string.uuid(),
  ageGroup: faker.helpers.arrayElement(["underSixteen", "eightyFiveandPlus"]),
  gender: {
    genderValue: faker.helpers.arrayElement(["m", "f", "o"]),
    genderValueIfOther: faker.helpers.arrayElement(["gender fluid", "alien", ""]),
    genderDifferentToBirthSex: faker.helpers.arrayElement([
      "yes",
      "no",
      "preferNotToSay",
    ]),
  },
  nationality: faker.helpers.arrayElement(["british", "spanish"]),
  ethnicity: {
    ethnicGroupValue: faker.helpers.arrayElement([
      "mixedBackground",
      "other",
      "whiteOrWhiteBritish",
      "other",
    ]),
    ethnicGroupValueIfOther: faker.helpers.arrayElement(["fremen", "naboo", ""]),
  },
  religionOrBelief: {
    religionOrBeliefValue: faker.helpers.arrayElement([
      "other",
      "secularBeliefs",
      "sikh",
    ]),
    religionOrBeliefValueIfOther: faker.helpers.arrayElement(["Jediism", ""]),
  },
  sexualOrientation: {
    sexualOrientationValue: faker.helpers.arrayElement([
      "bisexual",
      "heterosexual",
      "gayMan",
      "lesbianOrGayWoman",
      "other",
    ]),
    sexualOrientationValueIfOther: faker.helpers.arrayElement(["queer", ""]),
  },
  marriageOrCivilPartnership: {
    married: faker.helpers.arrayElement(["yes", "no", "preferNotToSay"]),
    civilPartnership: faker.helpers.arrayElement(["yes", "no", "preferNotToSay"]),
  },
  pregnancyOrMaternity: [
    {
      pregnancyDate: faker.date
        .between({ from: "2010-01-01", to: "2020-01-01" })
        .toISOString(),
      pregnancyValidUntil: faker.date
        .between({ from: "2010-01-01", to: "2021-01-01" })
        .toISOString(),
    },
  ],
  nationalInsuranceNumber: `${faker.string.alpha(2)}${faker.number.int(
    99999,
  )}${faker.string.alpha(1)}`,
  languages: [
    {
      language: faker.helpers.arrayElement(["english", "spanish", "french", "indian"]),
      isPrimary: faker.datatype.boolean(),
    },
  ],
  caringResponsibilities: {
    provideUnpaidCare: faker.helpers.arrayElement(["yes", "no", "preferNotToSay"]),
    hoursSpentProvidingUnpaidCare: faker.helpers.arrayElement([
      "zeroToFourHours",
      "fiveToNineHours",
      "tenToNineteenHours",
      "twentyToThirtyFourHours",
      "thirtyFiveToFortyNineHours",
      "overFiftyHours",
    ]),
  },
  disabled: faker.helpers.arrayElement(["yes", "no", "preferNotToSay"]),
  communicationRequirements: [
    faker.lorem.lines(faker.number.int(3)),
    faker.lorem.lines(faker.number.int(3)),
  ],
  economicSituation: {
    economicSituationValue: faker.helpers.arrayElement([
      "employedFullTime",
      "employedPartTime",
      "selfEmployedFullTime",
      "selfEmployedPartTime",
      "unemployedAndAvailableForWork",
      "longTermSickOrDisabled",
      "retired",
      "other",
    ]),
    economicSituationValueIfOther: faker.helpers.arrayElement(["normal", ""]),
  },
  homeSituation: {
    homeSituationValue: faker.helpers.arrayElement([
      "ownerOccupier",
      "rentedFromHackneyCouncil",
      "TemporaryAccommodationPlacedByHackneyCouncil",
      "rentedFromRegisteredProvider",
      "rentedFromPrivateLandlord",
      "sharedOwnership",
      "residentialHome",
      "other",
    ]),
    homeSituationValueIfOther: faker.helpers.arrayElement(["mansion", ""]),
  },
  armedForces: faker.helpers.arrayElement([
    "servingMemberOfTheArmedForces",
    "formerMemberOfTheArmedForces",
  ]),
});
