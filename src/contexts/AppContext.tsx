import { createContext, useState } from "react";

import type {
  QuestionInterface,
  QuestionAnsweredInterface,
} from "../@types/question";

export interface AppContextInterface {
  currentQuestionID: number;
  quantity: string;
  questions: QuestionInterface[];
  questionsAnswered: QuestionAnsweredInterface[];
  quizNotCompleted: boolean;
  setQuantity: (value: string) => void;
  setQuestions: (value: QuestionInterface[]) => void;
  setQuestionsAnswered: (value: QuestionAnsweredInterface[]) => void;
  setCurrentQuestionID: (value: number) => void;
  setQuizNotCompleted: (value: boolean) => void;
}

export const AppContext = createContext<AppContextInterface>({
  currentQuestionID: 0,
  quantity: "",
  questions: [],
  questionsAnswered: [],
  quizNotCompleted: true,
  setQuantity: (value: string) => undefined,
  setQuestions: (value: QuestionInterface[]) => undefined,
  setQuestionsAnswered: (value: QuestionAnsweredInterface[]) => undefined,
  setCurrentQuestionID: (value: number) => undefined,
  setQuizNotCompleted: (value: boolean) => undefined,
});

export const AppContextProvider: React.FC = (props) => {
  const { children } = props;
  const [currentQuestionID, setCurrentQuestionID] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [questionsAnswered, setQuestionsAnswered] = useState<
    QuestionAnsweredInterface[]
  >([]);
  const [questions, setQuestions] = useState<QuestionInterface[]>([]);
  const [quizNotCompleted, setQuizNotCompleted] = useState(true);

  return (
    <AppContext.Provider
      value={{
        currentQuestionID,
        questionsAnswered,
        quantity,
        questions,
        quizNotCompleted,
        setCurrentQuestionID,
        setQuestionsAnswered,
        setQuantity,
        setQuestions,
        setQuizNotCompleted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
