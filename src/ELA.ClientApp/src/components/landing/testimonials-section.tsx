import { Marquee } from '@/components/marquee';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Testimonial = {
  name: string;
  meta: string;
  quote: string;
  avatar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sofia Alvarez',
    meta: 'Spain — TOEFL +8',
    quote:
      'The AI-made vocab lists saved me hours of research. I passed my TOEFL speaking section after 3 months of daily practice.',
    avatar:
      'https://images.pexels.com/photos/5901843/pexels-photo-5901843.jpeg',
  },
  {
    name: 'James Lee',
    meta: 'USA — Business vocab 420',
    quote:
      'Flashcards tailored to what I forget made learning feel effortless. I speak more confidently at work.',

    avatar: 'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg',
  },
  {
    name: 'Amina Khalid',
    meta: 'UAE — Mock test 88%',
    quote:
      'Mock tests mirrored the real exam and the AI feedback fixed my recurring grammar mistakes.',
    avatar:
      'https://cdn.pixabay.com/photo/2018/01/06/09/25/hijab-3064633_1280.jpg',
  },
  {
    name: 'Luca Bianchi',
    meta: 'Italy — IELTS 7.5',
    quote:
      'The adaptive quizzes helped me identify my weak spots and improve my score significantly.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    name: 'Mei Wong',
    meta: 'Singapore — HSK 5',
    quote:
      'The personalized vocabulary lists helped me master HSK 5 vocabulary quickly and confidently.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  },
  {
    name: 'Carlos Mendes',
    meta: 'Brazil — DELE B2',
    quote:
      'The DELE B2 practice tests and personalized feedback helped me pass with confidence.',
    avatar:
      'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
  },
];

function ReviewCard({ name, meta, quote, avatar }: Testimonial) {
  return (
    <Card className='border-none'>
      <CardHeader className='flex items-center gap-3'>
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className='w-12 h-12 rounded-full object-cover'
        />
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription className='text-md'>{meta}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className='text-lg text-muted-foreground max-w-xs leading-6'>
          “{quote}”
        </blockquote>
      </CardContent>
    </Card>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id='testimonials'
      className='bg-whites dark:bg-transparent py-24 scroll-mt-14'
    >
      <div className='max-w-[1536px] mx-auto px-6'>
        <div className='mx-auto text-center max-w-2xl'>
          <h2 className='text-3xl font-bold'>Real learners. Real results.</h2>
          <p className='mt-2 text-muted-foreground'>
            Stories from learners who used AI to accelerate progress.
          </p>
        </div>

        <div className='relative mt-8 overflow-hidden py-8'>
          <Marquee pauseOnHover>
            {TESTIMONIALS.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
          <div className='from-gray-50 dark:from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r'></div>
          <div className='from-gray-50 dark:from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l'></div>
        </div>
      </div>
    </section>
  );
}
