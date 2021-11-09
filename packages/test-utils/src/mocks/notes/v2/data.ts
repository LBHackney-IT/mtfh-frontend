import faker from "faker/locale/en";

import { Comment } from "@mtfh/common/lib/api/comments/v2";

faker.seed(1);

export const generateMockCommentV2 = (data: Partial<Comment> = {}): Comment => {
  return {
    id: faker.datatype.uuid(),
    targetType: faker.random.arrayElement(["person", "tenure"]),
    targetId: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    categorisation: {
      category: faker.lorem.sentence(),
      subCategory: faker.datatype.boolean() ? faker.lorem.sentence() : "",
      description: faker.lorem.word(),
    },
    highlight: faker.datatype.boolean(),
    author: {
      id: faker.datatype.uuid(),
      fullName: [faker.name.firstName(), faker.name.lastName()].join(" "),
      email: faker.internet.email(),
    },
    ...data,
  };
};
