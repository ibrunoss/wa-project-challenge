import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import type { QuestionInterface } from "../../@types/question";
import useApp from "../../hooks/useApp";
import Alternative from "../../components/Alternative/Alternative";

const letters = ["A", "B", "C", "D"];

interface QuestionProps {
  question: QuestionInterface;
  onResponse: (alternative: string) => void;
}

const Question = (props: QuestionProps) => {
  const { question, onResponse } = props;
  const { quantity } = useApp();

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
        <Alternative
          isRight
          text={question.correct_answer}
          letter={letters[0]}
          onClick={() => onResponse(question.correct_answer)}
        />
        {question.incorrect_answers.map((alternative, k) => (
          <Alternative
            key={k}
            text={alternative}
            letter={letters[k + 1]}
            onClick={() => onResponse(alternative)}
          />
        ))}
      </>
    </Box>
  );
};

export default Question;
