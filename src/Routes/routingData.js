// all routing related data like rendering components and their paths sits here in this file
import {
  //DataEntryBT
  AddEditNBAAssetsDEBT,
  ViewNBAAssetsDEBT,
  EditNBAAssetsDEBT,
  CasesInProcessNBADEBT,
  CasesPendingForApprovalNBADEBT,
  ApprovedCasesNBADEBT,
  RevertedCasesNBADEBT,
  SearchNBADPSCasesDEBT,
  //DataEntryREM
  AddEditNBAAssetsDEREM,
  CasesInProcessNBAREM,
  CasesPendingForApprovalNBAREM,
  ApprovedCasesNBAREM,
  RevertedCasesNBAREM,
  SearchNBADPSCasesREM,
  //DataEntryRASC
  CasesInProcessNBARASC,
  CasesPendingForApprovalNBARASC,
  ApprovedCasesNBARASC,
  RevertedCasesNBARASC,
  SearchNBADPSCasesRASC,
  ViewNBAAssetsDEREM,
  EditNBAAssetsDERAM,
  VIEWNBAAssetsDERAM,
  //ManagerBT
  CasesPendingForApprovalNBAMBT,
  ApprovedCasesNBAMBT,
  RevertedCasesNBAMBT,
  SearchNBADPSCasesMBT,
  //ManagerREM
  CasesPendingForApprovalNBAMREM,
  ApprovedCasesNBAMREM,
  RevertedCasesNBAMREM,
  SearchNBADPSCasesMREM,
  //ManagerRASC
  CasesPendingForApprovalNBAMRASC,
  ApprovedCasesNBAMRASC,
  SearchNBADPSCasesMRASC,
  //Report
  NBAAssetsReports,
  NotFound,
  //System Admin Setups
  PropertyType,
  ApprovalReasons,
  RejectionReasons,
  NewRequestList,
  RequestListTemplate,
} from "../Container";
import {
  DataEntryBusinessTeamLinks,
  ManagerBusinessTeamLinks,
  SystemAdminLinks,
  DataEntryRemLinks,
  ManagerRemLinks,
  DataEntryRaScLinks,
  ManagerRaScLinks,
} from "./Links";
//DEBT
const DataEntryBusinessTeamData = [
  { component: AddEditNBAAssetsDEBT, path: "DataEntryBusinessTeam/AddEdit" },
  { component: ViewNBAAssetsDEBT, path: "DataEntryBusinessTeam/ViewNBACase" },
  { component: EditNBAAssetsDEBT, path: "DataEntryBusinessTeam/EditNBACase" },
  { component: CasesInProcessNBADEBT, path: "DataEntryBusinessTeam/CasesInProcess" },
  { component: CasesPendingForApprovalNBADEBT, path: "DataEntryBusinessTeam/CasesPendingForApproval" },
  { component: ApprovedCasesNBADEBT, path: "DataEntryBusinessTeam/ApprovedCases" },
  { component: RevertedCasesNBADEBT, path: "DataEntryBusinessTeam/RevertedCases" },
  { component: SearchNBADPSCasesDEBT, path: "DataEntryBusinessTeam/SearchCases" },
  { component: NBAAssetsReports, path: "DataEntryBusinessTeam/NonBankingAssets" },
  { component: NotFound, path: "DataEntryBusinessTeam/404" },
]
//DEREM
const DataEntryREMData = [
  { component: CasesInProcessNBAREM, path: "DataEntryREM/CasesInProcess" },
  { component: AddEditNBAAssetsDEREM, path: "DataEntryRem/EditNonBankingAssets" },
  { component: ViewNBAAssetsDEREM, path: "DataEntryRem/ViewNonBankingAssets" },
  { component: CasesPendingForApprovalNBAREM, path: "DataEntryREM/CasesPendingForApproval" },
  // { component: ApprovedCasesNBAREM, path: "DataEntryREM/ApprovedCases" },
  { component: RevertedCasesNBAREM, path: "DataEntryREM/RevertedCases" },
  { component: SearchNBADPSCasesREM, path: "DataEntryREM/SearchCases" },
  { component: NBAAssetsReports, path: "DataEntryREM/NonBankingAssets" },
]
//DERASC
const DataEntryRASCData = [
  { component: CasesInProcessNBARASC, path: "DataEntryRASC/CasesInProcess" },
  { component: EditNBAAssetsDERAM, path: "DataEntryRASC/EditNonBankingAssets" },
  { component: VIEWNBAAssetsDERAM, path: "DataEntryRASC/ViewNonBankingAssets" },
  { component: CasesPendingForApprovalNBARASC, path: "DataEntryRASC/CasesPendingForApproval" },
  { component: ApprovedCasesNBARASC, path: "DataEntryRASC/ApprovedCases" },
  // { component: RevertedCasesNBARASC, path: "DataEntryRASC/RevertedCases" },
  { component: SearchNBADPSCasesRASC, path: "DataEntryRASC/SearchCases" },
  { component: NBAAssetsReports, path: "DataEntryRASC/NonBankingAssets" },
]
//MBT
const ManagerBusinessTeamData = [
  { component: CasesPendingForApprovalNBAMBT, path: "ManagerBusinessTeam/PendingCases" },
  { component: ViewNBAAssetsDEBT, path: "ManagerBusinessTeam/ViewNBACase" },
  { component: EditNBAAssetsDEBT, path: "ManagerBusinessTeam/EditNBACase"},
  { component: ApprovedCasesNBAMBT, path: "ManagerBusinessTeam/ApprovedCases" },
  { component: RevertedCasesNBAMBT, path: "ManagerBusinessTeam/RevertedCases" },
  { component: SearchNBADPSCasesMBT, path: "ManagerBusinessTeam/SearchCases" },
  { component: NBAAssetsReports, path: "ManagerBusinessTeam/NonBankingAssets" },
]
//MREM
const ManagerREMData = [
  { component: CasesPendingForApprovalNBAMREM, path: "ManagerREM/PendingCases" },
  { component: ViewNBAAssetsDEREM, path: "ManagerREM/ViewNonBankingAssets" },
  { component: AddEditNBAAssetsDEREM, path: "ManagerREM/EditNonBankingAssets" },
  { component: ApprovedCasesNBAMREM, path: "ManagerREM/ApprovedCases" },
  // { component: RevertedCasesNBAMREM, path: "ManagerREM/RevertedCases" },
  { component: SearchNBADPSCasesMREM, path: "ManagerREM/SearchCases" },
  { component: NBAAssetsReports, path: "ManagerREM/NonBankingAssets" },
]
//MREM RASC
const ManagerRASCData = [
  { component: CasesPendingForApprovalNBAMRASC, path: "ManagerRASC/PendingCases" },
  { component: VIEWNBAAssetsDERAM, path: "ManagerRASC/ViewNonBankingAssets" },
  { component: ApprovedCasesNBAMRASC, path: "ManagerRASC/ApprovedCases" },
  { component: SearchNBADPSCasesMRASC, path: "ManagerRASC/SearchCases" },
  { component: NBAAssetsReports, path: "ManagerRASC/NonBankingAssets" },
]
const SystemAdminRouteData = [
  { component: NewRequestList, path: "Admin/NewRequestList" },
  { component: RequestListTemplate, path: "Admin/RequestListTemplate" },
  { component: PropertyType, path: "Admin/PropertyType" },
  { component: ApprovalReasons, path: "Admin/ApprovalReasons" },
  { component: RejectionReasons, path: "Admin/RejectionReasons" },
  { component: NBAAssetsReports, path: "Admin/NonBankingAssets" },
]

const UserSelection = (token, role) => {
  let Title = ''
  let UserRoleId = ''
  let SidebarData = ''
  let MainMenu = ''
  let Notification = ''
  if (token && role === 2) {
    Title = "Non-Banking Assets & Debt Property Swap"
    UserRoleId = role
    SidebarData = SystemAdminLinks
    MainMenu = SystemAdminRouteData
    Notification = true;
  }
  if (token && role === 4) {
    Title = "Non-Banking Assets & Debt Property Swap"
    UserRoleId = role
    SidebarData = DataEntryBusinessTeamLinks
    MainMenu = DataEntryBusinessTeamData
    Notification = null;
  }
  if (token && role === 5) {
    Title = "Non-Banking Assets & Debt Property Swap"
    UserRoleId = role
    SidebarData = ManagerBusinessTeamLinks
    MainMenu = ManagerBusinessTeamData
    Notification = null;
  }
  if (token && role === 6) {
    Title = "Non-Banking Assets & Debt Property Swap"
    UserRoleId = role
    SidebarData = DataEntryRemLinks
    MainMenu = DataEntryREMData
    Notification = null;
  }
  if (token && role === 7) {
    Title = "Non-Banking Assets & Debt Property Swap"
    UserRoleId = role
    SidebarData = ManagerRemLinks
    MainMenu = ManagerREMData
    Notification = null;
  }
  if (token && role === 8) {
    Title = "Non-Banking Assets & Debt Property Swap"
    UserRoleId = role
    SidebarData = DataEntryRaScLinks
    MainMenu = DataEntryRASCData
    Notification = null;
  }
  if (token && role === 9) {
    Title = "Non-Banking Assets & Debt Property Swap"
    UserRoleId = role
    SidebarData = ManagerRaScLinks
    MainMenu = ManagerRASCData
    Notification = null;
  }
  return {
    Title,
    UserRoleId,
    SidebarData,
    MainMenu,
    Notification
  }
}
export {
  UserSelection
}