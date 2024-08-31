import { Question } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { json } from "stream/consumers";

interface questionsSlice {
  question: Question[];
  isLoading: boolean;
  error: Error | null;
}

export const initialState: questionsSlice = {
  question: [],
  isLoading: false,
  error: null,
};

export const fetchQuestions = createAsyncThunk(
  "question/fetchQuestions",
  async () => {
    const response = await fetch("http://localhost:3000/api/question");
    const { question } = await response.json();

    return question;
  }
);

export const CreateQuestion = createAsyncThunk(
  "quection/createQuection",
  async (question: Question, thunkApi) => {
    const { id, name, answer, option, solution, status } = question;
    try {
      const response = await fetch("http://localhost:3000/api/question", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, name, answer, option, solution, status }),
      });
      const { question } = await response.json();
      thunkApi.dispatch(addQuestion(question));
    } catch (err) {
      console.log(err);
    }
  }
);

export const quectionUpdate = createAsyncThunk(
  "question/questionUpdate",
  async (question: Question, thunkApi) => {
    const { id, name, answer, option, solution, status } = question;

    try {
      const response = await fetch("http://localhost:3000/api/question", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, name, answer, option, solution, status }),
      });
      const { question } = await response.json();
      thunkApi.dispatch(updateQuestion(question));
    } catch (err) {
      console.log(err);
    }
  }
);

export const quectionDelete = createAsyncThunk(
  "question/questionDelete",
  async (question: Question, thunkApi) => {
    const { id } = question;

    try {
      const response = await fetch("http://localhost:3000/api/question", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const { question } = await response.json();
      thunkApi.dispatch(deleteQuestion(question));
    } catch (err) {
      console.log(err);
    }
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<Question>) => {
      // const newQuestion =state.question
      // state.question=[...newQuestion,action.payload]

      state.question.push(action.payload);
    },
    updateQuestion: (state, action: PayloadAction<Question>) => {
      state.question = state.question.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteQuestion: (state, action: PayloadAction<Question>) => {
      state.question = state.question.filter(
        (item) => item.id === action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.question = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as Error;
      });
  },
});

export const { addQuestion, updateQuestion ,deleteQuestion} = questionSlice.actions;

export default questionSlice.reducer;
