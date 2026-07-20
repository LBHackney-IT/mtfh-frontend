import { faker } from "@faker-js/faker/locale/en";

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
  uprn: faker.number.int({ max: 123456789 }).toString(),
  isOverseasAddress: faker.datatype.boolean(),
  overseasAddress: faker.location.direction(),
  addressLine1: faker.location.street(),
  addressLine2: faker.location.street(),
  addressLine3: faker.location.county(),
  addressLine4: faker.location.country(),
  postCode: faker.location.zipCode("A0 AA00"),
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
  id: faker.string.uuid(),
  targetId: faker.string.uuid(),
  targetType: faker.helpers.arrayElement([
    ContactDetailTargetTypes.PERSON,
    ContactDetailTargetTypes.ORGANISATION,
  ]),
  contactInformation: {
    contactType: faker.helpers.arrayElement([
      ContactInformationContactTypes.PHONE,
      ContactInformationContactTypes.ADDRESS,
      ContactInformationContactTypes.EMAIL,
    ]),
    subType: faker.helpers.arrayElement([
      ContactDetailsPhoneTypes.MAIN_NUMBER,
      ContactDetailsPhoneTypes.EMERGENCY_CONTACT,
      ContactDetailsPhoneTypes.OTHER,
    ]),
    value: faker.helpers.arrayElement([faker.phone.number(), faker.internet.email()]),
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
    id: faker.string.uuid(),
    fullName: faker.person.firstName(),
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
      value: faker.location.direction(),
    }),
  });
export const generateMockContactDetailPhoneV2 = () =>
  generateMockContactDetailV2({
    contactInformation: generateContactInformationV2({
      contactType: ContactInformationContactTypes.PHONE,
      subType: ContactDetailsPhoneTypes.MAIN_NUMBER,
      value: faker.phone.number(),
    }),
  });

export const generateMockContactDetailsV2 = (
  dataPhoneType: ContactDetail,
  dataCorrespondenceAddress: ContactDetail,
  dataEmailAddressType: ContactDetail,
): ContactDetails => ({
  results: [dataPhoneType, dataCorrespondenceAddress, dataEmailAddressType],
});
