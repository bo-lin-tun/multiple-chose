import { Card, CardContent, Typography } from "@mui/material";
import { Question } from "@prisma/client";
import Link from "next/link";

interface pros {
  Question: Question;
  href: string | object;
}
const QuestionCard = ({ Question, href }: pros) => {
  return (
    <Link
      style={{ textDecoration: "none", color: "black" }}
      key={Question.id}
      href={href}
    >
      <CardContent
        sx={{
          bgcolor: "#ECFFE6",
          margin: 1,
          borderRadius: 3,
        }}
      >
        <Typography>
          {Question.id}
          <p></p>
          {Question.name}
        </Typography>
      </CardContent>
    </Link>
  );
};

export default QuestionCard;
