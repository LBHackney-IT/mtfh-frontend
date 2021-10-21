import faker from "faker";

import { Address } from "@mtfh/common/lib/api/address/v1";

export const generateAddressV1 = (): Address => ({
  UPRN: faker.datatype.number(123456789),
  line1: faker.address.streetPrefix(),
  line2: faker.address.streetName(),
  line3: faker.address.county(),
  line4: faker.address.country(),
  town: faker.address.state(),
  postcode: faker.address.zipCode("A0 AA00"),
});

export const mockAddresses = Array.from({ length: 3 }).map(() => generateAddressV1());
