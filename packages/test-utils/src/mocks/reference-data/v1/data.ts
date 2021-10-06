import faker from "faker";

import { ReferenceData } from "@mtfh/common/lib/api/reference-data/v1";

faker.seed(1);

export const generateMockReferenceDataV1 = (
  data: Partial<ReferenceData> = {},
): ReferenceData => {
  return {
    id: faker.datatype.uuid(),
    category: faker.random.arrayElement(["error-code", "tenure", "person", "asset"]),
    subCategory: faker.random.arrayElement(["mmh", "type"]),
    code: faker.datatype.string(),
    value: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    isActive: faker.datatype.boolean(),
    createdAt: faker.date.past().toISOString(),
    tags: ["Housing"],
    ...data,
  };
};
