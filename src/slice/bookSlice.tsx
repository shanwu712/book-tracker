import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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

interface BooksState {
  books: Book[];
  favorites: string[];
}

const initialState: BooksState = {
  books: [],
  favorites: [],
};

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
    editBook: (state, action) => {
      const bookId = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      if (bookId !== -1) {
        state.books[bookId].description = action.payload.description;
      }
    },
    addReview: (state, action) => {
      const { id, reviewData } = action.payload;

      const bookId = state.books.findIndex((book) => book.id === id);

      if (bookId !== -1) {
        state.books[bookId].review?.push(reviewData);
      }
    },
    editReview: (state, action) => {
      const { id, reviewData } = action.payload;
      const bookId = state.books.findIndex((book) => book.id === id);
      if (bookId !== -1) {
        const reviews = state.books[bookId].review;

        if (reviews) {
          const reviewId = reviews.findIndex((r) => r.id === reviewData.id);

          if (reviewId !== -1) {
            reviews[reviewId] = reviewData;
          }
        }
      }
    },
    deleteReview: (state, action) => {
      const { id, reviewId } = action.payload;

      const bookId = state.books.findIndex((book) => book.id === id);

      if (bookId !== -1) {
        state.books[bookId].review = state.books[bookId].review?.filter(
          (r) => r.id !== reviewId
        );
      }
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
  },
});

export const {
  setBook,
  addBook,
  deleteBook,
  editBook,
  addFavorite,
  removeFavorite,
  editReview,
  addReview,
  deleteReview,
} = bookSlice.actions;
export default bookSlice.reducer;
