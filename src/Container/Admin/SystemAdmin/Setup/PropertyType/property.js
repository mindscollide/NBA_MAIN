import React, { useState, useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
import { Typography } from "antd";
import AddIcon from "@material-ui/icons/Add";
import Search from "@material-ui/icons/Search";
import Edit from "@material-ui/icons/Edit";
import Restore from "@material-ui/icons/Restore";
import {
  Button,
  Table,
  GroupedButtons,
  Modal,
  TextField,
  Notification,
  Loader,
} from "../../../../../Components/Elements";
import styles from "../SystemAdmin.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  HideNotification,
  GetAllPropertyType,
  SavePropertyType,
  DeletePropertyType,
  EditPropertyType,
} from "../../../../../store/actions/setup-forms-actions";
const PropertyType = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { setupForms } = state;
  const [btnStatus, setBtnStatus] = useState(true);
  const [btnStatusSelect, setBtnStatusSelect] = useState(true);
  const [allPropertyData, setAllPropertyData] = useState([]);

  const [propertyTypeName, setPropertyTypeName] = useState({
    Title: "",
    PK_PropertyTypeID: null,
  });

  const [actions, setAction] = useState({
    add: false,
    update: false,
    delete: false,
  });

  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const [propertyType, setPropertyType] = useState({
    PK_PropertyTypeID: null,
    Title: "",
  });

  const add = () => {
    if (propertyType.Title != "") {
      showModal();
      setAction({
        ...actions,
        add: true,
        update: false,
        delete: false,
      });
    } else {
      setOpen({
        flag: true,
        message: "Please Enter Property Type",
      });
    }
    setBtnStatus(true);
  };

  const deleteit = (e, record) => {
    console.log("Delete", record);
    setPropertyType({
      ...propertyType,
      Title: record.title,
      PK_PropertyTypeID: record.pK_PropertyTypeID,
    });
    showModal();
    setAction({
      ...actions,
      delete: true,
      update: false,
      add: false,
    });
  };

  const update = (e, record) => {
    setPropertyType({
      ...propertyType,
      Title: record.title,
      PK_PropertyTypeID: record.pK_PropertyTypeID,
    });
    setPropertyTypeName({
      ...propertyTypeName,
      Title: record.title,
      PK_PropertyTypeID: record.pK_PropertyTypeID,
    });
    setAction({ ...actions, update: true });
  };

  const updateData = () => {
    dispatch(EditPropertyType(propertyType));
    setPropertyType({
      PK_PropertyTypeID: null,
      Title: "",
    });
    setPropertyTypeName({
      PK_PropertyTypeID: null,
      Title: "",
    });
    setAction({ ...actions, update: false });
    setBtnStatus(true);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAction({ add: false, delete: false, update: false });
    setBtnStatus(true);
    setPropertyTypeName({
      PK_PropertyTypeID: null,
      Title: "",
    });
  };

  const handleDelete = () => {
    console.log("testfraudtype", propertyType);
    setIsModalVisible(false);
    dispatch(DeletePropertyType(propertyType));
  };

  const handleSave = () => {
    setIsModalVisible(false);
    dispatch(SavePropertyType(propertyType));
    setPropertyType({
      PK_PropertyTypeID: null,
      Title: "",
    });
    setPropertyTypeName({
      PK_PropertyTypeID: null,
      Title: "",
    });
  };

  useEffect(() => {
    dispatch(GetAllPropertyType());
  }, []);

  useEffect(() => {
    console.log("call", setupForms.PropertyTypeData);
    setAllPropertyData(setupForms.PropertyTypeData);
  }, [setupForms.PropertyTypeData]);

  const columns = [
    {
      title: "Property Type",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: "80%",
    },
    {
      title: "Edit",
      dataIndex: "PK_PropertyTypeID",
      key: "PK_PropertyTypeID",
      align: "center",
      width: "10%",
      render: (text, record) => (
        <div
          // style={{ cursor: "pointer" }}
          onClick={(e) => update(e, record)}
          className={`${"icon-edit icon-size-one beachGreen"} ${styles["Onlycursor"]}`}
        />
      ),
    },

    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      width: "10%",
      render: (text, record) => (
        <div
          // style={{ cursor: "pointer" }}
          onClick={(e) => deleteit(e, record)}
          className={`${"icon-trash icon-size-one pdfRed"} ${styles["Onlycursor"]}`}
        />
      ),
    },
  ];
  // props to pass for grouped button bar
  const buttonProps = {
    primaryButton: {
      text: "Yes",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      click: () => handleDelete(),
    },
    secondaryButton: {
      text: "Cancel",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  const addButtonProps = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      click: () => handleSave(propertyType),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  const updateButtonProps = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      click: () => updateData(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  const handleChange = (e) => {
    if (e.target.value == "") {
      setAction({ ...actions, update: actions.update ? true : false });
    }
    setBtnStatus(false);
    setPropertyType({
      ...propertyType,
      Title: e.target.value,
    });
    setPropertyTypeName({
      ...propertyType,
      Title: e.target.value,
    });
  };

  useEffect(() => {
    if (setupForms.ShowNotification) {
      setOpen({
        flag: true,
        message: setupForms.Message,
      });
      dispatch(HideNotification());
    }
  }, [setupForms.ShowNotification]);

  useEffect(() => {
    if (setupForms.ShowNotification) {
      setOpen({
        flag: true,
        message: setupForms.Message,
      });
      dispatch(HideNotification());
    }
    console.log("Loader", setupForms.Loading);
  }, [setupForms.Loading]);

  console.log("setupForms", setupForms);

  useEffect(() => {
    if (propertyTypeName.Title !== "") {
      setBtnStatus(false);
      setBtnStatusSelect(false);
    } else {
      setBtnStatus(true);
      setBtnStatusSelect(true);
    }
  }, [propertyTypeName]);

  console.log("propertyType", propertyTypeName);

  return (
    <>
      <Title level={3}>Property Type</Title>
      <Grid container spacing={1}>
        <Grid item lg={9} md={9} sm={12}>
          <TextField
            fullWidth
            label="Enter Property Type"
            size="small"
            autoComplete="off"
            required
            value={propertyTypeName.Title.trimStart()}
            change={handleChange}
            textLength={200}
          />
        </Grid>
        <Grid item lg={3} md={3} sm={12}>
          {actions.update ? (
            <Button
              text="Update Property Type"
              icon={<Edit />}
              applyClass="btnDarkSolid"
              size="small"
              click={updateData}
              disableBtn={btnStatusSelect}
            />
          ) : (
            <Button
              text="Add Property Type"
              icon={<AddIcon />}
              applyClass="btnDarkSolid"
              size="small"
              click={add}
              disableBtn={btnStatus}
            />
          )}
        </Grid>

        <Grid
          className={styles["propertyTypeTable"]}
          item
          lg={12}
          md={11}
          sm={12}
        >
          <Table
            rows={allPropertyData}
            columns={columns}
            scroll={{ x: "max-content" }}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "30"],
            }}
          />
        </Grid>
      </Grid>
      <Modal closeModal={handleCancel} modalState={isModalVisible} width={700}>
        {/* this data will be pass to modal when Add Property Type btn will be clicked */}
        {actions.add && (
          <>
            <Box
              className={styles["propertyTypeAddBox"]}
              // display="flex"
              // justifyContent="center"
              // style={{ padding: "40px" }}
            >
              <Title level={3} align="center">
                Are you sure you want to add Property Type
              </Title>
            </Box>
            <GroupedButtons data={addButtonProps} />
          </>
        )}
        {/* this data will be pass to modal when delete icon btn in the table  will be clicked */}
        {actions.delete && (
          <>
            <Box className={styles["propertyTypeDelBox"]}>
              <i className="icon-trash icon-size-two"></i>
              <Title level={3} align="center">
                Are you sure you want to delete this?
              </Title>
            </Box>
            <GroupedButtons data={buttonProps} />
          </>
        )}
        {actions.update && (
          <>
            <Box className={styles["propertyTypeUpdateBox"]}>
              <Title level={3} align="center">
                Are you sure you want to update Property Type
              </Title>
            </Box>
            <GroupedButtons data={updateButtonProps} />
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {setupForms.Loading ? <Loader /> : null}
    </>
  );
};

export default PropertyType;
