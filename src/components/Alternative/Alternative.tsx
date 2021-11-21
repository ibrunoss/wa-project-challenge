import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  AlternativeStyledFront,
  AlternativeStyledLabel,
  AlternativeStyledBack,
  AlternativeStyledContent,
} from "./AlternativeStyled";
import useApp from "../../hooks/useApp";

interface AlternativeProps {
  letter: string;
  text: string;
  onClick: () => void;
  isRight?: boolean;
}

const Alternative = (props: AlternativeProps) => {
  const { isRight, text, letter, onClick } = props;
  const [clicked, setClicked] = useState(false);
  const { quizNotCompleted } = useApp();

  const handleClick = () => {
    if (quizNotCompleted) {
      setClicked(true);
      setTimeout(() => {
        quizNotCompleted && setClicked(false);
        onClick();
      }, 900);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        height: "90px",
        margin: "10px",
        width: "80%",
        minWidth: "350px",
        cursor: "pointer",
        perspective: "1000px",
      }}
      onClick={handleClick}
    >
      <AlternativeStyledContent clicked={clicked}>
        <AlternativeStyledFront>
          <AlternativeStyledLabel>{letter}</AlternativeStyledLabel>
          <Typography variant="body1" component="div">
            {decodeURIComponent(encodeURIComponent(text))}
          </Typography>
        </AlternativeStyledFront>
        <AlternativeStyledBack isRight={isRight}>
          <div> {isRight ? "You're right." : "You missed."}</div>
        </AlternativeStyledBack>
      </AlternativeStyledContent>
    </Box>
  );
};

export default Alternative;
