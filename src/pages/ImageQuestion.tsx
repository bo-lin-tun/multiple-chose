import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchQuestions } from "@/store/slices/questionSlice";

import { Question } from "@prisma/client";

const ImageQuestion = () => {
  // Fetch questions on component mount

  const question = [
    {
      name: "Apple",
      option: ["/mango.png", "/apple.png", "/orange.png"],
      answer: "/apple.png",
    },
    {
      name: "Orange",
      option: ["/mango.png", "/apple.png", "/orange.png"],
      answer: "/orange.png",
    },
    {
      name: "Mango",
      option: ["/mango.png", "/apple.png", "/orange.png"],
      answer: "/mango.png",
    },
  ];

  // Initialize state conditionally based on whether 'question' is defined
  const [selectedOptions, setSelectedOptions] = useState<
    (string | number | null)[]
  >([]);
  const [showFeedback, setShowFeedback] = useState<boolean[]>([]);
  const [feedback, setFeedback] = useState<(JSX.Element | null)[]>([]);

  // useEffect(() => {
  //   if (question && question.length > 0) {
  //     setSelectedOptions(Array(question.length).fill(null));
  //     setShowFeedback(Array(question.length).fill(false));
  //     setFeedback(Array(question.length).fill(null));
  //   }
  // }, [question]);

  const handleOptionClick = (
    questionIndex: number,
    option: string | number
  ) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = option;
    setSelectedOptions(newSelectedOptions);

    const newShowFeedback = [...showFeedback];
    newShowFeedback[questionIndex] = true;
    setShowFeedback(newShowFeedback);
  };

  const [toShow, setToShow] = useState<boolean>(false);
  const handleCheckClick = (index: number, easyQuestion: any) => {
    setToShow(false);
    const result =
      selectedOptions[index] === easyQuestion.answer ? (
        <CheckOutlinedIcon
          sx={{ bgcolor: "green", fontSize: 40, color: "white" }}
        />

      ) : (
        <ClearIcon sx={{ bgcolor: "red", fontSize: 40 }} />
      );
    const newFeedback = [...feedback];
    newFeedback[index] = result;
    setFeedback(newFeedback);
  };

  // if (!question || question.length === 0) {
  //   return <div>Loading...</div>; // Or any other loading indicator
  // }

  const toShowSolution = () => {
    setToShow(true);
  };

  return (
    <Box>
      <Box></Box>

      {question.map((easyQuestion: any, index) => (
        <Box
          key={index}
          sx={{
            bgcolor: "#ECFFE6",
            borderRadius: "9px",

            marginTop: "15px",
            paddingLeft: "10px",
          }}
        >
          <h2>မှန်ကန်သော ပုံလေးကိုရွှေးရ‌အောင်။</h2>
          <Typography
            variant="body2"
            component="pre"
            sx={{
              padding: "10px",
              mb: "5px",
              color: "red",
              fontSize: "2em",
              whiteSpace: "pre-wrap",
            }}
          >
            {easyQuestion?.name}
          </Typography>
          <Box className="option-container">
            {(easyQuestion?.option as (string | number)[])?.map(
              (option: any) => (
                <Button
                  variant="outlined"
                  sx={{
                    margin: 2,

                    // opacity: selectedOptions[index] === option ? 0.4 : 1,
                  border:"none"
                  }}
                  key={option}
                  onClick={() => handleOptionClick(index, option)}
                  disabled={selectedOptions[index] === option}
                >
                  <img
                    src={option}
                    style={{
                      border:  selectedOptions[index] === option ?"10px solid blue":"none",
                      width: "100px",
                      height: "auto",
                      maxWidth: "250px", // Limit the maximum width on larger screens
                    }}
                    alt={option}
                  />
                </Button>
              )
            )}
          </Box>
          <Box sx={{ margin: 1, display: "flex" }}>
            {showFeedback[index] && (
              <Button
                variant="contained"
                sx={{
                  bgcolor: "black",
                  color: "while",
                  "&:hover": {
                    bgcolor: "while", // Change this to the desired hover color
                  },
                }}
                onClick={() => {
                  handleCheckClick(index, easyQuestion);
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
                fontSize: "1.3em",
                whiteSpace: "pre-wrap",
              }}
            >
              {easyQuestion?.solution}
            </Typography>
          )}
          <Divider sx={{ bgcolor: "green" }} />
        </Box>
      ))}
    </Box>
  );
};

export default ImageQuestion;
