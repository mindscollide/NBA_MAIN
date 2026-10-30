//NBA Data Entry Business
const DataEntryBusinessTeamLinks = [
  {
    menuName: "Non-Banking Assets",
    icon: "icon-database icon-size-one",
    subMenu: [
      {
        key: 2,
        name: "Add/Edit Non-Banking Assets",
        link: "/DataEntryBusinessTeam/AddEdit",
      },
      { key: 1, name: "Cases In Process", link: "/DataEntryBusinessTeam/CasesInProcess" },
      {
        key: 3,
        name: "Cases Pending For Approval",
        link: "/DataEntryBusinessTeam/CasesPendingForApproval",
      },
      {
        key: 4,
        name: "Approved Cases",
        link: "/DataEntryBusinessTeam/ApprovedCases",
      },
      {
        key: 5,
        name: "Reverted Cases",
        link: "/DataEntryBusinessTeam/RevertedCases",
      },
      {
        key: 6,
        name: "Search NBA & DPS Cases",
        link: "/DataEntryBusinessTeam/SearchCases",
      },
    ],
  },
  {
    menuName: "Reports",
    icon: "icon-files icon-size-one",
    subMenu: [
      { key: 7, name: "Non-Banking Assets", link: "/DataEntryBusinessTeam/NonBankingAssets" },
    ],
  },
];

//NBA Manager Business Team
const ManagerBusinessTeamLinks = [
  {
    menuName: "Non-Banking Assets",
    icon: "icon-database icon-size-one",
    subMenu: [
      {
        key: 2,
        name: "Pending Cases",
        link: "/ManagerBusinessTeam/PendingCases",
      },
      {
        key: 1,
        name: "Approved Cases",
        link: "/ManagerBusinessTeam/ApprovedCases",
      },
      {
        key: 3,
        name: "Reverted Cases",
        link: "/ManagerBusinessTeam/RevertedCases",
      },
      {
        key: 4,
        name: "Search NBA & DPS Cases",
        link: "/ManagerBusinessTeam/SearchCases",
      },
    ],
  },
  {
    menuName: "Reports",
    icon: "icon-files icon-size-one",
    subMenu: [
      { key: 5, name: "Non-Banking Assets", link: "/ManagerBusinessTeam/NonBankingAssets" },
    ],
  },
];

//NBA DataEntryREM
const DataEntryRemLinks = [
  {
    menuName: "Non-Banking Assets",
    icon: "icon-database icon-size-one",
    subMenu: [
      // {
      //   key: 2,
      //   name: "Add Edit Non Banking Assets",
      //   link: "/DataEntryRem/EditNonBankingAssets",
      // },
      { key: 1, name: "Cases In Process", link: "/DataEntryRem/CasesInProcess" },
      {
        key: 2,
        name: "Cases Pending For Approval",
        link: "/DataEntryRem/CasesPendingForApproval",
      },
      // {
      //   key: 3,
      //   name: "Approved Cases",
      //   link: "/DataEntryRem/ApprovedCases",
      // },
      // {
      //   key: 3,
      //   name: "Reverted Cases",
      //   link: "/DataEntryRem/RevertedCases",
      // },
      {
        key: 3,
        name: "Search NBA & DPS Cases",
        link: "/DataEntryRem/SearchCases",
      },
    ],
  },
  {
    menuName: "Reports",
    icon: "icon-files icon-size-one",
    subMenu: [
      { key: 7, name: "Non-Banking Assets", link: "/DataEntryRem/NonBankingAssets" },
    ],
  },
];

//NBA Manager REM
const ManagerRemLinks = [
  {
    menuName: "Non-Banking Assets",
    icon: "icon-database icon-size-one",
    subMenu: [
      {
        key: 2,
        name: "Pending Cases",
        link: "/ManagerRem/PendingCases",
      },
      {
        key: 1,
        name: "Approved Cases",
        link: "/ManagerRem/ApprovedCases",
      },
      // {
      //   key: 3,
      //   name: "Reverted Cases",
      //   link: "/ManagerRem/RevertedCases",
      // },
      {
        key: 3,
        name: "Search NBA & DPS Cases",
        link: "/ManagerRem/SearchCases",
      },
    ],
  },
  {
    menuName: "Reports",
    icon: "icon-files icon-size-one",
    subMenu: [
      { key: 7, name: "Non-Banking Assets", link: "/ManagerRem/NonBankingAssets" },
    ],
  },
];

//NBA DataEntryRASC
const DataEntryRaScLinks = [
  {
    menuName: "Non-Banking Assets",
    icon: "icon-database icon-size-one",
    subMenu: [
      { key: 2, name: "Cases In Process", link: "/DataEntryRaSc/CasesInProcess" },
      {
        key: 1,
        name: "Cases Pending For Approval",
        link: "/DataEntryRaSc/CasesPendingForApproval",
      },
      {
        key: 3,
        name: "Approved Cases",
        link: "/DataEntryRaSc/ApprovedCases",
      },
      // {
      //   key: 4,
      //   name: "Reverted Cases",
      //   link: "/DataEntryRaSc/RevertedCases",
      // },
      {
        key: 4,
        name: "Search NBA & DPS Cases",
        link: "/DataEntryRaSc/SearchCases",
      },
    ],
  },
  {
    menuName: "Reports",
    icon: "icon-files icon-size-one",
    subMenu: [
      { key: 6, name: "Non-Banking Assets", link: "/DataEntryRaSc/NonBankingAssets" },
    ],
  },
];

//NBA Manager REM
const ManagerRaScLinks = [
  {
    menuName: "Non-Banking Assets",
    icon: "icon-database icon-size-one",
    subMenu: [
      {
        key: 2,
        name: "Pending Cases",
        link: "/ManagerRaSc/PendingCases",
      },
      {
        key: 1,
        name: "Approved Cases",
        link: "/ManagerRaSc/ApprovedCases",
      },
      {
        key: 3,
        name: "Search NBA & DPS Cases",
        link: "/ManagerRaSc/SearchCases",
      },
    ],
  },
  {
    menuName: "Reports",
    icon: "icon-files icon-size-one",
    subMenu: [
      { key: 7, name: "Non-Banking Assets", link: "/ManagerRaSc/NonBankingAssets" },
    ],
  },
];

//System Admin Links
const SystemAdminLinks = [
  {
    menuName: "Setup",
    icon: "icon-setting icon-size-one",
    subMenu: [
      { key: 2, name: "Property Type", link: "/Admin/PropertyType" },
      {
        key: 1,
        name: "Approval Reasons",
        link: "/Admin/ApprovalReasons",
      },
      { key: 3, name: "Rejection Reasons", link: "/Admin/RejectionReasons" },
    ],
  },
  {
    menuName: "Reports",
    icon: "icon-files icon-size-one",
    subMenu: [
      { key: 4, name: "Non-Banking Assets", link: "/Admin/NonBankingAssets" },
    ],
  },
];

export {
  DataEntryBusinessTeamLinks,
  ManagerBusinessTeamLinks,
  SystemAdminLinks,
  DataEntryRemLinks,
  ManagerRemLinks,
  DataEntryRaScLinks,
  ManagerRaScLinks,
};
