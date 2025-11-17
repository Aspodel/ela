import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type SkillValuationChartProps = {
  data: { skill: string; score: number }[];
};

const chartConfig = {
  score: {
    label: 'Score',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function SkillValuationChart({ data }: SkillValuationChartProps) {
  return (
    <ChartContainer config={chartConfig} className='mx-auto aspect-square '>
      <RadarChart
        data={data}
        margin={{
          left: 30,
          right: 40,
        }}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator='line' />}
        />
        <PolarAngleAxis dataKey='skill' />
        <PolarGrid />
        <PolarRadiusAxis domain={[0, 100]} axisLine={false} tick={false} />
        <Radar dataKey='score' fill='var(--color-score)' fillOpacity={0.5} />
      </RadarChart>
    </ChartContainer>
  );
}
