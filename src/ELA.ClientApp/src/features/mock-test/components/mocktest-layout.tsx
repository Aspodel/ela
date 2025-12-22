
import type { PropsWithChildren } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface MockTestLayoutProps extends PropsWithChildren {
    title: string;
    progress?: number;
    timeLeft?: string;
    onExit?: () => void;
}

export function MockTestLayout({ title, progress = 0, timeLeft, children }: MockTestLayoutProps) {
    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b shadow-sm z-10">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold text-primary">{title}</h1>
                </div>

                <div className="flex items-center space-x-6">
                    {timeLeft && (
                        <div className="flex items-center space-x-2 text-lg font-medium text-amber-600 dark:text-amber-500">
                            <Clock className="w-5 h-5" />
                            <span>{timeLeft}</span>
                        </div>
                    )}

                    <div className="flex items-center space-x-2">
                        <Button variant="outline" asChild>
                            <Link to="/app/mock-test">Exit Test</Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Progress Bar (Optional) */}
            {progress > 0 && (
                <div className="h-1 w-full bg-gray-200 dark:bg-gray-700">
                    <div
                        className="h-full bg-primary transition-all duration-300 ease-in-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto p-6 md:p-8 container mx-auto max-w-5xl">
                {children}
            </main>
        </div>
    );
}
