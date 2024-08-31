import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Question, QuestionStatus } from "@prisma/client";
import React from "react";
import { EmailOutlined } from "@mui/icons-material";
import { stat } from "fs/promises";

export interface  Pros {
  newQuection: Question;
  setNewQuection: Dispatch<SetStateAction<Question>>;
}

const NewQuection = ({ newQuection, setNewQuection }: Pros) => {
  const handleOptionChange = (index: number, event: any) => {
    const newOptions = [...(newQuection.option as (string | number)[])];
    newOptions[index] = event.target.value;
    setNewQuection({ ...newQuection, option: newOptions });
  };

  const addOption = () => {
    setNewQuection({
      ...newQuection,
      option: [...(newQuection.option as (string | number)[]), ""],
    });
  };

  const removeOption = (index: number) => {
    const newOptions = (newQuection.option as (string | number)[]).filter(
      (_, i) => i !== index
    );
    setNewQuection({ ...newQuection, option: newOptions });
  };

// Selected State
//  const [status, setStatus] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {

setNewQuection({...newQuection,status:event.target.value as QuestionStatus})



  };
useEffect(() => {
    console.log("NewQuection state updated:", newQuection);
  }, [newQuection]);
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <TextField
        multiline
        placeholder="Question"
        value={newQuection.name}
        onChange={(even) => {
          setNewQuection({ ...newQuection, name: even.target.value });
        }}
      />

      <TextField
        multiline
        placeholder="Answer"
        value={newQuection.answer}
        onChange={(even) => {
          setNewQuection({ ...newQuection, answer: even.target.value });
        }}
      />

      <TextField
        multiline
        placeholder="Solution"
        value={newQuection.solution}
        onChange={(even) => {
          setNewQuection({ ...newQuection, solution: even.target.value });
        }}
      />

      {Array.isArray(newQuection.option) &&
        newQuection.option.map((opt, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <TextField
              multiline
              placeholder={`Option ${index + 1}`}
              value={opt as string}
              onChange={(event) => handleOptionChange(index, event)}
            />
            <IconButton onClick={() => removeOption(index)} color="secondary">
              <DeleteIcon />
            </IconButton>

          </Box>
        ))}

      <Button
        variant="contained"

        sx={{
          bgcolor: "#399918",
          "&:hover": {
            bgcolor: "#2e7d32", // Change this to the desired hover color
          },
        }}
        onClick={addOption}
      >
        Add Option
      </Button>


    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">STATUS</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={newQuection.status || "EASY"}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={"EASY"}>EASY</MenuItem>
          <MenuItem value={"MEDIUM"}>MEDIUM</MenuItem>
          <MenuItem value={"DIFFICULT"}>DIFFICULT</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </Box>
  );
};

export default NewQuection;
