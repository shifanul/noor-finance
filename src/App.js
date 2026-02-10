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
  AlertTriangle,
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
      name: "Shell Gas",
      amount: -65.0,
      category: "Transport",
      type: "halal",
      status: "approved",
      time: "11:05 AM",
    },
    {
      id: 3,
      name: "Profit Share",
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
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const triggerNotification = (title, message, type = "success") => {
    setNotification({ title, message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const simulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      triggerNotification("Bank AI Updated", "Synced successfully.");
    }, 1500);
  };

  const addRandomTransaction = () => {
    const merchants = [
      { name: "Starbucks", amount: -6.45, type: "halal" },
      { name: "Petro Canada", amount: -72.1, type: "halal" },
      { name: "Amazon.ca", amount: -124.5, type: "halal" },
      { name: "Casino Woodbine", amount: -500.0, type: "haram" },
      { name: "The Wine Rack", amount: -38.0, type: "haram" },
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

    setTransactions([newTx, ...transactions.slice(0, 5)]);

    if (newTx.status === "declined") {
      triggerNotification(
        "Blocked",
        `Halal AI stopped payment at ${merchant.name}.`,
        "error",
      );
    } else {
      setBalance((prev) => prev + merchant.amount);
      triggerNotification(
        "Success",
        `Paid $${Math.abs(merchant.amount).toFixed(2)} to ${merchant.name}`,
      );
    }
  };

  const renderDashboard = () => (
    <div className="space-y-4 pb-24 animate-in fade-in duration-500">
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={simulateSync}
          className="whitespace-nowrap bg-amber-600 text-white text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-2 shadow hover:opacity-90 active:scale-95 transition-all"
        >
          <RefreshCcw size={12} className={isSyncing ? "animate-spin" : ""} />{" "}
          Sync
        </button>
        <button
          onClick={addRandomTransaction}
          className="whitespace-nowrap bg-[#064e3b] text-white text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-2 shadow hover:opacity-90 active:scale-95 transition-all"
        >
          <Zap size={12} /> Simulate
        </button>
      </div>

      <div className="bg-[#064e3b] rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-emerald-300/80 text-[10px] font-bold uppercase tracking-widest">
            Total Wealth
          </p>
          <h1 className="text-3xl font-bold mt-1 tracking-tight">
            ${balance.toLocaleString()}
          </h1>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
              <TrendingUp size={14} /> <span>+4.2% APY</span>
            </div>
            <div className="bg-white/10 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-tighter">
              Mudarabah
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          {
            icon: <ArrowUpRight size={20} />,
            label: "Send",
            color: "bg-emerald-100 text-emerald-700",
          },
          {
            icon: <ArrowDownRight size={20} />,
            label: "Add",
            color: "bg-amber-100 text-amber-700",
          },
          {
            icon: <Wallet size={20} />,
            label: "Wallet",
            color: "bg-slate-100 text-slate-700",
          },
          {
            icon: <Fingerprint size={20} />,
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
            className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform"
          >
            <div className={`p-3.5 rounded-2xl ${item.color}`}>{item.icon}</div>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-2">
        <h2 className="text-lg font-bold mb-3 px-1 text-slate-900">Activity</h2>
        <div className="space-y-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className={`bg-white p-3.5 rounded-2xl border flex items-center justify-between shadow-sm ${
                tx.status === "declined"
                  ? "border-rose-100 opacity-80"
                  : "border-slate-50"
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    tx.status === "declined"
                      ? "bg-rose-50 text-rose-500"
                      : "bg-slate-50 text-slate-600"
                  }`}
                >
                  {tx.status === "declined" ? (
                    <ShieldX size={16} />
                  ) : tx.type === "profit" ? (
                    <Zap size={16} className="text-emerald-500" />
                  ) : (
                    <CreditCard size={16} />
                  )}
                </div>
                <div className="truncate">
                  <p
                    className={`font-bold text-xs truncate ${
                      tx.status === "declined"
                        ? "text-rose-900"
                        : "text-slate-900"
                    }`}
                  >
                    {tx.name}
                  </p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">
                    {tx.time}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-2">
                <p
                  className={`font-bold text-xs ${
                    tx.status === "declined"
                      ? "text-rose-300 line-through"
                      : "text-slate-900"
                  }`}
                >
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </p>
                {tx.status === "declined" && (
                  <p className="text-[7px] text-rose-500 font-bold uppercase">
                    Blocked
                  </p>
                )}
                {tx.status === "approved" && tx.type === "halal" && (
                  <p className="text-[7px] text-emerald-500 font-bold uppercase">
                    Halal
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCard = () => (
    <div className="space-y-6 pb-24 animate-in slide-in-from-bottom-4">
      <h2 className="text-xl font-bold text-slate-900">Your Card</h2>

      {/* Mobile Optimized Card with safe bottom padding */}
      <div
        className={`w-full max-w-sm mx-auto aspect-[1.58/1] rounded-[1.25rem] px-5 py-6 text-white shadow-xl relative overflow-hidden transition-all duration-500 ${
          isFrozen
            ? "grayscale bg-slate-800"
            : "bg-gradient-to-br from-emerald-900 via-[#064e3b] to-slate-900"
        }`}
      >
        <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-black text-lg italic tracking-tighter opacity-90">
              noor.
            </span>
            <div className="w-8 h-6 bg-amber-400/20 rounded border border-amber-400/30"></div>
          </div>

          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-3 w-full">
              <p className="text-base font-mono tracking-[0.15em] font-medium overflow-hidden whitespace-nowrap">
                {showCardDetails
                  ? "4532 8812 0094 1120"
                  : "•••• •••• •••• 1120"}
              </p>
              <button
                onClick={() => setShowCardDetails(!showCardDetails)}
                className="p-1.5 bg-white/10 rounded-full active:scale-90 shrink-0"
              >
                <Eye size={12} className="text-emerald-300" />
              </button>
            </div>
            <div className="flex gap-6 mt-1 opacity-80">
              <div className="flex flex-col">
                <span className="text-[5px] font-bold uppercase tracking-widest text-emerald-300/60">
                  Expiry
                </span>
                <span className="text-[9px] font-mono font-medium">09/28</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[5px] font-bold uppercase tracking-widest text-emerald-300/60">
                  CVV
                </span>
                <span className="text-[9px] font-mono font-medium">
                  {showCardDetails ? "442" : "•••"}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom row with fixed padding to ensure Visa Logo/Text is visible */}
          <div className="flex justify-between items-center mt-2">
            <p className="text-[7px] font-bold uppercase tracking-widest opacity-60">
              Visa Platinum
            </p>
            <div className="flex -space-x-1.5">
              <div className="w-5 h-5 rounded-full bg-rose-500/80"></div>
              <div className="w-5 h-5 rounded-full bg-amber-500/80"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-1 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Zap size={18} />
            </div>
            <div>
              <p className="font-bold text-xs">Halal Filter AI</p>
              <p className="text-[9px] text-slate-400">Block haram merchants</p>
            </div>
          </div>
          <button
            onClick={() => setHalalFilterActive(!halalFilterActive)}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
              halalFilterActive ? "bg-emerald-500" : "bg-slate-200"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-transform ${
                halalFilterActive ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Lock size={18} />
            </div>
            <div>
              <p className="font-bold text-xs">Freeze Card</p>
              <p className="text-[9px] text-slate-400">Stop all payments</p>
            </div>
          </div>
          <button
            onClick={() => setIsFrozen(!isFrozen)}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
              isFrozen ? "bg-blue-500" : "bg-slate-200"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-transform ${
                isFrozen ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const renderEquity = () => {
    if (financingSubPage === "zakat") return renderZakat();
    if (financingSubPage === "murabaha") return renderMurabaha();
    return (
      <div className="space-y-6 pb-24 animate-in slide-in-from-bottom-4">
        <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-slate-50 text-center">
          <h2 className="text-xl font-bold mb-1 text-slate-900">Home Equity</h2>
          <div className="relative w-40 h-40 mx-auto my-6 flex items-center justify-center">
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
              <span className="text-3xl font-black text-slate-900 tracking-tighter">
                {userEquity}%
              </span>
              <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest text-center">
                Owned
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => setFinancingSubPage("zakat")}
            className="p-5 bg-indigo-50 rounded-[1.5rem] border border-indigo-100 cursor-pointer active:scale-95 transition-transform"
          >
            <Fingerprint className="text-indigo-600 mb-3" size={24} />
            <p className="font-bold text-xs text-indigo-900">Zakat</p>
            <p className="text-[8px] text-indigo-400 font-bold uppercase mt-0.5">
              Calculator
            </p>
          </div>
          <div
            onClick={() => setFinancingSubPage("murabaha")}
            className="p-5 bg-amber-50 rounded-[1.5rem] border border-amber-100 cursor-pointer active:scale-95 transition-transform"
          >
            <Car className="text-amber-600 mb-3" size={24} />
            <p className="font-bold text-xs text-amber-900">Murabaha</p>
            <p className="text-[8px] text-amber-400 font-bold uppercase mt-0.5">
              Auto
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderZakat = () => {
    const zakatDue = (balance + otherAssets) * 0.025;
    return (
      <div className="space-y-4 pb-24 animate-in slide-in-from-right-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFinancingSubPage("main")}
            className="p-2 bg-white rounded-lg shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-lg font-bold">Zakat</h2>
        </div>
        <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg">
          <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest">
            Due This Year
          </p>
          <h3 className="text-4xl font-black mt-1 tracking-tighter">
            ${zakatDue.toFixed(2)}
          </h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-slate-600">
            <span className="flex items-center gap-2">
              <Wallet size={14} /> App Balance
            </span>
            <span>${balance.toLocaleString()}</span>
          </div>
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1">
              Other Assets
            </label>
            <div className="relative">
              <Coins
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                size={16}
              />
              <input
                type="number"
                value={otherAssets}
                onChange={(e) => setOtherAssets(Number(e.target.value))}
                className="w-full bg-slate-50 border-none rounded-xl p-3 pl-10 text-sm font-bold focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>
        <button className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform">
          Pay Alms
        </button>
      </div>
    );
  };

  const renderMurabaha = () => {
    const profitRate = 0.08;
    const financedAmount = carPrice - downPayment;
    const totalProfit = financedAmount * profitRate * (term / 12);
    const totalContract = financedAmount + totalProfit;
    const monthlyPayment = totalContract / term;

    return (
      <div className="space-y-4 pb-24 animate-in slide-in-from-right-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFinancingSubPage("main")}
            className="p-2 bg-white rounded-lg shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-lg font-bold">Auto Finance</h2>
        </div>

        <div className="bg-amber-600 rounded-3xl p-6 text-white shadow-lg">
          <p className="text-amber-200 text-[10px] font-bold uppercase tracking-widest">
            Monthly Payment
          </p>
          <h3 className="text-4xl font-black mt-1 tracking-tighter">
            ${monthlyPayment.toFixed(2)}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 space-y-5">
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1">
              Car Price: ${carPrice.toLocaleString()}
            </label>
            <input
              type="range"
              min="10000"
              max="100000"
              step="1000"
              value={carPrice}
              onChange={(e) => setCarPrice(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1">
              Down: ${downPayment.toLocaleString()}
            </label>
            <input
              type="range"
              min="0"
              max={carPrice * 0.5}
              step="500"
              value={downPayment}
              onChange={(e) => setDownPayment(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>
          <div className="p-3 bg-amber-50 rounded-xl flex gap-3">
            <AlertTriangle className="text-amber-600 shrink-0" size={14} />
            <p className="text-[9px] text-amber-800 font-medium">
              Murabaha: No hidden interest. Fixed markup transparently
              disclosed.
            </p>
          </div>
        </div>
        <button className="w-full bg-amber-600 text-white p-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform">
          Get Quote
        </button>
      </div>
    );
  };

  if (isInitializing) {
    return (
      <div className="fixed inset-0 bg-[#064e3b] z-[200] flex flex-col items-center justify-center text-white p-6 animate-out fade-out duration-1000 fill-mode-forwards">
        <h1 className="text-5xl font-black italic tracking-tighter mb-1">
          noor.
        </h1>
        <p className="text-emerald-400 font-bold tracking-[0.2em] uppercase text-[8px] opacity-80">
          Financing The Right Way
        </p>
        <div className="absolute bottom-20 w-10 h-0.5 bg-emerald-900/50 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-400 rounded-full w-full animate-progress-fast"></div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `@keyframes progress-fast { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } } .animate-progress-fast { animation: progress-fast 1s ease-in-out infinite; }`,
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col px-5 pt-[env(safe-area-inset-top,20px)] select-none overflow-hidden font-sans">
      {notification && (
        <div className="fixed top-8 left-5 right-5 z-[100] bg-white shadow-2xl rounded-2xl p-3 border-l-4 border-emerald-500 animate-in slide-in-from-top-4 flex items-center gap-3">
          <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
          <div className="truncate">
            <p className="font-bold text-xs text-slate-900 leading-tight truncate">
              {notification.title}
            </p>
            <p className="text-[10px] text-slate-500 truncate">
              {notification.message}
            </p>
          </div>
        </div>
      )}

      <header className="flex justify-between items-center py-4 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="bg-[#064e3b] p-1.5 rounded-lg">
            <Lock size={12} className="text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter">noor.</span>
        </div>
        <div className="flex items-center gap-3">
          <Bell size={20} className="text-slate-400" />
          <div className="w-8 h-8 rounded-full bg-slate-200 border border-white overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="avatar"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "financing" && renderEquity()}
        {activeTab === "purify" && (
          <div className="space-y-4 animate-in zoom-in-95 duration-200">
            <div className="bg-white p-8 rounded-[2rem] shadow border border-slate-50 text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Droplets size={32} />
              </div>
              <h2 className="text-xl font-bold">Wealth Purity</h2>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Cleansing non-halal earnings.
              </p>
            </div>
            <div className="bg-[#0f172a] p-6 rounded-[2rem] text-white">
              <p className="text-slate-400 text-[8px] font-bold uppercase tracking-widest mb-2">
                To Be Purified
              </p>
              <h3 className="text-4xl font-black mb-6 tracking-tighter">
                ${purificationPending.toFixed(2)}
              </h3>
              <button
                onClick={() => {
                  setPurificationPending(0);
                  triggerNotification("Purified", "Donated to charity.");
                }}
                className="w-full bg-emerald-500 text-[#0f172a] p-4 rounded-xl font-black shadow-lg active:scale-95 transition-transform"
              >
                Donate Now
              </button>
            </div>
          </div>
        )}
        {activeTab === "settings" && renderCard()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-50 px-6 flex justify-between items-center h-[75px] pb-safe">
        <NavButton
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
          icon={<PieChart />}
          label="Home"
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
    className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 min-w-[50px] ${
      active ? "text-emerald-700" : "text-slate-300"
    }`}
  >
    <div
      className={`p-2 rounded-lg transition-all ${
        active ? "bg-emerald-50" : "bg-transparent"
      }`}
    >
      {React.cloneElement(icon, { size: 20, strokeWidth: active ? 2.5 : 2 })}
    </div>
    <span
      className={`text-[8px] font-bold uppercase tracking-tighter ${
        active ? "opacity-100" : "opacity-0 translate-y-1"
      }`}
    >
      {label}
    </span>
  </button>
);

export default App;
