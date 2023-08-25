import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Participant {
  id: string;
  name: string;
  barbecueId: string;
  amount: number;
  drink: number
  paid: boolean;
}

const initialState = {
  participants: [] as Participant[]
};

const participantSlice = createSlice({
  name: 'participant',
  initialState,
  reducers: {
    addParticipant(state, action: PayloadAction<Participant>) {
      state.participants.push(action.payload);
    },
    removeParticipant(state, action: PayloadAction<string>) {
      state.participants = state.participants.filter(p => p.id !== action.payload);
    },
    changePaidStatus(state, action: PayloadAction<string>) {
      const participant = state.participants.find(p => p.id === action.payload);
      if (participant) {
        participant.paid = !participant.paid;
      }
    }

  }
});

export const { addParticipant, changePaidStatus, removeParticipant } = participantSlice.actions;

export default participantSlice.reducer;
