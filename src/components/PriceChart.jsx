import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-800/95 backdrop-blur-lg border border-slate-700 rounded-lg p-3 shadow-xl">
                <p className="text-slate-300 text-sm mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="font-semibold" style={{ color: entry.color }}>
                        {entry.name}: ${entry.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const PriceChart = ({ data, title, dataKey = 'price', showArea = true }) => {
    if (!data || data.length === 0) {
        return (
            <div className="card">
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <div className="h-64 flex items-center justify-center text-slate-400">
                    <div className="shimmer w-full h-full rounded-lg"></div>
                </div>
            </div>
        );
    }

    const ChartComponent = showArea ? AreaChart : LineChart;
    const DataComponent = showArea ? Area : Line;

    return (
        <div className="card">
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <ChartComponent data={data}>
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickLine={{ stroke: '#334155' }}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickLine={{ stroke: '#334155' }}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {showArea ? (
                        <Area
                            type="monotone"
                            dataKey={dataKey}
                            stroke="#0ea5e9"
                            strokeWidth={2}
                            fill="url(#colorPrice)"
                            animationDuration={1000}
                        />
                    ) : (
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke="#0ea5e9"
                            strokeWidth={2}
                            dot={{ fill: '#0ea5e9', r: 3 }}
                            activeDot={{ r: 5, fill: '#0ea5e9' }}
                            animationDuration={1000}
                        />
                    )}
                </ChartComponent>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceChart;
