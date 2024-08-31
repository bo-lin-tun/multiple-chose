import Head from "next/head";
import Link from "next/link";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchQuestions } from "@/store/slices/questionSlice";
import { useAppDispatch } from "@/store/hooks";
import { url } from "inspector";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundImage:
          'url("https://static.vecteezy.com/system/resources/previews/006/691/884/non_2x/blue-question-mark-background-with-text-space-quiz-symbol-vector.jpg")',

        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Head>
        <title>Home Page</title>
      </Head>
      <Box sx={{ ml: 10 }}>
        <h1 style={{ fontSize: 100 }}>Quiz</h1>
        <nav>
          <Link href="/" passHref>
            <Button variant="contained" sx={{ m: 2 }}>
              Home
            </Button>
          </Link>
          <Link href="components/question" passHref>
            <Button sx={{ m: 2 }} variant="contained">
              Admin
            </Button>
          </Link>

          <Link href="/Easy" passHref>
            <Button sx={{ m: 2 }} variant="contained">
              User
            </Button>
          </Link>
          <Link href="/ImageQuestion" passHref>
            <Button sx={{ m: 2 }} variant="contained">
              Image Questions
            </Button>
          </Link>
        </nav>
      </Box>
    </Box>
  );
}
