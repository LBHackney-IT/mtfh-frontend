import faker from "faker/locale/en";

import { Process, ProcessState } from "@mtfh/common/lib/api/process/v1";

faker.seed(1);

export const generateMockProcessStateV1 = (
  data: Partial<ProcessState> = {},
): ProcessState => {
  return {
    state: faker.lorem.word(),
    permittedTriggers: Array.from({
      length: faker.datatype.number({ min: 1, max: 4 }),
    }).map(() => faker.lorem.word()),
    assignment: faker.lorem.word(),
    processData: {
      formData: {},
      documents: Array.from({
        length: faker.datatype.number({ min: 1, max: 4 }),
      }).map(() => faker.datatype.uuid()),
    },
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    ...data,
  };
};

export const generateMockProcessV1 = (data: Partial<Process> = {}): Process => {
  return {
    id: faker.datatype.uuid(),
    targetId: faker.datatype.uuid(),
    relatedEntities: Array.from({
      length: faker.datatype.number({ min: 1, max: 4 }),
    }).map(() => faker.lorem.word()),
    formData: {},
    documents: Array.from({ length: faker.datatype.number({ min: 1, max: 4 }) }).map(() =>
      faker.datatype.uuid(),
    ),
    processName: faker.lorem.word(),
    currentState: generateMockProcessStateV1(),
    previousStates: Array.from({
      length: faker.datatype.number({ min: 1, max: 4 }),
    }).map(() => generateMockProcessStateV1()),
    ...data,
  };
};
