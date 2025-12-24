import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { aiService } from '@/api/ai-service'
import type { ListeningQuestion } from '@/features/mock-test/data/mock-questions'
import { MockTestLayout } from '@/features/mock-test/components/mocktest-layout'
import { ListeningSection } from '@/features/mock-test/components/listening-section'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/app/mock-test/listening')({
    component: ListeningPage,
})

function ListeningPage() {
    const navigate = useNavigate()
    const [questions, setQuestions] = useState<ListeningQuestion[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setIsLoading(true)
                const data = await aiService.generateMockTestQuestions<ListeningQuestion>('listening', 3)
                setQuestions(data)
            } catch (err) {
                console.error('Failed to fetch listening questions:', err)
                setError('Failed to load questions. Please try again.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchQuestions()
    }, [])

    const handleComplete = (answers: Record<string, number>) => {
        console.log('Listening Finished:', answers)
        alert('Listening Section Completed! Answers logged to console.')
        navigate({ to: '..' })
    }

    if (isLoading) {
        return (
            <MockTestLayout title="Listening Section" timeLeft="--:--" progress={0}>
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-lg font-medium text-muted-foreground">Generating AI Questions...</p>
                </div>
            </MockTestLayout>
        )
    }

    if (error) {
        return (
            <MockTestLayout title="Listening Section" timeLeft="--:--" progress={0}>
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
                    <p className="text-xl font-semibold text-destructive">{error}</p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
            </MockTestLayout>
        )
    }

    return (
        <MockTestLayout
            title="Listening Section"
            timeLeft="45:00"
            progress={33}
        >
            <ListeningSection
                questions={questions}
                onComplete={handleComplete}
            />
        </MockTestLayout>
    )
}
