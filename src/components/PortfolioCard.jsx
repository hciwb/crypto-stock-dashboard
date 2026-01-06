import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const PortfolioCard = ({ asset, type = 'crypto' }) => {
    const isPositive = asset.change24h >= 0;

    return (
        <div className="card group cursor-pointer">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    {type === 'crypto' && asset.image && (
                        <img
                            src={asset.image}
                            alt={asset.name}
                            className="w-10 h-10 rounded-full ring-2 ring-slate-700 group-hover:ring-primary-500 transition-all"
                        />
                    )}
                    <div>
                        <h3 className="font-semibold text-lg">{asset.symbol}</h3>
                        <p className="text-sm text-slate-400">{asset.name}</p>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-xl font-bold">
                        ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <div className={`flex items-center gap-1 justify-end ${isPositive ? 'price-up' : 'price-down'}`}>
                        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span className="text-sm font-semibold">
                            {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%
                        </span>
                    </div>
                </div>
            </div>

            {asset.marketCap && (
                <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between text-sm">
                    <span className="text-slate-400">Market Cap</span>
                    <span className="font-medium">${(asset.marketCap / 1e9).toFixed(2)}B</span>
                </div>
            )}
        </div>
    );
};

export default PortfolioCard;
