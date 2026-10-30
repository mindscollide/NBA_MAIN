const _token = localStorage.getItem("token");
// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VyTmFtZSI6ImZhaXNhbC5zaGFoIiwiVXNlclR5cGUiOiJVIiwiQWNjZXNzRHR0bSI6NjM3NjM2OTc2MDUzMjAyOTYzLCJEZXZpY2UiOiJQT1NUTUFOIiwiQXBwbGljYXRpb25JRCI6IkVSTSJ9.F-CixTix2MERIqVsO1CLoVVJrET_bMaScZReJAwdnRM";
const authenticationRequestConfigs = {
  _token: null,
  RequestMethod: "ServiceManager.Login",
};
const requestList = {
  _token: null,
  RequestMethod: "ServiceManager.GetNewUserRequests",
};
const requestListCount = {
  _token: null,
  RequestMethod: "ServiceManager.GetNewUserRequestsCount",
};
const saveuserrequest = {
  _token: null,
  RequestMethod: "ServiceManager.SaveUserRequest",
};
const validateemail = {
  _token: null,
  RequestMethod: "ServiceManager.ValidateEmailFromAD",
};
const validateemailandpassword = {
  _token: null,
  RequestMethod: "ServiceManager.ValidateEmailAndPasswordFromAD",
};
const signuprequest = {
  _token: null,
  RequestMethod: "ServiceManager.SignUp",
};
const authenticationRefreshToken = {
  _token: null,
  RequestMethod: "ServiceManager.RefreshToken",
};
const findCustomerFromMisysConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.FindCustomer",
};
const findCustomerAccountDetailsFromMisysConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.FindAccountDetails",
};
const addWriteOffConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.AddWriteOff",
};
const editWriteOffConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.EditWriteOff",
};
const editApprovedWriteOffConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.EditApprovedWriteOffForSystemAdmin",
};
const deleteWriteOffConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteWriteOff",
};
const approvalsCountConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.FindApprovalCount",
};
const approvalsConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.FindApproval",
};
const viewApprovalHistoryConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.ViewApprovalHistory",
};
const saveApprovalsConfig = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveApproval",
};
const viewWriteOff = {
  _token: _token,
  RequestMethod: "ServiceManager.ViewWriteOff",
};
const listOffWriteOff = {
  _token: _token,
  ListWriteOff: "ServiceManager.ListWriteOff",
  FindMyCases: "ServiceManager.FindMyCases",
  ViewAllApprovedCases: "ServiceManager.ViewAllApprovedCases",
};
const viewAllRevertedCasesForSystemAdmin = {
  RequestMethod: "ServiceManager.ViewAllRevertedCasesForSystemAdmin",
};
const completeReportConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.ShowCompleteReport",
};
const CompleteReportByWOFCode = {
  _token: _token,
  RequestMethod: "ServiceManager.ShowCompleteReportByWOFCode",
};
const creditPolicyReportConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.ShowCreditPolicyReport",
};
const balanceSheetReportConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.ShowBalanceSheetReport",
};
const completeReportExcelConfigs = {
  _token: _token,
  RequestMethod: "CompleteReportExcel",
};
const ApprovedCasesSystemAdminReportExcelConfigs = {
  _token: _token,
  RequestMethod: "ApprovedCasesSystemAdmin",
};
const CompleteReportExcelByWOFCode = {
  _token: _token,
  RequestMethod: "CompleteReportExcelByWOFCode",
};
const creditReportExcelConfigs = {
  _token: _token,
  RequestMethod: "CreditReportExcel",
};
const balanceReportExcelConfigs = {
  _token: _token,
  RequestMethod: "BalanceSheetReportExcel",
};

const getAllPropertyType = {
  _token: _token,
  RequestMethod: "ServiceManager.AllPropertyType",
};

const savePropertyType = {
  _token: _token,
  RequestMethod: "ServiceManager.SavePropertyType",
};

const deletePropertyType = {
  _token: _token,
  RequestMethod: "ServiceManager.DeletePropertyType",
};

const updatePropertyType = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdatePropertyType",
};

const getAllApprovalRejectionReasons = {
  _token: _token,
  RequestMethod: "ServiceManager.AllApprovalRejectionReason",
};

const saveApprovalRejectionReasons = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveApprovalRejectionReason",
};

const deleteApprovalRejectionReasons = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteApprovalRejectionReason",
};

const updateApprovalRejectionReasons = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateApprovalRejectionReason",
};

const getAllInProcess = {
  _token: _token,
  RequestMethod: "ServiceManager.ListAllInProcess",
};

const getAllPendingForApproval = {
  _token: _token,
  RequestMethod: "ServiceManager.ListAllPendingApprovalCases",
};

const getAllApprovedCases = {
  _token: _token,
  RequestMethod: "ServiceManager.ListAllApprovedCases",
};

const getAllRejectedCases = {
  _token: _token,
  RequestMethod: "ServiceManager.ListAllRejectedCases",
};

//for mysis seacrh customer
const searchCustomerMysis = {
  token: _token,
  RequestMethod: "ServiceManager.FindCustomer",
};

//Approval History
const getApprovalHistory = {
  token: _token,
  RequestMethod: "ServiceManager.ViewApprovalHistory",
};

//Approval History
const searchNBACase = {
  token: _token,
  RequestMethod: "ServiceManager.SearchNBACase",
};

//Delete Business Team Data
const deleteBusinessTeamData = {
  token: _token,
  RequestMethod: "ServiceManager.DeleteBusinessTeamData",
};

//ApproveNBACase
const approveNBACase = {
  token: _token,
  RequestMethod: "ServiceManager.ApproveNBACase",
};

//RejectNBACase
const rejectNBACase = {
  token: _token,
  RequestMethod: "ServiceManager.RejectNBACase",
};

// Save Business Team Data
const saveBusinessTeamData = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveBusinessTeamData",
};

// view Business Team Data
const viewBusinessTeamData = {
  _token: _token,
  RequestMethod: "ServiceManager.ViewBusinessTeamData",
};

//Report API
const nbaCasesReport = {
  _token: _token,
  RequestMethod: "ServiceManager.DownloadNBADSCaseReport",
};

// Edit Business Team Data
const editBusinessTeamData = {
  _token: _token,
  RequestMethod: "ServiceManager.EditBusinessTeamData",
};

// view REM Team Data
const viewREMTeamData = {
  _token: _token,
  RequestMethod: "ServiceManager.ViewRASCTeamData",
};

// Save REM Team Data
const saveREMTeamData = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveREMTeamData",
};

// Save RASA Team Data
const saveRASATeamData = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveRASCTeamData",
};

//Revert CAse
const revertNBACase = {
  token: _token,
  RequestMethod: "ServiceManager.RevertNBACase",
};
const RoleList = {
  RequestMethod: "ServiceManager.RoleList",
};
export {
  viewAllRevertedCasesForSystemAdmin,
  authenticationRequestConfigs,
  authenticationRefreshToken,
  requestList,
  requestListCount,
  validateemail,
  validateemailandpassword,
  signuprequest,
  saveuserrequest,
  findCustomerFromMisysConfigs,
  findCustomerAccountDetailsFromMisysConfigs,
  addWriteOffConfigs,
  approvalsCountConfigs,
  approvalsConfigs,
  saveApprovalsConfig,
  viewWriteOff,
  listOffWriteOff,
  viewApprovalHistoryConfigs,
  completeReportConfigs,
  creditPolicyReportConfigs,
  editWriteOffConfigs,
  editApprovedWriteOffConfigs,
  balanceSheetReportConfigs,
  deleteWriteOffConfigs,
  completeReportExcelConfigs,
  creditReportExcelConfigs,
  balanceReportExcelConfigs,
  CompleteReportByWOFCode,
  CompleteReportExcelByWOFCode,
  ApprovedCasesSystemAdminReportExcelConfigs,
  //SetupFormsApi
  getAllPropertyType,
  savePropertyType,
  deletePropertyType,
  updatePropertyType,
  getAllApprovalRejectionReasons,
  saveApprovalRejectionReasons,
  deleteApprovalRejectionReasons,
  updateApprovalRejectionReasons,
  //NONBANKINGASSETS
  getAllInProcess,
  getAllPendingForApproval,
  getAllApprovedCases,
  getAllRejectedCases,
  searchCustomerMysis,
  //View Status History
  getApprovalHistory,
  searchNBACase,
  deleteBusinessTeamData,
  approveNBACase,
  rejectNBACase,
  saveBusinessTeamData,
  viewBusinessTeamData,
  nbaCasesReport,
  editBusinessTeamData,
  viewREMTeamData,
  saveREMTeamData,
  saveRASATeamData,
  revertNBACase,
  RoleList,
};
