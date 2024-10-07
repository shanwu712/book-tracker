import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Book {
  id: string;
  bookName: string;
  description: string;
  image?: string;
}

interface FavoritesState {
  favorites: Book[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Book>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (book) => book.id !== action.payload
      );
    },
    editFavBook: (state, action) => {
      const index = state.favorites.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.favorites[index] = action.payload;
      }
    },
  },
});

export const { addFavorite, removeFavorite, editFavBook } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
