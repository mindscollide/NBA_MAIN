import * as actions from "../action_types";

const initialState = {
  Loading: false,
  Message: "",
  ResponseMessage: "",
  Success: false,
  Fail: false,
  ShowNotification: false,
  InProcessData: [],
  PendingForApprovalData: [],
  ApprovedCasesData: [],
  RejectedCasesData: [],
  ViewApprovalHistoryData: [],
  SearchNBACaseData: [],
  ApproveCaseData: [],
  RejectCaseData: [],
  ViewNBACaseData: [],
  ViewREMCaseData: [],
};

const NonBankingAssetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_LOADER_FALSE:
      return { ...state, Loading: false };
    case actions.GET_NONBANKINGASSET_INIT:
      return { ...state, Loading: true };
    case actions.GET_NONBANKINGASSET_FAIL:
      return { ...state, Loading: false, Fail: true };
    case actions.HIDE:
      return { ...state, ShowNotification: false };
    case actions.SHOW:
      return { ...state, ShowNotification: true, Message: action.message };
    case actions.GET_ALLINPROCESS_UNIT_SUCCESS:
      console.log("Action", action);
      let InProcessArray = action.response.listCases.map((item, index) => {
        return { ...item, key: index };
      });
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        InProcessData: InProcessArray,
      };
    case actions.GET_ALLINPROCESS_UNIT_FAIL:
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        InProcessData: [],
      };

    case actions.GET_PENDINGFORAPPROVAL_UNIT_SUCCESS:
      console.log("Action", action);
      let PendingForApprovalArray = action.response.listCases.map(
        (item, index) => {
          return { ...item, key: index };
        }
      );
      return {
        ...state,
        ShowNotification: true,
        ResponseMessage: action.response.responseMessage,
        PendingForApprovalData: PendingForApprovalArray,
      };
    case actions.GET_PENDINGFORAPPROVAL_UNIT_FAIL:
      return {
        ...state,
        ShowNotification: true,
        ResponseMessage: action.response.responseMessage,
        PendingForApprovalData: [],
      };

    case actions.GET_ALLAPPROVEDCASES_UNIT_SUCCESS:
      console.log("Action", action);
      let ApprovedCasesArray = action.response.listCases.map((item, index) => {
        return { ...item, key: index };
      });
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        ApprovedCasesData: ApprovedCasesArray,
      };
    case actions.GET_ALLAPPROVEDCASES_UNIT_FAIL:
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        ApprovedCasesData: [],
      };

    case actions.GET_ALLREJECTEDCASES_UNIT_SUCCESS:
      console.log("Action", action);
      let RejectedCasesArray = action.response.listCases.map((item, index) => {
        return { ...item, key: index };
      });
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        RejectedCasesData: RejectedCasesArray,
      };
    case actions.GET_ALLREJECTEDCASES_UNIT_FAIL:
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        RejectedCasesData: [],
      };

    case actions.GET_APPROVALHISTORY_UNIT_SUCCESS:
      console.log("ViewApprovalHistory ", action);
      let newarray = [...action.response.approvalHistory];
      let newData = newarray.map((item, index) => ({
        ...item,
        key: index,
      }));
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        ViewApprovalHistoryData: newData,
        ShowNotification: true,
      };

    case actions.GET_APPROVALHISTORY_UNIT_FAIL:
      console.log("ViewApprovalHistory", action.response.responseMessage);
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined
            ? action.response.responseMessage
            : action.response.responseMessage,
        ViewApprovalHistoryData: [],
        ShowNotification: true,
      };

    case actions.RESET_NBACASE:
      return {
        ...state,
        Loading: false,
        Message: "",
        ResponseMessage: "",
        Success: false,
        Fail: false,
        ShowNotification: false,
        InProcessData: [],
        PendingForApprovalData: [],
        ApprovedCasesData: [],
        RejectedCasesData: [],
        ViewApprovalHistoryData: [],
        SearchNBACaseData: [],
        ApproveCaseData: [],
        RejectCaseData: [],
        ViewNBACaseData: [],
        ViewREMCaseData: [],
      };

    case actions.SEARCH_NBACASE_UNIT_SUCCESS:
      console.log("Action", action);
      let SearchNBACaseArray = action.response.listCases.map((item, index) => {
        var i = index;
        i = index + 1;
        return { ...item, key: i + "" };
      });
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SearchNBACaseData: SearchNBACaseArray,
      };

    case actions.SEARCH_NBACASE_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SearchNBACaseData: action.response.listCases,
      };

    case actions.RESET_ALLSTATE:
      // console.log("", action)
      return {
        ...state,
        Loading: false,
        Message: "",
        ResponseMessage: "",
        Success: false,
        Fail: false,
        ShowNotification: false,
        InProcessData: [],
        PendingForApprovalData: [],
        ApprovedCasesData: [],
        RejectedCasesData: [],
        ViewApprovalHistoryData: [],
        SearchNBACaseData: [],
      };

    case actions.APPROVE_CASE_SUCCESS:
      console.log("investigationOfficer ", action);
      return {
        ...state,
        // Loading: false,
        ShowNotification: true,
        ResponseMessage: action.response.responseMessage,
        ApproveCaseData: action.response,
      };

    case actions.APPROVE_CASE_FAIL:
      return {
        ...state,
        Loading: false,
        ShowNotification: true,
        ResponseMessage: action.response.responseMessage,
        ApproveCaseData: [],
      };

    case actions.REJECT_CASE_SUCCESS:
      console.log("investigationOfficer ", action);
      return {
        ...state,
        // Loading: false,
        ShowNotification: true,
        ResponseMessage: action.response.responseMessage,
        RejectCaseData: action.response,
      };

    case actions.REJECT_CASE_FAIL:
      return {
        ...state,
        Loading: false,
        ShowNotification: true,
        ResponseMessage: action.response.responseMessage,
        RejectCaseData: [],
      };

    case actions.SAVE_BUSINESS_TEAM_DATA_SUCCESS:
      console.log("SaveBusinessTeamDataSuccess",action)
      return {
        ...state,
        ShowNotification: true,
        ResponseMessage: action.response.responseMessage,
      };
    case actions.SAVE_BUSINESS_TEAM_DATA_FAIL:
      console.log("SaveBusinessTeamDataSuccess",action)
      return {
        ...state,
        ShowNotification: true,
        ResponseMessage: action.response.responseMessage,
      };

    // for view business team data
    case actions.VIEW_BUSINESS_TEAM_DATA_SUCCESS:
      console.log("ViewBusinessTeamData", action);
      return {
        ...state,
        ShowNotification: true,
        ResponseMessage: action.response.responseMessage,
        Loading: false,
        ViewREMCaseData: action.response,
      };
    case actions.VIEW_BUSINESS_TEAM_DATA_FAIL:
      console.log("ViewBusinessTeamData", action);
      return {
        ...state,
        ShowNotification: true,
        ResponseMessage: action.response.responseMessage,
        Loading: false,
      };

    // for mysis code
    case actions.MYSIS_SEARCH_CUSTOMER_SUCCESS:
      console.log("ViewBusinessTeamData", action);
      return {
        ...state,
        Loading: false,
      };
    case actions.MYSIS_SEARCH_CUSTOMER_FAIL:
      console.log("mysisSearchCustomerFail", action);
      return {
        ...state,
        Loading: false,
        ShowNotification:action.message!=""?true:false,
        ResponseMessage:action.message
      };
    // for view REM team data
    case actions.VIEW_REM_TEAM_DATA_SUCCESS:
      console.log("ViewBusinessTeamData", action);
      return {
        ...state,
        ShowNotification: true,
        ResponseMessage: action.response.responseMessage,
        // Loading: false,
        ViewREMCaseData: action.response,
      };
    case actions.VIEW_REM_TEAM_DATA_FAIL:
      console.log("ViewBusinessTeamData", action);
      return {
        ...state,
        ShowNotification: true,
        ResponseMessage: action.response.responseMessage,
        Loading: false,
      };
    case actions.FALSE_NOTIFICATION:
      console.log("FALSE_NOTIFICATION");
      return {
        ...state,
        ShowNotification: false,
        ResponseMessage: "",
        Message: ",",
      };

    default:
      return { ...state };
  }
};

export default NonBankingAssetsReducer;
