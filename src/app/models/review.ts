import { QuizItem } from './quiz-item';

export interface Review {
  id?: number;
  idQuiz: number;
  date: string;
  review: string;
  rating: number;
  userId: number;
}
