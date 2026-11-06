// this is our base url or machine api: VITE_API_BASE_URL from .env / .env.production
// (e.g. VITE_API_BASE_URL=http://localhost); the local backend (Services/run-local.ps1) by default
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost";
// this is our service URLs
const authenticationServiceURL = ":9020/ERM_Auth";
const findCustomerFromMisysServiceURL = ":9025/NBA_CustomerSearch"; // was WOF_Search :9012
const findCustomerAccountDetailsFromMisysServiceURL = ":9025/NBA_CustomerSearch"; // WOF only, NBA has no FindAccountDetails
const WriteOffServiceURL = ":9023/NBA_Persist"; // was WOF_Persist :9013 (only dead WOF code uses it)
const ApprovalsServiceURL = ":9022/NBA_Approval";
const reportsURL = ":9024/NBA_Reports";
const SetupFormsUrl = ":9021/NBA_Admin";
const downloadExcelURL = ":9024/ExcelReport";
const NBAApprovals = ":9022/NBA_Approval";
const NBAPersists = ":9023/NBA_Persist";
const findCustomerSeacrh = ":9025/NBA_CustomerSearch";

// this is our final Apis
const authenticationApi = baseURL + authenticationServiceURL;
const findCustomerFromMisysApi = baseURL + findCustomerFromMisysServiceURL;
const findCustomerAccountDetailsFromMisysApi =
  baseURL + findCustomerAccountDetailsFromMisysServiceURL;
const WriteOffApi = baseURL + WriteOffServiceURL;
const SetupFormApi = baseURL + SetupFormsUrl;
const ApprovalsApi = baseURL + ApprovalsServiceURL;
const reportsApi = baseURL + reportsURL;
const downloadExcelFile = baseURL + downloadExcelURL;
const NBAApprovalApi = baseURL + NBAApprovals;
const NBAPersistApi = baseURL + NBAPersists;
const searchMysisCustomer = baseURL + findCustomerSeacrh;

export {
  authenticationApi,
  findCustomerFromMisysApi,
  findCustomerAccountDetailsFromMisysApi,
  WriteOffApi,
  ApprovalsApi,
  reportsApi,
  SetupFormApi,
  downloadExcelFile,
  NBAApprovalApi,
  NBAPersistApi,
  searchMysisCustomer,
};
