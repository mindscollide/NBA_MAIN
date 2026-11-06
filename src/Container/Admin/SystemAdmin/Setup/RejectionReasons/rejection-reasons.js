import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import {
  Button,
  Table,
  GroupedButtons,
  Modal,
  TextField,
  Notification,
  Loader,
} from "../../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";
import styles from "../SystemAdmin.module.css";
import {
  HideNotification,
  GetAllApprovalRejectionReasons,
  SaveApprovalRejectionReasons,
  DeleteApprovalRejectionReasons,
  EditApprovalRejectionReasons,
} from "../../../../../store/actions/setup-forms-actions";
import { Row, Col } from "antd";
import { PlusOutlined as AddIcon, EditOutlined as Edit } from "@ant-design/icons";

const RejectionReasons = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { setupForms } = state;
  const [btnStatus, setBtnStatus] = useState(true);
  const [btnStatusSelect, setBtnStatusSelect] = useState(true);
  const [allApprovalRejectionReasons, setAllApprovalRejectionReasons] = useState([]);
  const [actions, setAction] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [approvalRejectionReasons, setApprovalRejectionReasons] = useState({
    PK_ApprovalRejectionReasonID: null,
    ApprovalRejectionReasonDescription: "",
    IsApprovalItem: false,
  });
  const [approvalRejectionReason, setApprovalRejectionReason] = useState({
    PK_ApprovalRejectionReasonID: null,
    ApprovalRejectionReasonDescription: "",
    IsApprovalItem: false,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const add = () => {
    if (approvalRejectionReasons.Title != "") {
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
        message: "Please Enter Rejection Reason",
      });
    }
    setBtnStatus(true);
  };

  const deleteit = (e, record) => {
    console.log("Delete", record);
    setApprovalRejectionReasons({
      ...approvalRejectionReasons,
      PK_ApprovalRejectionReasonID: record.pK_ApprovalRejectionReasonID,
      ApprovalRejectionReasonDescription: record.approvalRejectionReasonDescription,
      IsApprovalItem: record.isApprovalItem,
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
    console.log("record", record);
    setApprovalRejectionReasons({
      ...approvalRejectionReasons,
      PK_ApprovalRejectionReasonID: record.pK_ApprovalRejectionReasonID,
      ApprovalRejectionReasonDescription: record.approvalRejectionReasonDescription,
      IsApprovalItem: record.isApprovalItem,
    });
    setApprovalRejectionReason({
      ...approvalRejectionReasons,
      PK_ApprovalRejectionReasonID: record.pK_ApprovalRejectionReasonID,
      ApprovalRejectionReasonDescription: record.approvalRejectionReasonDescription,
      IsApprovalItem: record.isApprovalItem,
    });
    setAction({ ...actions, update: true });
  };

  const updateData = () => {
    dispatch(EditApprovalRejectionReasons(approvalRejectionReasons));
    setApprovalRejectionReasons({
      PK_ApprovalRejectionReasonID: null,
      ApprovalRejectionReasonDescription: "",
      IsApprovalItem: false,
    });
    setApprovalRejectionReason({
      PK_ApprovalRejectionReasonID: null,
      ApprovalRejectionReasonDescription: "",
      IsApprovalItem: false,
    });
    setAction({ ...actions, update: false });
    setBtnStatus(true);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAction({ add: false, delete: false, update: false });
    setApprovalRejectionReason({
      PK_ApprovalRejectionReasonID: null,
      ApprovalRejectionReasonDescription: "",
      IsApprovalItem: false,
    });
  };

  const handleSave = () => {
    setIsModalVisible(false);
    dispatch(SaveApprovalRejectionReasons(approvalRejectionReasons));
    setApprovalRejectionReasons({
      PK_ApprovalRejectionReasonID: null,
      ApprovalRejectionReasonDescription: "",
      IsApprovalItem: false,
    });
    setApprovalRejectionReason({
      PK_ApprovalRejectionReasonID: null,
      ApprovalRejectionReasonDescription: "",
      IsApprovalItem: false,
    });
  };

  const handleDelete = () => {
    setIsModalVisible(false);
    dispatch(DeleteApprovalRejectionReasons(approvalRejectionReasons));
  };

  const handleChange = (e) => {
    if (e.target.value == "") {
      setAction({ ...actions, update: actions.update ? true : false });
    }
    setBtnStatus(false);
    setApprovalRejectionReasons({
      ...approvalRejectionReason,
      ApprovalRejectionReasonDescription: e.target.value,
    });
    setApprovalRejectionReason({
      ...approvalRejectionReason,
      ApprovalRejectionReasonDescription: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(GetAllApprovalRejectionReasons());
  }, []);

  useEffect(() => {
    let tem = [];
    let dataUser = setupForms.ApprovalRejectionReasonsData;
    dataUser.map((name, index) => {
      if (name.isApprovalItem === false) {
        tem.push(name);
      }
    });
    console.log("tem", tem)
    setAllApprovalRejectionReasons(tem);
  }, [setupForms.ApprovalRejectionReasonsData]);

  console.log("ApprovalRejectionReasonsData", setupForms.ApprovalRejectionReasonsData)

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

  const columns = [
    {
      title: "Rejection Reasons",
      dataIndex: "approvalRejectionReasonDescription",
      key: "approvalRejectionReasonDescription",
      align: "center",
      width: "80%",
    },

    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
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
      click: () => handleSave(approvalRejectionReasons),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  useEffect(() => {
    if (approvalRejectionReason.ApprovalRejectionReasonDescription !== "") {
      setBtnStatus(false);
      setBtnStatusSelect(false);
    } else {
      setBtnStatus(true);
      setBtnStatusSelect(true);
    }
  }, [approvalRejectionReason]);

  return (
    <>
      <Title level={3}>Rejection Reasons</Title>
      <Row gutter={[8, 8]}>
        <Col xl={18} lg={18} sm={24}>
          <TextField
            fullWidth
            autoComplete="off"
            label="Enter Rejection Reasons"
            change={handleChange}
            value={approvalRejectionReason.ApprovalRejectionReasonDescription}
            size="small"
            required
          />
        </Col>
        <Col xl={6} lg={6} sm={24}>
          {actions.update ? (
            <Button
              text="Update Rejection Reason"
              icon={<Edit />}
              applyClass="btnDarkSolid"
              size="small"
              click={updateData}
              disableBtn={btnStatusSelect}
            />
          ) : (
            <Button
              text="Add Rejection Reason"
              icon={<AddIcon />}
              applyClass="btnDarkSolid"
              size="small"
              click={add}
              disableBtn={btnStatus}
            />
          )}
        </Col>
        <Col xl={24} lg={22} sm={24} className={styles["rejectionreasonTable"]}>
          <Table
            rows={allApprovalRejectionReasons}
            columns={columns}
            scroll={{ x: "max-content" }}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "30"],
            }}
          />
        </Col>
      </Row>
      <Modal closeModal={handleCancel} modalState={isModalVisible} width={700}>
        {/* this data will be pass to modal when Add Brower btn will be clicked */}
        {actions.add && (
          <>
            <div className={styles["rejectionReasonAddBox"]}>
              <Title level={3} align="center">
                Are you sure you want to add Rejection Reason
              </Title>
            </div>
            <GroupedButtons data={addButtonProps} />
          </>
        )}
        {/* this data will be pass to modal when delete icon btn in the table  will be clicked */}
        {actions.delete && (
          <>
            <div className={styles["rejectionReasonDelBox"]}>
              <i className="icon-trash icon-size-two"></i>
              <Title level={3} align="center">
                Are you sure you want to delete this?
              </Title>
            </div>
            <GroupedButtons data={buttonProps} />
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {setupForms.Loading ? <Loader /> : null}
    </>
  );
};

export default RejectionReasons;
