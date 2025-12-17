
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { MockTestLayout } from '@/features/mock-test/components/MockTestLayout'
import { ReadingSection } from '@/features/mock-test/components/ReadingSection'
import { MOCK_READING_QUESTIONS } from '@/features/mock-test/data/mock-questions'

export const Route = createFileRoute('/app/mock-test/reading')({
    component: ReadingPage,
})

function ReadingPage() {
    const navigate = useNavigate()

    const handleComplete = (answers: Record<string, number>) => {
        console.log('Reading Finished:', answers)
        alert('Reading Section Completed! Answers logged to console.')
        navigate({ to: '..' })
    }

    return (
        <MockTestLayout
            title="Reading Section"
            timeLeft="75:00"
            progress={10}
        >
            <ReadingSection
                questions={MOCK_READING_QUESTIONS}
                onComplete={handleComplete}
            />
        </MockTestLayout>
    )
}
