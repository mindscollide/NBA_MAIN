import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  Message: "",
  Success: false,
  Fail: false,
  ShowNotification: false,
  PropertyTypeData: [],
  ApprovalRejectionReasonsData: [],
};

const SetupFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_LOADER_FALSE:
      return { ...state, Loading: false };
    case actions.GET_SETUP_FORM_INIT:
      return { ...state, Loading: true };
    case actions.GET_SETUP_FORM_FAIL:
      return { ...state, Loading: false, Fail: true };
    case actions.HIDE:
      return { ...state, ShowNotification: false };
    case actions.SHOW:
      return { ...state, ShowNotification: true, Message: action.message };
    case actions.GET_PROPERTYTYPE_UNIT_SUCCESS:
      console.log("Action", action);
      let PropertyTypeArray = action.response.approvalReasons.map((item, index) => {
        return { ...item, key: index };
      });
      return {
        ...state,
        // Loading: false,
        ResponseMessage: action.response.responseMessage,
        PropertyTypeData: PropertyTypeArray,
      };
    case actions.GET_PROPERTYTYPE_UNIT_FAIL:
      return {
        ...state,
        // Loading: false,
        ResponseMessage: action.response.responseMessage,
        PropertyTypeData: [],
      };
    case actions.GET_APPROVALREJECTIONREASONS_UNIT_SUCCESS:
      console.log("Action", action);
      let ApprovalRejectionReasonsArray = action.response.approvalReasons.map((item, index) => {
        return { ...item, key: index };
      });
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        ApprovalRejectionReasonsData: ApprovalRejectionReasonsArray,
      };
    case actions.GET_APPROVALREJECTIONREASONS_UNIT_FAIL:
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        ApprovalRejectionReasonsData: [],
      };


    default:
      return { ...state };
  }
};

export default SetupFormReducer;
