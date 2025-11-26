import { createFileRoute } from '@tanstack/react-router'
import { QuizList } from '@/features/quiz';

export const Route = createFileRoute('/app/quiz/')({
  component: QuizList,
})
