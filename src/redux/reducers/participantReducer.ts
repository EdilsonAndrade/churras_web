import { Participant } from '@/common/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  participants: [] as Participant[],
};

const participantSlice = createSlice({
  name: 'participant',
  initialState,
  reducers: {
    setParticipant(state, action: PayloadAction<Participant[]>) {
      state.participants = action.payload;
    },
    changePaidStatus(state, action: PayloadAction<string>) {
      const participant = state.participants.find(
        (p) => p.id === action.payload,
      );
      if (participant) {
        participant.paid = !participant.paid;
      }
    },
  },
});

export const { setParticipant, changePaidStatus } = participantSlice.actions;

export default participantSlice.reducer;
