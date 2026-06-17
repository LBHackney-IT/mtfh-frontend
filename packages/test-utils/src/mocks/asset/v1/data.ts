import { faker } from "@faker-js/faker/locale/en";
import { addYears, parseISO } from "date-fns";

import { Asset, AssetTenure } from "@mtfh/common/lib/api/asset/v1";

import { TENURE_TYPES } from "../../../constants";

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
    : faker.date.between({ from: "2010-01-01", to: "2020-01-01" });

  return {
    id: faker.string.uuid(),
    paymentReference: faker.string.alphanumeric(10),
    startOfTenureDate: startOfTenureDate.toISOString(),
    endOfTenureDate: !isActive
      ? addYears(startOfTenureDate, 1).toISOString()
      : addYears(startOfTenureDate, 100).toISOString(),
    type: faker.helpers.arrayElement(TENURE_TYPES.map(({ value }) => value)),
    isActive,
    ...partialAssetDataLeft,
  };
};

export const generateMockAssetV1 = (partialAsset: Partial<Asset> = {}): Asset => ({
  id: faker.string.uuid(),
  assetId: faker.string.uuid(),
  assetType: faker.helpers.arrayElement(["Dwelling", "LettableNonDwelling"]),
  assetLocation: {
    floorNo: faker.number.int({ max: 100 }),
    totalBlockFloors: faker.number.int({ max: 4 }),
    parentAssets: [
      {
        type: "block",
        id: faker.string.uuid(),
        name: faker.company.name(),
      },
    ],
  },
  assetAddress: {
    uprn: `${faker.number.int({ max: 100021065786 })}`,
    addressLine1: faker.location.streetAddress(),
    addressLine2: faker.location.county(),
    addressLine3: faker.location.city(),
    addressLine4: faker.location.country(),
    postCode: faker.location.zipCode("PN NEE"),
    postPreamble: "1 Newcome House",
  },
  assetManagement: {
    agent: "HAH",
    areaOfficeName: faker.company.name(),
    isCouncilProperty: faker.datatype.boolean(),
    managingOrganisation: "LBH",
    managingOrganisationId: faker.string.uuid(),
    owner: faker.location.county(),
    isTMOManaged: faker.datatype.boolean(),
  },
  assetCharacteristics: {
    numberOfBedrooms: faker.number.int({ max: 8 }),
    numberOfLifts: faker.number.int({ max: 4 }),
    numberOfLivingRooms: faker.number.int({ max: 2 }),
    windowType: "DBL",
    yearConstructed: `${faker.number.int({ min: 1500, max: 2100 })}`,
  },
  tenure: generateMockAssetTenureV1({ isActive: true }),
  rootAsset: faker.string.uuid(),
  parentAssetIds: `${faker.string.uuid()}#${faker.string.uuid()}#${faker.string.uuid()}`,
  ...partialAsset,
});
