import { Box, Button, Divider, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchQuestions } from "@/store/slices/questionSlice";

import { Key } from "@mui/icons-material";
import QuectionDilalog from "../QuectionDilalog";
import QuestionCard from "../QuestionCard";

const EasyQuestion = () => {
  const dispatch = useAppDispatch();

  // Fetch questions on component mount
  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const { question } = useAppSelector((state) => state.question);
//   const easyQuestion = question.filter((q) => q?.status === "MEDIUM");

//   // Initialize state conditionally based on whether 'question' is defined
//   const [selectedOptions, setSelectedOptions] = useState<
//     (string | number | null)[]
//   >([]);
//   const [showFeedback, setShowFeedback] = useState<boolean[]>([]);
//   const [feedback, setFeedback] = useState<(JSX.Element | null)[]>([]);

//   useEffect(() => {
//     if (easyQuestion && easyQuestion.length > 0) {
//       setSelectedOptions(Array(question.length).fill(null));
//       setShowFeedback(Array(question.length).fill(false));
//       setFeedback(Array(question.length).fill(null));
//     }
//   }, [easyQuestion]);

//   const handleOptionClick = (
//     questionIndex: number,
//     option: string | number
//   ) => {
//     const newSelectedOptions = [...selectedOptions];
//     newSelectedOptions[questionIndex] = option;
//     setSelectedOptions(newSelectedOptions);

//     const newShowFeedback = [...showFeedback];
//     newShowFeedback[questionIndex] = true;
//     setShowFeedback(newShowFeedback);
//   };

//   const [toShow, setToShow] = useState<boolean>(false);
//   const handleCheckClick = (index: number, question: any) => {
//     setToShow(false);
//     const result =
//       selectedOptions[index] === question.answer ? (
//         <CheckOutlinedIcon
//           sx={{ bgcolor: "green", fontSize: 40, color: "white" }}
//         />
//       ) : (
//         <ClearIcon sx={{ bgcolor: "red", fontSize: 40 }} />
//       );
//     const newFeedback = [...feedback];
//     newFeedback[index] = result;
//     setFeedback(newFeedback);
//   };

  // if (!question || question.length === 0) {
  //   return <div>Loading...</div>; // Or any other loading indicator
  // }

//   const toShowSolution = () => {
//     setToShow(true);
//   };
//   const routeFunction = () => {};

  return (
    <Box>
      <Box>
        <QuectionDilalog />
      </Box>

      {question?.map((item) => {
        return (
          <QuestionCard
            key={item.id}
            href={`question/${item.id}`}
            Question={item}
          />
        );
      })}
      {/* {easyQuestion.map((question: any, index: any) => (
        <Box
          key={index}
          sx={{
            bgcolor: "#ECFFE6",
            borderRadius: "9px",

            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "15px",
            paddingLeft: "10px",
          }}
          onClick={routeFunction}
        >
          <Typography
            variant="body2"
            component="pre"
            sx={{
              padding: "10px",
              mb: "5px",

              fontSize: "1.3em",
              whiteSpace: "pre-wrap",
            }}
          >
            {question?.name}
          </Typography>
          <Box className="option-container">
            {(question?.option as (string | number)[])?.map(
              (option: string | number) => (
                <Button
                  variant="outlined"
                  sx={{ margin: 3, color: "black" }}
                  key={option}
                  onClick={() => handleOptionClick(index, option)}
                  disabled={selectedOptions[index] === option}
                >
                  {option}
                </Button>
              )
            )}
          </Box>
          <Box sx={{ margin: 1, display: "flex" }}>
            {showFeedback[index] && (
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#399918",
                  color: "black",
                  "&:hover": {
                    bgcolor: "#88D66C", // Change this to the desired hover color
                  },
                }}
                onClick={() => {
                  handleCheckClick(index, question);
                }}
              >
                Check
              </Button>
            )}
          </Box>
          {showFeedback[index] && (
            <Box sx={{ ml: 2, mt: 2 }}>{feedback[index]}</Box>
          )}

          {feedback[index] && (
            <Box>
              <Button>Video</Button>
              <Button onClick={() => toShowSolution()}>Solution</Button>
            </Box>
          )}

          {feedback[index] && toShow && (
            <Typography
              variant="body2"
              component="pre"
              sx={{
                border: 1,
                borderColor: "#399918",
                borderStyle: "solid",

                padding: "10px",
                mb: "5px",
                borderRadius: "10px",
                fontSize: "1.2em",
                whiteSpace: "pre-wrap",
              }}
            >
              {question?.solution}
            </Typography>
          )}
          <Divider sx={{ bgcolor: "green" }} />
        </Box>
      ))} */}
    </Box>
  );
};

export default EasyQuestion;
