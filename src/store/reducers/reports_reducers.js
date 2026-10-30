import * as actions from "../action_types";

const initialState = {
  completeReport: [],
  completeReportConsolidate: [],
  creditPoliocyReport: [],
  balanceSheetReport: [],
  isLoading: null,
  isSuccess: null,
  isFail: null,
  errorMessage: null,
  isRecordFound: false,
  responseMessage: ""
};

const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.COMPLETE_REPORT_INIT:
      return { ...state, isLoading: true };
    case actions.COMPLETE_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFail: false,
        completeReport: action.response.responseResult.allIndividualCases,
        completeReportConsolidate: [],
        creditPoliocyReport: [],
        balanceSheetReport: [],
        isRecordFound: action.response.responseResult.isExecuted,
        responseMessage: action.response.responseResult.responseMessage
      };
    case actions.COMPLETE_REPORT_FAIL:
      console.log("completeReport", action.response.responseMessage)
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        completeReport: action.response.responseResult,
        completeReportConsolidate: [],
        creditPoliocyReport: [],
        balanceSheetReport: [],
        isRecordFound: action.response.responseResult.isExecuted,
        responseMessage: action.response.responseMessage
      };
    case actions.COMPLETE_REPORT_CONSOLIDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFail: false,
        completeReportConsolidate: action.response.responseResult.allIndividualCases,
        completeReport: [],
        creditPoliocyReport: [],
        balanceSheetReport: [],
        isRecordFound: action.response.responseResult.isExecuted,
        responseMessage: action.response.responseResult.responseMessage
      };
    case actions.COMPLETE_REPORT_CONSOLIDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        completeReportConsolidate: action.response.responseResult,
        completeReport: [],
        creditPoliocyReport: [],
        balanceSheetReport: [],
        isRecordFound: action.response.responseResult.isExecuted,
        responseMessage: action.response.responseResult.recordMessagessage
      };
    case actions.CREDIT_POLICY_REPORT_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case actions.CREDIT_POLICY_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFail: false,
        creditPoliocyReport: action.response.responseResult.companyWiseCases,
        completeReport: [],
        completeReportConsolidate: [],
        balanceSheetReport: [],
        isRecordFound: action.response.responseResult.isExecuted,
        responseMessage: action.response.responseResult.recordMessagessage
      };
    case actions.CREDIT_POLICY_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        completeReport: [],
        completeReportConsolidate: [],
        creditPoliocyReport: [],
        balanceSheetReport: [],
        isRecordFound: action.response.responseResult.isExecuted,
        responseMessage: action.response.responseResult.recordMessagessage
      };

    case actions.BALANCE_SHEET_REPORT_INIT:
      return { ...state, isLoading: true };
    case actions.BALANCE_SHEET_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFail: false,
        completeReport: [],
        completeReportConsolidate: [],
        creditPoliocyReport: [],
        balanceSheetReport: action.response.responseResult.balanceSheetRecords,
        isRecordFound: action.response.responseResult.isExecuted,
        responseMessage: action.response.responseResult.responseMessage
      };
    case actions.BALANCE_SHEET_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        completeReport: [],
        completeReportConsolidate: [],
        creditPoliocyReport: [],
        balanceSheetReport: action.response,
      };
    case actions.DOWNLOAD_EXCEL_FILE_INIT:
      return { ...state, isLoading: true };
    case actions.LOADER_REPORT:
      return { ...state, isLoading: false };
    default:
      return { ...state };
  }
};

export default reportsReducer;
