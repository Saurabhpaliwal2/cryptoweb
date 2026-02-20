import React, { useState, useEffect, useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ArrowUpRight, ArrowDownRight, TrendingUp, ShoppingBag, Banknote, Search, ChevronDown, ChevronUp } from 'lucide-react';
import TradingModal from './TradingModal';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

// ─── Helper: generate random sparkline ───────────────────────────────────────
const sparkline = (base, up) => {
    const pts = [];
    let v = base;
    for (let i = 0; i < 7; i++) {
        v += (Math.random() - (up ? 0.3 : 0.7)) * base * 0.02;
        pts.push(parseFloat(v.toFixed(4)));
    }
    return pts;
};

// ─── 50 Coins ────────────────────────────────────────────────────────────────
const initialCoins = [
    // ─── Crypto ─────────────────────
    { id: 1, name: 'Bitcoin', symbol: 'BTC', price: '67,431.50', change: '+2.45%', up: true, cat: 'crypto' },
    { id: 2, name: 'Ethereum', symbol: 'ETH', price: '3,542.12', change: '+1.12%', up: true, cat: 'crypto' },
    { id: 3, name: 'Solana', symbol: 'SOL', price: '152.45', change: '-3.21%', up: false, cat: 'crypto' },
    { id: 4, name: 'Cardano', symbol: 'ADA', price: '0.582', change: '+0.85%', up: true, cat: 'crypto' },
    { id: 5, name: 'Binance Coin', symbol: 'BNB', price: '612.30', change: '+1.74%', up: true, cat: 'crypto' },
    { id: 6, name: 'XRP', symbol: 'XRP', price: '0.634', change: '-0.92%', up: false, cat: 'crypto' },
    { id: 7, name: 'Dogecoin', symbol: 'DOGE', price: '0.1245', change: '+5.12%', up: true, cat: 'crypto' },
    { id: 8, name: 'Polkadot', symbol: 'DOT', price: '7.82', change: '-1.54%', up: false, cat: 'crypto' },
    { id: 9, name: 'Polygon', symbol: 'MATIC', price: '0.892', change: '+2.31%', up: true, cat: 'crypto' },
    { id: 10, name: 'Avalanche', symbol: 'AVAX', price: '38.94', change: '+3.89%', up: true, cat: 'crypto' },
    { id: 11, name: 'Chainlink', symbol: 'LINK', price: '18.56', change: '+1.23%', up: true, cat: 'crypto' },
    { id: 12, name: 'Uniswap', symbol: 'UNI', price: '9.42', change: '-2.14%', up: false, cat: 'crypto' },
    { id: 13, name: 'Litecoin', symbol: 'LTC', price: '84.31', change: '+0.67%', up: true, cat: 'crypto' },
    { id: 14, name: 'Cosmos', symbol: 'ATOM', price: '11.24', change: '-1.89%', up: false, cat: 'crypto' },
    { id: 15, name: 'Stellar', symbol: 'XLM', price: '0.132', change: '+0.45%', up: true, cat: 'crypto' },
    { id: 16, name: 'Filecoin', symbol: 'FIL', price: '6.78', change: '-3.12%', up: false, cat: 'crypto' },
    { id: 17, name: 'TRON', symbol: 'TRX', price: '0.124', change: '+1.56%', up: true, cat: 'crypto' },
    { id: 18, name: 'Near Protocol', symbol: 'NEAR', price: '7.23', change: '+4.21%', up: true, cat: 'crypto' },
    { id: 19, name: 'Aave', symbol: 'AAVE', price: '112.45', change: '+2.78%', up: true, cat: 'crypto' },
    { id: 20, name: 'Algorand', symbol: 'ALGO', price: '0.234', change: '-1.34%', up: false, cat: 'crypto' },
    { id: 21, name: 'VeChain', symbol: 'VET', price: '0.0342', change: '+0.98%', up: true, cat: 'crypto' },
    { id: 22, name: 'Fantom', symbol: 'FTM', price: '0.567', change: '-2.45%', up: false, cat: 'crypto' },
    { id: 23, name: 'The Sandbox', symbol: 'SAND', price: '0.489', change: '+1.67%', up: true, cat: 'crypto' },
    { id: 24, name: 'Decentraland', symbol: 'MANA', price: '0.534', change: '-0.78%', up: false, cat: 'crypto' },
    { id: 25, name: 'Axie Infinity', symbol: 'AXS', price: '8.92', change: '+3.45%', up: true, cat: 'crypto' },
    { id: 26, name: 'Tezos', symbol: 'XTZ', price: '1.12', change: '-1.23%', up: false, cat: 'crypto' },
    { id: 27, name: 'Hedera', symbol: 'HBAR', price: '0.0892', change: '+2.34%', up: true, cat: 'crypto' },
    { id: 28, name: 'The Graph', symbol: 'GRT', price: '0.234', change: '+1.12%', up: true, cat: 'crypto' },
    { id: 29, name: 'Aptos', symbol: 'APT', price: '11.56', change: '+5.67%', up: true, cat: 'crypto' },
    { id: 30, name: 'Arbitrum', symbol: 'ARB', price: '1.34', change: '-2.89%', up: false, cat: 'crypto' },
    { id: 31, name: 'Optimism', symbol: 'OP', price: '2.67', change: '+3.12%', up: true, cat: 'crypto' },
    { id: 32, name: 'Injective', symbol: 'INJ', price: '34.56', change: '+6.78%', up: true, cat: 'crypto' },
    { id: 33, name: 'Sui', symbol: 'SUI', price: '1.89', change: '+4.56%', up: true, cat: 'crypto' },
    { id: 34, name: 'Sei', symbol: 'SEI', price: '0.678', change: '-1.23%', up: false, cat: 'crypto' },
    { id: 35, name: 'Celestia', symbol: 'TIA', price: '15.34', change: '+7.89%', up: true, cat: 'crypto' },
    { id: 36, name: 'Render', symbol: 'RNDR', price: '9.12', change: '+3.45%', up: true, cat: 'crypto' },
    { id: 37, name: 'Fetch.ai', symbol: 'FET', price: '2.34', change: '+8.12%', up: true, cat: 'crypto' },
    { id: 38, name: 'Immutable', symbol: 'IMX', price: '2.56', change: '-1.67%', up: false, cat: 'crypto' },
    { id: 39, name: 'Stacks', symbol: 'STX', price: '2.89', change: '+2.34%', up: true, cat: 'crypto' },
    { id: 40, name: 'Maker', symbol: 'MKR', price: '2,890.45', change: '+1.23%', up: true, cat: 'crypto' },
    { id: 41, name: 'THORChain', symbol: 'RUNE', price: '6.78', change: '-3.45%', up: false, cat: 'crypto' },
    { id: 42, name: 'Kaspa', symbol: 'KAS', price: '0.145', change: '+5.67%', up: true, cat: 'crypto' },
    { id: 43, name: 'Bonk', symbol: 'BONK', price: '0.00002', change: '+12.34%', up: true, cat: 'crypto' },
    { id: 44, name: 'Jupiter', symbol: 'JUP', price: '1.23', change: '+3.89%', up: true, cat: 'crypto' },
    { id: 45, name: 'Pyth Network', symbol: 'PYTH', price: '0.456', change: '-2.34%', up: false, cat: 'crypto' },
    { id: 46, name: 'Worldcoin', symbol: 'WLD', price: '3.45', change: '+2.56%', up: true, cat: 'crypto' },
    { id: 47, name: 'Pepe', symbol: 'PEPE', price: '0.00001', change: '+9.87%', up: true, cat: 'crypto' },
    { id: 48, name: 'Floki', symbol: 'FLOKI', price: '0.00018', change: '-4.56%', up: false, cat: 'crypto' },
    { id: 49, name: 'Ondo Finance', symbol: 'ONDO', price: '1.67', change: '+3.12%', up: true, cat: 'crypto' },
    { id: 50, name: 'Ethena', symbol: 'ENA', price: '0.89', change: '-1.45%', up: false, cat: 'crypto' },

    // ─── Indian Stocks (₹ → USD approx) ─────────────────────
    { id: 51, name: 'Reliance Ind.', symbol: 'RELIANCE', price: '29.85', change: '+1.34%', up: true, cat: 'indian' },
    { id: 52, name: 'TCS', symbol: 'TCS', price: '46.12', change: '+0.87%', up: true, cat: 'indian' },
    { id: 53, name: 'Infosys', symbol: 'INFY', price: '18.92', change: '-0.65%', up: false, cat: 'indian' },
    { id: 54, name: 'HDFC Bank', symbol: 'HDFCBANK', price: '19.24', change: '+1.56%', up: true, cat: 'indian' },
    { id: 55, name: 'ICICI Bank', symbol: 'ICICIBANK', price: '14.12', change: '+2.13%', up: true, cat: 'indian' },
    { id: 56, name: 'Wipro', symbol: 'WIPRO', price: '5.89', change: '-1.23%', up: false, cat: 'indian' },
    { id: 57, name: 'HCL Tech', symbol: 'HCLTECH', price: '19.45', change: '+1.78%', up: true, cat: 'indian' },
    { id: 58, name: 'Bharti Airtel', symbol: 'BHARTIARTL', price: '20.12', change: '+0.92%', up: true, cat: 'indian' },
    { id: 59, name: 'SBI', symbol: 'SBIN', price: '9.45', change: '-0.78%', up: false, cat: 'indian' },
    { id: 60, name: 'ITC', symbol: 'ITC', price: '5.34', change: '+0.45%', up: true, cat: 'indian' },
    { id: 61, name: 'Kotak Mahindra', symbol: 'KOTAKBANK', price: '22.56', change: '+1.12%', up: true, cat: 'indian' },
    { id: 62, name: 'Larsen & Toubro', symbol: 'LT', price: '42.89', change: '+2.34%', up: true, cat: 'indian' },
    { id: 63, name: 'Axis Bank', symbol: 'AXISBANK', price: '13.78', change: '-1.56%', up: false, cat: 'indian' },
    { id: 64, name: 'Adani Enterp.', symbol: 'ADANIENT', price: '35.67', change: '+4.56%', up: true, cat: 'indian' },
    { id: 65, name: 'Tata Motors', symbol: 'TATAMOTORS', price: '9.12', change: '+3.21%', up: true, cat: 'indian' },
    { id: 66, name: 'Maruti Suzuki', symbol: 'MARUTI', price: '148.56', change: '+0.78%', up: true, cat: 'indian' },
    { id: 67, name: 'Sun Pharma', symbol: 'SUNPHARMA', price: '21.34', change: '-0.92%', up: false, cat: 'indian' },
    { id: 68, name: 'Bajaj Finance', symbol: 'BAJFINANCE', price: '89.45', change: '+1.89%', up: true, cat: 'indian' },
    { id: 69, name: 'Power Grid', symbol: 'POWERGRID', price: '3.56', change: '+0.34%', up: true, cat: 'indian' },
    { id: 70, name: 'Tata Steel', symbol: 'TATASTEEL', price: '1.78', change: '-2.34%', up: false, cat: 'indian' },
].map(c => ({ ...c, data: sparkline(parseFloat(c.price.replace(/,/g, '')), c.up) }));

// ─── Mini Chart ──────────────────────────────────────────────────────────────
const PriceChart = ({ color, data: chartData }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
        elements: { point: { radius: 0 }, line: { tension: 0.4 } },
    };
    const data = {
        labels: chartData.map((_, i) => i),
        datasets: [{
            data: chartData,
            borderColor: color,
            borderWidth: 2,
            fill: true,
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 100);
                gradient.addColorStop(0, `${color}33`);
                gradient.addColorStop(1, `${color}00`);
                return gradient;
            },
        }],
    };
    return <div className="h-16 w-32"><Line options={options} data={data} key={JSON.stringify(chartData)} /></div>;
};

// ─── Price Card ──────────────────────────────────────────────────────────────
const PriceCard = ({ coin, index, onTrade }) => (
    <div
        className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group flex flex-col justify-between"
        data-aos="fade-up"
        data-aos-delay={Math.min(index * 50, 400)}
    >
        <div>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-lg font-bold text-primary border border-white/5">
                        {coin.symbol[0]}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg leading-none mb-1">{coin.name}</h3>
                        <span className="text-xs text-text-secondary font-medium">{coin.symbol}</span>
                    </div>
                </div>
                <div className={`flex items-center gap-1 ${coin.up ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'} font-bold px-2.5 py-1 rounded-lg text-sm`}>
                    {coin.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {coin.change}
                </div>
            </div>
            <div className="flex justify-between items-end mb-6">
                <div>
                    <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">Price</span>
                    <div className="text-2xl font-bold font-mono tracking-tight">${coin.price}</div>
                </div>
                <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                    <PriceChart color={coin.up ? '#22c55e' : '#ef4444'} data={coin.data} />
                </div>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-auto">
            <button onClick={() => onTrade(coin, 'buy')} className="flex items-center justify-center gap-2 py-2 rounded-lg bg-green-500/10 text-green-500 font-bold hover:bg-green-500 hover:text-white transition-all text-sm">
                <ShoppingBag size={16} /> Buy
            </button>
            <button onClick={() => onTrade(coin, 'sell')} className="flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all text-sm">
                <Banknote size={16} /> Sell
            </button>
        </div>
    </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────
const INITIAL_SHOW = 8;
const LOAD_MORE = 12;

const CATEGORIES = [
    { key: 'all', label: 'All' },
    { key: 'crypto', label: '🪙 Crypto' },
    { key: 'indian', label: '🇮🇳 Indian Stocks' },
];

const MarketPrices = () => {
    const [coins, setCoins] = useState(initialCoins);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW);

    const [isTradingOpen, setIsTradingOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [tradeType, setTradeType] = useState('buy');

    // Simulated live price updates
    useEffect(() => {
        const interval = setInterval(() => {
            setCoins(curr =>
                curr.map(coin => {
                    const isUp = Math.random() > 0.4;
                    const changePct = (Math.random() * 2).toFixed(2);
                    const rawPrice = coin.price.replace(/,/g, '');
                    const currentPrice = parseFloat(rawPrice);
                    const delta = currentPrice * (parseFloat(changePct) / 100) * (isUp ? 1 : -1);
                    const decimals = Math.min(Math.max(rawPrice.includes('.') ? rawPrice.split('.')[1].length : 2, 0), 20);
                    const newPrice = (currentPrice + delta).toFixed(decimals);
                    const newData = [...coin.data.slice(1), coin.data[coin.data.length - 1] + (isUp ? 1 : -1) * Math.random() * 5];

                    return {
                        ...coin,
                        price: newPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                        change: `${isUp ? '+' : '-'}${changePct}%`,
                        up: isUp,
                        data: newData,
                    };
                })
            );
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Filtered list (category + search)
    const filtered = useMemo(() => {
        let list = coins;
        if (category !== 'all') list = list.filter(c => c.cat === category);
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(c => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q));
        }
        return list;
    }, [coins, search, category]);

    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    const handleTrade = (coin, type) => {
        setSelectedCoin(coin);
        setTradeType(type);
        setIsTradingOpen(true);
    };

    const catCounts = useMemo(() => ({
        all: coins.length,
        crypto: coins.filter(c => c.cat === 'crypto').length,
        indian: coins.filter(c => c.cat === 'indian').length,
    }), [coins]);

    return (
        <section id="prices" className="py-24 bg-background relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                    <div data-aos="fade-right">
                        <div className="flex items-center gap-2 text-primary font-bold mb-2">
                            <TrendingUp size={20} />
                            <span className="uppercase tracking-widest text-sm">Live Market Data</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-2">Market Watch</h2>
                        <p className="text-text-secondary text-lg max-w-xl">
                            Real-time prices for <span className="text-primary font-bold">{coins.length}</span> assets — crypto & Indian stocks.
                        </p>
                    </div>
                    {/* Search */}
                    <div className="relative w-full md:w-80" data-aos="fade-left">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                        <input
                            type="text"
                            value={search}
                            onChange={e => { setSearch(e.target.value); setVisibleCount(INITIAL_SHOW); }}
                            placeholder="Search coins…"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary transition-colors text-sm"
                        />
                        {search && (
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-secondary">{filtered.length} found</span>
                        )}
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-3 mb-8" data-aos="fade-up">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.key}
                            onClick={() => { setCategory(cat.key); setVisibleCount(INITIAL_SHOW); }}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${category === cat.key
                                ? 'bg-primary/20 border-primary/40 text-primary'
                                : 'bg-white/5 border-white/10 text-text-secondary hover:text-white hover:border-white/20'
                                }`}
                        >
                            {cat.label} <span className="ml-1.5 opacity-60">({catCounts[cat.key]})</span>
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {visible.map((coin, i) => (
                        <PriceCard key={coin.id} coin={coin} index={i} onTrade={handleTrade} />
                    ))}
                </div>

                {/* Load more / show less */}
                {filtered.length > INITIAL_SHOW && (
                    <div className="flex justify-center mt-10 gap-4">
                        {hasMore && (
                            <button
                                onClick={() => setVisibleCount(v => Math.min(v + LOAD_MORE, filtered.length))}
                                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 text-sm font-bold transition-all hover:bg-primary/10"
                            >
                                <ChevronDown size={16} /> Show More ({filtered.length - visibleCount} remaining)
                            </button>
                        )}
                        {visibleCount > INITIAL_SHOW && (
                            <button
                                onClick={() => setVisibleCount(INITIAL_SHOW)}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-text-secondary hover:text-white transition-all"
                            >
                                <ChevronUp size={16} /> Show Less
                            </button>
                        )}
                    </div>
                )}

                {/* No results */}
                {filtered.length === 0 && (
                    <div className="text-center py-16 text-text-secondary">
                        <Search size={40} className="mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-medium">No coins match "{search}"</p>
                    </div>
                )}
            </div>

            <TradingModal
                isOpen={isTradingOpen}
                onClose={() => setIsTradingOpen(false)}
                coin={selectedCoin}
                type={tradeType}
            />
        </section>
    );
};

export default MarketPrices;
