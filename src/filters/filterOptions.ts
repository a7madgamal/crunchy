export type CompanyJson = {
  name: string;
  companyCBUrl: string;
  image: string;
  shortDescription: string;
  description: string;
  numEmployeesEnum: string;
  categories: string[];
  locationIdentifiers: string[];
  rankOrgCompany: number;
  linkedin: string;
  website: string;
  revenueRange: string;
  foundedOn: string;
  companyType: string;
  contactEmail: string;
  phoneNumber: string;
  categoryGroups: string[];
  founderIdentifiers: {
    name: string;
    link: string;
  }[];
  investorIdentifiers: {
    name: string;
    link: string;
  }[];
  acquirerIdentifier: {
    name: string;
    link: string;
  }[];
  fundingTotal: string;
};

export interface DataItem {
  name: string;
  companyCBUrl: string;
  image: string;
  shortDescription: string;
  description: string;
  website: string;
  linkedin: string;
  contactEmail: string;
  phoneNumber: string;
  categoryGroups: string[];
  founderIdentifiers: string[];
  investorIdentifiers: string[];
  acquirerIdentifier: string[];
  fundingTotal: string;

  numEmployeesEnum: string;
  categories: string[];
  locationIdentifiers: string[];
  rankOrgCompany: number;
  revenueRange: string;
  isChecked: boolean;
  isFav: boolean;
}

export const REV_OPTIONS = [
  "—",
  "Less than $1M",
  "$1M to $10M",
  "$10M to $50M",
  "$50M to $100M",
  "$100M to $500M",
  "$500M to $1B",
  "$1B to $10B",
  "$10B+",
];

export const IS_CHECKED_OPTIONS = ["true", "false"];

export const NUM_EMPLOYEES = [
  "—",
  "1-10",
  "11-50",
  "51-100",
  "101-250",
  "201-500",
  "251-500",
  "501-1000",
  "1001-5000",
  "5001-10000",
  "10001+",
];

export type SortableColumn =
  | "rankOrgCompany"
  | "numEmployeesEnum"
  | "revenueRange";
