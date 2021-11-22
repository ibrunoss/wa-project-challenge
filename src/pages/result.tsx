import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import TemplateLayout from "../components/Template/Layout";
import type { QuestionAnsweredInterface } from "../@types/question";
import useApp from "../hooks/useApp";
import { Typography } from "@mui/material";

const Result: NextPage = () => {
  const { questionsAnswered, quizNotCompleted } = useApp();

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<QuestionAnsweredInterface[]>();
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  useEffect(() => {
    const localAnswered = localStorage.getItem("lastResult");

    if (quizNotCompleted && localAnswered === null) {
      router.push("/");
      return;
    }

    if (quizNotCompleted && localAnswered) {
      try {
        setReport(JSON.parse(localAnswered));
      } catch (error) {
        console.error(error);
      }
      return;
    }
    localStorage.removeItem("lastResult");
    localStorage.setItem("lastResult", JSON.stringify(questionsAnswered));
    setReport([...questionsAnswered]);
  }, []);

  useEffect(() => {
    const answeredCorrect =
      report?.reduce((acc, curr) => (curr.got_right ? acc + 1 : acc), 0) || 0;
    const answeredWrong = (report?.length || 0) - answeredCorrect;
    setCorrect(answeredCorrect);
    setWrong(answeredWrong);
    setLoading(false);
  }, [report]);

  function createData(
    question: string,
    correct: string,
    youChoose: string,
    gotRight: boolean
  ) {
    return { question, correct, youChoose, gotRight };
  }

  const rows =
    report?.map((answer) =>
      createData(
        answer.question.toString(),
        answer.correct_answer,
        answer.chosen_answer,
        answer.got_right
      )
    ) || [];

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
        {loading ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Skeleton
                animation="wave"
                variant="circular"
                width={100}
                height={100}
              />

              <Skeleton
                animation="wave"
                variant="circular"
                width={100}
                height={100}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={20}
              />

              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={20}
              />
            </Box>
            <Skeleton
              animation="wave"
              width="100%"
              sx={{ minWidth: "350px", maxWidth: "500px" }}
              height={400}
            />
            <Skeleton
              animation="wave"
              sx={{ minWidth: "100px", maxWidth: "250px" }}
              height={40}
            />
          </>
        ) : null}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            color: "#ffffff",
          }}
        >
          <Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                background: "#2baa6d",
              }}
              width={100}
              height={100}
            >
              <Typography
                mb={0}
                variant="h4"
                component="div"
                gutterBottom
                align="center"
              >
                {correct}
              </Typography>
            </Box>
            <Typography
              mt={1}
              width={100}
              variant="h5"
              component="div"
              gutterBottom
              align="center"
              color="#2baa6d"
            >
              Hit{+correct > 1 ? "s" : ""}
            </Typography>
          </Box>
          <Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                background: "#e44a4c",
              }}
              width={100}
              height={100}
            >
              <Typography
                mb={0}
                variant="h4"
                component="div"
                gutterBottom
                align="center"
              >
                {wrong}
              </Typography>
            </Box>

            <Typography
              width={100}
              mt={1}
              variant="h5"
              component="div"
              gutterBottom
              align="center"
              color="#e44a4c"
            >
              Error{+wrong > 1 ? "s" : ""}
            </Typography>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell align="right">Correct Answer</TableCell>
                <TableCell align="right">Chosen Answer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.question}
                  sx={{
                    color: row.gotRight ? "#2baa6d" : "#e44a4c",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      color: row.gotRight ? "#2baa6d" : "#e44a4c",
                    }}
                  >
                    {row.question}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: row.gotRight ? "#2baa6d" : "#e44a4c",
                    }}
                  >
                    {row.correct}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: row.gotRight ? "#2baa6d" : "#e44a4c",
                    }}
                  >
                    {row.youChoose}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2}>
          <Link href="/" passHref>
            <Button variant="contained">Home</Button>
          </Link>
        </Box>
      </Box>
    </TemplateLayout>
  );
};

export default Result;
