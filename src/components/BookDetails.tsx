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
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../slice/FavoritesSlice";

const BASE_URL = "http://localhost:5002/books";

interface BookModalProps {
  open: boolean;
  onClose: () => void;
  book: Book;
  setBooks: any;
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

export default function BookDetails({
  onClose,
  open,
  book,
  setBooks,
}: BookModalProps) {
  const {
    id,
    bookName,
    description,
    image,
    review: { name, mail, comment } = {},
  } = book;

  const dispatch = useDispatch();

  async function handleDelete() {
    onClose();

    try {
      await axios.delete(`http://localhost:5002/books/${id}`);

      setBooks((prevBooks: Book[]) =>
        prevBooks.filter((book) => book.id !== id)
      );

      dispatch(removeFavorite(id));

      notification.success({
        message: `"${bookName}" is removed successfully!`,
        duration: 3,
        placement: "top",
        closeIcon: false,
      });
    } catch (error) {
      console.error("Error deleting book:", error);
    }
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
