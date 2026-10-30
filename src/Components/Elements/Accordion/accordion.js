import React, { createContext, useContext, useState } from "react";
import styles from "./accordion.module.css";

// Drop-in for the MUI v4 Accordion / AccordionSummary / AccordionDetails
// this app used: same props (expanded, defaultExpanded, onChange(event,
// isExpanded), expandIcon), same look as App.less gave the MUI version.
const AccordionContext = createContext({ open: false, toggle: () => {} });

export const Accordion = ({
  expanded,
  defaultExpanded,
  onChange,
  className,
  children,
}) => {
  const [ownOpen, setOwnOpen] = useState(Boolean(defaultExpanded));
  const controlled = expanded !== undefined;
  const open = controlled ? Boolean(expanded) : ownOpen;
  const toggle = (event) => {
    if (!controlled) setOwnOpen(!open);
    if (onChange) onChange(event, !open);
  };
  return (
    <AccordionContext.Provider value={{ open, toggle }}>
      <div className={`${styles.accordion} ${className ? className : ""}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export const AccordionSummary = ({ expandIcon, id, children }) => {
  const { open, toggle } = useContext(AccordionContext);
  return (
    <div
      id={id}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      className={styles.summary}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle(e);
        }
      }}
    >
      <div className={styles.content}>{children}</div>
      {expandIcon ? (
        <span className={`${styles.icon} ${open ? styles.iconOpen : ""}`}>
          {expandIcon}
        </span>
      ) : null}
    </div>
  );
};

// Content stays mounted while collapsed, as with MUI's Collapse.
export const AccordionDetails = ({ children }) => {
  const { open } = useContext(AccordionContext);
  return (
    <div className={styles.details} style={{ display: open ? "flex" : "none" }}>
      {children}
    </div>
  );
};
