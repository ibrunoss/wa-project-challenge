import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import type { QuestionApiResponseInterface } from "../@types/question";
import TemplateLayout from "../components/Template/Layout";
import useApp from "../hooks/useApp";
import ApiService from "../services/ApiService";

const Confirm: NextPage = () => {
  const { quantity, setQuestions } = useApp();
  const router = useRouter();

  useEffect(() => {
    const noQuantity = +quantity < 1;

    if (noQuantity) {
      router.push("/");
    }
  }, []);

  const getQuestions = async () => {
    router.push("/quiz");
    await ApiService.get<QuestionApiResponseInterface>(
      `api.php?amount=${quantity}`
    )
      .then(({ data }) => {
        const questions = data.results;
        questions && setQuestions([...questions]);
      })
      .catch((error) => console.error(error));
  };

  return (
    <TemplateLayout>
      <Box
        sx={{
          width: "100%",
          minWidth: 300,
          minHeight: 300,
          display: "flex",
          justifyContent: "space-evenly",
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
          Start quiz with {quantity} question{+quantity > 1 ? "s" : ""}?
        </Typography>

        <Stack
          spacing={2}
          direction="row"
          sx={{ display: "flex", width: "100%", height: "60px" }}
        >
          <Button
            sx={{ flex: 1 }}
            variant="outlined"
            onClick={() => router.push("/")}
          >
            Cancel
          </Button>

          <Button
            sx={{ flex: 1 }}
            variant="contained"
            onClick={getQuestions}
            disabled={quantity === ""}
          >
            Start
          </Button>
        </Stack>
      </Box>
    </TemplateLayout>
  );
};

export default Confirm;
