import React, { useState, useEffect } from 'react';
import {
    X, ArrowDown, Wallet, DollarSign, RefreshCw,
    CheckCircle, AlertCircle, ShoppingBag, Banknote,
    ClipboardList
} from 'lucide-react';
import { useWallet } from '../context/WalletContext';

// ─── Step indicators ────────────────────────────────────────────────────────
const STEPS = ['Select Coin', 'Enter Amount', 'Check Balance', 'Place Order', 'Wallet Updated'];

const StepBar = ({ current }) => (
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
        {STEPS.map((label, i) => (
            <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${i < current ? 'bg-primary border-primary text-white' :
                        i === current ? 'border-primary text-primary bg-primary/10' :
                            'border-white/20 text-text-secondary'
                        }`}>
                        {i < current ? <CheckCircle size={14} /> : i + 1}
                    </div>
                    <span className={`text-[9px] hidden sm:block text-center font-medium ${i <= current ? 'text-primary' : 'text-text-secondary'}`}>
                        {label}
                    </span>
                </div>
                {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 rounded transition-all duration-500 ${i < current ? 'bg-primary' : 'bg-white/10'}`} />
                )}
            </React.Fragment>
        ))}
    </div>
);

// ─── Main Modal ──────────────────────────────────────────────────────────────
const TradingModal = ({ isOpen, onClose, coin, type = 'buy' }) => {
    const { usdBalance, holdings, placeBuyOrder, placeSellOrder, formatBalance } = useWallet();

    const [amount, setAmount] = useState('');
    const [mode, setMode] = useState(type);
    const [step, setStep] = useState(1);   // 1=form, 2=checking, 3=placing, 4=done
    const [error, setError] = useState('');
    const [orderResult, setOrderResult] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setMode(type);
                setAmount('');
                setStep(1);
                setError('');
                setOrderResult(null);
            }, 0);
        }

    }, [isOpen, type]);

    if (!isOpen || !coin) return null;

    const price = parseFloat(String(coin.price).replace(/,/g, ''));
    const amountNum = parseFloat(amount) || 0;
    const estimatedAsset = amountNum > 0 ? (amountNum / price).toFixed(8) : '—';
    const ownedAsset = holdings[coin.symbol] || 0;
    const ownedUSD = ownedAsset * price;

    const insufficientBuy = mode === 'buy' && amountNum > usdBalance;
    const insufficientSell = mode === 'sell' && amountNum > ownedUSD;
    const hasInputError = amountNum > 0 && (insufficientBuy || insufficientSell);

    const handleExecute = () => {
        if (!amountNum || amountNum <= 0) { setError('Enter a valid amount.'); return; }
        setError('');
        setStep(2); // checking balance

        setTimeout(() => {
            setStep(3); // placing order
            const fn = mode === 'buy' ? placeBuyOrder : placeSellOrder;
            const result = fn(coin, amountNum);

            setTimeout(() => {
                setOrderResult(result);
                if (result.success) {
                    setStep(4);
                } else {
                    setStep(1);
                    setError(result.error);
                }
            }, 800);
        }, 900);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="glass-card w-full max-w-lg p-0 overflow-hidden relative animate-fade-in">

                {/* Header */}
                <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        {mode === 'buy'
                            ? <ShoppingBag size={20} className="text-green-500" />
                            : <Banknote size={20} className="text-red-500" />}
                        {mode === 'buy' ? 'Buy' : 'Sell'}&nbsp;
                        <span className="text-primary">{coin.name}</span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-text-secondary">
                            {coin.symbol}
                        </span>
                    </h2>
                    <button onClick={onClose} className="hover:text-primary transition-colors p-1">
                        <X size={22} />
                    </button>
                </div>

                {/* Step bar */}
                <StepBar current={step} />

                {/* SUCCESS */}
                {step === 4 && orderResult?.success && (
                    <div className="p-10 text-center space-y-4">
                        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-2xl font-bold">Order Executed!</h3>
                        <p className="text-text-secondary">
                            {mode === 'buy' ? 'Purchased' : 'Sold'}&nbsp;
                            <strong>{orderResult.assetAmount?.toFixed(6)} {coin.symbol}</strong>
                            &nbsp;for&nbsp;<strong>${formatBalance(amountNum)}</strong>
                        </p>

                        <div className="glass-card p-4 text-left space-y-3 border-green-500/20">
                            <p className="text-xs text-text-secondary uppercase tracking-widest font-bold flex items-center gap-2">
                                <Wallet size={12} /> Wallet Updated
                            </p>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">USD Balance</span>
                                <span className="font-mono font-bold text-green-400">${formatBalance(usdBalance)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">{coin.symbol} Holdings</span>
                                <span className="font-mono font-bold">{(holdings[coin.symbol] || 0).toFixed(6)}</span>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full mt-2 py-3 rounded-xl bg-primary/20 text-primary hover:bg-primary hover:text-white font-bold transition-all"
                        >
                            Close
                        </button>
                    </div>
                )}

                {/* PROCESSING */}
                {(step === 2 || step === 3) && (
                    <div className="p-12 text-center space-y-4">
                        <RefreshCw className="animate-spin text-primary mx-auto" size={48} />
                        <p className="font-bold text-lg">
                            {step === 2 ? 'Checking balance…' : 'Placing order…'}
                        </p>
                        <p className="text-text-secondary text-sm">
                            {step === 2
                                ? `Verifying your ${mode === 'buy' ? 'USD' : coin.symbol} balance`
                                : `Executing ${mode.toUpperCase()} order on live market`}
                        </p>
                    </div>
                )}

                {/* FORM */}
                {step === 1 && (
                    <div className="p-6 space-y-5">

                        {/* Mode toggle */}
                        <div className="flex bg-white/5 p-1 rounded-xl">
                            {['buy', 'sell'].map(m => (
                                <button
                                    key={m}
                                    onClick={() => { setMode(m); setError(''); }}
                                    className={`flex-1 py-2.5 rounded-lg font-bold capitalize transition-all ${mode === m
                                        ? m === 'buy' ? 'bg-green-500 text-white shadow-lg' : 'bg-red-500 text-white shadow-lg'
                                        : 'text-text-secondary hover:text-white'
                                        }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>

                        {/* Price row */}
                        <div className="flex justify-between items-center text-sm bg-white/5 p-3 rounded-lg">
                            <span className="text-text-secondary">Market Price</span>
                            <span className="font-mono font-bold">${coin.price}</span>
                        </div>

                        {/* Amount input */}
                        <div>
                            <label className="text-xs text-text-secondary mb-1.5 block font-medium uppercase tracking-wider">Amount (USD)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                                <input
                                    type="number"
                                    min="0"
                                    value={amount}
                                    onChange={e => { setAmount(e.target.value); setError(''); }}
                                    placeholder="0.00"
                                    className={`w-full bg-white/5 border rounded-xl py-3.5 pl-10 pr-4 text-xl font-bold font-mono focus:outline-none transition-colors ${hasInputError ? 'border-red-500 focus:border-red-500' :
                                        amountNum > 0 ? 'border-primary/50 focus:border-primary' :
                                            'border-white/10 focus:border-primary'
                                        }`}
                                />
                            </div>

                            {/* Quick-fill buttons */}
                            <div className="flex gap-2 mt-2">
                                {mode === 'buy'
                                    ? [25, 50, 100, 500].map(v => (
                                        <button key={v}
                                            onClick={() => setAmount(String(Math.min(v, usdBalance)))}
                                            className="flex-1 py-1 text-xs rounded-lg bg-white/5 hover:bg-primary/20 text-text-secondary hover:text-primary transition-colors"
                                        >${v}</button>
                                    ))
                                    : ['25%', '50%', '75%', '100%'].map((pct, i) => (
                                        <button key={pct}
                                            onClick={() => setAmount((ownedUSD * (i + 1) * 0.25).toFixed(2))}
                                            className="flex-1 py-1 text-xs rounded-lg bg-white/5 hover:bg-red-500/20 text-text-secondary hover:text-red-400 transition-colors"
                                        >{pct}</button>
                                    ))
                                }
                            </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex justify-center">
                            <div className="p-2 rounded-full bg-white/5 border border-white/10">
                                <ArrowDown size={16} className="text-text-secondary" />
                            </div>
                        </div>

                        {/* Estimated output */}
                        <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center border border-white/5">
                            <span className="text-text-secondary text-sm">You {mode === 'buy' ? 'receive' : 'give'}</span>
                            <span className="font-mono font-bold text-lg">
                                {estimatedAsset} <span className="text-primary">{coin.symbol}</span>
                            </span>
                        </div>

                        {/* Balance panel */}
                        <div className={`flex items-start gap-3 text-sm p-3 rounded-xl border transition-colors ${hasInputError
                            ? 'bg-red-500/10 border-red-500/30 text-red-400'
                            : 'bg-primary/10 border-primary/20 text-text-secondary'
                            }`}>
                            <Wallet size={16} className={hasInputError ? 'text-red-500 mt-0.5' : 'text-primary mt-0.5'} />
                            <div className="space-y-0.5">
                                <p className="font-bold">
                                    USD Available:&nbsp;
                                    <span className="font-mono">${formatBalance(usdBalance)}</span>
                                </p>
                                {ownedAsset > 0 && (
                                    <p className="text-xs text-text-secondary">
                                        {coin.symbol} Holdings: {ownedAsset.toFixed(6)} ≈ ${formatBalance(ownedUSD)}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Error */}
                        {(error || hasInputError) && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                                <AlertCircle size={16} className="shrink-0" />
                                {error || (insufficientBuy
                                    ? `Insufficient USD. You need $${formatBalance(amountNum - usdBalance)} more.`
                                    : `Insufficient ${coin.symbol}. You can sell up to $${formatBalance(ownedUSD)}.`
                                )}
                            </div>
                        )}

                        {/* Execute */}
                        <button
                            onClick={handleExecute}
                            disabled={!amountNum || amountNum <= 0 || hasInputError}
                            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${!amountNum || hasInputError
                                ? 'bg-white/10 text-text-secondary cursor-not-allowed'
                                : mode === 'buy'
                                    ? 'bg-green-500 hover:bg-green-600 hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] text-white'
                                    : 'bg-red-500   hover:bg-red-600   hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]   text-white'
                                }`}
                        >
                            {mode === 'buy' ? <ShoppingBag size={20} /> : <Banknote size={20} />}
                            {mode === 'buy' ? 'Buy' : 'Sell'} {coin.symbol}
                        </button>

                        <p className="text-center text-xs text-text-secondary flex items-center justify-center gap-1">
                            <ClipboardList size={12} /> Simulated trading only — no real funds involved
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TradingModal;
