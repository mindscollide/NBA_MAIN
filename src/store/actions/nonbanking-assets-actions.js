import * as actions from "../action_types";
import axios from "axios";
import { refreshToken } from "./auth-actions";
import {
  NBAPersistApi,
  NBAApprovalApi,
  searchMysisCustomer,
} from "../../Common/Api/apis-end-points";
import {
  getAllInProcess,
  getAllPendingForApproval,
  getAllApprovedCases,
  getAllRejectedCases,
  searchCustomerMysis,
  getApprovalHistory,
  searchNBACase,
  deleteBusinessTeamData,
  approveNBACase,
  rejectNBACase,
  //SAVE NBA
  saveBusinessTeamData,
  viewBusinessTeamData,
  editBusinessTeamData,
  viewREMTeamData,
  saveREMTeamData,
  saveRASATeamData,
  revertNBACase,
  getAllPropertyType,
} from "../../Common/Api/apis-config";
import { SomeThingWentWrong } from "./ui-actions";
import Helper from "../../Common/Functions/history_logout";
import { GetAllPropertyType } from "./setup-forms-actions";

const HideNotification = () => {
  return {
    type: actions.HIDE,
  };
};

const ShowNotification = (message) => {
  return {
    type: actions.SHOW,
    message: message,
  };
};

const resetAllStates = (response) => {
  return {
    type: actions.RESET_ALLSTATE,
    response: response,
  };
};

const nonBankingAssetsInit = () => {
  return {
    type: actions.GET_NONBANKINGASSET_INIT,
  };
};

const nonBankingAssetsFail = () => {
  return {
    type: actions.GET_NONBANKINGASSET_FAIL,
  };
};

const LOADERFALSE = () => {
  return {
    type: actions.GET_LOADER_FALSE,
  };
};

//GetAllInProcessSuccessors
const GetAllInProcessSuccess = (response) => {
  return {
    type: actions.GET_ALLINPROCESS_UNIT_SUCCESS,
    response: response,
  };
};

const GetAllInProcessFail = (response) => {
  return {
    type: actions.GET_ALLINPROCESS_UNIT_FAIL,
    response: response,
  };
};

//Get All In Process
const GetAllInProcess = (filter) => {
  console.log("Data", filter);

  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    DayRangeID: filter,
  };
  console.log("Data", Data);
  return async (dispatch) => {
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", getAllInProcess.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    console.log("Data", Data);
    await axios({
      method: "post",
      url: NBAApprovalApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("Response", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAllInProcess(Data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(GetAllInProcessSuccess(response.data.responseResult));
          } else {
            dispatch(GetAllInProcessFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(nonBankingAssetsFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//GetAllPendingForApprovalSuccessors
const GetAllPendingForApprovalSuccess = (response) => {
  return {
    type: actions.GET_PENDINGFORAPPROVAL_UNIT_SUCCESS,
    response: response,
  };
};

const GetAllPendingForApprovalFail = (response) => {
  return {
    type: actions.GET_PENDINGFORAPPROVAL_UNIT_FAIL,
    response: response,
  };
};

//Get All Pending For Approval
const GetAllPendingForApproval = (filter) => {
  console.log("Data", filter);
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    DayRangeID: parseInt(filter),
  };
  console.log("Data", Data, token);
  return (dispatch) => {
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", getAllPendingForApproval.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    console.log("Data", Data);
    axios({
      method: "post",
      url: NBAApprovalApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("Response", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAllPendingForApproval(Data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              GetAllPendingForApprovalSuccess(response.data.responseResult)
            );
          } else {
            dispatch(
              GetAllPendingForApprovalFail(response.data.responseResult)
            );
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(nonBankingAssetsFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//GetAllApprovedSuccessors
const GetAllApprovedCasesSuccess = (response) => {
  return {
    type: actions.GET_ALLAPPROVEDCASES_UNIT_SUCCESS,
    response: response,
  };
};

const GetAllApprovedCasesFail = (response) => {
  return {
    type: actions.GET_ALLAPPROVEDCASES_UNIT_FAIL,
    response: response,
  };
};

//Get All Approved Cases
const GetAllApprovedCases = (filter) => {
  console.log("Data", filter);
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    DayRangeID: parseInt(filter),
  };
  console.log("Data", Data, token);
  return (dispatch) => {
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", getAllApprovedCases.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    console.log("Data", Data);
    axios({
      method: "post",
      url: NBAApprovalApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("Response", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAllApprovedCases(Data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(GetAllApprovedCasesSuccess(response.data.responseResult));
          } else {
            dispatch(GetAllApprovedCasesFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(nonBankingAssetsFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//GetAllRejectedSuccessors
const GetAllRejectedCasesSuccess = (response) => {
  return {
    type: actions.GET_ALLREJECTEDCASES_UNIT_SUCCESS,
    response: response,
  };
};

const GetAllRejectedCasesFail = (response) => {
  return {
    type: actions.GET_ALLREJECTEDCASES_UNIT_FAIL,
    response: response,
  };
};

//Get All Rejected Cases
const GetAllRejectedCases = (filter, revert) => {
  console.log("Data", filter);
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    DayRangeID: parseInt(filter),
  };
  console.log("Data", Data, token);
  return (dispatch) => {
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", getAllRejectedCases.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    console.log("Data", Data);
    axios({
      method: "post",
      url: NBAApprovalApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("Response", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAllRejectedCases(filter, revert));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(GetAllRejectedCasesSuccess(response.data.responseResult));
            console.log("revertrevertrevert", revert);
            dispatch(LOADERFALSE());
            if (revert) {
              console.log("revertrevertrevert", revert);
              dispatch(LOADERFALSE());
            }
          } else {
            dispatch(GetAllRejectedCasesFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(nonBankingAssetsFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//SearchCustomerSuccessors
const mysisSearchCustomerInit = (response, message) => {
  return {
    type: actions.MYSIS_SEARCH_CUSTOMER_INIT,
    response: response,
  };
};

const mysisSearchCustomerFail = (response, message) => {
  console.log("mysisSearchCustomerFail", response, message);
  return {
    type: actions.MYSIS_SEARCH_CUSTOMER_FAIL,
    response: response,
    message: message,
  };
};

const mysisSearchCustomerSuccess = (response, message) => {
  return {
    type: actions.MYSIS_SEARCH_CUSTOMER_SUCCESS,
    response: response,
  };
};
//SearchCustomerMysis
const SearchCustomerMysis = (
  object,
  setCustomerSection,
  customerSection,
  setMisysError,
  misysError,
  setMisysErrMsg,
  misysErrMsg
) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("SearchCustomerMysis", JSON.stringify(object));
  let Data = { MiSysCode: object };
  return (dispatch) => {
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", searchCustomerMysis.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: searchMysisCustomer,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("SearchCustomerMysis", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            SearchCustomerMysis(object, setCustomerSection, customerSection)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              mysisSearchCustomerSuccess(response.data.responseResult)
            );
            let data = response.data.responseResult;
            console.log("SearchCustomerMysis", data);
            let tem = [];
            data.accountNumbers.map((tData, index) => {
              tem.push({
                AccountNumber: tData.accountNumber,
                BranchCode: tData.branchCode,
                BranchName: tData.branchName,
                RegionCode: tData.regionCode,
                RegionName: tData.regionName,
                FacilityDescription: tData.facilityDescription,
                SundryDescription: tData.sundryAnalysisDescription,
              });
            });
            setMisysError(false);
            setMisysErrMsg("");
            setCustomerSection({
              MisysCode: data.customer.misysCode,
              BorrowerName: data.customer.borrowerName,
              BorrowerAddress: data.customer.addressOfBorrower,
              ECIBCode: data.customer.ecibCode,
              IPartyID: data.customer.iPartyID,
              NBACaseCustomerAccountList: tem,
            });
          } else {
            console.log("mysisSearchCustomerFail", response);
            dispatch(
              mysisSearchCustomerFail(
                response.data.responseResult,
                response.data.responseResult.responseMessage
              )
            );
            setMisysError(true);
            setMisysErrMsg(response.data.responseResult.responseMessage);
            setCustomerSection({
              MisysCode: "",
              BorrowerName: "",
              BorrowerAddress: "",
              ECIBCode: "",
              IPartyID: -1,
              NBACaseCustomerAccountList: [],
            });
          }
        } else {
          console.log("mysisSearchCustomerFail", response);
          console.log(
            "mysisSearchCustomerFail",
            response.data.responseResult,
            response.data.responseMessage
          );
          dispatch(
            mysisSearchCustomerFail(
              response.data.responseResult,
              response.data.responseMessage
            )
          );
          setMisysError(true);
        }
      })
      .catch((response) => {
        console.log(response.message);
        dispatch(SomeThingWentWrong(response));
        // dispatch(LOADERFALSE());
      });
  };
};

//Approval History Successors
//GetApprovalHistorySuccess
const GetApprovalHistorySuccess = (response) => {
  console.log("GetApprovalHistorySuccess", response);
  return {
    type: actions.GET_APPROVALHISTORY_UNIT_SUCCESS,
    response: response,
  };
};

//GetApprovalHistoryFail
const GetApprovalHistoryFail = (response) => {
  console.log("GetApprovalHistoryFail", response);
  return {
    type: actions.GET_APPROVALHISTORY_UNIT_FAIL,
    response: response,
  };
};

//View Status History
const GetApprovalHistory = (object, showModal, setAction, actions) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("GetApprovalHistory", object);
  let Data = {
    NBACaseID: object,
  };
  console.log("GetApprovalHistory ", JSON.stringify(Data));
  return (dispatch) => {
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", getApprovalHistory.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: NBAApprovalApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("GetDisputeStatusCC", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetApprovalHistory(object, showModal, setAction, actions));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(GetApprovalHistorySuccess(response.data.responseResult));
            showModal();
            setAction({
              ...actions,
              viewApprovalHistory: true,
            });
          } else {
            console.log("GetApprovalHistory", response);

            // dispatch(GetDisputeStatusCCFail(response.data.responseResult));
          }
        } else {
          console.log("GetApprovalHistory", response);

          dispatch(GetApprovalHistoryFail(response.data));
        }
      })
      .catch((response) => {
        console.log(response.message);
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const SearchNBACaseSuccess = (response) => {
  return {
    type: actions.SEARCH_NBACASE_UNIT_SUCCESS,
    response: response,
  };
};

const SearchNBACaseFail = (response) => {
  return {
    type: actions.SEARCH_NBACASE_UNIT_FAIL,
    response: response,
  };
};

//RESET Button on CC Search
const ResetNBACase = (response) => {
  console.log("SearchCreditCardDisputeData action");
  return {
    type: actions.RESET_NBACASE,
    response: response,
  };
};

//View Status History
const SearchNBACase = (object, State) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("SearchNBACase", JSON.stringify(object));
  let Data = {
    MiSysCode: object.MiSysCode,
    AccountNumber: object.AccountNumber,
    FromDate: State.FromDate,
    ToDate: State.ToDate,
    DPSTransactionAmount: parseFloat(object.DPSTransactionAmount),
    ReferenceNumber: object.ReferenceNumber,
  };
  console.log("SearchNBACase", JSON.stringify(Data));
  return (dispatch) => {
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", searchNBACase.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: NBAApprovalApi,
      data: form,
      headers: {
        _token: token,
        // 'Access-Control-Allow-Origin': '*',
      },
    })
      .then(async (response) => {
        console.log("SearchNBACase", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchNBACase(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(SearchNBACaseSuccess(response.data.responseResult));
            console.log("new call", response.data.responseResult);
          } else {
            dispatch(SearchNBACaseFail(response.data.responseResult));
          }
        } else {
          dispatch(SearchNBACaseFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Delete Property Type
const DeleteBusinessTeamData = (nbaCaseID, filter) => {
  console.log("DeleteBusinessTeamData", nbaCaseID);
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    NBACaseID: nbaCaseID.NBACaseID,
  };
  console.log("DeleteBusinessTeamData", Data);
  return (dispatch) => {
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", deleteBusinessTeamData.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: NBAPersistApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteBusinessTeamData(nbaCaseID, filter));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            console.log("DeleteBusinessTeamData", response);
            await dispatch(GetAllInProcess(filter));
            await dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
          } else {
            dispatch(LOADERFALSE());
            console.log(response.data.responseResult);
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(nonBankingAssetsFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//ApproveCase Success
const ApproveCaseSuccess = (response) => {
  return {
    type: actions.APPROVE_CASE_SUCCESS,
    response: response,
  };
};

//ApproveCase Fail
const ApproveCaseFail = (response) => {
  return {
    type: actions.APPROVE_CASE_FAIL,
    response: response,
  };
};

//SaveApproval
const ApproveCase = (object, filter) => {
  console.log("ApproveCase", filter);
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let Data = {
      NBACaseID: object.NBACaseID,
      Comments: object.Comments,
      ApprovalRejectionReasonID: object.ApprovalRejectionReasonID,
    };
    console.log("ApproveCase", JSON.stringify(Data));
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", approveNBACase.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: NBAApprovalApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("ApproveCase", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(ApproveCase(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            console.log("ApproveCase", response.data.responseResult);
            await dispatch(GetAllPendingForApproval(filter));

            await dispatch(ApproveCaseSuccess(response.data.responseResult));
            // dispatch(GetAllPendingForDeletionByID(userID));
          } else {
            console.log("ApproveCase", response);
            dispatch(ApproveCaseFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(ApproveCaseFail(response.data));
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        console.log("ApproveCase");
        dispatch(nonBankingAssetsFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//RejectCaseSuccess
const RejectCaseSuccess = (response) => {
  return {
    type: actions.REJECT_CASE_SUCCESS,
    response: response,
  };
};

//RejectCaseFail
const RejectCaseFail = (response) => {
  return {
    type: actions.REJECT_CASE_FAIL,
    response: response,
  };
};

//SaveRejection
const RejectCase = (object, filter, revert) => {
  console.log("RejectCase", object);
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let Data = {
      NBACaseID: object.NBACaseID,
      Comments: object.Comments,
      ApprovalRejectionReasonID: object.ApprovalRejectionReasonID,
    };
    console.log("Data", Data);
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", rejectNBACase.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: NBAApprovalApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("RejectCase", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(RejectCase(object, filter, revert));
        } else if (response.data.responseCode === 200) {
          console.log("RejectCase", response.data.responseResult);
          if (response.data.responseResult.isExecuted === true) {
            console.log(response.data.responseResult);

            await dispatch(GetAllPendingForApproval(filter));
            if (revert) {
              await dispatch(GetAllRejectedCases(filter));
            } else {
              await dispatch(RejectCaseSuccess(response.data.responseResult));
            }
          } else {
            console.log(response.data.responseResult);
            dispatch(RejectCaseFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(RejectCaseFail(response.data));
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(nonBankingAssetsFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// =====>>NBA SAVE CODE<<======= \\
//GetAllRejectedSuccessors
const SaveBusinessTeamDataSuccess = (response) => {
  console.log("SaveBusinessTeamDataSuccess", response);
  return {
    type: actions.SAVE_BUSINESS_TEAM_DATA_SUCCESS,
    response: response,
  };
};

const SaveBusinessTeamDataFail = (response) => {
  return {
    type: actions.SAVE_BUSINESS_TEAM_DATA_FAIL,
    response: response,
  };
};

// Save Business Team Data
const SaveBusinessTeamData = (data) => {
  let navigate = Helper.navigate;
  console.log("SaveBusinessTeamData", data);
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("SaveBusinessTeamData", data, token);
  return (dispatch) => {
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", saveBusinessTeamData.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    console.log("SaveBusinessTeamData", data);
    axios({
      method: "post",
      url: NBAPersistApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("SaveBusinessTeamData", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SaveBusinessTeamData(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(SaveBusinessTeamDataSuccess(response.data.responseResult));
            localStorage.setItem("parent", "sub1");
            localStorage.setItem("child", "1");
            navigate("/NBA/DataEntryBusinessTeam/CasesInProcess");
          } else {
            dispatch(SaveBusinessTeamDataFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(nonBankingAssetsFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// View Business Team Data
const ViewBusinessTeamDataSuccess = (response) => {
  return {
    type: actions.VIEW_BUSINESS_TEAM_DATA_SUCCESS,
    response: response,
  };
};

const ViewBusinessTeamDataFail = (response) => {
  return {
    type: actions.VIEW_BUSINESS_TEAM_DATA_FAIL,
    response: response,
  };
};

// View Business Team Data
const ViewBusinessTeamData = (data) => {
  let navigate = Helper.navigate;
  console.log("ViewBusinessTeamData", data);
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("ViewBusinessTeamData", data, token);
  return (dispatch) => {
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", viewBusinessTeamData.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    console.log("ViewBusinessTeamData", data);
    axios({
      method: "post",
      url: NBAPersistApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("ViewBusinessTeamData", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(ViewBusinessTeamData(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              ViewBusinessTeamDataSuccess(response.data.responseResult)
            );
            await dispatch(GetAllPropertyType());
          } else {
            dispatch(ViewBusinessTeamDataFail([response.data.responseResult]));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(nonBankingAssetsFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// Edit Business Team Data
const EditBusinessTeamData = (data) => {
  let navigate = Helper.navigate;
  console.log("EditBusinessTeamData", data);
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("EditBusinessTeamData", data, token);
  return (dispatch) => {
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", editBusinessTeamData.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    console.log("EditBusinessTeamData", data);
    axios({
      method: "post",
      url: NBAPersistApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("EditBusinessTeamData", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(EditBusinessTeamData(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(SaveBusinessTeamDataSuccess(response.data.responseResult));
            await localStorage.setItem("parent", "sub1");
            await localStorage.setItem("child", "1");
            navigate("/NBA/DataEntryBusinessTeam/CasesInProcess");
          } else {
            dispatch(SaveBusinessTeamDataFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(nonBankingAssetsFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// View REM Team Data
const ViewREMTeamDataSuccess = (response) => {
  return {
    type: actions.VIEW_REM_TEAM_DATA_SUCCESS,
    response: response,
  };
};

const ViewREMTeamDataFail = (response) => {
  return {
    type: actions.VIEW_REM_TEAM_DATA_FAIL,
    response: response,
  };
};

// View REM Team Data
const ViewREMTeamData = (data) => {
  let navigate = Helper.navigate;
  console.log("ViewREMTeamData", data);
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("ViewREMTeamData", data, token);
  return async (dispatch) => {
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", viewREMTeamData.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    console.log("ViewBusinessTeamData", data);
    await axios({
      method: "post",
      url: NBAPersistApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("ViewREMTeamData", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(ViewREMTeamData(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              ViewREMTeamDataSuccess(response.data.responseResult)
            );
            await dispatch(GetAllPropertyType());
          } else {
            dispatch(ViewREMTeamDataFail([response.data.responseResult]));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(nonBankingAssetsFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// Save REM Team Data
const SaveREMTeamData = (data) => {
  let navigate = Helper.navigate;
  console.log("SaveREMTeamData", data);
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("SaveREMTeamData", data, token);
  return (dispatch) => {
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", saveREMTeamData.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    console.log("SaveREMTeamData", data);
    axios({
      method: "post",
      url: NBAPersistApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("SaveREMTeamData", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SaveREMTeamData(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(SaveBusinessTeamDataSuccess(response.data.responseResult));
            navigate("/NBA/DataEntryREM/CasesInProcess");
          } else {
            dispatch(SaveBusinessTeamDataFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(nonBankingAssetsFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// Save RASA Team Data
const SaveRASAeamData = (data) => {
  let navigate = Helper.navigate;
  console.log("SaveRASAeamData", data);
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("SaveRASAeamData", data, token);
  return (dispatch) => {
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", saveRASATeamData.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    console.log("SaveRASAeamData", data);
    axios({
      method: "post",
      url: NBAPersistApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("SaveRASAeamData", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SaveRASAeamData(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(SaveBusinessTeamDataSuccess(response.data.responseResult));
            navigate("/NBA/DataEntryRaSc/CasesInProcess");
          } else {
            dispatch(SaveBusinessTeamDataFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(nonBankingAssetsFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// For Revert CAse
//RevertCase
const RevertCase = (object, filter, revert) => {
  console.log("RevertCase", object);
  let token = JSON.parse(localStorage.getItem("token"));
  return async (dispatch) => {
    let Data = {
      NBACaseID: object.NBACaseID,
      Comments: object.Comments,
      ApprovalRejectionReasonID: object.ApprovalRejectionReasonID,
    };
    console.log("Data", Data);
    dispatch(nonBankingAssetsInit());
    let form = new FormData();
    form.append("RequestMethod", revertNBACase.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: NBAApprovalApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("RevertCase", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(RevertCase(object, filter, revert));
        } else if (response.data.responseCode === 200) {
          console.log("RevertCase", response.data.responseResult);
          if (response.data.responseResult.isExecuted === true) {
            console.log(response.data.responseResult);
            // if(filter!=false){
            // await dispatch(GetAllPendingForApproval(filter));
            if (revert) {
              await dispatch(GetAllRejectedCases(filter));
              // }
            } else {
              await dispatch(RejectCaseSuccess(response.data.responseResult));
            }
          } else {
            console.log(response.data.responseResult);
            dispatch(RejectCaseFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(RejectCaseFail(response.data));
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(nonBankingAssetsFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// For Notification FAlse
const notificationFalse = (response) => {
  console.log("FALSE_NOTIFICATION");
  return {
    type: actions.FALSE_NOTIFICATION,
  };
};
export {
  HideNotification,
  ShowNotification,
  GetAllInProcess,
  GetAllPendingForApproval,
  GetAllApprovedCases,
  GetAllRejectedCases,
  SearchCustomerMysis,
  GetApprovalHistory,
  ResetNBACase,
  SearchNBACase,
  resetAllStates,
  DeleteBusinessTeamData,
  ApproveCase,
  RejectCase,
  //NBA SAVE Code
  SaveBusinessTeamData,
  ViewBusinessTeamData,
  EditBusinessTeamData,
  ViewREMTeamData,
  SaveREMTeamData,
  SaveRASAeamData,
  //  For Revert Case
  RevertCase,
  //  For NOTIFICATION FALSE Case
  notificationFalse,
};
