import faker from "faker";

import {
  ContactDetail,
  ContactDetailTargetTypes,
  ContactDetails,
  ContactDetailsAddressTypes,
  ContactDetailsPhoneTypes,
  ContactInformation,
  ContactInformationContactTypes,
} from "@mtfh/common/lib/api/contact-details/v2";

faker.seed(1);

export const generateAddressExtendedV2 = () => ({
  uprn: faker.datatype.number(123456789).toString(),
  isOverseasAddress: faker.datatype.boolean(),
  overseasAddress: faker.address.direction(),
  addressLine1: faker.address.streetPrefix(),
  addressLine2: faker.address.streetName(),
  addressLine3: faker.address.county(),
  addressLine4: faker.address.country(),
  postCode: faker.address.zipCode("A0 AA00"),
});

export const generateContactInformationV2 = (data: Partial<ContactInformation> = {}) => ({
  contactType: ContactInformationContactTypes.EMAIL,
  subType: null,
  value: faker.internet.email(),
  description: faker.lorem.sentence(),
  addressExtended: generateAddressExtendedV2(),
  ...data,
});

export const generateMockContactDetailV2 = (data: Partial<ContactDetail> = {}) => ({
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
    addressExtended: generateAddressExtendedV2(),
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

export const generateMockContactDetailEmailV2 = () =>
  generateMockContactDetailV2({
    contactInformation: generateContactInformationV2({
      contactType: ContactInformationContactTypes.EMAIL,
      subType: null,
      value: faker.internet.email(),
    }),
  });
export const generateMockContactDetailCorrespondenceAddressV2 = () =>
  generateMockContactDetailV2({
    contactInformation: generateContactInformationV2({
      contactType: ContactInformationContactTypes.ADDRESS,
      subType: ContactDetailsAddressTypes.CORRESPONDENCE_ADDRESS,
      value: faker.address.direction(),
    }),
  });
export const generateMockContactDetailPhoneV2 = () =>
  generateMockContactDetailV2({
    contactInformation: generateContactInformationV2({
      contactType: ContactInformationContactTypes.PHONE,
      subType: ContactDetailsPhoneTypes.MOBILE,
      value: faker.phone.phoneNumber("075949281"),
    }),
  });

export const generateMockContactDetailsV2 = (
  dataPhoneType: ContactDetail,
  dataCorrespondenceAddress: ContactDetail,
  dataEmailAddressType: ContactDetail,
): ContactDetails => ({
  results: [dataPhoneType, dataCorrespondenceAddress, dataEmailAddressType],
});
