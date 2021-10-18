import React, { useContext, ReactElement, MouseEventHandler } from "react";
import styles from "./ui.module.css";
import Box from "./Box";
import { GobalContext, IContextObject } from "store";
type Props = {
  show: boolean;
  children?: ReactElement;
};

const emptyObject:IContextObject = {}

export default function Modal({ show, children }: Props) {
  const appContext = useContext(GobalContext) || emptyObject;

  const onClickHideHandler:MouseEventHandler = (e) => {
    if (e.currentTarget === e.target) {
      if (!!appContext) {
        appContext?.setModalData({
          show: false,
        });
      }
    }
  };

  return show ? (
    <Box onClick={onClickHideHandler} className={styles.modalContainer}>
      <Box>{children}</Box>
    </Box>
  ) : null;
}

Modal.defaultProps = {
  show: false,
};
