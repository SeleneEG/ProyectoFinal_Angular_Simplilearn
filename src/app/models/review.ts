import { QuizItem } from './quiz-item';

export interface Review {
  id?: number;
  idQuiz: number;
  date: string;
  review: string;
  raiting: number;
  userId: number;
}
