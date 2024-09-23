import { Avatar, Button, Collapse, Modal, Space } from "antd";
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
  image: string;
  review: {
    name: string;
    mail: string;
    comment: string;
  };
}

export default function BookDetails({ onClose, open, book }: BookModalProps) {
  const { id, bookName, description, image, review } = book;
  const { name, mail, comment } = review;

  return (
    <Modal
      title={bookName}
      open={open}
      onOk={onClose}
      onCancel={onClose}
      footer={(_, { OkBtn }) => <OkBtn />}
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
  );
}
