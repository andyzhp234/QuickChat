import { createSlice } from "@reduxjs/toolkit";

export const groupsSlice = createSlice({
  name: "groupsLists",
  initialState: {
    groups: [],
    pending: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    resetGroupsState: (state) => {
      state.groups = [];
      state.pending = false;
      state.error = false;
      state.errorMessage = "";
    },
    setGroupsList: (state, action) => {
      state.groups = action.payload;
    },
    addNewGroups: (state, action) => {
      state.groups.push(action.payload);
    },
  },
});

export const { resetGroupsState, setGroupsList, addNewGroups } =
  groupsSlice.actions;
export default groupsSlice.reducer;
