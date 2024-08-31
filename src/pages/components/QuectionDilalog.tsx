import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  SnackbarOrigin,
} from "@mui/material";

import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { CreateQuestion } from "@/store/slices/questionSlice";
import { Question,  } from "@prisma/client";
import NewQuection from "./NewQuection";
import React from "react";



const QuectionDilalog = () => {
  const dispatch = useAppDispatch();

  // const { question } = useAppSelector((state) => state.question);
  const [Quection, setQuection] = useState<Question>({
    id: 0,
    name: "",
    answer: "",
    option: [],
    solution: [],
    status:"EASY",
  });

  const [open, setOpen] = useState<boolean>(false);
  const [openSnack, setOpenSnak] = useState<boolean>(false);

  interface State extends SnackbarOrigin {
    openSnack: boolean;
  }

  const [state, setState] = React.useState<State>({
    openSnack: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, openSnack: true });
  };
  const handleClose = () => {
    setState({ ...state, openSnack: false });
  };

  const handleQuection = () => {
    dispatch(CreateQuestion(Quection));
    setOpen(false);

    handleClick({ vertical: "bottom", horizontal: "right" })();
  };

  const isDataComplete = () => {
    return (
      Quection.name.trim() !== "" &&
      Quection.answer.trim() !== "" &&
      Quection.solution &&
      Quection.option
    );
  };
  return (
    <Box>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#399918",
              "&:hover": {
                bgcolor: "#2e7d32", // Change this to the desired hover color
              },
            }}
            onClick={() => setOpen(true)}
          >
            NewQuestion
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Question</DialogTitle>
        <DialogContent>
          <NewQuection newQuection={Quection} setNewQuection={setQuection} />
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            sx={{ bgcolor: "red" }}
            onClick={() => setOpen(false)}
          >
            Cencal
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#399918",
              "&:hover": {
                bgcolor: "#2e7d32", // Change this to the desired hover color
              },
            }}
            disabled={!isDataComplete()}
            onClick={handleQuection}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={state.openSnack}
        onClose={handleClose}
        autoHideDuration={2000}
        message="Question create successful"
        key={vertical + horizontal}
      />
    </Box>
  );
};

export default QuectionDilalog;
