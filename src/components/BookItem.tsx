import { useEffect, useState } from "react";
import styles from "./BookItem.module.scss";
import { Card } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import BookDetails from "./BookDetails";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../slice/FavoritesSlice";
import { RootState } from "../store";

const { Meta } = Card;

interface Book {
  id: string;
  bookName: string;
  description: string;
  image?: string;
  review?: {
    name: string;
    comment: string;
  };
}

interface BookItemProp {
  book: Book;
  setBooks?: any;
}

export default function BookItem({ book, setBooks }: BookItemProp) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  const { id, bookName, description, image } = book;

  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  useEffect(() => {
    const isFavorite = favorites.some((fav) => fav.id === id);
    setLiked(isFavorite);
  }, [favorites, id]);

  function showModal() {
    setIsModalVisible(true);
  }

  function handleClose() {
    setIsModalVisible(false);
  }

  function toggleLike(e: any) {
    e.stopPropagation();
    const newLikedState = !liked;
    setLiked(newLikedState);

    if (newLikedState) {
      dispatch(addFavorite(book));
    } else {
      dispatch(removeFavorite(id));
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
                {liked ? (
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
        setBooks={setBooks}
      ></BookDetails>
    </>
  );
}
