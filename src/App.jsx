import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, DollarSign, Activity, RefreshCw } from 'lucide-react';
import StatCard from './components/StatCard';
import PortfolioCard from './components/PortfolioCard';
import PriceChart from './components/PriceChart';
import CurrencyConverter from './components/CurrencyConverter';
import PerformanceComparison from './components/PerformanceComparison';
import { fetchCryptoData, fetchStockData, fetchHistoricalData } from './services/api';

function App() {
    const [cryptoData, setCryptoData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [historicalData, setHistoricalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState(new Date());

    const loadData = async () => {
        setLoading(true);
        try {
            const [cryptos, stocks, historical] = await Promise.all([
                fetchCryptoData(),
                fetchStockData(),
                fetchHistoricalData('bitcoin', 30)
            ]);

            setCryptoData(cryptos);
            setStockData(stocks);
            setHistoricalData(historical);
            setLastUpdate(new Date());
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();

        // Auto-refresh every 60 seconds
        const interval = setInterval(loadData, 60000);
        return () => clearInterval(interval);
    }, []);

    // Calculate portfolio stats
    const totalCryptoValue = cryptoData.reduce((sum, crypto) => sum + crypto.price, 0);
    const totalStockValue = stockData.reduce((sum, stock) => sum + stock.price, 0);
    const totalPortfolioValue = totalCryptoValue + totalStockValue;

    const avgCryptoChange = cryptoData.length > 0
        ? cryptoData.reduce((sum, crypto) => sum + crypto.change24h, 0) / cryptoData.length
        : 0;

    const avgStockChange = stockData.length > 0
        ? stockData.reduce((sum, stock) => sum + stock.change24h, 0) / stockData.length
        : 0;

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                            Portfolio Dashboard
                        </h1>
                        <button
                            onClick={loadData}
                            disabled={loading}
                            className="btn-primary flex items-center gap-2"
                        >
                            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                            Refresh
                        </button>
                    </div>
                    <p className="text-slate-400">
                        Last updated: {lastUpdate.toLocaleTimeString()}
                    </p>
                </header>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        title="Total Portfolio"
                        value={totalPortfolioValue}
                        change={(avgCryptoChange + avgStockChange) / 2}
                        icon={Wallet}
                    />
                    <StatCard
                        title="Crypto Holdings"
                        value={totalCryptoValue}
                        change={avgCryptoChange}
                        icon={TrendingUp}
                    />
                    <StatCard
                        title="Stock Holdings"
                        value={totalStockValue}
                        change={avgStockChange}
                        icon={DollarSign}
                    />
                    <StatCard
                        title="Assets"
                        value={cryptoData.length + stockData.length}
                        icon={Activity}
                        prefix=""
                        suffix=" total"
                    />
                </div>

                {/* Main Chart */}
                <div className="mb-8">
                    <PriceChart
                        data={historicalData}
                        title="Bitcoin Price (30 Days)"
                        dataKey="price"
                        showArea={true}
                    />
                </div>

                {/* Performance Comparison */}
                <div className="mb-8">
                    <PerformanceComparison cryptoData={cryptoData} stockData={stockData} />
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Crypto Portfolio */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <TrendingUp className="text-primary-400" />
                            Cryptocurrencies
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {loading ? (
                                Array(4).fill(0).map((_, i) => (
                                    <div key={i} className="card h-32 shimmer"></div>
                                ))
                            ) : (
                                cryptoData.map((crypto) => (
                                    <PortfolioCard key={crypto.id} asset={crypto} type="crypto" />
                                ))
                            )}
                        </div>
                    </div>

                    {/* Currency Converter */}
                    <div>
                        <CurrencyConverter />
                    </div>
                </div>

                {/* Stocks Portfolio */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <DollarSign className="text-primary-400" />
                        Stocks
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="card h-32 shimmer"></div>
                            ))
                        ) : (
                            stockData.map((stock) => (
                                <PortfolioCard key={stock.symbol} asset={stock} type="stock" />
                            ))
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center text-slate-400 text-sm mt-12 pb-8">
                    <p>Built with React, Vite & Tailwind CSS • Data from CoinGecko API</p>
                </footer>
            </div>
        </div>
    );
}

export default App;
