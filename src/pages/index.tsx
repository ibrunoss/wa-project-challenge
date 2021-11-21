import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import TemplateLayout from "../components/Template/Layout";
import NumberField from "../components/NumberField/NumberField";
import useApp from "../hooks/useApp";
import {
  QuestionAnsweredInterface,
  QuestionInterface,
} from "../@types/question";

const Home: NextPage = () => {
  const [noLocalStorage, setNoLocalStorage] = useState(true);
  const {
    quantity,
    setQuantity,
    setQuizNotCompleted,
    setCurrentQuestionID,
    setQuestions,
    setQuestionsAnswered,
  } = useApp();

  useEffect(() => {
    const localAnswered = localStorage.getItem("lastResult");
    setQuizNotCompleted(true);

    const currentQuestionIDDefault = 0;
    const quantityDefault = "";
    const questionsDefault: QuestionInterface[] = [];
    const questionsAnsweredDefault: QuestionAnsweredInterface[] = [];
    const quizNotCompletedDefault = true;

    setQuantity(quantityDefault);
    setQuestions(questionsDefault);
    setQuestionsAnswered(questionsAnsweredDefault);
    setCurrentQuestionID(currentQuestionIDDefault);
    setQuizNotCompleted(quizNotCompletedDefault);

    setNoLocalStorage(localAnswered === null);
  }, []);

  return (
    <TemplateLayout>
      <Box
        sx={{
          width: "100%",
          minWidth: 300,
          minHeight: 500,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          mb="0"
          variant="h4"
          component="div"
          gutterBottom
          align="center"
        >
          How many questions do you want to answer?
        </Typography>
        <NumberField value={quantity} onChange={setQuantity} />

        <Stack
          spacing={2}
          direction="row"
          sx={{ display: "flex", width: "100%", height: "60px" }}
        >
          <Link href="/result" passHref>
            <Button
              sx={{ flex: 1 }}
              variant="outlined"
              disabled={noLocalStorage}
            >
              Last result
            </Button>
          </Link>

          <Link href="/confirm" passHref>
            <Button
              sx={{ flex: 1 }}
              variant="contained"
              disabled={quantity === ""}
            >
              Next
            </Button>
          </Link>
        </Stack>
      </Box>
    </TemplateLayout>
  );
};

export default Home;
