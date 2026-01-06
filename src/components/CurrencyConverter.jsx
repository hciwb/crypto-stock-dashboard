import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { currencyRates, convertCurrency } from '../services/api';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1000);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');

    const convertedAmount = convertCurrency(
        amount,
        currencyRates[fromCurrency],
        currencyRates[toCurrency]
    );

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <div className="card">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ArrowRightLeft className="text-primary-400" size={24} />
                Currency Converter
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm text-slate-400 mb-2">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-all"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-slate-400 mb-2">From</label>
                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-all cursor-pointer"
                        >
                            {Object.keys(currencyRates).map(currency => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-400 mb-2">To</label>
                        <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-all cursor-pointer"
                        >
                            {Object.keys(currencyRates).map(currency => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    onClick={handleSwap}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                >
                    <ArrowRightLeft size={18} />
                    Swap Currencies
                </button>

                <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4 text-center">
                    <p className="text-sm text-slate-400 mb-1">Converted Amount</p>
                    <p className="text-3xl font-bold text-primary-400">
                        {convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CurrencyConverter;
