import { rest } from "msw";

import { Asset } from "@mtfh/common/lib/api/asset/v1";
import { generateMockAssetTenureV1, generateMockAssetV1 } from "./data";

export const mockAsset = generateMockAssetV1();
const mockInactiveTenureV1 = generateMockAssetTenureV1({ isActive: false });
export const mockAssetWithInactiveTenure: Asset = {
  ...mockAsset,
  tenure: mockInactiveTenureV1,
};
export const mockAssetLettableNonDwelling: Asset = {
  ...mockAsset,
  assetType: "LettableNonDwelling",
};
export const mockAssetInvalidAssetType: Asset = {
  ...mockAsset,
  assetType: "invalidAssetType",
};

export const getAssetV1 = (data: any = mockAsset, code = 200) => {
  return rest.get("/api/v1/assets/:id", (req, res, ctx) =>
    res(ctx.status(code), ctx.json(data)),
  );
};
