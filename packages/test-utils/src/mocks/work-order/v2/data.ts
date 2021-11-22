import faker from "faker/locale/en";

import { WorkOrder } from "@mtfh/common/lib/api/work-order/v2";

export const generateMockWorkOrdersV2 = (data: Partial<WorkOrder> = {}): WorkOrder => ({
  id: faker.datatype.uuid(),
  reference: faker.datatype.number(123456789),
  dateRaised: faker.date.between("2000-01-01", "2020-01-01").toISOString(),
  lastUpdated: faker.date.between("2000-01-01", "2020-01-01").toISOString(),
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

export const mockWorkOrders = Array.from({ length: 12 }).map(() =>
  generateMockWorkOrdersV2(),
);
