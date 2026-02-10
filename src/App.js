import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Home,
  Car,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
  Zap,
  TrendingUp,
  Droplets,
  Bell,
  Fingerprint,
  Wallet,
  RefreshCcw,
  ChevronLeft,
  Coins,
  Eye,
  CheckCircle2,
  ShieldX,
} from "lucide-react";

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [financingSubPage, setFinancingSubPage] = useState("main");
  const [balance, setBalance] = useState(12450.75);
  const [purificationPending, setPurificationPending] = useState(12.45);
  const [isSyncing, setIsSyncing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showCardDetails, setShowCardDetails] = useState(true);
  const [isFrozen, setIsFrozen] = useState(false);
  const [halalFilterActive, setHalalFilterActive] = useState(true);

  // Murabaha State
  const [carPrice, setCarPrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const term = 60;

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      name: "Sobeys Groceries",
      amount: -82.3,
      category: "Food",
      type: "halal",
      status: "approved",
      time: "2:14 PM",
    },
    {
      id: 2,
      name: "Shell Gas Station",
      amount: -65.0,
      category: "Transport",
      type: "halal",
      status: "approved",
      time: "11:05 AM",
    },
    {
      id: 3,
      name: "Noor Profit Share",
      amount: 45.2,
      category: "Profit",
      type: "profit",
      status: "approved",
      time: "Yesterday",
    },
    {
      id: 4,
      name: "The LCBO",
      amount: -42.0,
      category: "Alcohol",
      type: "haram",
      status: "declined",
      time: "Monday",
    },
  ]);

  const userEquity = 24;
  const [otherAssets, setOtherAssets] = useState(2500);

  useEffect(() => {
    // Initial loading sequence
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 2800);

    document.body.style.overscrollBehaviorY = "contain";
    return () => {
      clearTimeout(timer);
      document.body.style.overscrollBehaviorY = "auto";
    };
  }, []);

  const triggerNotification = (title, message, type = "success") => {
    setNotification({ title, message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const simulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      triggerNotification(
        "Bank AI Updated",
        "Synced with RBC & TD successfully.",
      );
    }, 1500);
  };

  const addRandomTransaction = () => {
    const merchants = [
      { name: "Starbucks Coffee", amount: -6.45, type: "halal" },
      { name: "Petro Canada", amount: -72.1, type: "halal" },
      { name: "Amazon.ca", amount: -124.5, type: "halal" },
      { name: "Loblaws", amount: -94.2, type: "halal" },
      { name: "Casino Woodbine", amount: -500.0, type: "haram" },
      { name: "The Wine Rack", amount: -38.0, type: "haram" },
      { name: "DraftKings Betting", amount: -50.0, type: "haram" },
      { name: "Sobeys", amount: -42.15, type: "halal" },
    ];

    const merchant = merchants[Math.floor(Math.random() * merchants.length)];
    const isHaram = merchant.type === "haram";

    const newTx = {
      id: Date.now(),
      name: merchant.name,
      amount: merchant.amount,
      type: merchant.type,
      status: isHaram && halalFilterActive ? "declined" : "approved",
      time: "Just Now",
    };

    setTransactions([newTx, ...transactions]);

    if (newTx.status === "declined") {
      triggerNotification(
        "Transaction Blocked",
        `Halal AI stopped payment at ${merchant.name}.`,
        "error",
      );
    } else {
      setBalance((prev) => prev + merchant.amount);
      triggerNotification(
        "Payment Successful",
        `Paid $${Math.abs(merchant.amount).toFixed(2)} to ${merchant.name}`,
      );
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6 pb-24 animate-in fade-in duration-700">
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
        <button
          onClick={simulateSync}
          className="whitespace-nowrap bg-amber-600 text-white text-xs font-bold px-4 py-3 rounded-2xl flex items-center gap-2 shadow-lg active:scale-95 transition-transform"
        >
          <RefreshCcw size={14} className={isSyncing ? "animate-spin" : ""} />{" "}
          Sync Banks
        </button>
        <button
          onClick={addRandomTransaction}
          className="whitespace-nowrap bg-[#064e3b] text-white text-xs font-bold px-4 py-3 rounded-2xl flex items-center gap-2 shadow-lg active:scale-95 transition-transform"
        >
          <Zap size={14} /> Simulate Swipe
        </button>
      </div>

      <div className="bg-[#064e3b] rounded-[2.5rem] p-7 text-white shadow-2xl border border-emerald-400/20 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-emerald-300/80 text-xs font-bold uppercase tracking-widest">
            Total Wealth
          </p>
          <h1 className="text-4xl font-bold mt-2 tracking-tight">
            ${balance.toLocaleString()}
          </h1>
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <TrendingUp size={16} /> <span>+4.2% APY</span>
            </div>
            <div className="bg-white/10 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter">
              Mudarabah
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          {
            icon: <ArrowUpRight />,
            label: "Send",
            color: "bg-emerald-100 text-emerald-700",
          },
          {
            icon: <ArrowDownRight />,
            label: "Add",
            color: "bg-amber-100 text-amber-700",
          },
          {
            icon: <Wallet />,
            label: "Wallet",
            color: "bg-slate-100 text-slate-700",
          },
          {
            icon: <Fingerprint />,
            label: "Zakat",
            color: "bg-indigo-100 text-indigo-700",
            action: () => {
              setActiveTab("financing");
              setFinancingSubPage("zakat");
            },
          },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            className="flex flex-col items-center gap-2 active:scale-90 transition-transform"
          >
            <div className={`p-4 rounded-2xl ${item.color}`}>{item.icon}</div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 px-1 text-slate-900">Activity</h2>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className={`bg-white p-4 rounded-[2rem] border flex items-center justify-between shadow-sm transition-all ${
                tx.status === "declined"
                  ? "border-rose-100 opacity-80"
                  : "border-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-xl ${
                    tx.status === "declined"
                      ? "bg-rose-50 text-rose-500"
                      : "bg-slate-50 text-slate-600"
                  }`}
                >
                  {tx.status === "declined" ? (
                    <ShieldX size={18} />
                  ) : tx.type === "profit" ? (
                    <Zap size={18} className="text-emerald-500" />
                  ) : (
                    <CreditCard size={18} />
                  )}
                </div>
                <div>
                  <p
                    className={`font-bold text-sm ${
                      tx.status === "declined"
                        ? "text-rose-900"
                        : "text-slate-900"
                    }`}
                  >
                    {tx.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    {tx.time}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold ${
                    tx.status === "declined"
                      ? "text-rose-300 line-through"
                      : "text-slate-900"
                  }`}
                >
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </p>
                {tx.status === "declined" && (
                  <p className="text-[8px] text-rose-500 font-bold uppercase tracking-tighter">
                    AI Blocked
                  </p>
                )}
                {tx.status === "approved" && tx.type === "halal" && (
                  <p className="text-[8px] text-emerald-500 font-bold uppercase tracking-tighter">
                    Verified Halal
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMurabaha = () => {
    const profitRate = 0.08;
    const financedAmount = carPrice - downPayment;
    const totalProfit = financedAmount * profitRate * (term / 12);
    const totalContract = financedAmount + totalProfit;
    const monthlyPayment = totalContract / term;

    return (
      <div className="space-y-6 pb-24 animate-in slide-in-from-right-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFinancingSubPage("main")}
            className="p-2 bg-white rounded-xl shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">Auto Murabaha</h2>
        </div>

        <div className="bg-amber-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
          <p className="text-amber-200 text-xs font-bold uppercase tracking-widest">
            Fixed Monthly Cost
          </p>
          <h3 className="text-5xl font-black mt-2 tracking-tighter">
            ${monthlyPayment.toFixed(2)}
          </h3>
          <div className="mt-4 flex gap-4 text-[10px] uppercase font-bold text-amber-100/60">
            <span>0% Interest</span>
            <span>•</span>
            <span>Fixed Profit Margin</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
              Vehicle Price: ${carPrice.toLocaleString()}
            </label>
            <input
              type="range"
              min="10000"
              max="100000"
              step="1000"
              value={carPrice}
              onChange={(e) => setCarPrice(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
              Down Payment: ${downPayment.toLocaleString()}
            </label>
            <input
              type="range"
              min="0"
              max={carPrice * 0.5}
              step="500"
              value={downPayment}
              onChange={(e) => setDownPayment(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>

          <div className="pt-4 border-t border-slate-50 space-y-3">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-400 uppercase">
                Total Ownership Cost
              </span>
              <span className="text-slate-900">
                ${totalContract.toLocaleString()}
              </span>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl flex gap-3">
              <AlertTriangle className="text-amber-600 shrink-0" size={18} />
              <p className="text-[10px] text-amber-800 font-medium">
                In a Murabaha contract, Noor buys the car and resells it to you
                at a fixed, transparent profit. No hidden interest or penalties.
              </p>
            </div>
          </div>
        </div>

        <button className="w-full bg-amber-600 text-white p-5 rounded-[1.5rem] font-bold shadow-lg shadow-amber-200 active:scale-95 transition-transform">
          Apply for Financing
        </button>
      </div>
    );
  };

  const renderZakat = () => {
    const zakatDue = (balance + otherAssets) * 0.025;
    return (
      <div className="space-y-6 pb-24 animate-in slide-in-from-right-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFinancingSubPage("main")}
            className="p-2 bg-white rounded-xl shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">Zakat Calculator</h2>
        </div>
        <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl">
          <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest">
            Estimated Zakat
          </p>
          <h3 className="text-5xl font-black mt-2 tracking-tighter">
            ${zakatDue.toFixed(2)}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 space-y-4">
          <div className="flex justify-between items-center text-sm font-bold text-slate-600">
            <span className="flex items-center gap-2">
              <Wallet size={16} /> Balance
            </span>
            <span>${balance.toLocaleString()}</span>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
              Outside Assets
            </label>
            <div className="relative">
              <Coins
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                size={18}
              />
              <input
                type="number"
                value={otherAssets}
                onChange={(e) => setOtherAssets(Number(e.target.value))}
                className="w-full bg-slate-50 border-none rounded-2xl p-4 pl-12 font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>
        <button className="w-full bg-indigo-600 text-white p-5 rounded-[1.5rem] font-bold shadow-lg shadow-indigo-200 active:scale-95 transition-transform">
          Pay Zakat Now
        </button>
      </div>
    );
  };

  const renderEquity = () => {
    if (financingSubPage === "zakat") return renderZakat();
    if (financingSubPage === "murabaha") return renderMurabaha();
    return (
      <div className="space-y-8 pb-24 animate-in slide-in-from-bottom-4">
        <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 text-center">
          <h2 className="text-2xl font-bold mb-2 text-slate-900">
            Home Partnership
          </h2>
          <div className="relative w-48 h-48 mx-auto my-8 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#f1f5f9"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#10b981"
                strokeWidth="10"
                fill="none"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - userEquity / 100)}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute flex flex-col">
              <span className="text-4xl font-black text-slate-900 tracking-tighter">
                {userEquity}%
              </span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest text-center">
                Equity
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => setFinancingSubPage("zakat")}
            className="p-6 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 cursor-pointer active:scale-95 transition-transform"
          >
            <Fingerprint className="text-indigo-600 mb-4" size={28} />
            <p className="font-bold text-indigo-900">Zakat</p>
            <p className="text-[10px] text-indigo-400 font-bold uppercase mt-1">
              Alms
            </p>
          </div>
          <div
            onClick={() => setFinancingSubPage("murabaha")}
            className="p-6 bg-amber-50 rounded-[2.5rem] border border-amber-100 cursor-pointer active:scale-95 transition-transform"
          >
            <Car className="text-amber-600 mb-4" size={28} />
            <p className="font-bold text-amber-900">Murabaha</p>
            <p className="text-[10px] text-amber-400 font-bold uppercase mt-1">
              Auto
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderCard = () => (
    <div className="space-y-6 pb-24 animate-in slide-in-from-bottom-4">
      <h2 className="text-2xl font-bold text-slate-900">Your Card</h2>

      <div
        className={`aspect-[1.58/1] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden transition-all duration-500 ${
          isFrozen
            ? "grayscale bg-slate-800"
            : "bg-gradient-to-br from-emerald-900 via-[#064e3b] to-slate-900"
        }`}
      >
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl"></div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-black text-2xl italic tracking-tighter opacity-90">
              noor.
            </span>
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-emerald-400/80" />
              <div className="w-10 h-8 bg-amber-400/20 rounded-md border border-amber-400/30"></div>
            </div>
          </div>

          {/* CENTERED CARD INFO */}
          <div className="flex flex-col items-center justify-center flex-1 py-4">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10 flex flex-col items-center gap-3">
              <div className="flex items-center gap-4">
                <p className="text-2xl font-mono tracking-[0.15em] font-medium">
                  {showCardDetails
                    ? "4532 8812 0094 1120"
                    : "•••• •••• •••• 1120"}
                </p>
                <button
                  onClick={() => setShowCardDetails(!showCardDetails)}
                  className="p-2 bg-white/10 rounded-full active:scale-90 transition-transform"
                >
                  <Eye size={18} className="text-emerald-300" />
                </button>
              </div>
              <div className="flex gap-10">
                <div className="flex flex-col items-center">
                  <span className="text-[7px] font-bold uppercase tracking-widest text-emerald-300/60 mb-0.5">
                    Expiry
                  </span>
                  <span className="text-sm font-mono tracking-wider font-medium">
                    09/28
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[7px] font-bold uppercase tracking-widest text-emerald-300/60 mb-0.5">
                    CVV
                  </span>
                  <span className="text-sm font-mono tracking-wider font-medium">
                    {showCardDetails ? "442" : "•••"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
              Visa Platinum
            </p>
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-rose-500/80"></div>
              <div className="w-8 h-8 rounded-full bg-amber-500/80"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-2 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <Zap size={20} />
            </div>
            <div>
              <p className="font-bold text-sm">Halal Filter AI</p>
              <p className="text-[10px] text-slate-400">
                Block non-compliant merchants
              </p>
            </div>
          </div>
          <button
            onClick={() => setHalalFilterActive(!halalFilterActive)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              halalFilterActive ? "bg-emerald-500" : "bg-slate-200"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-transform ${
                halalFilterActive ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Lock size={20} />
            </div>
            <div>
              <p className="font-bold text-sm">Freeze Card</p>
              <p className="text-[10px] text-slate-400">
                Instantly stop transactions
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsFrozen(!isFrozen)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              isFrozen ? "bg-blue-500" : "bg-slate-200"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-transform ${
                isFrozen ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  if (isInitializing) {
    return (
      <div className="fixed inset-0 bg-[#064e3b] z-[200] flex flex-col items-center justify-center text-white p-6 animate-out fade-out duration-1000 fill-mode-forwards">
        <div className="relative mb-4 flex flex-col items-center animate-in zoom-in-75 duration-500">
          <h1 className="text-6xl font-black italic tracking-tighter mb-2">
            noor.
          </h1>
          <p className="text-emerald-400 font-bold tracking-[0.3em] uppercase text-[10px] opacity-80">
            Financing the Right Way
          </p>
        </div>

        <div className="absolute bottom-16 flex flex-col items-center gap-3">
          <div className="w-12 h-1 bg-emerald-900/50 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full w-full animate-progress-fast"></div>
          </div>
          <p className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest">
            Securing Wallet...
          </p>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
                @keyframes progress-fast {
                    0% { width: 0%; transform: translateX(-100%); }
                    50% { width: 40%; }
                    100% { width: 100%; transform: translateX(100%); }
                }
                .animate-progress-fast {
                    animation: progress-fast 1.5s ease-in-out infinite;
                }
            `,
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col px-6 pt-[env(safe-area-inset-top,24px)] select-none overflow-hidden animate-in fade-in duration-1000">
      {notification && (
        <div
          className={`fixed top-12 left-6 right-6 z-[100] bg-white shadow-2xl rounded-[1.5rem] p-4 border-l-4 ${
            notification.type === "error"
              ? "border-rose-500"
              : "border-emerald-500"
          } animate-in slide-in-from-top-10 flex items-center gap-3`}
        >
          {notification.type === "error" ? (
            <ShieldX className="text-rose-500 shrink-0" size={20} />
          ) : (
            <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
          )}
          <div>
            <p className="font-bold text-sm text-slate-900 leading-none">
              {notification.title}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {notification.message}
            </p>
          </div>
        </div>
      )}

      <header className="flex justify-between items-center py-6 shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-[#064e3b] p-2 rounded-lg">
            <Lock size={16} className="text-white" />
          </div>
          <span className="font-black text-2xl tracking-tighter">noor.</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell size={24} className="text-slate-400" />
            {purificationPending > 0 && (
              <div className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#f8fafc]"></div>
            )}
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden shadow-sm">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="avatar"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "financing" && renderEquity()}
        {activeTab === "purify" && (
          <div className="space-y-6 pb-24 animate-in zoom-in-95 duration-300">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 text-center">
              <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                <Droplets size={40} />
              </div>
              <h2 className="text-2xl font-bold">Wealth Purity</h2>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Auto-identify non-halal accidental earnings for cleansing.
              </p>
            </div>
            <div className="bg-[#0f172a] p-8 rounded-[3rem] text-white relative overflow-hidden">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                Pending Purification
              </p>
              <h3 className="text-5xl font-black mb-10 tracking-tighter">
                ${purificationPending.toFixed(2)}
              </h3>
              <button
                onClick={() => {
                  setPurificationPending(0);
                  triggerNotification(
                    "Wealth Purified",
                    "Funds sent to charity.",
                  );
                }}
                className="w-full bg-emerald-500 text-[#0f172a] p-5 rounded-[1.5rem] font-black text-lg shadow-lg active:scale-95 transition-transform"
              >
                Distribute to Charity
              </button>
            </div>
          </div>
        )}
        {activeTab === "settings" && renderCard()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-2xl border-t border-slate-100 px-8 flex justify-between items-start shadow-[0_-10px_40px_rgba(0,0,0,0.04)] h-[94px]">
        <NavButton
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
          icon={<PieChart />}
          label="Stats"
        />
        <NavButton
          active={activeTab === "financing"}
          onClick={() => {
            setActiveTab("financing");
            setFinancingSubPage("main");
          }}
          icon={<Home />}
          label="Equity"
        />
        <NavButton
          active={activeTab === "purify"}
          onClick={() => setActiveTab("purify")}
          icon={<Droplets />}
          label="Purity"
        />
        <NavButton
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
          icon={<CreditCard />}
          label="Card"
        />
      </nav>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1.5 transition-all duration-300 min-w-[64px] mt-2.5 ${
      active ? "text-emerald-700" : "text-slate-300"
    }`}
  >
    <div
      className={`p-1.5 rounded-xl transition-all duration-300 ${
        active ? "bg-emerald-50 scale-105" : "bg-transparent"
      }`}
    >
      {React.cloneElement(icon, { size: 22, strokeWidth: active ? 2.5 : 2 })}
    </div>
    <span
      className={`text-[8.5px] font-bold uppercase tracking-[0.05em] leading-none transition-all duration-300 ${
        active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
      }`}
    >
      {label}
    </span>
  </button>
);

export default App;
