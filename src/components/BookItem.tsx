import { useState } from "react";
import styles from "./BookItem.module.scss";
import { Card } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import BookDetails from "./BookDetails";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import { addFavorite, removeFavorite } from "../slice/bookSlice";

const { Meta } = Card;

interface Book {
  id: string;
  bookName: string;
  description: string;
  image?: string;
  review?: {
    name?: string;
    comment?: string;
  };
}

interface BookItemProp {
  book: Book;
  setBooks?: any;
  showSubBtn?: boolean;
}

export default function BookItem({ book, showSubBtn }: BookItemProp) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { id, bookName, description, image } = book;

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.books.favorites);

  function showModal() {
    setIsModalVisible(true);
  }

  function handleClose() {
    setIsModalVisible(false);
  }

  const isLiked = favorites.some((book) => book === id);

  function toggleLike(e: any) {
    e.stopPropagation();

    if (isLiked) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  }

  return (
    <>
      <div className={styles.book} onClick={showModal}>
        <Card
          cover={
            <div style={{ position: "relative" }}>
              <img
                alt="example"
                src={image}
                style={{
                  height: 165,
                  position: "relative",
                  width: "100%",
                  borderRadius: "inherit",
                  objectFit: "cover",
                }}
              />

              <div className={styles.heartIcon} onClick={toggleLike}>
                {isLiked ? (
                  <HeartFilled className={styles.filledHeart} />
                ) : (
                  <HeartOutlined className={styles.outlineHeart} />
                )}
              </div>
            </div>
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
        showSubBtn={showSubBtn}
      ></BookDetails>
    </>
  );
}
