// RequestMethod names per backend operation. Each action reads the token
// from localStorage itself when it sends the request.
const authenticationRequestConfigs = {
  RequestMethod: "ServiceManager.Login",
};
const requestList = {
  RequestMethod: "ServiceManager.GetNewUserRequests",
};
const requestListCount = {
  RequestMethod: "ServiceManager.GetNewUserRequestsCount",
};
const saveuserrequest = {
  RequestMethod: "ServiceManager.SaveUserRequest",
};
const validateemail = {
  RequestMethod: "ServiceManager.ValidateEmailFromAD",
};
const validateemailandpassword = {
  RequestMethod: "ServiceManager.ValidateEmailAndPasswordFromAD",
};
const signuprequest = {
  RequestMethod: "ServiceManager.SignUp",
};
const authenticationRefreshToken = {
  RequestMethod: "ServiceManager.RefreshToken",
};
const findCustomerFromMisysConfigs = {
  RequestMethod: "ServiceManager.FindCustomer",
};
const findCustomerAccountDetailsFromMisysConfigs = {
  RequestMethod: "ServiceManager.FindAccountDetails",
};
const addWriteOffConfigs = {
  RequestMethod: "ServiceManager.AddWriteOff",
};
const editWriteOffConfigs = {
  RequestMethod: "ServiceManager.EditWriteOff",
};
const editApprovedWriteOffConfigs = {
  RequestMethod: "ServiceManager.EditApprovedWriteOffForSystemAdmin",
};
const deleteWriteOffConfigs = {
  RequestMethod: "ServiceManager.DeleteWriteOff",
};
const approvalsCountConfigs = {
  RequestMethod: "ServiceManager.FindApprovalCount",
};
const approvalsConfigs = {
  RequestMethod: "ServiceManager.FindApproval",
};
const viewApprovalHistoryConfigs = {
  RequestMethod: "ServiceManager.ViewApprovalHistory",
};
const saveApprovalsConfig = {
  RequestMethod: "ServiceManager.SaveApproval",
};
const viewWriteOff = {
  RequestMethod: "ServiceManager.ViewWriteOff",
};
const listOffWriteOff = {
  ListWriteOff: "ServiceManager.ListWriteOff",
  FindMyCases: "ServiceManager.FindMyCases",
  ViewAllApprovedCases: "ServiceManager.ViewAllApprovedCases",
};
const viewAllRevertedCasesForSystemAdmin = {
  RequestMethod: "ServiceManager.ViewAllRevertedCasesForSystemAdmin",
};
const completeReportConfigs = {
  RequestMethod: "ServiceManager.ShowCompleteReport",
};
const CompleteReportByWOFCode = {
  RequestMethod: "ServiceManager.ShowCompleteReportByWOFCode",
};
const creditPolicyReportConfigs = {
  RequestMethod: "ServiceManager.ShowCreditPolicyReport",
};
const balanceSheetReportConfigs = {
  RequestMethod: "ServiceManager.ShowBalanceSheetReport",
};
const completeReportExcelConfigs = {
  RequestMethod: "CompleteReportExcel",
};
const ApprovedCasesSystemAdminReportExcelConfigs = {
  RequestMethod: "ApprovedCasesSystemAdmin",
};
const CompleteReportExcelByWOFCode = {
  RequestMethod: "CompleteReportExcelByWOFCode",
};
const creditReportExcelConfigs = {
  RequestMethod: "CreditReportExcel",
};
const balanceReportExcelConfigs = {
  RequestMethod: "BalanceSheetReportExcel",
};

const getAllPropertyType = {
  RequestMethod: "ServiceManager.AllPropertyType",
};

const savePropertyType = {
  RequestMethod: "ServiceManager.SavePropertyType",
};

const deletePropertyType = {
  RequestMethod: "ServiceManager.DeletePropertyType",
};

const updatePropertyType = {
  RequestMethod: "ServiceManager.UpdatePropertyType",
};

const getAllApprovalRejectionReasons = {
  RequestMethod: "ServiceManager.AllApprovalRejectionReason",
};

const saveApprovalRejectionReasons = {
  RequestMethod: "ServiceManager.SaveApprovalRejectionReason",
};

const deleteApprovalRejectionReasons = {
  RequestMethod: "ServiceManager.DeleteApprovalRejectionReason",
};

const updateApprovalRejectionReasons = {
  RequestMethod: "ServiceManager.UpdateApprovalRejectionReason",
};

const getAllInProcess = {
  RequestMethod: "ServiceManager.ListAllInProcess",
};

const getAllPendingForApproval = {
  RequestMethod: "ServiceManager.ListAllPendingApprovalCases",
};

const getAllApprovedCases = {
  RequestMethod: "ServiceManager.ListAllApprovedCases",
};

const getAllRejectedCases = {
  RequestMethod: "ServiceManager.ListAllRejectedCases",
};

//for mysis seacrh customer
const searchCustomerMysis = {
  RequestMethod: "ServiceManager.FindCustomer",
};

//Approval History
const getApprovalHistory = {
  RequestMethod: "ServiceManager.ViewApprovalHistory",
};

//Approval History
const searchNBACase = {
  RequestMethod: "ServiceManager.SearchNBACase",
};

//Delete Business Team Data
const deleteBusinessTeamData = {
  RequestMethod: "ServiceManager.DeleteBusinessTeamData",
};

//ApproveNBACase
const approveNBACase = {
  RequestMethod: "ServiceManager.ApproveNBACase",
};

//RejectNBACase
const rejectNBACase = {
  RequestMethod: "ServiceManager.RejectNBACase",
};

// Save Business Team Data
const saveBusinessTeamData = {
  RequestMethod: "ServiceManager.SaveBusinessTeamData",
};

// view Business Team Data
const viewBusinessTeamData = {
  RequestMethod: "ServiceManager.ViewBusinessTeamData",
};

//Report API
const nbaCasesReport = {
  RequestMethod: "ServiceManager.DownloadNBADSCaseReport",
};

// Edit Business Team Data
const editBusinessTeamData = {
  RequestMethod: "ServiceManager.EditBusinessTeamData",
};

// view REM Team Data
const viewREMTeamData = {
  RequestMethod: "ServiceManager.ViewRASCTeamData",
};

// Save REM Team Data
const saveREMTeamData = {
  RequestMethod: "ServiceManager.SaveREMTeamData",
};

// Save RASA Team Data
const saveRASATeamData = {
  RequestMethod: "ServiceManager.SaveRASCTeamData",
};

//Revert CAse
const revertNBACase = {
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
