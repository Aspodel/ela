'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A simple area chart';

const chartData = [
  { day: 'Nov 10', words: 18 },
  { day: 'Nov 11', words: 25 },
  { day: 'Nov 12', words: 24 },
  { day: 'Nov 13', words: 22 },
  { day: 'Nov 14', words: 30 },
  { day: 'Nov 15', words: 28 },
  { day: 'Nov 16', words: 32 },
];

const chartConfig = {
  words: {
    label: 'Words learned',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function ChartsGrid() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Learning Journey</CardTitle>
          <CardDescription>
            Showing your progress over the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='day'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(4, 7)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator='line' />}
              />
              <defs>
                <linearGradient id='gradWords' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='oklch(0.5393 0.2713 286.7462)' />
                  <stop offset='100%' stopColor='rgba(124,58,237,0.05)' />
                </linearGradient>
              </defs>
              <Area
                dataKey='words'
                type='natural'
                fill='url(#gradWords)'
                fillOpacity={0.4}
                stroke='var(--chart-2)'
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className='flex w-full items-start gap-2 text-sm'>
            <div className='grid gap-2'>
              <div className='flex items-center gap-2 leading-none font-medium'>
                Trending up by 5.2% this week <TrendingUp className='h-4 w-4' />
              </div>
              <div className='text-muted-foreground flex items-center gap-2 leading-none'>
                124 words learned this week
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
