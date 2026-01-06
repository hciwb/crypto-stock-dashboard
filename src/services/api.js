// API service for fetching crypto and stock data

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Mock stock data (in production, you'd use a real API like Alpha Vantage or Yahoo Finance)
const mockStockData = {
    'SPY': { price: 475.32, change: 1.24, name: 'S&P 500 ETF' },
    'AAPL': { price: 185.92, change: -0.45, name: 'Apple Inc.' },
    'MSFT': { price: 378.91, change: 2.15, name: 'Microsoft Corp.' },
    'GOOGL': { price: 140.23, change: 0.87, name: 'Alphabet Inc.' },
    'TSLA': { price: 238.45, change: -1.92, name: 'Tesla Inc.' },
};

export const fetchCryptoData = async (ids = ['bitcoin', 'ethereum', 'hype', 'solana', 'binance coin', 'tron', 'dogecoin", 'aave', 'pump']) => {
    try {
        const response = await fetch(
            `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${ids.join(',')}&order=market_cap_desc&sparkline=true&price_change_percentage=24h,7d`
        );

        if (!response.ok) throw new Error('Failed to fetch crypto data');

        const data = await response.json();
        return data.map(coin => ({
            id: coin.id,
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            price: coin.current_price,
            change24h: coin.price_change_percentage_24h,
            change7d: coin.price_change_percentage_7d_in_currency,
            marketCap: coin.market_cap,
            volume: coin.total_volume,
            image: coin.image,
            sparkline: coin.sparkline_in_7d.price,
        }));
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        return [];
    }
};

export const fetchStockData = async (symbols = ['SPY', 'AAPL', 'MSFT', 'GOOGL', 'TSLA']) => {
    // Using mock data for demonstration
    // In production, integrate with a real stock API
    return new Promise((resolve) => {
        setTimeout(() => {
            const stocks = symbols.map(symbol => ({
                symbol,
                name: mockStockData[symbol]?.name || symbol,
                price: mockStockData[symbol]?.price || Math.random() * 500,
                change24h: mockStockData[symbol]?.change || (Math.random() - 0.5) * 5,
            }));
            resolve(stocks);
        }, 500);
    });
};

export const fetchHistoricalData = async (coinId, days = 30) => {
    try {
        const response = await fetch(
            `${COINGECKO_API}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
        );

        if (!response.ok) throw new Error('Failed to fetch historical data');

        const data = await response.json();
        return data.prices.map(([timestamp, price]) => ({
            date: new Date(timestamp).toLocaleDateString(),
            price: price,
            timestamp,
        }));
    } catch (error) {
        console.error('Error fetching historical data:', error);
        return [];
    }
};

export const convertCurrency = (amount, fromRate, toRate) => {
    return (amount * toRate) / fromRate;
};

// Fetch real-time currency exchange rates
export const fetchCurrencyRates = async () => {
    try {
        const response = await fetch('https://api.exchangerate.host/latest?base=USD');
        
        if (!response.ok) throw new Error('Failed to fetch currency rates');
        
        const data = await response.json();
        
        // Return rates with USD as base (1.0)
        return {
            USD: 1,
            EUR: data.rates.EUR || 0.92,
            GBP: data.rates.GBP || 0.79,
            JPY: data.rates.JPY || 148.50,
            CAD: data.rates.CAD || 1.35,
            CHF: data.rates.CHF || 0.88,
            AUD: data.rates.AUD || 1.52,
            CNY: data.rates.CNY || 7.24,
        };
    } catch (error) {
        console.error('Error fetching currency rates:', error);
        // Fallback to static rates if API fails
        return {
            USD: 1,
            EUR: 0.92,
            GBP: 0.79,
            JPY: 148.50,
            CAD: 1.35,
            CHF: 0.88,
            AUD: 1.52,
            CNY: 7.24,
        };
    }
};

export const convertCurrency = (amount, fromRate, toRate) => {
    return (amount * toRate) / fromRate;
};

