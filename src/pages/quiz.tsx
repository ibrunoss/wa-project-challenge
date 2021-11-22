import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import TemplateLayout from "../components/Template/Layout";
import useApp from "../hooks/useApp";
import Question from "../components/Question/Question";

const Quiz: NextPage = () => {
  const {
    currentQuestionID,
    setCurrentQuestionID,
    quantity,
    questions,
    questionsAnswered,
    setQuestionsAnswered,
    quizNotCompleted,
    setQuizNotCompleted,
  } = useApp();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const noQuantity = +quantity < 1;

    if (noQuantity) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const noQuestions: boolean = questions.length < 1;

    setLoading(noQuestions);
  }, [questions]);
  useEffect(() => {
    const completed = !quizNotCompleted;

    if (completed) {
      router.push("/result");
    }
  }, [quizNotCompleted]);

  const answerQuestion = (chosenAnswer: string) => {
    const currentQuestion = questions[currentQuestionID];

    const chosen_answer = chosenAnswer;
    const got_right = currentQuestion.correct_answer === chosenAnswer;

    setQuestionsAnswered([
      ...questionsAnswered,
      { ...currentQuestion, chosen_answer, got_right },
    ]);

    const nextQuestionID = currentQuestionID + 1;

    const hasNextQuestion = nextQuestionID < questions.length;

    hasNextQuestion
      ? setCurrentQuestionID(nextQuestionID)
      : setQuizNotCompleted(false);
  };

  return (
    <TemplateLayout>
      <Box
        sx={{
          width: "100%",
          minWidth: 300,
          minHeight: 400,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {loading ? (
          <>
            <Skeleton animation="wave" width={200} height={60} />

            <Skeleton
              animation="wave"
              width="100%"
              sx={{ minWidth: "350px", maxWidth: "500px" }}
              height={100}
            />
            <Skeleton
              animation="wave"
              width="100%"
              sx={{ minWidth: "350px", maxWidth: "500px" }}
              height={100}
            />
            <Skeleton
              animation="wave"
              width="100%"
              sx={{ minWidth: "350px", maxWidth: "500px" }}
              height={100}
            />
            <Skeleton
              animation="wave"
              width="100%"
              sx={{ minWidth: "350px", maxWidth: "500px" }}
              height={100}
            />
          </>
        ) : (
          <>
            {quizNotCompleted ? (
              <Question
                question={questions[currentQuestionID]}
                onResponse={answerQuestion}
              />
            ) : (
              <h1>Loading result...</h1>
            )}
          </>
        )}
      </Box>
    </TemplateLayout>
  );
};

export default Quiz;
