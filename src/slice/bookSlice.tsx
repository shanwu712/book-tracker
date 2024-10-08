import { createSlice } from "@reduxjs/toolkit";

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

interface BooksState {
  books: Book[];
  ids: string[];
}

const initialState: BooksState = {
  books: [],
  ids: [],
};

interface ActionPayload {
  id: string;
  bookName: string;
  description: string;
  image?: string;
  review?: {
    name?: string;
    comment?: string;
  };
}

interface Action {
  payload: ActionPayload;
}

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (state, action) => {
      state.books = action.payload;
    },
    addBook: (state, action) => {
      const book = action.payload;
      state.books.push(book);
    },
    deleteBook: (state, action) => {
      const index = action.payload;
      state.books = state.books.filter((book) => book.id !== index);
    },
    editBook: (state, action: Action) => {
      const bookId = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      if (bookId !== -1) {
        state.books[bookId].description = action.payload.description;
        if (action.payload.review && action.payload.review.comment) {
          state.books[bookId].review = {
            comment: action.payload.review.comment,
          };
        }
      }
    },
  },
});

export const { setBook, addBook, deleteBook, editBook } = bookSlice.actions;
export default bookSlice.reducer;
