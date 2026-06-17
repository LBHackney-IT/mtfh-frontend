import { faker } from "@faker-js/faker/locale/en";

import { Comment } from "@mtfh/common/lib/api/comments/v1";

faker.seed(1);

export const generateMockCommentV1 = (data: Partial<Comment> = {}): Comment => {
  return {
    id: faker.string.uuid(),
    targetType: faker.helpers.arrayElement(["person", "tenure"]),
    targetId: faker.string.uuid(),
    description: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    categorisation: {
      category: faker.lorem.sentence(),
      subCategory: faker.datatype.boolean() ? faker.lorem.sentence() : "",
      description: faker.lorem.word(),
    },
    author: {
      id: faker.string.uuid(),
      fullName: [faker.person.firstName(), faker.person.lastName()].join(" "),
      email: faker.internet.email(),
    },
    ...data,
  };
};
