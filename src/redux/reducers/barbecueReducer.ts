import { Barbecue } from '@/common/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  barbecues: [] as Barbecue[],
};

const barbecueSlice = createSlice({
  name: 'barbecue',
  initialState,
  reducers: {
    setBarbecues(state, action: PayloadAction<Barbecue[]>) {
      state.barbecues = action.payload;
    },
  },
});

export const { setBarbecues } = barbecueSlice.actions;

export default barbecueSlice.reducer;
