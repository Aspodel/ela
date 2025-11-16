import { Card } from '../ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const timelineData = [
  { day: 'Nov 3', words: 0 },
  { day: 'Nov 4', words: 2 },
  { day: 'Nov 5', words: 5 },
  { day: 'Nov 6', words: 10 },
  { day: 'Nov 7', words: 8 },
  { day: 'Nov 8', words: 12 },
  { day: 'Nov 9', words: 20 },
  { day: 'Nov 10', words: 18 },
  { day: 'Nov 11', words: 25 },
  { day: 'Nov 12', words: 24 },
  { day: 'Nov 13', words: 22 },
  { day: 'Nov 14', words: 30 },
  { day: 'Nov 15', words: 28 },
  { day: 'Nov 16', words: 32 },
];

const quizData = [
  { label: 'A1', grammar: 70, vocab: 60, listening: 55, speaking: 50 },
  { label: 'A2', grammar: 72, vocab: 65, listening: 60, speaking: 55 },
  { label: 'B1', grammar: 78, vocab: 72, listening: 66, speaking: 58 },
  { label: 'B2', grammar: 80, vocab: 76, listening: 70, speaking: 60 },
  { label: 'C1', grammar: 85, vocab: 80, listening: 72, speaking: 63 },
  { label: 'C2', grammar: 88, vocab: 83, listening: 76, speaking: 65 },
  { label: 'D1', grammar: 87, vocab: 85, listening: 78, speaking: 68 },
  { label: 'D2', grammar: 90, vocab: 88, listening: 82, speaking: 70 },
];

const retentionData = [
  { interval: '1d', retention: 92 },
  { interval: '3d', retention: 85 },
  { interval: '7d', retention: 78 },
  { interval: '14d', retention: 70 },
  { interval: '30d', retention: 58 },
];

export function ChartsGrid() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6'>
      <Card className='p-4'>
        <div className='text-sm text-slate-400'>Learning Timeline</div>
        <div className='mt-3'>
          <ChartContainer
            id='timeline'
            config={{
              words: { label: 'Words learned', color: 'var(--color-chart-1)' },
            }}
          >
            <ResponsiveContainer>
              <AreaChart
                data={timelineData}
                margin={{ top: 6, right: 12, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id='gradWords' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='rgba(59,130,246,0.6)' />
                    <stop offset='100%' stopColor='rgba(124,58,237,0.05)' />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray='3 3' strokeOpacity={0.06} />
                {/* <XAxis dataKey='day' tick={{ fontSize: 11 }} /> */}
                {/* <YAxis tick={{ fontSize: 11 }} /> */}
                <Tooltip content={<ChartTooltipContent />} />
                <Area
                  type='monotone'   
                  dataKey='words'
                  stroke='#3B82F6'
                  fill='url(#gradWords)'
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </Card>

      <Card className='p-4'>
        <div className='text-sm text-slate-400'>Quiz Performance</div>
        <div className='mt-3'>
          <ChartContainer
            id='quiz'
            config={{
              grammar: { label: 'Grammar' },
              vocab: { label: 'Vocabulary' },
              listening: { label: 'Listening' },
              speaking: { label: 'Speaking' },
            }}
          >
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                data={quizData}
                margin={{ top: 6, right: 12, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray='3 3' strokeOpacity={0.06} />
                <XAxis dataKey='label' tick={{ fontSize: 11 }} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 11 }} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend verticalAlign='top' />
                <Line
                  type='monotone'
                  dataKey='grammar'
                  stroke='#7C3AED'
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type='monotone'
                  dataKey='vocab'
                  stroke='#06B6D4'
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type='monotone'
                  dataKey='listening'
                  stroke='#10B981'
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type='monotone'
                  dataKey='speaking'
                  stroke='#F59E0B'
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </Card>

      <Card className='p-4'>
        <div className='text-sm text-slate-400'>Flashcard Retention</div>
        <div className='mt-3'>
          <ChartContainer
            id='retention'
            config={{
              retention: {
                label: 'Retention %',
                color: 'var(--color-chart-3)',
              },
            }}
          >
            <ResponsiveContainer >
              <LineChart
                data={retentionData}
                margin={{ top: 6, right: 12, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray='3 3' strokeOpacity={0.06} />
                {/* <XAxis dataKey='interval' tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} /> */}
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type='monotone'
                  dataKey='retention'
                  stroke='#06B6D4'
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </Card>
    </div>
  );
}
