import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WalletContext = createContext(null);

export const useWallet = () => {
    const ctx = useContext(WalletContext);
    if (!ctx) throw new Error('useWallet must be used inside WalletProvider');
    return ctx;
};

export const WalletProvider = ({ children }) => {
    const { isLoggedIn, saveWalletData, loadWalletData } = useAuth();

    const [usdBalance, setUsdBalance] = useState(25000);
    const [holdings, setHoldings] = useState({});
    const [orders, setOrders] = useState([]);

    const formatBalance = (num) =>
        num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // ── Load wallet when user logs in ────────────────────────
    useEffect(() => {
        if (!isLoggedIn) {
            setTimeout(() => {
                setUsdBalance(25000);
                setHoldings({});
                setOrders([]);
            }, 0);
            return;
        }


        const saved = loadWalletData();
        if (saved) {
            setTimeout(() => {
                setUsdBalance(saved.usdBalance ?? 25000);
                setHoldings(saved.holdings ?? {});
                setOrders(saved.orders ?? []);
            }, 0);
        }
    }, [isLoggedIn, loadWalletData]);




    // ── Auto-save wallet after every change ──────────────────
    useEffect(() => {
        if (isLoggedIn) {
            saveWalletData({ usdBalance, holdings, orders });
        }
    }, [usdBalance, holdings, orders, isLoggedIn]);

    // ── Buy ──────────────────────────────────────────────────
    const placeBuyOrder = useCallback((coin, usdAmount) => {
        const usd = parseFloat(usdAmount);
        if (!usd || usd <= 0) return { success: false, error: 'Enter a valid amount.' };
        if (usd > usdBalance) {
            return {
                success: false,
                error: `Insufficient balance. You have $${formatBalance(usdBalance)} available.`,
            };
        }
        const price = parseFloat(String(coin.price).replace(/,/g, ''));
        const assetAmount = usd / price;

        setUsdBalance(prev => parseFloat((prev - usd).toFixed(2)));
        setHoldings(prev => ({
            ...prev,
            [coin.symbol]: parseFloat(((prev[coin.symbol] || 0) + assetAmount).toFixed(8)),
        }));
        setOrders(prev => [{
            id: Date.now(), type: 'BUY',
            symbol: coin.symbol, name: coin.name,
            usdAmount: usd, assetAmount, price,
            timestamp: new Date().toISOString(),
        }, ...prev]);
        return { success: true, assetAmount };
    }, [usdBalance]);

    // ── Sell ─────────────────────────────────────────────────
    const placeSellOrder = useCallback((coin, usdAmount) => {
        const usd = parseFloat(usdAmount);
        if (!usd || usd <= 0) return { success: false, error: 'Enter a valid amount.' };
        const price = parseFloat(String(coin.price).replace(/,/g, ''));
        const assetAmount = usd / price;
        const currentHolding = holdings[coin.symbol] || 0;

        if (assetAmount > currentHolding) {
            const holdingUSD = currentHolding * price;
            return {
                success: false,
                error: currentHolding === 0
                    ? `You don't own any ${coin.symbol}.`
                    : `Insufficient ${coin.symbol}. You can sell up to $${formatBalance(holdingUSD)}.`,
            };
        }

        setUsdBalance(prev => parseFloat((prev + usd).toFixed(2)));
        setHoldings(prev => ({
            ...prev,
            [coin.symbol]: parseFloat(((prev[coin.symbol] || 0) - assetAmount).toFixed(8)),
        }));
        setOrders(prev => [{
            id: Date.now(), type: 'SELL',
            symbol: coin.symbol, name: coin.name,
            usdAmount: usd, assetAmount, price,
            timestamp: new Date().toISOString(),
        }, ...prev]);
        return { success: true, assetAmount };
    }, [holdings]);

    return (
        <WalletContext.Provider value={{ usdBalance, holdings, orders, placeBuyOrder, placeSellOrder, formatBalance }}>
            {children}
        </WalletContext.Provider>
    );
};
