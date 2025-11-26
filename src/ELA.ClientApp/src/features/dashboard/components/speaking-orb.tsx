import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
type SpeakingOrbProps = {
    isListening?: boolean;
    isSpeaking?: boolean;
    onToggleListening?: () => void;
    onToggleSpeaking?: () => void;
};
interface Particle {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: { x: number; y: number };
    alpha: number;
}
export function SpeakingOrb({
    isListening = false,
    isSpeaking = false,
    onToggleListening,
    onToggleSpeaking,
}: SpeakingOrbProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const [particles, setParticles] = useState<Particle[]>([]);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const resizeCanvas = () => {
            const container = canvas.parentElement;
            if (container) {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
            }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        // Initialize particles
        const particleCount = 50;
        const newParticles: Particle[] = [];
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const distance = 40 + Math.random() * 20;
            newParticles.push({
                x: centerX + Math.cos(angle) * distance,
                y: centerY + Math.sin(angle) * distance,
                radius: 2 + Math.random() * 3,
                color: `hsl(${260 + Math.random() * 60}, 70%, 60%)`,
                velocity: {
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5,
                },
                alpha: 0.3 + Math.random() * 0.7,
            });
        }
        setParticles(newParticles);
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let time = 0;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            // Draw outer glow rings
            const glowIntensity = isSpeaking ? 1.5 : isListening ? 1.2 : 1;
            for (let i = 3; i > 0; i--) {
                const radius = 80 + i * 30 + Math.sin(time * 0.02 + i) * 10;
                const gradient = ctx.createRadialGradient(
                    centerX,
                    centerY,
                    radius - 20,
                    centerX,
                    centerY,
                    radius
                );
                if (isSpeaking) {
                    gradient.addColorStop(0, 'rgba(168, 85, 247, 0)');
                    gradient.addColorStop(0.5, `rgba(168, 85, 247, ${0.1 / i})`);
                    gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
                } else if (isListening) {
                    gradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
                    gradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.1 / i})`);
                    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
                } else {
                    gradient.addColorStop(0, 'rgba(139, 92, 246, 0)');
                    gradient.addColorStop(0.5, `rgba(139, 92, 246, ${0.05 / i})`);
                    gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
                }
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            // Draw main orb with dynamic radius
            const baseRadius = 60;
            const pulseAmount = isSpeaking ? 15 : isListening ? 10 : 5;
            const pulseSpeed = isSpeaking ? 0.08 : isListening ? 0.05 : 0.03;
            const orbRadius = baseRadius + Math.sin(time * pulseSpeed) * pulseAmount;
            // Create gradient for main orb
            const orbGradient = ctx.createRadialGradient(
                centerX - 20,
                centerY - 20,
                0,
                centerX,
                centerY,
                orbRadius
            );
            if (isSpeaking) {
                orbGradient.addColorStop(0, 'rgba(196, 181, 253, 1)');
                orbGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.9)');
                orbGradient.addColorStop(1, 'rgba(126, 34, 206, 0.8)');
            } else if (isListening) {
                orbGradient.addColorStop(0, 'rgba(147, 197, 253, 1)');
                orbGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.9)');
                orbGradient.addColorStop(1, 'rgba(29, 78, 216, 0.8)');
            } else {
                orbGradient.addColorStop(0, 'rgba(167, 139, 250, 1)');
                orbGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.9)');
                orbGradient.addColorStop(1, 'rgba(109, 40, 217, 0.8)');
            }
            ctx.fillStyle = orbGradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, orbRadius, 0, Math.PI * 2);
            ctx.fill();
            // Draw particles
            particles.forEach((particle) => {
                // Update particle position
                particle.x += particle.velocity.x * glowIntensity;
                particle.y += particle.velocity.y * glowIntensity;
                // Keep particles within bounds and orbit around center
                const dx = particle.x - centerX;
                const dy = particle.y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 120 || distance < 30) {
                    const angle = Math.atan2(dy, dx);
                    const targetDistance = 60 + Math.random() * 40;
                    particle.x = centerX + Math.cos(angle) * targetDistance;
                    particle.y = centerY + Math.sin(angle) * targetDistance;
                }
                // Draw particle
                ctx.fillStyle = particle.color.replace('60%)', `60%, ${particle.alpha})`);
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fill();
                // Add glow to particles when speaking
                if (isSpeaking || isListening) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = particle.color;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            });
            // Draw waveform when speaking
            if (isSpeaking) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                const waveCount = 3;
                for (let w = 0; w < waveCount; w++) {
                    for (let i = 0; i < 360; i += 5) {
                        const angle = (i * Math.PI) / 180;
                        const waveOffset =
                            Math.sin(time * 0.1 + i * 0.05 + w * 2) * (10 + w * 5);
                        const radius = orbRadius + waveOffset;
                        const x = centerX + Math.cos(angle) * radius;
                        const y = centerY + Math.sin(angle) * radius;
                        if (i === 0) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }
                    }
                    ctx.closePath();
                    ctx.stroke();
                }
            }
            time++;
            animationFrameRef.current = requestAnimationFrame(animate);
        };
        animate();
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [particles, isSpeaking, isListening]);
    return (
        <section className='bg-card rounded-lg p-6 shadow-sm border border-border'>
            <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-xl font-semibold'>AI Voice Assistant</h2>
                        <p className='text-sm text-muted-foreground mt-1'>
                            {isSpeaking
                                ? 'Speaking...'
                                : isListening
                                    ? 'Listening...'
                                    : 'Ready to help you learn'}
                        </p>
                    </div>
                    <div className='flex gap-2'>
                        <Button
                            variant={isListening ? 'default' : 'outline'}
                            size='icon'
                            onClick={onToggleListening}
                            className='transition-all duration-300'
                        >
                            {isListening ? (
                                <Mic className='h-4 w-4 animate-pulse' />
                            ) : (
                                <MicOff className='h-4 w-4' />
                            )}
                        </Button>
                        <Button
                            variant={isSpeaking ? 'default' : 'outline'}
                            size='icon'
                            onClick={onToggleSpeaking}
                            className='transition-all duration-300'
                        >
                            {isSpeaking ? (
                                <Volume2 className='h-4 w-4 animate-pulse' />
                            ) : (
                                <VolumeX className='h-4 w-4' />
                            )}
                        </Button>
                    </div>
                </div>
                {/* Canvas Container */}
                <div className='relative w-full aspect-video bg-linear-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-lg overflow-hidden'>
                    <canvas
                        ref={canvasRef}
                        className='w-full h-full'
                        style={{ display: 'block' }}
                    />
                    {/* Status overlay */}
                    <div className='absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border'>
                        <p className='text-xs font-medium'>
                            {isSpeaking && (
                                <span className='flex items-center gap-2'>
                                    <span className='w-2 h-2 bg-purple-500 rounded-full animate-pulse' />
                                    AI is speaking
                                </span>
                            )}
                            {isListening && !isSpeaking && (
                                <span className='flex items-center gap-2'>
                                    <span className='w-2 h-2 bg-blue-500 rounded-full animate-pulse' />
                                    Listening to you
                                </span>
                            )}
                            {!isSpeaking && !isListening && (
                                <span className='flex items-center gap-2'>
                                    <span className='w-2 h-2 bg-violet-500 rounded-full' />
                                    Idle
                                </span>
                            )}
                        </p>
                    </div>
                </div>
                {/* Quick actions */}
                <div className='flex gap-2'>
                    <Button
                        variant='secondary'
                        size='sm'
                        className='flex-1'
                        onClick={() => {
                            onToggleListening?.();
                        }}
                    >
                        Start Conversation
                    </Button>
                    <Button variant='outline' size='sm' className='flex-1'>
                        Practice Pronunciation
                    </Button>
                </div>
            </div>
        </section>
    );
}