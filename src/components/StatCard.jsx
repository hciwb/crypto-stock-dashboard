import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, prefix = '$', suffix = '' }) => {
    const isPositive = change >= 0;

    return (
        <div className="stat-card group">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
                    <p className="text-3xl font-bold mb-2">
                        {prefix}{value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{suffix}
                    </p>
                    {change !== undefined && (
                        <div className={`flex items-center gap-1 ${isPositive ? 'price-up' : 'price-down'}`}>
                            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            <span className="text-sm font-semibold">
                                {isPositive ? '+' : ''}{change.toFixed(2)}%
                            </span>
                            <span className="text-slate-400 text-xs ml-1">24h</span>
                        </div>
                    )}
                </div>
                {Icon && (
                    <div className="bg-primary-500/10 p-3 rounded-xl group-hover:bg-primary-500/20 transition-all">
                        <Icon className="text-primary-400" size={24} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
