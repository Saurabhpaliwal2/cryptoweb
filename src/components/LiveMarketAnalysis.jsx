import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Flame, Trophy, AlertTriangle, ChevronRight, ArrowLeftRight } from 'lucide-react';
import TradingModal from './TradingModal';

const MarketList = ({ title, icon, items, onTrade }) => (
    <div className="glass-card p-6 h-full" data-aos="fade-up">
        <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
            {icon}
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <div className="space-y-4">
            {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center group hover:bg-white/5 p-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                        <span className="text-text-secondary text-sm font-mono w-4">{index + 1}</span>
                        <div className="flex flex-col">
                            <span className="font-bold group-hover:text-primary transition-colors">{item.symbol}</span>
                            <span className="text-xs text-text-secondary">{item.name}</span>
                        </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                        <div>
                            <div className="font-mono font-medium">${item.price}</div>
                            <div className={`text-xs flex items-center justify-end gap-1 ${item.isUp ? 'text-green-500' : 'text-red-500'}`}>
                                {item.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {item.change}
                            </div>
                        </div>
                        <button
                            onClick={() => onTrade(item)}
                            className="bg-primary/10 hover:bg-primary hover:text-white text-primary p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            title="Trade"
                        >
                            <ArrowLeftRight size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
        <button className="w-full mt-6 text-sm text-text-secondary hover:text-primary transition-colors flex items-center justify-center gap-1 group">
            View All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
    </div>
);

const LiveMarketAnalysis = () => {
    const [isTradingOpen, setIsTradingOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);

    const handleTrade = (coin) => {
        setSelectedCoin(coin);
        setIsTradingOpen(true);
    };

    const gainers = [
        { name: 'Pepe', symbol: 'PEPE', price: '0.0000012', change: '+15.4%', isUp: true },
        { name: 'Render', symbol: 'RNDR', price: '7.82', change: '+12.1%', isUp: true },
        { name: 'Fetch.ai', symbol: 'FET', price: '2.45', change: '+9.8%', isUp: true },
        { name: 'Near', symbol: 'NEAR', price: '6.50', change: '+8.2%', isUp: true },
        { name: 'Arweave', symbol: 'AR', price: '34.20', change: '+7.5%', isUp: true },
    ];

    const losers = [
        { name: 'Worldcoin', symbol: 'WLD', price: '7.20', change: '-8.5%', isUp: false },
        { name: 'Starknet', symbol: 'STRK', price: '1.95', change: '-6.2%', isUp: false },
        { name: 'Celestia', symbol: 'TIA', price: '14.50', change: '-5.8%', isUp: false },
        { name: 'Sei', symbol: 'SEI', price: '0.85', change: '-4.2%', isUp: false },
        { name: 'Sui', symbol: 'SUI', price: '1.62', change: '-3.9%', isUp: false },
    ];

    const trending = [
        { name: 'Bitcoin', symbol: 'BTC', price: '68,450', change: '+2.1%', isUp: true },
        { name: 'Solana', symbol: 'SOL', price: '145.20', change: '+5.4%', isUp: true },
        { name: 'Dogewifhat', symbol: 'WIF', price: '2.45', change: '+18.5%', isUp: true },
        { name: 'Jupiter', symbol: 'JUP', price: '1.20', change: '-2.1%', isUp: false },
        { name: 'Pyth', symbol: 'PYTH', price: '0.88', change: '+4.5%', isUp: true },
    ];

    return (
        <section className="py-20 bg-background/50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <MarketList
                        title="Top Gainers"
                        icon={<Trophy className="text-yellow-500" size={24} />}
                        items={gainers}
                        type="gainers"
                        onTrade={handleTrade}
                    />
                    <MarketList
                        title="Top Losers"
                        icon={<AlertTriangle className="text-red-500" size={24} />}
                        items={losers}
                        type="losers"
                        onTrade={handleTrade}
                    />
                    <MarketList
                        title="Trending Now"
                        icon={<Flame className="text-orange-500" size={24} />}
                        items={trending}
                        type="trending"
                        onTrade={handleTrade}
                    />
                </div>
            </div>

            <TradingModal
                isOpen={isTradingOpen}
                onClose={() => setIsTradingOpen(false)}
                coin={selectedCoin}
                type="buy"
            />
        </section>
    );
};

export default LiveMarketAnalysis;
