import { QuizItem } from './quiz-item';

export interface Quizz {
  id?: number;
  authorId: number;
  name: string;
  category: string;
  difficulty: string;
  creationDate: Date;
  elements: QuizItem[];
}
