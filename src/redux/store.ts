import { configureStore } from '@reduxjs/toolkit';
import barbecue from './reducers/barbecueReducer';
import participant from './reducers/participantReducer';

const store = configureStore({
  reducer: {
    barbecue,
    participant,
  },
});

// Infere o `RootState` and `AppDispatch` types da própria store
export type RootState = ReturnType<typeof store.getState>;
// Inferido os types: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
