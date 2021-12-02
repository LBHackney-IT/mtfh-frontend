import faker from "faker/locale/en";

faker.seed(1);

export interface Process {
  id: string;
  targetID: string;
  relatedEntities: string[];
  formData: object;
  documents: string[];
  processName: string;
  currentState: ProcessState;
  previousStates: ProcessState[];
}

export interface ProcessState {
  stateName: string;
  permittedTriggers: string[];
  assignment: string;
  processData: {
    formData: object;
    documents: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export const generateMockProcessV1 = (data: Partial<Process> = {}): Process => {
  return {
    id: faker.datatype.uuid(),
    targetID: faker.datatype.uuid(),
    relatedEntities: Array.from({
      length: faker.datatype.number({ min: 1, max: 4 }),
    }).map(() => faker.lorem.word()),
    formData: {},
    documents: Array.from({ length: faker.datatype.number({ min: 1, max: 4 }) }).map(() =>
      faker.datatype.uuid(),
    ),
    processName: faker.lorem.word(),
    currentState: generateMockProcessStateV1(),
    previousStates: Array.from({ length: faker.datatype.number({ min: 1, max: 4 }) }).map(
      () => generateMockProcessStateV1(),
    ),
    ...data,
  };
};

export const generateMockProcessStateV1 = (
  data: Partial<ProcessState> = {},
): ProcessState => {
  return {
    stateName: faker.lorem.word(),
    permittedTriggers: Array.from({
      length: faker.datatype.number({ min: 1, max: 4 }),
    }).map(() => faker.lorem.word()),
    assignment: faker.lorem.word(),
    processData: {
      formData: {},
      documents: Array.from({ length: faker.datatype.number({ min: 1, max: 4 }) }).map(
        () => faker.datatype.uuid(),
      ),
    },
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    ...data,
  };
};
