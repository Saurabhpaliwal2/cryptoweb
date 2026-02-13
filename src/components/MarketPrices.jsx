import React from 'react';
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
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

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

const PriceChart = ({ color, data: chartData }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
        scales: {
            x: { display: false },
            y: { display: false },
        },
        elements: {
            point: { radius: 0 },
            line: { tension: 0.4 },
        },
    };

    const data = {
        labels: chartData.map((_, i) => i),
        datasets: [
            {
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
            },
        ],
    };

    return <div className="h-16 w-32"><Line options={options} data={data} /></div>;
};

const MarketPrices = () => {
    const coins = [
        { id: 1, name: 'Bitcoin', symbol: 'BTC', price: '48,231.50', change: '+2.45%', up: true, data: [42, 45, 43, 47, 46, 48, 48] },
        { id: 2, name: 'Ethereum', symbol: 'ETH', price: '2,842.12', change: '+1.12%', up: true, data: [25, 27, 26, 28, 27, 28, 28] },
        { id: 3, name: 'Solana', symbol: 'SOL', price: '112.45', change: '-3.21%', up: false, data: [120, 118, 115, 116, 114, 112, 112] },
        { id: 4, name: 'Cardano', symbol: 'ADA', price: '0.582', change: '+0.85%', up: true, data: [0.5, 0.52, 0.54, 0.53, 0.57, 0.58, 0.58] },
    ];

    return (
        <section id="prices" className="py-20 bg-background relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div data-aos="fade-right">
                        <h2 className="text-4xl font-bold mb-4">Live Market Prices</h2>
                        <p className="text-text-secondary">Real-time data from top exchanges around the world.</p>
                    </div>
                    <button className="text-primary font-medium hover:underline flex items-center gap-2" data-aos="fade-left">
                        View all 200+ assets <ArrowUpRight size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coins.map((coin, index) => (
                        <div
                            key={coin.id}
                            className="glass-card p-6"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg">{coin.name}</h3>
                                    <span className="text-sm text-text-secondary">{coin.symbol}</span>
                                </div>
                                <div className={`flex items-center gap-1 ${coin.up ? 'text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]'} font-bold px-2 py-1 rounded-lg bg-white/5`}>
                                    {coin.up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                    {coin.change}
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <span className="text-xs text-text-secondary">Current Price</span>
                                    <div className="text-2xl font-bold">${coin.price}</div>
                                </div>
                                <PriceChart
                                    color={coin.up ? '#22c55e' : '#ef4444'}
                                    data={coin.data}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarketPrices;
