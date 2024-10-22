import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./counterAPI";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 10,
    status: 'idel'
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decreament: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers: builder => {
    builder
      // Handle the action types defined by the `incrementAsync` thunk defined below.
      // This lets the slice reducer update the state with request status and results.
      .addCase(incrementAsync.pending, state => {
        state.status = "loading"
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.value += action.payload
      })
      .addCase(incrementAsync.rejected, state => {
        state.status = "failed"
      })
  },
});

// CreateSlice automatically generate action creator with same name as reducer function and export it.
export const { increment, decreament, incrementByAmount } = counterSlice.actions;

// export slice reducer to use in store configuration
export default counterSlice.reducer;

// creating seletors to read the state field from root state object. these selectors are reuseable.
export const selectCount = (state) => state.counter.value;
export const selectStatus = (state) => state.counter.status;

// thunk funciton is function that contain async code

export const increamentIfOdd = (amount) => {
  return (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount))
    }
  }
}

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {
    const response = await fetchCount(amount)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)