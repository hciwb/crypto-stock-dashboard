import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-800/95 backdrop-blur-lg border border-slate-700 rounded-lg p-3 shadow-xl">
                <p className="font-semibold mb-1">{payload[0].payload.name}</p>
                <p className="text-primary-400">
                    Performance: {payload[0].value > 0 ? '+' : ''}{payload[0].value.toFixed(2)}%
                </p>
            </div>
        );
    }
    return null;
};

const PerformanceComparison = ({ cryptoData, stockData }) => {
    const [timeframe, setTimeframe] = useState('24h');

    // Prepare comparison data
    const comparisonData = [];

    // Add crypto data
    if (cryptoData && cryptoData.length > 0) {
        cryptoData.slice(0, 3).forEach(crypto => {
            comparisonData.push({
                name: crypto.symbol,
                performance: timeframe === '24h' ? crypto.change24h : crypto.change7d,
                type: 'crypto'
            });
        });
    }

    // Add stock data
    if (stockData && stockData.length > 0) {
        stockData.slice(0, 3).forEach(stock => {
            comparisonData.push({
                name: stock.symbol,
                performance: stock.change24h,
                type: 'stock'
            });
        });
    }

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <TrendingUp className="text-primary-400" size={24} />
                    Performance Comparison
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => setTimeframe('24h')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${timeframe === '24h'
                                ? 'bg-primary-500 text-white'
                                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                            }`}
                    >
                        24h
                    </button>
                    <button
                        onClick={() => setTimeframe('7d')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${timeframe === '7d'
                                ? 'bg-primary-500 text-white'
                                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                            }`}
                    >
                        7d
                    </button>
                </div>
            </div>

            {comparisonData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                        <XAxis
                            dataKey="name"
                            stroke="#94a3b8"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                        />
                        <YAxis
                            stroke="#94a3b8"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="performance" radius={[8, 8, 0, 0]}>
                            {comparisonData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.performance >= 0 ? '#10b981' : '#ef4444'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-64 flex items-center justify-center text-slate-400">
                    Loading comparison data...
                </div>
            )}
        </div>
    );
};

export default PerformanceComparison;
