import React, { useState } from "react";
import {
  CreditCard,
  Home,
  Car,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
  Zap,
  XCircle,
  TrendingUp,
  Droplets,
  Bell,
  Fingerprint,
  Wallet,
  RefreshCcw,
  ChevronLeft,
  Info,
  Coins,
  Eye,
} from "lucide-react";

const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [financingSubPage, setFinancingSubPage] = useState("main");
  const [balance, setBalance] = useState(12450.75);
  const [purificationPending, setPurificationPending] = useState(12.45);
  const [isSyncing, setIsSyncing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showCardDetails, setShowCardDetails] = useState(true);
  const [isFrozen, setIsFrozen] = useState(false);
  const [halalFilterActive, setHalalFilterActive] = useState(true);

  const [transactions] = useState([
    {
      id: 1,
      name: "Sobeys Groceries",
      amount: -82.3,
      category: "Food",
      type: "halal",
      time: "2:14 PM",
    },
    {
      id: 2,
      name: "Shell Gas",
      amount: -65.0,
      category: "Transport",
      type: "halal",
      time: "11:05 AM",
    },
    {
      id: 3,
      name: "Profit Share",
      amount: 45.2,
      category: "Profit",
      type: "profit",
      time: "Yesterday",
    },
    {
      id: 4,
      name: "The LCBO",
      amount: -42.0,
      category: "Alcohol",
      type: "haram",
      time: "Monday",
    },
  ]);

  const [userEquity, setUserEquity] = useState(24);
  const [otherAssets, setOtherAssets] = useState(2500);

  const zakatDue =
    balance + otherAssets >= 6800 ? (balance + otherAssets) * 0.025 : 0;

  const triggerNotification = (title, message) => {
    setNotification({ title, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const simulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setPurificationPending((prev) => prev + 4.5);
      triggerNotification(
        "Bank Sync Complete",
        "Identified $4.50 for purification.",
      );
    }, 2000);
  };

  const renderDashboard = () => (
    <div className="space-y-6 pb-24 animate-in fade-in duration-500">
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
        <button
          onClick={simulateSync}
          className="whitespace-nowrap bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
        >
          <RefreshCcw size={14} className={isSyncing ? "animate-spin" : ""} />{" "}
          Sync Bank AI
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
              Mudarabah Savings
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
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 px-1">Activity</h2>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-white p-4 rounded-[2rem] border border-slate-100 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-xl ${
                    tx.type === "haram"
                      ? "bg-rose-50 text-rose-500"
                      : "bg-slate-50"
                  }`}
                >
                  {tx.type === "haram" ? (
                    <XCircle size={18} />
                  ) : tx.type === "profit" ? (
                    <Zap size={18} className="text-emerald-500" />
                  ) : (
                    <CreditCard size={18} />
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">{tx.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    {tx.time}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold ${
                    tx.type === "haram"
                      ? "text-rose-300 line-through"
                      : "text-slate-900"
                  }`}
                >
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </p>
                {tx.type === "haram" && (
                  <p className="text-[8px] text-rose-500 font-bold uppercase">
                    Blocked
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
      <h2 className="text-2xl font-bold">Your Card</h2>
      <div
        className={`aspect-[1.58/1] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden transition-all duration-500 ${
          isFrozen
            ? "grayscale bg-slate-800"
            : "bg-gradient-to-br from-emerald-900 via-[#064e3b] to-slate-900"
        }`}
      >
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-black text-xl italic tracking-tighter">
              noor.
            </span>
            <Lock size={20} className="text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-xl font-mono tracking-[0.15em]">
                {showCardDetails
                  ? "4532 8812 0094 1120"
                  : "•••• •••• •••• 1120"}
              </p>
              <button
                onClick={() => setShowCardDetails(!showCardDetails)}
                className="p-2 bg-white/10 rounded-full"
              >
                <Eye size={16} />
              </button>
            </div>
            <div className="flex gap-6 text-[10px] font-mono opacity-70">
              <span>EXP: 09/28</span>
              <span>CVV: {showCardDetails ? "442" : "•••"}</span>
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
                Auto-block non-compliant merchants
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
                Instantly disable all transactions
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

  const renderZakat = () => (
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
        <h3 className="text-5xl font-black mt-2">${zakatDue.toFixed(2)}</h3>
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
              className="w-full bg-slate-50 border-none rounded-2xl p-4 pl-12 font-bold focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="p-4 bg-indigo-50 rounded-2xl flex gap-3">
          <Info className="text-indigo-500 shrink-0" size={18} />
          <p className="text-[10px] text-indigo-700 font-medium">
            Nisab is currently $6,800. Your zakatable total is $
            {(balance + otherAssets).toLocaleString()}.
          </p>
        </div>
      </div>
      <button className="w-full bg-indigo-600 text-white p-5 rounded-[1.5rem] font-bold shadow-lg shadow-indigo-200 active:scale-95 transition-transform">
        Pay Zakat Now
      </button>
    </div>
  );

  const renderEquity = () => {
    if (financingSubPage === "zakat") return renderZakat();
    return (
      <div className="space-y-8 pb-24 animate-in slide-in-from-bottom-4">
        <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 text-center">
          <h2 className="text-2xl font-bold mb-2">Home Partnership</h2>
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
              <span className="text-4xl font-black text-slate-900">
                {userEquity}%
              </span>
              <span className="text-[8px] font-bold text-slate-400 uppercase">
                Your Equity
              </span>
            </div>
          </div>
          <div className="flex justify-between border-t border-slate-50 pt-6">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">
                Rent Paid
              </p>
              <p className="font-bold text-emerald-600">$1,100</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">
                Home Value
              </p>
              <p className="font-bold text-slate-900">$450k</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setUserEquity((prev) => Math.min(prev + 1, 100))}
          className="w-full bg-[#064e3b] text-white p-6 rounded-[2rem] flex justify-between items-center group shadow-xl"
        >
          <div className="text-left">
            <p className="font-bold text-lg">Increase Equity</p>
            <p className="text-emerald-300/60 text-xs">
              Purchase 1% for $4,500
            </p>
          </div>
          <div className="bg-white/10 p-3 rounded-2xl group-active:scale-90">
            <ArrowUpRight />
          </div>
        </button>

        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => setFinancingSubPage("zakat")}
            className="p-6 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 cursor-pointer"
          >
            <Fingerprint className="text-indigo-600 mb-4" size={28} />
            <p className="font-bold text-indigo-900">Zakat</p>
            <p className="text-[10px] text-indigo-400 font-bold uppercase mt-1">
              Pay Alms
            </p>
          </div>
          <div className="p-6 bg-amber-50 rounded-[2.5rem] border border-amber-100">
            <Car className="text-amber-600 mb-4" size={28} />
            <p className="font-bold text-amber-900">Murabaha</p>
            <p className="text-[10px] text-amber-400 font-bold uppercase mt-1">
              Auto Finance
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderPurity = () => (
    <div className="space-y-6 pb-24 animate-in zoom-in-95 duration-300">
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 text-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
          <Droplets size={40} />
        </div>
        <h2 className="text-2xl font-bold">Wealth Purification</h2>
        <p className="text-slate-400 text-sm mt-2 leading-relaxed">
          We automatically identify accidental non-halal earnings for you to
          cleanse.
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
            triggerNotification("Wealth Purified", "Funds sent to charity.");
          }}
          className="w-full bg-emerald-500 text-[#0f172a] p-5 rounded-[1.5rem] font-black text-lg shadow-lg active:scale-95 transition-transform"
        >
          Distribute to Charity
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col px-6 pt-[env(safe-area-inset-top,24px)]">
      {notification && (
        <div className="fixed top-12 left-6 right-6 z-[100] bg-white shadow-2xl rounded-[1.5rem] p-4 border-l-4 border-emerald-500 animate-in slide-in-from-top-10">
          <p className="font-bold text-sm text-slate-900">
            {notification.title}
          </p>
          <p className="text-xs text-slate-500 mt-1">{notification.message}</p>
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
        {activeTab === "purify" && renderPurity()}
        {activeTab === "settings" && renderCard()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-slate-100 px-8 pt-4 pb-[env(safe-area-inset-bottom,24px)] flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
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
    className={`flex flex-col items-center gap-1.5 transition-all ${
      active ? "text-emerald-700 scale-110" : "text-slate-300"
    }`}
  >
    <div className={`p-1 rounded-xl ${active ? "bg-emerald-50" : ""}`}>
      {React.cloneElement(icon, { size: 24, strokeWidth: active ? 2.5 : 2 })}
    </div>
    <span
      className={`text-[9px] font-black uppercase tracking-widest ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      {label}
    </span>
  </button>
);

export default App;
