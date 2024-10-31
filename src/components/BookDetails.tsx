import {
  Form,
  Button,
  Input,
  Modal,
  message,
  Card,
  FormListFieldData,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./BookDetails.module.scss";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  addReview,
  deleteBook,
  deleteReview,
  editBook,
  editReview,
} from "../slice/bookSlice";
import TextArea from "antd/es/input/TextArea";

const { confirm } = Modal;

const BASE_URL = "http://localhost:5002/books";

interface BookModalProps {
  open: boolean;
  onClose: () => void;
  book: Book;
  showSubBtn?: boolean;
}

interface Book {
  id: string;
  bookName: string;
  description: string;
  image?: string;
  review?: {
    id: string;
    name: string;
    comment: string;
  }[];
}

export default function BookDetails({
  onClose,
  open,
  book,
  showSubBtn,
}: BookModalProps) {
  const [editing, setEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(book);
  const [editingReviewIndex, setEditingReviewIndex] = useState<null | string>(
    null
  );
  const { id, bookName, image, review } = book;
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  async function handleDelete() {
    Modal.confirm({
      title: `Are you sure you want to remove "${bookName}"?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async function () {
        try {
          await axios.delete(`${BASE_URL}/${id}`);

          dispatch(deleteBook(id));

          message.success(`${bookName} is removed successfully!`);
        } catch (error) {
          console.error("Error deleting book:", error);
        }
      },
    });
  }

  function handleEditDescription(e: any) {
    const { name, value } = e.target;

    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  }

  async function handleOk() {
    if (editing) {
      try {
        const res = await axios.put(`${BASE_URL}/${id}`, editedBook);

        dispatch(editBook(res.data));
      } catch (error) {
        console.error("Error editing book details", error);
      }
    } else {
      onClose();
    }
    setEditing(false);
  }

  async function handleAddOrEditReview(field: FormListFieldData) {
    const reviewData = form.getFieldValue("items")[field.name];
    console.log("Current Reviews:", editedBook?.review);

    const isExistingReview = editedBook?.review?.find(
      (r) => r.id === reviewData.id
    );

    const updatedBook = {
      ...editedBook,
      review: isExistingReview
        ? editedBook?.review?.map((r) =>
            r.id === reviewData.id ? reviewData : r
          )
        : [...(editedBook.review || []), reviewData],
    };

    setEditedBook(updatedBook);

    if (editingReviewIndex === reviewData.id) {
      if (isExistingReview) {
        try {
          const res = await axios.put(`${BASE_URL}/${id}`, updatedBook);
          console.log(res.data);
          dispatch(editReview(updatedBook));
        } catch (error) {
          console.error("Error editing review:", error);
        }
      } else {
        try {
          const res = await axios.put(`${BASE_URL}/${id}`, updatedBook);
          console.log(res.data);
          dispatch(addReview(updatedBook));
        } catch (error) {
          console.error("Error posting review:", error);
        }
      }

      setEditingReviewIndex(null);
    } else {
      setEditingReviewIndex(reviewData.id);

      form.setFieldsValue({
        items: {
          [field.name]: {
            name: reviewData.name,
            comment: reviewData.comment,
          },
        },
      });
    }
  }

  async function handleDeleteReview(field: FormListFieldData) {
    const currentReviews = form.getFieldValue("items");

    const updatedReviews = currentReviews.filter(
      (item: any) => item.id !== currentReviews[field.name].id
    );

    const updatedBook = {
      ...editedBook,
      review: updatedReviews,
    };

    console.log(updatedBook);

    try {
      if (editingReviewIndex === currentReviews[field.name].id) {
        setEditingReviewIndex(null);
      }
      const res = await axios.put(`${BASE_URL}/${id}`, updatedBook);
      dispatch(deleteReview(updatedBook));
    } catch (error) {
      console.log("Error deleting review", error);
    }
  }

  function handleClose() {
    if (!editing && editingReviewIndex === null) {
      onClose();
    } else {
      confirm({
        title: "Incomplete editing! ",
        content: "Are you sure you want to finish editing without saving?",
        onOk() {
          if (editing) {
            setEditedBook(book);
          }
          setEditing(false);
          setEditingReviewIndex(null);
          form.resetFields();
          onClose();
        },
        onCancel() {},
      });
    }
  }

  return (
    <Modal
      title={bookName}
      open={open}
      onCancel={handleClose}
      footer={(_) => (
        <>
          {showSubBtn && (
            <>
              <Button key="delete" onClick={handleDelete}>
                Remove This Book
              </Button>
            </>
          )}

          <Button type="primary" onClick={handleClose}>
            Close
          </Button>
        </>
      )}
      className={styles.detail}
    >
      {editing ? (
        <div className={styles.detailContent}>
          <img alt="example" src={editedBook.image} style={{ height: 170 }} />
          <div className={styles.detailBtn}>
            <TextArea
              style={{
                minHeight: "200px",
                maxHeight: "none",
                width: "330px",
              }}
              name="description"
              defaultValue={editedBook.description}
              onChange={handleEditDescription}
            />
            <Button onClick={handleOk} type="primary">
              OK
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.detailContent}>
          <img alt="example" src={image} style={{ height: 170 }} />
          <div className={styles.detailBtn}>
            <p>{editedBook.description}</p>
            {!editing && showSubBtn && (
              <Button
                key="edit"
                disabled={editingReviewIndex !== null}
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      )}

      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        name="reviews"
        style={{ maxWidth: 600 }}
        autoComplete="off"
        initialValues={{
          items: review && review.length > 0 ? [...review] : [],
        }}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
              {fields.length > 0 &&
                fields.map((field, index) => (
                  <Card
                    size="small"
                    title={`Review ${field.name + 1}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                    key={field.key}
                    extra={
                      showSubBtn && (
                        <CloseOutlined
                          onClick={() => {
                            Modal.confirm({
                              title:
                                "Are you sure you want to remove this review?",
                              okText: "Yes",
                              okType: "danger",
                              cancelText: "No",
                              onOk: function () {
                                handleDeleteReview(field);
                                remove(field.name);
                              },
                            });
                          }}
                        />
                      )
                    }
                  >
                    <Form.Item label="Name" name={[field.name, "name"]}>
                      <Input
                        disabled={
                          editingReviewIndex !==
                          form.getFieldValue("items")[index].id
                        }
                        style={{
                          color:
                            editingReviewIndex !==
                            form.getFieldValue("items")[index]?.id
                              ? "black"
                              : "inherit",
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Comment" name={[field.name, "comment"]}>
                      <TextArea
                        disabled={
                          editingReviewIndex !==
                          form.getFieldValue("items")[index].id
                        }
                        style={{
                          color:
                            editingReviewIndex !==
                            form.getFieldValue("items")[index]?.id
                              ? "black"
                              : "inherit",
                        }}
                        autoSize
                      />
                    </Form.Item>
                    {showSubBtn && (
                      <Button
                        type="primary"
                        style={{ display: "flex", alignSelf: "end" }}
                        disabled={
                          (editingReviewIndex !== null &&
                            editingReviewIndex !==
                              form.getFieldValue("items")[index].id) ||
                          editing
                        }
                        onClick={() => handleAddOrEditReview(field)}
                      >
                        {editingReviewIndex ===
                        form.getFieldValue("items")[index].id
                          ? "Save"
                          : "Edit"}
                      </Button>
                    )}
                  </Card>
                ))}

              {showSubBtn && (
                <Button
                  type="dashed"
                  style={{ alignSelf: "flex-end" }}
                  disabled={editingReviewIndex !== null || editing}
                  onClick={() => {
                    const newReview = { id: uuidv4(), name: "", comment: "" };
                    add(newReview);
                    setEditingReviewIndex(newReview.id);
                  }}
                  block
                >
                  + Add Review
                </Button>
              )}
            </div>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
}

// "books": [
//     {
//       "id": "a72ae8f2-587f-4a95-83f5-8503be51b7c4",
//       "bookName": "Twilight",
//       "description": "First, Edward was a vampire.\n\nSecond, there was a part of him - and I didn't know how dominant that part might be - that thirsted for my blood.\n\nAnd third, I was unconditionally and irrevocably in love with him.",
//       "image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1700522826i/41865.jpg",
//       "review": [
//         {
//           "name": "Alex",
//           "comment": "Let me first say that I am a huge romance and vampire/supernatural fan, so when I first heard about the book I was really excited to read it because it combined two of my favorite genres."
//         }
//       ]
//     }
//   ]
// }
