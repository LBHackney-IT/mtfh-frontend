import { addYears, parseISO } from "date-fns";
import faker from "faker";

import { TENURE_TYPES } from "../../../constants";

import { Asset, AssetTenure } from "@mtfh/common/lib/api/asset/v1";

export const generateMockAssetTenureV1 = (
  partialAsset: Partial<AssetTenure> = {},
): AssetTenure => {
  const {
    isActive: isActiveParam,
    startOfTenureDate: startOfTenureDateParam,
    ...partialAssetDataLeft
  } = partialAsset;
  const isActive = isActiveParam !== undefined ? isActiveParam : faker.datatype.boolean();
  const startOfTenureDate = startOfTenureDateParam
    ? parseISO(startOfTenureDateParam)
    : faker.date.between("2010-01-01", "2020-01-01");

  return {
    id: faker.datatype.uuid(),
    paymentReference: faker.random.alphaNumeric(10),
    startOfTenureDate: startOfTenureDate.toISOString(),
    endOfTenureDate: !isActive
      ? addYears(startOfTenureDate, 1).toISOString()
      : addYears(startOfTenureDate, 100).toISOString(),
    type: faker.random.arrayElement(TENURE_TYPES.map(({ value }) => value)),
    isActive,
    ...partialAssetDataLeft,
  };
};

export const generateMockAssetV1 = (partialAsset: Partial<Asset> = {}): Asset => ({
  id: faker.datatype.uuid(),
  assetId: faker.datatype.uuid(),
  assetType: faker.random.arrayElement(["Dwelling", "LettableNonDwelling"]),
  assetLocation: {
    floorNo: faker.datatype.number(100),
    totalBlockFloors: faker.datatype.number(4),
    parentAssets: [
      {
        type: "block",
        id: faker.datatype.uuid(),
        name: faker.company.companyName(),
      },
    ],
  },
  assetAddress: {
    uprn: `${faker.datatype.number(100021065786)}`,
    addressLine1: faker.address.streetAddress(),
    addressLine2: faker.address.county(),
    addressLine3: faker.address.city(),
    addressLine4: faker.address.country(),
    postCode: faker.address.zipCode("PN NEE"),
    postPreamble: "1 Newcome House",
  },
  assetManagement: {
    agent: "HAH",
    areaOfficeName: faker.company.companyName(),
    isCouncilProperty: faker.datatype.boolean(),
    managingOrganisation: "LBH",
    managingOrganisationId: faker.datatype.uuid(),
    owner: faker.address.county(),
    isTMOManaged: faker.datatype.boolean(),
  },
  assetCharacteristics: {
    numberOfBedrooms: faker.datatype.number(8),
    numberOfLifts: faker.datatype.number(4),
    numberOfLivingRooms: faker.datatype.number(2),
    windowType: "DBL",
    yearConstructed: `${faker.datatype.number({ min: 1500, max: 2100 })}`,
  },
  tenure: generateMockAssetTenureV1({ isActive: true }),
  rootAsset: faker.datatype.uuid(),
  parentAssetIds: `${faker.datatype.uuid()}#${faker.datatype.uuid()}#${faker.datatype.uuid()}`,
  ...partialAsset,
});
