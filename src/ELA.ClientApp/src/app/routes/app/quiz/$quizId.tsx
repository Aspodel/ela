import { createFileRoute } from '@tanstack/react-router'
import { QuizSession } from '@/features/quiz';

export const Route = createFileRoute('/app/quiz/$quizId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { quizId } = Route.useParams()
  return <QuizSession quizId={quizId} />
}
