
import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Headphones, BookOpen, Mic, PenTool } from 'lucide-react'

export const Route = createFileRoute('/app/mock-test/')({
    component: MockTestLandingPage,
})

function MockTestLandingPage() {
    const skills = [
        {
            id: 'listening',
            title: 'Listening',
            description: '45 minutes • 100 questions',
            icon: Headphones,
            color: 'text-blue-500',
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            path: '/app/mock-test/listening'
        },
        {
            id: 'reading',
            title: 'Reading',
            description: '75 minutes • 100 questions',
            icon: BookOpen,
            color: 'text-green-500',
            bg: 'bg-green-50 dark:bg-green-900/20',
            path: '/app/mock-test/reading'
        },
        {
            id: 'speaking',
            title: 'Speaking',
            description: '20 minutes • 11 questions',
            icon: Mic,
            color: 'text-amber-500',
            bg: 'bg-amber-50 dark:bg-amber-900/20',
            path: '/app/mock-test/speaking'
        },
        {
            id: 'writing',
            title: 'Writing',
            description: '60 minutes • 8 questions',
            icon: PenTool,
            color: 'text-purple-500',
            bg: 'bg-purple-50 dark:bg-purple-900/20',
            path: '/app/mock-test/writing'
        }
    ]

    return (
        <div className="container mx-auto p-8 space-y-8 max-w-5xl">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight">TOEIC Mock Tests</h1>
                <p className="text-xl text-muted-foreground">
                    Select a skill to practice and verify your proficiency level.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill) => (
                    <Card key={skill.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 cursor-pointer">
                        <CardHeader className="pb-4">
                            <div className="flex items-center space-x-4">
                                <div className={`p-4 rounded-xl ${skill.bg} ${skill.color}`}>
                                    <skill.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">{skill.title}</CardTitle>
                                    <CardDescription className="text-base mt-1">{skill.description}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full text-lg h-12">
                                <Link to={skill.path}>Start {skill.title} Test</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t">
                {[
                    { label: 'Real Simulation', desc: 'Timed sections like the real exam' },
                    { label: 'Instant Feedback', desc: 'Get immediate scores for Reading & Listening' },
                    { label: 'Progress Tracking', desc: 'Review your improvement over time' }
                ].map((item, i) => (
                    <div key={i} className="text-center space-y-2">
                        <h3 className="font-semibold text-lg">{item.label}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
