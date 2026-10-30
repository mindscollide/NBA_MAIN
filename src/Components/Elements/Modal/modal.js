import React, { useState } from "react";
import { Modal, Button } from "antd";

const CustomModal = ({ modalTitle, children, modalState, closeModal,width,padding }) => {
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        // style={{padding:`${padding}px!important`}}
        padding={padding}
        centered
        title={modalTitle}
        open={modalState}
        footer={null}
        onCancel={closeModal}
        width={width}
      >
        {children}
      </Modal>
    </>
  );
};

export default CustomModal;
