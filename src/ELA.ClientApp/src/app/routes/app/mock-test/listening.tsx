
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { MockTestLayout } from '@/features/mock-test/components/MockTestLayout'
import { ListeningSection } from '@/features/mock-test/components/ListeningSection'
import { MOCK_LISTENING_QUESTIONS } from '@/features/mock-test/data/mock-questions'

export const Route = createFileRoute('/app/mock-test/listening')({
    component: ListeningPage,
})

function ListeningPage() {
    const navigate = useNavigate()

    const handleComplete = (answers: Record<string, number>) => {
        console.log('Listening Finished:', answers)
        // In a real app, we would save the results here or navigate to a result page
        alert('Listening Section Completed! Answers logged to console.')
        navigate({ to: '..' })
    }

    return (
        <MockTestLayout
            title="Listening Section"
            timeLeft="45:00"
            progress={33}
        >
            <ListeningSection
                questions={MOCK_LISTENING_QUESTIONS}
                onComplete={handleComplete}
            />
        </MockTestLayout>
    )
}
