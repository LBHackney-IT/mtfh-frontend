import { faker } from "@faker-js/faker/locale/en";

import { WorkOrder } from "@mtfh/common/lib/api/work-order/v2";

export const generateMockWorkOrdersV2 = (data: Partial<WorkOrder> = {}): WorkOrder => ({
  id: faker.string.uuid(),
  reference: faker.number.int({ max: 123456789 }),
  dateRaised: faker.date.between({ from: "2000-01-01", to: "2020-01-01" }).toISOString(),
  lastUpdated: faker.date.between({ from: "2000-01-01", to: "2020-01-01" }).toISOString(),
  priority: faker.lorem.word(),
  property: faker.location.streetAddress(),
  propertyPostCode: faker.location.zipCode(),
  owner: faker.lorem.word(),
  description: faker.lorem.sentence(),
  propertyReference: faker.string.alphanumeric(8),
  tradeCode: faker.lorem.word(),
  tradeDescription: faker.lorem.word(),
  status: faker.lorem.word(),
  ...data,
});

export const mockWorkOrders = Array.from({ length: 12 }).map(() =>
  generateMockWorkOrdersV2(),
);
