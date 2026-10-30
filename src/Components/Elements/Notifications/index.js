import React, { useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./notification.module.css";
const Message = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
};

// Replaces MUI's Snackbar + filled Alert with the same behaviour: a teal card
// at the top right that hides itself after 2s or on its close button, and
// reports closing through the same setOpen(!open) every caller already uses.
const Notification = ({ setOpen, open, message }) => {
  const handleClose = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (!open || message === "") return undefined;
    const timer = setTimeout(handleClose, 2000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, message]);
  return (
    <>
      {message !== "" && open ? (
        <div className={styles.snackbar} role="alert">
          <div className={styles.alert}>
            <span className={styles.message}>{message}</span>
            <button
              type="button"
              aria-label="Close"
              className={styles.close}
              onClick={handleClose}
            >
              <CloseOutlined />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
export { Notification, Message };
