
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { MockTestLayout } from '@/features/mock-test/components/MockTestLayout'
import { WritingSection } from '@/features/mock-test/components/WritingSection'
import { MOCK_WRITING_QUESTIONS } from '@/features/mock-test/data/mock-questions'

export const Route = createFileRoute('/app/mock-test/writing')({
    component: WritingPage,
})

function WritingPage() {
    const navigate = useNavigate()

    const handleComplete = (essays: Record<string, string>) => {
        console.log('Writing Finished:', essays)
        alert('Writing Section Completed! Essays logged to console.')
        navigate({ to: '..' })
    }

    return (
        <MockTestLayout
            title="Writing Section"
            timeLeft="60:00"
            progress={25}
        >
            <WritingSection
                questions={MOCK_WRITING_QUESTIONS}
                onComplete={handleComplete}
            />
        </MockTestLayout>
    )
}
