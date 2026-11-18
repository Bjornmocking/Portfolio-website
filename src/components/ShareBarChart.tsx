import React from 'react';
import { ShareChart } from '../types';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ShareBarChartProps {
  chart: ShareChart;
}

// Simple grouped bar chart: share per model before and after.
export const ShareBarChart: React.FC<ShareBarChartProps> = ({ chart }) => {
  const data = chart.rows.map((row) => ({
    label: row.label,
    [chart.beforeLabel]: row.before,
    [chart.afterLabel]: row.after,
  }));

  return (
    <figure className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-4">
      <figcaption className="mb-2 text-base font-bold text-stone-900">{chart.title}</figcaption>
      <div className="h-64 w-full" role="img" aria-label={`${chart.title}. ${chart.rows
        .map((r) => `${r.label}: ${r.before}% voor, ${r.after}% na`)
        .join('. ')}.`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
            <CartesianGrid stroke="#d6d3d1" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: '#44403c', fontSize: 13, fontWeight: 600 }} />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(v: number) => `${v}%`}
              tick={{ fill: '#57534e', fontSize: 12 }}
            />
            <Tooltip formatter={(value: number) => `${value}%`} />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            <Bar dataKey={chart.beforeLabel} fill="#a8a29e" radius={[4, 4, 0, 0]} />
            <Bar dataKey={chart.afterLabel} fill="#0f766e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-sm text-stone-600 leading-relaxed">{chart.caption}</p>
    </figure>
  );
};
