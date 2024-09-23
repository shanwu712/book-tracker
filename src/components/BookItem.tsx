import React, { useState } from "react";
import styles from "./BookItem.module.scss";
import { Card } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import BookDetails from "./BookDetails";

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

interface BookItemProp {
  book: Book;
}

export default function BookItem({ book }: BookItemProp) {
  const { id, bookName, description, image } = book;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    console.log("open");
    setIsModalVisible(true);
  };

  const handleClose = () => {
    console.log("Modal is closing...");
    setIsModalVisible(false);
  };

  const { Meta } = Card;

  return (
    <>
      <div className={styles.book} onClick={showModal}>
        <Card
          cover={
            <img
              alt="example"
              src={image}
              style={{
                height: 165,
              }}
            />
          }
          hoverable={true}
        >
          <Meta
            title={bookName}
            description={<div className={styles.text}>{description}</div>}
            style={{
              height: 75,
              marginTop: -15,
            }}
          />
        </Card>
      </div>
      <BookDetails
        open={isModalVisible}
        onClose={handleClose}
        book={book}
      ></BookDetails>
    </>
  );
}
