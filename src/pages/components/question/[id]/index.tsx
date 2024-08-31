import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { quectionDelete, quectionUpdate } from "@/store/slices/questionSlice";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Question, QuestionStatus } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Router } from "react-router-dom";

const QuestionDeatial = () => {
  const [data, setdata] = useState<Partial<Question>>();
  const dispacth = useAppDispatch();
  const { question } = useAppSelector((state) => state.question);
  const router = useRouter();
  const questionID = Number(router.query.id);

  const Question = question.find((q) => q.id === questionID);
  useEffect(() => {
    if (Question) {
      setdata({
        id: questionID,
        name: Question.name,
        answer: Question.answer,
        option: Question.option,
        solution: Question.solution,
        status: Question.status,
      });
    }
  }, [questionID, Question]);

  const questionUploadMethod = () => {
    dispacth(quectionUpdate({ ...(data as Question) }));
    router.push("/components/question");
  };

  const questionDelete = () => {
    dispacth(quectionDelete({ ...(data as Question) }));
    console.log(questionID);
    router.push("/components/question");
  };

  return (
    <Box
      sx={{
        marginLeft: 50,
        bgcolor: "#ECFFE6",
        width: 300,
        padding: 10,
        borderRadius: 5,
      }}
    >
      <p>Question</p>
      <TextField
        placeholder="question"
        defaultValue={Question?.name}
        onChange={(event) =>
          setdata({ ...data, id: questionID, name: String(event.target.value) })
        }
      />
      <p>Question answer</p>
      <TextField
        placeholder="Answer"
        onChange={(event) =>
          setdata({ ...data, id: questionID, answer: event.target.value })
        }
        defaultValue={Question?.answer}
      />

      <p>Question option</p>
      <TextField
        placeholder="option"
        onChange={(event) =>
          setdata({
            ...data,
            id: questionID,
            option: event.target.value.split(",").map((item) => item.trim()),
          })
        }
        defaultValue={Question?.option}
      />
      <p>Question solution</p>

      <TextField
        multiline
        placeholder="Solution"
        onChange={(event) =>
          setdata({ ...data, id: questionID, solution: event.target.value })
        }
        defaultValue={Question?.solution}
      />
      <Box sx={{ width: 200, mt: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">STATUS</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={Question?.status}
            value={data?.status}
            label="Status"
            onChange={(event) =>
              setdata({
                ...data,
                id: questionID,
                status: event.target.value as QuestionStatus,
              })
            }
          >
            <MenuItem value={"EASY"}>EASY</MenuItem>
            <MenuItem value={"MEDIUM"}>MEDIUM</MenuItem>
            <MenuItem value={"DIFFICULT"}>DIFFICULT</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button
        onClick={questionUploadMethod}
        sx={{ mt: 2, bgcolor: "#399918" }}
        variant="contained"
      >
        Update
      </Button>

      <Button
        onClick={questionDelete}
        sx={{ mt: 2, bgcolor: "red" }}
        variant="contained"
      >
        DELETE
      </Button>
    </Box>
  );
};

export default QuestionDeatial;
