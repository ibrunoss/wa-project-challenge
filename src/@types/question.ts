export interface QuestionInterface {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionAnsweredInterface extends QuestionInterface {
  got_right: boolean;
  chosen_answer: string;
}

export interface QuestionApiResponseInterface {
  response_code: number;
  results: QuestionInterface[];
}
