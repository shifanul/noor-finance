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
  EyeOff,
  ScanFace,
} from "lucide-react";
import USER_AVATAR_URL from "./IMG_3519.png";

const App = () => {
  // Navigation & Auth State
  const [appState, setAppState] = useState("splash");
  const [loadProgress, setLoadProgress] = useState(0);
  const [pin, setPin] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isFaceScanning, setIsFaceScanning] = useState(false);

  // Dashboard State
  const [activeTab, setActiveTab] = useState("dashboard");
  const [financingSubPage, setFinancingSubPage] = useState("main");
  const [balance, setBalance] = useState(12450.75);
  const [purificationPending, setPurificationPending] = useState(12.45);
  const [isSyncing, setIsSyncing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [halalFilterActive, setHalalFilterActive] = useState(true);

  // Murabaha State
  const [carPrice, setCarPrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const term = 60;

  // --- REPLACE THE URL BELOW WITH YOUR PNG LINK ---
  // Example: "https://your-site.com/my-avatar.png"
  // or a Base64 string: "data:image/png;base64,iVBOR..."
  // Updated Avatar Component to support PNGs and fallbacks
  const AvatarIcon = ({ size = "w-20 h-20" }) => {
    const [imgError, setImgError] = useState(false);

    return (
      <div
        className={`${size} rounded-full overflow-hidden border-2 border-white/20 bg-emerald-800/40 relative flex items-center justify-center`}
      >
        {USER_AVATAR_URL && !imgError ? (
          <img
            src={USER_AVATAR_URL}
            alt="User Profile"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-emerald-900">
            <ScanFace className="text-emerald-500/50" size={24} />
          </div>
        )}
      </div>
    );
  };

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

  // Initial Splash Loading
  useEffect(() => {
    if (appState === "splash") {
      const interval = setInterval(() => {
        setLoadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setAppState("login"), 300);
            return 100;
          }
          return prev + 2;
        });
      }, 25);
      return () => clearInterval(interval);
    }
  }, [appState]);

  // Handle PIN input
  useEffect(() => {
    if (pin.length === 4) {
      if (pin === "1234") {
        setAppState("authenticated");
      } else {
        setLoginError(true);
        setTimeout(() => {
          setPin("");
          setLoginError(false);
        }, 500);
      }
    }
  }, [pin]);

  const handleFaceId = () => {
    setIsFaceScanning(true);
    setTimeout(() => {
      setIsFaceScanning(false);
      setAppState("authenticated");
    }, 1500);
  };

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

  const renderLogin = () => (
    <div className="fixed inset-0 bg-[#064e3b] z-[150] flex flex-col items-center px-8 pt-20 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2">
          noor.
        </h1>
        <p className="text-emerald-300/60 text-[10px] font-bold uppercase tracking-[0.2em]">
          Secure Access
        </p>
      </div>

      <div className="flex flex-col items-center mb-12">
        <div
          className={`w-24 h-24 rounded-full bg-emerald-900/50 flex items-center justify-center border-2 border-emerald-500/30 mb-4 transition-all ${
            isFaceScanning ? "scale-110 border-emerald-400" : ""
          }`}
        >
          {isFaceScanning ? (
            <ScanFace className="text-emerald-400 animate-pulse" size={40} />
          ) : (
            <AvatarIcon />
          )}
        </div>
        <h2 className="text-white font-bold text-lg">Welcome back</h2>
        <p className="text-emerald-300/40 text-xs mt-1">
          Enter PIN (1234) or use Face ID
        </p>
      </div>

      <div className="flex gap-4 mb-12 h-4 items-center">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-3.5 h-3.5 rounded-full border-2 border-emerald-500/50 transition-all duration-200 ${
              pin.length > i ? "bg-amber-500 border-amber-500 scale-125" : ""
            } ${
              loginError ? "bg-rose-500 border-rose-500 animate-bounce" : ""
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-x-12 gap-y-6 max-w-[280px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => pin.length < 4 && setPin(pin + num)}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-medium active:bg-white/10 transition-colors"
          >
            {num}
          </button>
        ))}
        <button
          onClick={handleFaceId}
          className="w-14 h-14 rounded-full flex items-center justify-center text-emerald-400 active:bg-white/10"
        >
          <ScanFace size={28} />
        </button>
        <button
          onClick={() => pin.length < 4 && setPin(pin + "0")}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-medium active:bg-white/10"
        >
          0
        </button>
        <button
          onClick={() => setPin(pin.slice(0, -1))}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white/40 active:bg-white/10"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-4 pb-24 animate-in fade-in duration-500">
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={simulateSync}
          className="whitespace-nowrap bg-amber-600 text-white text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-2 shadow transition-all"
        >
          <RefreshCcw size={12} className={isSyncing ? "animate-spin" : ""} />{" "}
          Sync
        </button>
        <button
          onClick={addRandomTransaction}
          className="whitespace-nowrap bg-[#064e3b] text-white text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-2 shadow transition-all"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCard = () => (
    <div className="space-y-6 pb-24 animate-in slide-in-from-bottom-4">
      <h2 className="text-xl font-bold text-slate-900 px-1">Your Card</h2>
      <div
        className={`w-full aspect-[1.58/1] rounded-[1.5rem] p-6 text-white shadow-2xl relative flex flex-col justify-between transition-all duration-500 overflow-hidden ${
          isFrozen
            ? "grayscale bg-slate-800"
            : "bg-gradient-to-br from-[#064e3b] via-[#043d2e] to-[#022c22]"
        }`}
      >
        <div className="flex justify-between items-start">
          <span className="font-black text-2xl italic tracking-tighter">
            noor.
          </span>
          <div className="w-10 h-7 bg-amber-500/80 rounded flex flex-col justify-around p-1 shadow-inner">
            <div className="w-full h-[1px] bg-black/10"></div>
            <div className="w-full h-[1px] bg-black/10"></div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-lg font-mono tracking-[0.15em]">
            {showCardDetails ? "4532 8812 0094 1120" : "•••• •••• •••• 1120"}
          </p>
          <button
            onClick={() => setShowCardDetails(!showCardDetails)}
            className="p-1 bg-white/10 rounded-full"
          >
            {showCardDetails ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <p className="text-[10px] font-bold uppercase tracking-widest">
              Visa Platinum
            </p>
          </div>
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full bg-rose-600/90 border border-white/5"></div>
            <div className="w-7 h-7 rounded-full bg-amber-500/90 border border-white/5"></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Zap size={20} />
            </div>
            <p className="font-bold text-sm">Halal Filter AI</p>
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
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Lock size={20} />
            </div>
            <p className="font-bold text-sm">Freeze Card</p>
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

  const renderEquity = () => {
    if (financingSubPage === "zakat") return renderZakat();
    if (financingSubPage === "murabaha") return renderMurabaha();
    return (
      <div className="space-y-6 pb-24 animate-in slide-in-from-bottom-4">
        <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-slate-50 text-center">
          <h2 className="text-xl font-bold mb-1">Home Equity</h2>
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
              <span className="text-3xl font-black text-slate-900">
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
            className="p-5 bg-indigo-50 rounded-[1.5rem] border border-indigo-100 cursor-pointer"
          >
            <Fingerprint className="text-indigo-600 mb-3" size={24} />
            <p className="font-bold text-xs">Zakat</p>
          </div>
          <div
            onClick={() => setFinancingSubPage("murabaha")}
            className="p-5 bg-amber-50 rounded-[1.5rem] border border-amber-100 cursor-pointer"
          >
            <Car className="text-amber-600 mb-3" size={24} />
            <p className="font-bold text-xs">Murabaha</p>
          </div>
        </div>
      </div>
    );
  };

  const renderZakat = () => (
    <div className="space-y-4 pb-24 animate-in slide-in-from-right-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setFinancingSubPage("main")}
          className="p-2 bg-white rounded-lg"
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
          ${((balance + otherAssets) * 0.025).toFixed(2)}
        </h3>
      </div>
      <button className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold shadow-lg">
        Pay Zakat
      </button>
    </div>
  );

  const renderMurabaha = () => (
    <div className="space-y-4 pb-24 animate-in slide-in-from-right-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setFinancingSubPage("main")}
          className="p-2 bg-white rounded-lg"
        >
          <ChevronLeft size={18} />
        </button>
        <h2 className="text-lg font-bold">Murabaha Finance</h2>
      </div>
      <div className="bg-amber-600 rounded-3xl p-6 text-white shadow-lg text-center">
        <Car size={40} className="mx-auto mb-4 opacity-50" />
        <p className="text-xs font-bold uppercase tracking-widest">
          Calculated Payment
        </p>
        <h3 className="text-3xl font-black tracking-tighter">$482.50 / mo</h3>
      </div>
    </div>
  );

  if (appState === "splash") {
    return (
      <div className="fixed inset-0 bg-[#064e3b] z-[200] flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-5xl font-black italic tracking-tighter mb-1 animate-pulse">
          noor.
        </h1>
        <div className="w-48 h-[3px] bg-white/10 rounded-full overflow-hidden mt-8">
          <div
            className="h-full bg-amber-500"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
      </div>
    );
  }

  if (appState === "login") return renderLogin();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col px-5 pt-8 select-none font-sans overflow-hidden">
      {notification && (
        <div className="fixed top-8 left-5 right-5 z-[100] bg-white shadow-2xl rounded-2xl p-3 border-l-4 border-emerald-500 animate-in slide-in-from-top-4 flex items-center gap-3">
          <CheckCircle2 className="text-emerald-500" size={18} />
          <p className="font-bold text-xs text-slate-900 truncate">
            {notification.message}
          </p>
        </div>
      )}

      <header className="flex justify-between items-center py-4">
        <div className="flex items-center gap-1.5">
          <div className="bg-[#064e3b] p-1.5 rounded-lg">
            <Lock size={12} className="text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter">noor.</span>
        </div>
        <div className="flex items-center gap-3">
          <Bell size={20} className="text-slate-400" />
          <AvatarIcon size="w-9 h-9" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "financing" && renderEquity()}
        {activeTab === "purify" && (
          <div className="space-y-4 animate-in zoom-in-95">
            <div className="bg-white p-8 rounded-[2rem] shadow border text-center">
              <Droplets size={32} className="text-blue-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold">Wealth Purity</h2>
              <p className="text-slate-400 text-xs mt-1">
                Cleansing non-halal earnings.
              </p>
            </div>
            <div className="bg-[#0f172a] p-6 rounded-[2rem] text-white">
              <p className="text-[8px] font-bold uppercase tracking-widest mb-2">
                Pending
              </p>
              <h3 className="text-4xl font-black mb-6 tracking-tighter">
                ${purificationPending.toFixed(2)}
              </h3>
              <button
                onClick={() => {
                  setPurificationPending(0);
                  triggerNotification(null, "Donated successfully.");
                }}
                className="w-full bg-emerald-500 text-[#0f172a] p-4 rounded-xl font-black"
              >
                Donate Now
              </button>
            </div>
          </div>
        )}
        {activeTab === "settings" && renderCard()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t px-6 flex justify-between items-center h-[75px]">
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
    className={`flex flex-col items-center justify-center gap-1 min-w-[50px] ${
      active ? "text-emerald-700" : "text-slate-300"
    }`}
  >
    <div className={`p-2 rounded-lg ${active ? "bg-emerald-50" : ""}`}>
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <span className="text-[8px] font-bold uppercase tracking-tighter">
      {label}
    </span>
  </button>
);

export default App;
