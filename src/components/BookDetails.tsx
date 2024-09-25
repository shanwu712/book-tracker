import {
  Alert,
  Avatar,
  Button,
  Collapse,
  Modal,
  Space,
  notification,
} from "antd";
import React, { useState } from "react";
import { HeartOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./BookDetails.module.scss";

interface BookModalProps {
  open: boolean;
  onClose: () => void;
  book: Book;
}

interface Book {
  id: string;
  bookName: string;
  description: string;
  image?: string;
  review?: {
    name: string;
    mail: string;
    comment: string;
  };
}

export default function BookDetails({ onClose, open, book }: BookModalProps) {
  const {
    id,
    bookName,
    description,
    image,
    review: { name, mail, comment } = {},
  } = book;

  function handleDelete() {
    onClose();

    notification.success({
      message: `"${bookName}" is removed successfully!`,
      duration: 3,
      placement: "top",
      closeIcon: false,
    });
  }

  return (
    <>
      <Modal
        title={bookName}
        open={open}
        onOk={onClose}
        onCancel={onClose}
        footer={(_, { OkBtn }) => (
          <>
            <Button key="delete" onClick={handleDelete}>
              Remove This Book
            </Button>
            <OkBtn />
          </>
        )}
        className={styles.detail}
      >
        <div className={styles.detailContent}>
          <img alt="example" src={image} style={{ height: 170 }} />
          <p>{description}</p>
        </div>

        <div className={styles.review}>
          <Avatar shape="square" size={64} icon={<UserOutlined />} />
          <span>
            <h4>
              {name} ({mail})
            </h4>
            <p>{comment}</p>
          </span>
        </div>
      </Modal>
    </>
  );
}
