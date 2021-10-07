import faker from "faker";

import {
  ContactDetail,
  ContactDetailTargetTypes,
  ContactDetails,
  ContactDetailsAddressTypes,
  ContactDetailsPhoneTypes,
  ContactInformation,
  ContactInformationContactTypes,
} from "@mtfh/common/lib/api/contact-details/v1";

faker.seed(1);

export const generateContactInformationV1 = (data: Partial<ContactInformation> = {}) => ({
  contactType: ContactInformationContactTypes.EMAIL,
  subType: null,
  value: faker.internet.email(),
  description: faker.lorem.sentence(),
  addressExtended: {
    uprn: faker.datatype.number(123456789).toString(),
    isOverseasAddress: faker.datatype.boolean(),
    overseasAddress: faker.address.direction(),
  },
  ...data,
});

export const generateMockContactDetailV1 = (data: Partial<ContactDetail> = {}) => ({
  id: faker.datatype.uuid(),
  targetId: faker.datatype.uuid(),
  targetType: faker.random.arrayElement([
    ContactDetailTargetTypes.PERSON,
    ContactDetailTargetTypes.ORGANISATION,
  ]),
  contactInformation: {
    contactType: faker.random.arrayElement([
      ContactInformationContactTypes.PHONE,
      ContactInformationContactTypes.ADDRESS,
      ContactInformationContactTypes.EMAIL,
    ]),
    subType: faker.random.arrayElement([
      ContactDetailsPhoneTypes.HOME,
      ContactDetailsPhoneTypes.MOBILE,
      ContactDetailsPhoneTypes.WORK,
      ContactDetailsPhoneTypes.OTHER,
    ]),
    value: faker.random.arrayElement([faker.phone.phoneNumber(), faker.internet.email()]),
    description: faker.lorem.sentence(),
    addressExtended: {
      uprn: faker.datatype.number(123456789).toString(),
      isOverseasAddress: faker.datatype.boolean(),
      overseasAddress: faker.address.direction(),
    },
  },
  sourceServiceArea: {
    area: "Housing",
    isDefault: faker.datatype.boolean(),
  },
  recordValidUntil: faker.date.future().toISOString(),
  isActive: faker.datatype.boolean(),
  createdBy: {
    createdBy: faker.date.recent().toISOString(),
    id: faker.datatype.uuid(),
    fullName: faker.name.firstName(),
    email: faker.internet.email(),
  },
  ...data,
});

export const generateMockContactDetailEmailV1 = () =>
  generateMockContactDetailV1({
    contactInformation: generateContactInformationV1({
      contactType: ContactInformationContactTypes.EMAIL,
      subType: null,
      value: faker.internet.email(),
    }),
  });
export const generateMockContactDetailCorrespondenceAddressV1 = () =>
  generateMockContactDetailV1({
    contactInformation: generateContactInformationV1({
      contactType: ContactInformationContactTypes.ADDRESS,
      subType: ContactDetailsAddressTypes.CORRESPONDENCE_ADDRESS,
      value: faker.address.direction(),
    }),
  });
export const generateMockContactDetailPhoneV1 = () =>
  generateMockContactDetailV1({
    contactInformation: generateContactInformationV1({
      contactType: ContactInformationContactTypes.PHONE,
      subType: ContactDetailsPhoneTypes.MOBILE,
      value: faker.phone.phoneNumber("075949281"),
    }),
  });

export const generateMockContactDetailsV1 = (
  dataPhoneType: ContactDetail,
  dataCorrespondenceAddress: ContactDetail,
  dataEmailAddressType: ContactDetail,
): ContactDetails => ({
  results: [dataPhoneType, dataCorrespondenceAddress, dataEmailAddressType],
});
