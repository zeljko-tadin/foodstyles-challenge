import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Share } from "react-native";
import { RootState } from "../../app/store";
import { Card } from "../../models/Card";
import { fetchGraphql } from "../../utils/fetchGraphql";

export const fetchCards = createAsyncThunk(
  'cardList/fetchCards',
  async () => {
    return await fetchGraphql(`
      query Cards {
        cards {
          id
          name
        }
      }
    `)
  }
)

export const createCard = createAsyncThunk(
  'cardList/createCard',
  async () => {
    return await fetchGraphql(`
      mutation CreateCard {
        createCard(
          data: {
            name: "My Food Style",
            minPrice: null,
            maxPrice: null,
            locationTypeIds: [],
            locationCuisineTypeIds: [],
            dishTypeIds: [],
            courseTypeIds: [],
            dietIds: [],
            excludedIngredientIds: []
          }
        ) {
          id
          name
        }
      }
    `)
  }
)

export const shareCard = createAsyncThunk(
  'cardList/shareCard',
  async (id: number) => {
    return await fetchGraphql(`
      mutation ShareCard($id: ID!) {
        shareCard(id: $id)
      }
    `, { id })
  }
)

export const duplicateCard = createAsyncThunk(
  'cardList/duplicateCard',
  async (id: number) => {
    return await fetchGraphql(`
      mutation DuplicateCard($id: ID!) {
        duplicateCard(id: $id) {
          id
          name
        }
      }
    `, { id })
  }
)

export const deleteCard = createAsyncThunk(
  'cardList/deleteCard',
  async (id: number) => {
    await fetchGraphql(`
      mutation DeleteCard($id: ID!) {
        deleteCard(id: $id)
      }
    `, { id })
    return id;
  }
)

interface CardListState {
  cards: Card[];
}

const initialState: CardListState = {
  cards: [],
}

export const cardListSlice = createSlice({
  name: "cardList",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.cards = action.payload.data.cards;
    })
    builder.addCase(createCard.fulfilled, (state, action) => {
      state.cards.push(action.payload.data.createCard);
    })
    builder.addCase(shareCard.fulfilled, (state, action) => {
      const link = `https://cards.foodstyles.com/${action.payload.data.shareCard}`;
      Share.share({ message: link })
    })
    builder.addCase(duplicateCard.fulfilled, (state, action) => {
      state.cards.push(action.payload.data.duplicateCard);
    })
    builder.addCase(deleteCard.fulfilled, (state, action) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    })
  }
})

export const { } = cardListSlice.actions;

export const selectCards = (state: RootState) => state.cardList.cards;

export default cardListSlice.reducer;