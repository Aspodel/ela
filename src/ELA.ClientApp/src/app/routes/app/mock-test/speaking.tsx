
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { MockTestLayout } from '@/features/mock-test/components/MockTestLayout'
import { SpeakingSection } from '@/features/mock-test/components/SpeakingSection'
import { MOCK_SPEAKING_QUESTIONS } from '@/features/mock-test/data/mock-questions'

export const Route = createFileRoute('/app/mock-test/speaking')({
    component: SpeakingPage,
})

function SpeakingPage() {
    const navigate = useNavigate()

    const handleComplete = (recordings: Record<string, boolean>) => {
        console.log('Speaking Finished:', recordings)
        alert('Speaking Section Completed! Recordings logged to console (simulated).')
        navigate({ to: '..' })
    }

    return (
        <MockTestLayout
            title="Speaking Section"
            timeLeft="20:00"
            progress={50}
        >
            <SpeakingSection
                questions={MOCK_SPEAKING_QUESTIONS}
                onComplete={handleComplete}
            />
        </MockTestLayout>
    )
}
