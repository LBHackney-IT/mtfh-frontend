import faker from "faker/locale/en";

import { EqualityData } from "@mtfh/common/lib/api/equality-information/v1";
import { formatDate } from "@mtfh/common/lib/utils";

export const generateMockEqualityDataV1 = (): EqualityData => ({
  id: faker.datatype.uuid(),
  targetId: faker.datatype.uuid(),
  ageGroup: faker.random.arrayElement([
    "underSixteen",
    "sixteenToSeventeen",
    "eighteenToTwentyFour",
    "twentyFiveToThirtyFour",
    "thirtyFiveToFortyFour",
    "fortyFiveToFiftyFour",
    "fiftyFiveToSixtyFour",
    "sixtyFiveToEightyFour",
    "eightyFiveAndPlus",
  ]),
  gender: {
    genderValue: faker.random.arrayElement(["m", "f", "o"]),
    genderValueIfOther: faker.random.arrayElement(["gender fluid", "alien", ""]),
    genderDifferentToBirthSex: faker.random.arrayElement(["yes", "no", "preferNotToSay"]),
  },
  nationality: faker.random.arrayElement(["british", "spanish"]),
  ethnicity: {
    ethnicGroupValue: faker.random.arrayElement([
      "whiteBritish",
      "gypsyOrIrishTraveller",
      "whiteItalian",
      "indian",
      "pakistani",
      "other",
    ]),
    ethnicGroupValueIfOther: faker.random.arrayElement(["fremen", "naboo", ""]),
  },
  religionOrBelief: {
    religionOrBeliefValue: faker.random.arrayElement([
      "atheistOrNoReligiousBelief",
      "christian",
      "muslim",
      "buddhist",
      "hindu",
      "secularBeliefs",
      "charedi",
      "jewish",
      "sikh",
      "other",
    ]),
    religionOrBeliefValueIfOther: faker.random.arrayElement(["Jediism", ""]),
  },
  sexualOrientation: {
    sexualOrientationValue: faker.random.arrayElement([
      "bisexual",
      "lesbianOrGayWoman",
      "gayMan",
      "heterosexual",
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
      pregnancyDate: formatDate(new Date().toISOString()),
      pregnancyValidUntil: formatDate(new Date().toISOString()),
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

export const mockEqualityDataV1 = Array.from({ length: 3 }).map(() =>
  generateMockEqualityDataV1(),
);
