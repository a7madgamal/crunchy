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
  revenueRange: string[];
}

export const REV_OPTIONS = [
  "$10B+",
  "$1B to $10B",
  "$500M to $1B",
  "$100M to $500M",
  "$50M to $100M",
  "$10M to $50M",
  "$1M to $10M",
  "Less than $1M",
];

export const NUM_EMPLOYEES = [
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

export const CATEGORY_GROUPS_FILTER = [
  "Consumer Electronics",
  "Energy",
  "Hardware",
  "Natural Resources",
  "Science and Engineering",
  "Manufacturing",
  "Software",
  "Administrative Services",
  "Sustainability",
  "Food and Beverage",
  "Real Estate",
  "Health Care",
  "Media and Entertainment",
  "Mobile",
  "Other",
  "Financial Services",
  "Commerce and Shopping",
  "Government and Military",
  "Lending and Investments",
  "Transportation",
  "Professional Services",
  "Information Technology",
  "Travel and Tourism",
  "Sales and Marketing",
  "Internet Services",
  "Messaging and Telecommunications",
  "Privacy and Security",
  "Community and Lifestyle",
  "Social Impact",
  "Payments",
  "Consumer Goods",
  "Data and Analytics",
  "Artificial Intelligence (AI)",
  "Clothing and Apparel",
  "Design",
  "Agriculture and Farming",
  "Education",
  "Music and Audio",
  "Video",
  "Content and Publishing",
  "Gaming",
  "Sports",
  "Advertising",
  "Biotechnology",
  "Navigation and Mapping",
  "Apps",
  "Events",
  "Blockchain and Cryptocurrency",
  "Platforms",
];

export type SortableColumn = "rankOrgCompany" | "numEmployeesEnum";
