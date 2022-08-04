export interface Props {
  text: string;
  status: 'correct' | 'incorrect' | 'unanswered';
  isActive: boolean;
}