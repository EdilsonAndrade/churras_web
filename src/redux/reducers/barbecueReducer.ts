import { Barbecue } from '@/common/types'
import {PayloadAction, createSlice} from '@reduxjs/toolkit'

const initialState = {
  barbecues: [] as Barbecue[],
}

const barbecueSlice = createSlice({
  name: 'barbecue',
  initialState,
  reducers: {

    addBarbecue(state, action: PayloadAction<Barbecue>) {
      state.barbecues.push(action.payload)
    }

  }
})

export const { addBarbecue } = barbecueSlice.actions

export default barbecueSlice.reducer


