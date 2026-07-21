/**
 * Build-time stand-in for @mtfh/common.
 *
 * That package ships TypeScript source with no types entry, so resolving it
 * into this program widens rootDir and breaks declaration emit. Paths map
 * imports here for compile only; emitted .d.ts/.js keep @mtfh/common specifiers
 * and Rollup still treats the real package as external.
 */
export declare const config: any;
export declare const ConfirmationRouter: any;
export declare const PersonTitle: any;
export declare const PersonType: any;
export declare const ContactDetailTargetTypes: any;
export declare const ContactInformationContactTypes: any;
export declare const ContactDetailsAddressTypes: any;
export declare const ContactDetailsPhoneTypes: any;

export type PersonTitle = any;
export type PersonType = any;
export type ContactDetailTargetTypes = any;
export type ContactInformationContactTypes = any;
export type ContactDetailsAddressTypes = any;
export type ContactDetailsPhoneTypes = any;
export type Address = any;
export type Asset = any;
export type AssetTenure = any;
export type Comment = any;
export type ContactDetail = any;
export type ContactDetails = any;
export type ContactInformation = any;
export type EqualityData = any;
export type HouseholdMember = any;
export type Person = any;
export type Process = any;
export type ProcessState = any;
export type ReferenceData = any;
export type Tenure = any;
export type TenureSummary = any;
export type WorkOrder = any;
