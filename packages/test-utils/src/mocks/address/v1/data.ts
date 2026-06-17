import { faker } from "@faker-js/faker/locale/en";

import { Address } from "@mtfh/common/lib/api/address/v1";

export const generateAddressV1 = (): Address => ({
  UPRN: faker.number.int({ max: 123456789 }),
  line1: faker.location.street(),
  line2: faker.location.street(),
  line3: faker.location.county(),
  line4: faker.location.country(),
  town: faker.location.state(),
  postcode: faker.location.zipCode("A0 AA00"),
});

export const mockAddresses = Array.from({ length: 3 }).map(() => generateAddressV1());
