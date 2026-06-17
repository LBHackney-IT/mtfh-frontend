import { faker } from "@faker-js/faker/locale/en";
import { addYears, parseISO } from "date-fns";

import {
  Person,
  PersonTitle,
  PersonType,
  TenureSummary,
} from "@mtfh/common/lib/api/person/v1";

import { TENURE_TYPES } from "../../../constants";

faker.seed(1);

const personTitlesEnumKey = Object.getOwnPropertyNames(PersonTitle);
export const personTitles = Object.values(PersonTitle).filter(
  (title) => !personTitlesEnumKey.includes(title),
);

export const generateMockTenureSummaryV1 = (
  data: Partial<TenureSummary> = {},
): TenureSummary => {
  const isActive = data.isActive !== undefined ? data.isActive : faker.datatype.boolean();
  const startDate = data.startDate
    ? parseISO(data.startDate)
    : faker.date.between({ from: "2010-01-01", to: "2020-01-01" });
  return {
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(TENURE_TYPES.map((type) => type.value)),
    assetFullAddress: [faker.location.streetAddress(), faker.location.zipCode()].join(
      ", ",
    ),
    assetId: faker.string.uuid(),
    startDate: startDate.toISOString(),
    endDate: !isActive ? addYears(startDate, 1).toISOString() : null,
    isActive,
    paymentReference: faker.string.alphanumeric(10),
    propertyReference: faker.string.alphanumeric(10),
    uprn: faker.string.alphanumeric(10),
    ...data,
  };
};

export const generateMockPersonV1 = (data: Partial<Person> = {}): Person => ({
  id: faker.string.uuid(),
  title: faker.helpers.arrayElement(personTitles) as PersonTitle,
  firstName: faker.person.firstName(),
  middleName: faker.datatype.boolean() ? faker.person.middleName() : null,
  surname: faker.person.lastName(),
  preferredTitle: faker.datatype.boolean()
    ? (faker.helpers.arrayElement(personTitles) as PersonTitle)
    : null,
  preferredFirstName: faker.datatype.boolean() ? faker.person.firstName() : null,
  preferredMiddleName: faker.datatype.boolean() ? faker.person.middleName() : null,
  preferredSurname: faker.datatype.boolean() ? faker.person.lastName() : null,
  placeOfBirth: faker.location.city(),
  dateOfBirth: faker.date.past().toISOString(),
  personTypes: faker.helpers.arrayElements(
    ["Tenant", "Leaseholder", "Freeholder", "HouseholdMember"],
    faker.number.int({ min: 1, max: 2 }),
  ) as PersonType[],
  tenures: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() =>
    generateMockTenureSummaryV1({ isActive: faker.datatype.boolean() }),
  ),
  reason: faker.lorem.sentence(),
  ...data,
});
