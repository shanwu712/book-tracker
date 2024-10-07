import { createSlice } from "@reduxjs/toolkit";

interface Book {
  id: string;
  bookName: string;
  description: string;
  image?: string;
}

interface BooksState {
  entities: Record<string, Book>;
  ids: string[];
}

const initialState: BooksState = {
  entities: {},
  ids: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (state, action) => {
      const book = action.payload;
      state.entities[book.id] = book;
      state.ids.push(book.id);
    },
    deleteBook: (state, action) => {
      const id = action.payload.id;
      delete state.entities[id];
      state.ids = state.ids.filter((bookId) => bookId !== id);
    },
    editBook: (state, action) => {
      const book = action.payload;
      if (state.entities[book.id]) {
        state.entities[book.id] = {
          ...state.entities[book.id],
          ...book,
        };
      }
    },
  },
});

export const { addBook, deleteBook, editBook } = bookSlice.actions;
export default bookSlice.reducer;
