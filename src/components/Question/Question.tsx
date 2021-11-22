import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import type { QuestionInterface } from "../../@types/question";
import Alternative from "../../components/Alternative/Alternative";

import sort from "../../utils/sort";

const letters = ["A", "B", "C", "D"];

interface QuestionProps {
  question: QuestionInterface;
  onResponse: (alternative: string) => void;
}

const Question = (props: QuestionProps) => {
  const { question, onResponse } = props;

  const questions = sort([
    ...question.incorrect_answers,
    question.correct_answer,
  ]);

  return (
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
      <Typography variant="h5" component="div" gutterBottom align="center">
        {question.question}
      </Typography>
      <>
        {questions.map((alternative, k) => (
          <Alternative
            isRight={alternative === question.correct_answer}
            key={k}
            text={alternative}
            letter={letters[k]}
            onClick={() => onResponse(alternative)}
          />
        ))}
      </>
    </Box>
  );
};

export default Question;
