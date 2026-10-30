import * as actions from "../action_types";
import axios from "axios";
import { refreshToken } from "../actions/auth-actions";
import { SetupFormApi } from "../../Common/Api/apis-end-points";
import {
  getAllPropertyType,
  savePropertyType,
  deletePropertyType,
  updatePropertyType,
  getAllApprovalRejectionReasons,
  saveApprovalRejectionReasons,
  deleteApprovalRejectionReasons,
  updateApprovalRejectionReasons,
} from "../../Common/Api/apis-config";
import { SomeThingWentWrong } from "./ui-actions";

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

const setupFormInit = () => {
  return {
    type: actions.GET_SETUP_FORM_INIT,
  };
};

const setupFormFail = () => {
  return {
    type: actions.GET_SETUP_FORM_FAIL,
  };
};

const LOADERFALSE = () => {
  return {
    type: actions.GET_LOADER_FALSE,
  };
};

//GetAllPropertyTypeSuccessors
const GetPropertyTypeSuccess = (response) => {
  return {
    type: actions.GET_PROPERTYTYPE_UNIT_SUCCESS,
    response: response,
  };
};

const GetPropertyTypeFail = (response) => {
  return {
    type: actions.GET_PROPERTYTYPE_UNIT_FAIL,
    response: response,
  };
};

//Get All Property Type
const GetAllPropertyType = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return async (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", getAllPropertyType.RequestMethod);
    await axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
        // 'Access-Control-Allow-Origin': '*',
      },
    })
      .then(async (response) => {
        console.log("GetAllPropertyType", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAllPropertyType());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              GetPropertyTypeSuccess(response.data.responseResult)
            );
          } else {
            dispatch(GetPropertyTypeFail([response.data.responseResult]));
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//Save Property Type
const SavePropertyType = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    Title: object.Title,
  };
  console.log("Data", Data);

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", savePropertyType.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SavePropertyType(Data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllPropertyType());
          } else {
            dispatch(LOADERFALSE());
            console.log(response.data.responseResult);
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//Delete Property Type
const DeletePropertyType = (propertyType) => {
  console.log("fraudType", propertyType);
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    PK_PropertyTypeID: propertyType.PK_PropertyTypeID,
  };
  console.log("Data", Data);
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deletePropertyType.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeletePropertyType(propertyType));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            console.log("DataTest", response);
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllPropertyType());
          } else {
            dispatch(LOADERFALSE());
            console.log(response.data.responseResult);
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//Edit Property Type
const EditPropertyType = (propertyType) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      Title: propertyType.Title,
      PK_PropertyTypeID: propertyType.PK_PropertyTypeID,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updatePropertyType.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SavePropertyType(propertyType));
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllPropertyType());
            console.log(
              "message",
              response.data.responseResult.responseMessage
            );
          } else {
            dispatch(LOADERFALSE());
            console.log("message", response.data.responseResult);
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//GetAllApprovalRejectionSuccessors
const GetApprovalRejectionSuccess = (response) => {
  return {
    type: actions.GET_APPROVALREJECTIONREASONS_UNIT_SUCCESS,
    response: response,
  };
};

const GetApprovalRejectionFail = (response) => {
  return {
    type: actions.GET_APPROVALREJECTIONREASONS_UNIT_FAIL,
    response: response,
  };
};

//Get All Approval Rejection Reasons
const GetAllApprovalRejectionReasons = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", getAllApprovalRejectionReasons.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("Response", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAllApprovalRejectionReasons());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(GetApprovalRejectionSuccess(response.data.responseResult));
          } else {
            dispatch(GetApprovalRejectionFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(GetApprovalRejectionFail([response.data.responseResult]));
          dispatch(LOADERFALSE());
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//Save Approval Rejection Reason
const SaveApprovalRejectionReasons = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ApprovalRejectionReasonDescription:
      object.ApprovalRejectionReasonDescription,
    IsApprovalItem: object.IsApprovalItem,
  };
  console.log("Data", Data);

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", saveApprovalRejectionReasons.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SaveApprovalRejectionReasons(Data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllApprovalRejectionReasons());
          } else {
            dispatch(LOADERFALSE());
            console.log(response.data.responseResult);
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//Delete Approval Rejection Reason
const DeleteApprovalRejectionReasons = (approvalRejectionReasons) => {
  console.log("approvalRejectionReasons", approvalRejectionReasons);
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    PK_ApprovalRejectionReasonID:
      approvalRejectionReasons.PK_ApprovalRejectionReasonID,
  };
  console.log("Data", Data);
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteApprovalRejectionReasons.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteApprovalRejectionReasons(approvalRejectionReasons));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            console.log("DataTest", response);
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllApprovalRejectionReasons());
          } else {
            dispatch(LOADERFALSE());
            console.log(response.data.responseResult);
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//Edit Approval Rejection Reason
const EditApprovalRejectionReasons = (approvalRejectionReasons) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      ApprovalRejectionReasonDescription:
        approvalRejectionReasons.ApprovalRejectionReasonDescription,
      PK_ApprovalRejectionReasonID:
        approvalRejectionReasons.PK_ApprovalRejectionReasonID,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updateApprovalRejectionReasons.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SaveApprovalRejectionReasons(approvalRejectionReasons));
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllApprovalRejectionReasons());
            console.log(
              "message",
              response.data.responseResult.responseMessage
            );
          } else {
            dispatch(LOADERFALSE());
            console.log("message", response.data.responseResult);
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

export {
  HideNotification,
  ShowNotification,
  GetAllPropertyType,
  SavePropertyType,
  DeletePropertyType,
  EditPropertyType,
  GetAllApprovalRejectionReasons,
  SaveApprovalRejectionReasons,
  DeleteApprovalRejectionReasons,
  EditApprovalRejectionReasons,
};
