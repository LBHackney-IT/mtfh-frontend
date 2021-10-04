import { rest } from "msw";

import { Asset } from "@mtfh/common/lib/api/asset/v1";
import { generateMockAssetTenureV1, generateMockAssetV1 } from "./data";

export const mockAssetV1 = generateMockAssetV1();
const mockInactiveTenureV1 = generateMockAssetTenureV1({ isActive: false });
export const mockAssetWithInactiveTenureV1: Asset = {
  ...mockAssetV1,
  tenure: mockInactiveTenureV1,
};
export const mockAssetLettableNonDwellingV1: Asset = {
  ...mockAssetV1,
  assetType: "LettableNonDwelling",
};
export const mockAssetInvalidAssetTypeV1: Asset = {
  ...mockAssetV1,
  assetType: "invalidAssetType",
};

export const getAssetV1 = (data: any = mockAssetV1, code = 200) => {
  return rest.get("/api/v1/assets/:id", (req, res, ctx) =>
    res(ctx.status(code), ctx.json(data)),
  );
};
