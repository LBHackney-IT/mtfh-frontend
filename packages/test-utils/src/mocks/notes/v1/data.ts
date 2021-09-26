import faker from "faker";
import { Comment } from "@mtfh/common/lib/api/comments/v1";

faker.seed(1);

export const generateMockCommentV1 = (data: Partial<Comment> = {}): Comment => {
  return {
    id: faker.datatype.uuid(),
    targetType: faker.random.arrayElement(["person", "tenure"]),
    targetId: faker.datatype.uuid(),
    description: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    categorisation: {
      category: faker.lorem.sentence(),
      subCategory: faker.datatype.boolean() ? faker.lorem.sentence() : "",
      description: faker.lorem.word(),
    },
    author: {
      fullName: [faker.name.firstName(), faker.name.lastName()].join(" "),
      email: faker.internet.email(),
    },
    ...data,
  };
};
