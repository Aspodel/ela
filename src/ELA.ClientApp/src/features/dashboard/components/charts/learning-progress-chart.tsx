import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type LearningProgressChartProps = {
  data: { day: string; words: number }[];
};

const chartConfig = {
  words: {
    label: 'Words learned',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function LearningProgressChart({ data }: LearningProgressChartProps) {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={data}
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
            <stop offset='5%' stopColor='var(--chart-2)' stopOpacity={0.6} />
            <stop offset='100%' stopColor='var(--chart-2)' stopOpacity={0.05} />
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
  );
}
