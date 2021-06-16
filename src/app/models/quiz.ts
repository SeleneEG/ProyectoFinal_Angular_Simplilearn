import { QuizItem } from './quiz-item';

export interface Quizz {
  id?: number;
  authorId: number;
  title: string;
  category: string;
  difficulty: string;
  creationDate: Date;
  elements: QuizItem[];
  authorName?: string;
  averageRating?: number;
}
