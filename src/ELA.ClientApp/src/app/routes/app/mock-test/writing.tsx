import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { aiService } from '@/api/ai-service'
import type { WritingQuestion } from '@/features/mock-test/data/mock-questions'
import { MockTestLayout } from '@/features/mock-test/components/MockTestLayout'
import { WritingSection } from '@/features/mock-test/components/WritingSection'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/app/mock-test/writing')({
    component: WritingPage,
})

function WritingPage() {
    const navigate = useNavigate()
    const [questions, setQuestions] = useState<WritingQuestion[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setIsLoading(true)
                const data = await aiService.generateMockTestQuestions<WritingQuestion>('writing', 2)
                setQuestions(data)
            } catch (err) {
                console.error('Failed to fetch writing questions:', err)
                setError('Failed to load questions. Please try again.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchQuestions()
    }, [])

    const handleComplete = (essays: Record<string, string>) => {
        console.log('Writing Finished:', essays)
        alert('Writing Section Completed! Essays logged to console.')
        navigate({ to: '..' })
    }

    if (isLoading) {
        return (
            <MockTestLayout title="Writing Section" timeLeft="--:--" progress={0}>
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-lg font-medium text-muted-foreground">Generating AI Questions...</p>
                </div>
            </MockTestLayout>
        )
    }

    if (error) {
        return (
            <MockTestLayout title="Writing Section" timeLeft="--:--" progress={0}>
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
                    <p className="text-xl font-semibold text-destructive">{error}</p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
            </MockTestLayout>
        )
    }

    return (
        <MockTestLayout
            title="Writing Section"
            timeLeft="60:00"
            progress={25}
        >
            <WritingSection
                questions={questions}
                onComplete={handleComplete}
            />
        </MockTestLayout>
    )
}
