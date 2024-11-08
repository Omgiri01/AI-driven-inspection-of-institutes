import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import inspectionsSlice from './inspections/inspectionsSlice';
import notificationsSlice from './notifications/notificationsSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import institutesSlice from './institutes/institutesSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    inspections: inspectionsSlice,
    notifications: notificationsSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    institutes: institutesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
