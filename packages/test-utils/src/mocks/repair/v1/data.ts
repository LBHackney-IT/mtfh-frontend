import faker from "faker/locale/en";

import { Repair } from "@mtfh/common/lib/api/repair/v1";

export const generateMockRepairWorkOrdersV1 = (data: Partial<Repair> = {}): Repair => ({
  id: faker.datatype.uuid(),
  reference: faker.datatype.number(123456789),
  dateRaised: faker.date.past().toISOString(),
  lastUpdated: faker.date.past().toISOString(),
  priority: faker.lorem.word(),
  property: faker.address.streetAddress(),
  propertyPostCode: faker.address.zipCode(),
  owner: faker.lorem.word(),
  description: faker.lorem.sentence(),
  propertyReference: faker.random.alphaNumeric(8),
  tradeCode: faker.lorem.word(),
  tradeDescription: faker.lorem.word(),
  status: faker.lorem.word(),
  ...data,
});

export const mockRepairWorkOrders = Array.from({ length: 12 }).map(() =>
  generateMockRepairWorkOrdersV1(),
);
