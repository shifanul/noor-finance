import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  CreditCard,
  Home,
  Car,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Heart,
  Lock,
  Zap,
  TrendingUp,
  Droplets,
  Bell,
  Fingerprint,
  Wallet,
  RefreshCcw,
  CheckCircle2,
  ChevronLeft,
  Info,
  Smartphone,
  Coins,
  Calculator,
  Eye,
  ShieldX,
  EyeOff,
  ScanFace,
  History,
  TrendingDown,
  Building2,
  Globe,
  ExternalLink,
  Stethoscope,
  Check,
  Gem,
  Clock,
  FileText,
  Sparkles,
  CalendarDays,
} from "lucide-react";
import avatarUrl from "./IMG_3519.png";
import translations from "./i18n";

const App = () => {
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "en");
  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  const tRaw = (k) =>
    (translations[locale] && translations[locale][k]) ||
    (translations.en && translations.en[k]) ||
    k;

  const t = (k, vars) => {
    let s = tRaw(k);
    if (vars)
      Object.keys(vars).forEach(
        (key) => (s = s.replace(`{${key}}`, vars[key])),
      );
    return s;
  };
  // Navigation & Auth State
  const [appState, setAppState] = useState("splash"); // 'splash', 'login', 'authenticated'
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
  const [subscriptionView, setSubscriptionView] = useState("overview"); // 'overview' or 'manage'
  const [currentTier, setCurrentTier] = useState("premium");

  // --- REPLACE ZAKAT STATE ---
  const [zakatStep, setZakatStep] = useState(1);
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [zakatAssets, setZakatAssets] = useState({
    cashAtHome: 0,
    goldValue: 0,
    silverValue: 0,
    investments: 0,
    businessAssets: 0,
    retirementAccounts: 0, // New: 401k/RRSP etc.
  });
  const [zakatLiabilities, setZakatLiabilities] = useState({
    immediateDebts: 0,
    upcomingBills: 0,
    businessExpenses: 0,
  });

  const charities = [
    {
      id: "lg",
      name: "LaunchGood",
      description: "Crowdfunded Zakat campaigns.",
      tag: "Featured",
      icon: <Globe className="text-indigo-600" size={18} />,
      url: "https://www.launchgood.com/zakat",
    },
    {
      id: "ir",
      name: "Islamic Relief",
      description: "Global emergency aid & development.",
      tag: "International",
      icon: <Heart className="text-rose-500" size={18} />,
      url: "https://www.islamic-relief.org/zakat/",
    },
    {
      id: "nzf",
      name: "National Zakat Foundation",
      description: "Local distribution to those in need.",
      tag: "Local Support",
      icon: <Building2 className="text-emerald-600" size={18} />,
      url: "https://nzf.org.uk/pay-zakat/",
    },
    {
      id: "skz",
      name: "Shaukat Khanum",
      description: "Cancer treatment for the underprivileged.",
      tag: "Healthcare",
      icon: <Stethoscope className="text-blue-600" size={18} />,
      url: "https://shaukatkhanum.org.pk/donations/zakat/",
    },
  ];

  // --- REFINED CALCULATIONS ---
  const nisabValue = 6800;
  const zakatRate = 0.025; // 2.5%

  const totalAssets =
    balance + Object.values(zakatAssets).reduce((a, b) => a + b, 0);
  const totalLiabilities = Object.values(zakatLiabilities).reduce(
    (a, b) => a + b,
    0,
  );
  const netZakatableWealth = Math.max(0, totalAssets - totalLiabilities);

  // Zakat is only due if wealth > Nisab
  const isEligible = netZakatableWealth >= nisabValue;
  const zakatDue = isEligible ? netZakatableWealth * zakatRate : 0;

  // Murabaha State
  const [carPrice, setCarPrice] = useState(45000);
  const [downPayment, setDownPayment] = useState(10000);
  const [term, setTerm] = useState(60); // months
  const [frequency, setFrequency] = useState("monthly"); // 'monthly', 'bi-weekly', 'weekly'

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
    {
      name: "OLG Lottery",
      amount: -10.0,
      category: "Gambling",
      type: "haram",
      msg: "Blocked: Gambling is prohibited.",
    },
  ]);

  const userEquity = 24;

  const handleFinalPayment = () => {
    const charity = charities.find((c) => c.id === selectedCharity);
    // Implementation for payment logic would go here
    console.log(
      `Payment of $${zakatDue.toFixed(2)} initiated to ${charity?.name}`,
    );

    if (charity?.url) {
      window.open(charity.url, "_blank");
    }

    setZakatStep(1);
    // Note: setFinancingSubPage is a parent level state, ensure it exists in your full implementation
    if (typeof setFinancingSubPage === "function") {
      setFinancingSubPage("main");
    }
  };

  const renderSubscriptionManagement = () => {
    const tiers = [
      {
        id: "basic",
        name: "Noor Basic",
        price: "Free",
        hardware: "Virtual Card Only",
        color: "bg-slate-100",
        icon: <Smartphone className="text-slate-500" size={20} />,
        features: [
          "Halal Filter AI (Digital)",
          "Standard Digital Card",
          "Purification Ledger",
        ],
      },
      {
        id: "premium",
        name: "Noor Premium",
        price: "$9.99/mo",
        hardware: "rPVC Ocean Plastic",
        color: "bg-emerald-600",
        icon: <CheckCircle2 className="text-emerald-600" size={20} />,
        features: [
          "0.5% Cash-back",
          "rPVC Card Delivery",
          "Priority Support",
          "Airport Lounges",
        ],
      },
      {
        id: "elite",
        name: "Noor Elite",
        price: "$24.99/mo",
        hardware: "Metal Veneer Card",
        color: "bg-slate-900",
        icon: <Gem className="text-amber-500" size={20} />,
        features: [
          "1.0% Cash-back",
          "Metal Card Delivery",
          "Family Accounts",
          "Wealth Advisor",
          "Zakat Consultation",
        ],
      },
    ];

    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 pb-24">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSubscriptionView("overview")}
            className="p-2 bg-white rounded-xl shadow-sm border border-slate-100"
          >
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-xl font-bold text-slate-900">
            {t("subscriptionPlans")}
          </h2>
        </div>

        <div className="space-y-4">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`p-6 rounded-[2rem] border transition-all duration-300 ${
                currentTier === tier.id
                  ? "border-emerald-500 bg-white ring-4 ring-emerald-500/5 shadow-lg"
                  : "border-slate-100 bg-white shadow-sm"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {tier.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {tier.price}
                  </p>
                </div>
                {currentTier === tier.id ? (
                  <span className="bg-emerald-500 text-white text-[10px] px-3 py-1.5 rounded-full font-black uppercase flex items-center gap-1.5">
                    <Check size={12} strokeWidth={3} /> Active
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentTier(tier.id);
                      triggerNotification(`Upgraded to ${tier.name}`);
                    }}
                    className="bg-slate-900 text-white text-[10px] px-4 py-1.5 rounded-full font-bold uppercase hover:bg-slate-800 transition-colors"
                  >
                    Select Plan
                  </button>
                )}
              </div>
              <ul className="space-y-2.5">
                {tier.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 text-xs text-slate-500 font-medium"
                  >
                    <CheckCircle2
                      size={16}
                      className={
                        currentTier === tier.id
                          ? "text-emerald-500"
                          : "text-slate-300"
                      }
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={16} className="text-emerald-600" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Membership Agreement
            </h3>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              By subscribing, you enter into a{" "}
              <span className="text-slate-900 font-bold">
                Wakalah Agreement
              </span>{" "}
              where Noor acts as your agent for ethical financial management.
            </p>
            <div className="flex items-start gap-2 text-[10px] text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <Clock size={12} className="mt-0.5 shrink-0" />
              <p>
                Monthly fees are billed on the 1st of every month. No interest
                is charged for missed payments; however, services may be
                suspended.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

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

  // --- RENDERING COMPONENTS ---

  const renderLogin = () => (
    <div className="fixed inset-0 bg-[#064e3b] z-[150] flex flex-col items-center px-8 pt-20 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2">
          noor.
        </h1>
        <p className="text-emerald-300/60 text-[10px] font-bold uppercase tracking-[0.2em]">
          {t("secureAccess")}
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
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 bg-emerald-800/40">
              <img
                src={avatarUrl}
                alt="Shifanul Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        <h2 className="text-white font-bold text-lg">
          {t("welcomeBack", { name: "Shifanul" })}
        </h2>
        <p className="text-emerald-300/40 text-xs mt-1">
          {t("enterPin", { pin: "1234" })}
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

      <button className="mt-12 text-emerald-300/40 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">
        {t("forgotPin")}
      </button>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-4 pb-24 animate-in fade-in duration-500">
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={simulateSync}
          className="whitespace-nowrap bg-amber-600 text-white text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-2 shadow hover:opacity-90 active:scale-95 transition-all"
        >
          <RefreshCcw size={12} className={isSyncing ? "animate-spin" : ""} />{" "}
          {t("sync")}
        </button>
        <button
          onClick={addRandomTransaction}
          className="whitespace-nowrap bg-[#064e3b] text-white text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-2 shadow hover:opacity-90 active:scale-95 transition-all"
        >
          <Zap size={12} /> {t("simulate")}
        </button>
      </div>

      <div className="bg-[#064e3b] rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-emerald-300/80 text-[10px] font-bold uppercase tracking-widest">
            {t("totalWealth")}
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
            label: t("transfer"),
            color: "bg-emerald-100 text-emerald-700",
          },
          {
            icon: <ArrowDownRight size={20} />,
            label: t("deposit"),
            color: "bg-amber-100 text-amber-700",
          },
          {
            icon: <Wallet size={20} />,
            label: t("equity"),
            color: "bg-slate-100 text-slate-700",
            action: () => {
              setActiveTab("financing");
            },
          },
          {
            icon: <Fingerprint size={20} />,
            label: t("zakat"),
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
        <h2 className="text-lg font-bold mb-3 px-1 text-slate-900">
          {t("activity")}
        </h2>
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

  const renderCard = () => {
    if (subscriptionView === "manage") return renderSubscriptionManagement();

    return (
      <div className="space-y-6 pb-24 animate-in slide-in-from-bottom-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xl font-bold text-slate-900">{t("yourCard")}</h2>
          <div className="bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Gem size={12} className="text-emerald-600" />
            <span className="text-[10px] font-black uppercase text-emerald-700 tracking-tighter">
              {currentTier}
            </span>
          </div>
        </div>

        {/* Card Visual */}
        <div
          className={`w-full max-w-[340px] mx-auto aspect-[1.58/1] rounded-[1.5rem] p-6 text-white shadow-2xl relative flex flex-col justify-between transition-all duration-500 overflow-hidden ${
            isFrozen
              ? "grayscale bg-slate-800"
              : "bg-gradient-to-br from-[#064e3b] via-[#043d2e] to-[#022c22]"
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-400/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="flex justify-between items-start relative z-10">
            <span className="font-black text-2xl italic tracking-tighter">
              noor.
            </span>
            <div className="w-10 h-7 bg-gradient-to-br from-amber-200 to-amber-500/80 rounded flex flex-col justify-around p-1 shadow-inner">
              <div className="w-full h-[1px] bg-black/10"></div>
              <div className="w-full h-[1px] bg-black/10"></div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <p className="text-lg font-mono tracking-[0.15em] font-medium text-white/90">
                {showCardDetails
                  ? "4532 8812 0094 1120"
                  : "•••• •••• •••• 1120"}
              </p>
              <button
                onClick={() => setShowCardDetails(!showCardDetails)}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors active:scale-90"
              >
                {showCardDetails ? (
                  <EyeOff size={14} className="text-white/70" />
                ) : (
                  <Eye size={14} className="text-white/70" />
                )}
              </button>
            </div>

            <div className="flex gap-8 items-center">
              <div className="flex flex-col">
                <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-emerald-400/70 mb-0.5">
                  Expiry
                </span>
                <span className="text-sm font-mono font-medium tracking-widest">
                  {showCardDetails ? "09/28" : "••/••"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-emerald-400/70 mb-0.5">
                  CVV
                </span>
                <span className="text-sm font-mono font-medium tracking-widest">
                  {showCardDetails ? "442" : "•••"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/90">
              Visa Platinum
            </p>
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-rose-600/90 shadow-sm border border-white/5"></div>
              <div className="w-7 h-7 rounded-full bg-amber-500/90 shadow-sm border border-white/5"></div>
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="bg-white rounded-[1.5rem] p-1 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <Zap size={20} />
              </div>
              <div>
                <p className="font-bold text-sm">Halal Filter AI</p>
                <p className="text-[10px] text-slate-400">
                  Strict Shariah Compliance
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setHalalFilterActive(!halalFilterActive);
                triggerNotification(
                  halalFilterActive
                    ? "Halal Filter Paused"
                    : "Halal Filter Enabled",
                );
              }}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                halalFilterActive ? "bg-emerald-500" : "bg-slate-200"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
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
              <div>
                <p className="font-bold text-sm">Freeze Card</p>
                <p className="text-[10px] text-slate-400">
                  Instant security lock
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsFrozen(!isFrozen);
                triggerNotification(isFrozen ? "Card Unfrozen" : "Card Frozen");
              }}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                isFrozen ? "bg-blue-500" : "bg-slate-200"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                  isFrozen ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Feature Highlights Component */}
        <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
          <div className="space-y-6">
            <div className="flex gap-4">
              <ShieldCheck className="text-emerald-600 shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-slate-800">
                  The Active Halal Filter
                </p>
                <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">
                  Automated Shariah-compliance at 1.2M+ merchants. We instantly
                  block non-ethical categories like gambling or alcohol.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Sparkles className="text-amber-500 shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-slate-800">
                  0.5% Cash-Back (Halal Merchants)
                </p>
                <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">
                  Earn rewards on every ethical purchase, delivered as monthly
                  profit-share directly to your balance.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <RefreshCcw className="text-blue-500 shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Auto-Purification Logic
                </p>
                <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">
                  Accidental interest earned is automatically identified and
                  transferred to your Purification sub-account for charity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Subscription */}
        <div className="p-6 bg-slate-900 rounded-[2.5rem] text-white">
          <div className="flex items-center gap-2 mb-3">
            <Info size={16} className="text-emerald-400" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
              {t("whySubscription")}
            </h3>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Traditional banks make money by lending yours out at interest
            (Riba). <strong>Noor does not.</strong> To keep our infrastructure
            interest-free and purely ethical, we charge a transparent monthly
            fee. This ensures our interests are aligned with your values, not
            bank profits.
          </p>
        </div>

        <button
          onClick={() => setSubscriptionView("manage")}
          className="w-full bg-white border border-slate-200 text-slate-900 p-5 rounded-[2rem] font-bold text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {t("viewSubscriptionAgreement")} <ArrowUpRight size={16} />
        </button>
      </div>
    );
  };

  const renderEquity = () => {
    if (financingSubPage === "zakat") return renderZakatWorkflow();
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
        {/* Subscription Info */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                <Gem size={20} />
              </div>
              <div>
                <p className="font-black text-slate-900">Noor Premium</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  $9.99 / Month
                </p>
              </div>
            </div>
            <span className="bg-emerald-500 text-white text-[9px] px-3 py-1 rounded-full font-black uppercase">
              Active
            </span>
          </div>

          <div className="h-px bg-slate-50"></div>

          <div className="space-y-4 pt-2">
            <div className="flex gap-4">
              <ShieldCheck className="text-emerald-600 shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-slate-800">
                  The Active Halal Filter
                </p>
                <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">
                  Automated Shariah-compliance at 1.2M+ merchants. We instantly
                  block non-ethical categories like gambling or alcohol.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <RefreshCcw className="text-blue-500 shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Auto-Purification Logic
                </p>
                <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">
                  Accidental interest earned is automatically identified and
                  transferred to your Purification sub-account for charity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderZakatWorkflow = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-10 max-w-md mx-auto">
      {/* Header & Progress */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (zakatStep > 1) setZakatStep(zakatStep - 1);
              else if (typeof setFinancingSubPage === "function")
                setFinancingSubPage("main");
            }}
            className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 active:scale-95 transition-transform"
          >
            <ChevronLeft className="text-slate-600" />
          </button>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Zakat Portal
          </h2>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 w-6 rounded-full transition-all duration-500 ${
                zakatStep >= s ? "bg-indigo-600" : "bg-slate-200"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Step 1: Assets */}
      {zakatStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 px-2">
              <TrendingUp className="text-indigo-600" size={20} />
              <h3 className="font-bold text-slate-900">
                Step 1: Zakatable Assets
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3">
                  <Wallet className="text-emerald-600" size={20} />
                  <span className="font-bold text-slate-700">
                    Noor Balance (Auto)
                  </span>
                </div>
                <span className="font-black text-emerald-700">
                  ${balance.toLocaleString()}
                </span>
              </div>

              {[
                {
                  key: "cashAtHome",
                  label: "Cash on Hand",
                  icon: <Coins size={18} />,
                },
                {
                  key: "goldValue",
                  label: "Gold Value",
                  icon: <Gem size={18} />,
                },
                {
                  key: "silverValue",
                  label: "Silver Value",
                  icon: <Coins size={18} />,
                },
                {
                  key: "investments",
                  label: "Crypto & Stocks",
                  icon: <PieChart size={18} />,
                },
                {
                  key: "retirementAccounts",
                  label: "Retirement (RRSP/401k)",
                  icon: <Lock size={18} />,
                },
                {
                  key: "businessAssets",
                  label: "Business Assets",
                  icon: <Building2 size={18} />,
                },
              ].map((asset) => (
                <div key={asset.key} className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                    {asset.label}
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                      {asset.icon}
                    </div>
                    <input
                      type="number"
                      value={zakatAssets[asset.key] || ""}
                      onChange={(e) =>
                        setZakatAssets({
                          ...zakatAssets,
                          [asset.key]: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold focus:ring-2 focus:ring-indigo-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setZakatStep(2)}
            className="w-full bg-indigo-600 text-white p-6 rounded-[2rem] font-black text-lg shadow-xl shadow-indigo-900/20 active:scale-[0.98] transition-all"
          >
            Continue to Liabilities
          </button>
        </div>
      )}

      {/* Step 2: Liabilities */}
      {zakatStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 px-2 text-rose-600">
              <TrendingDown size={20} />
              <h3 className="font-bold text-slate-900">Step 2: Liabilities</h3>
            </div>
            <p className="text-xs text-slate-400 px-2 leading-relaxed">
              Subtract debts or bills due immediately to calculate your net
              wealth.
            </p>

            <div className="space-y-4">
              {[
                {
                  key: "immediateDebts",
                  label: "Immediate Debts",
                  icon: <History size={18} />,
                },
                {
                  key: "upcomingBills",
                  label: "Upcoming Bills (This month)",
                  icon: <Calculator size={18} />,
                },
              ].map((lib) => (
                <div key={lib.key} className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                    {lib.label}
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                      {lib.icon}
                    </div>
                    <input
                      type="number"
                      value={zakatLiabilities[lib.key] || ""}
                      onChange={(e) =>
                        setZakatLiabilities({
                          ...zakatLiabilities,
                          [lib.key]: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold focus:ring-2 focus:ring-indigo-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setZakatStep(3)}
            className="w-full bg-indigo-600 text-white p-6 rounded-[2rem] font-black text-lg shadow-xl shadow-indigo-900/20 active:scale-[0.98] transition-all"
          >
            Review Calculation
          </button>
        </div>
      )}

      {/* Step 3: Calculation Review */}
      {zakatStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-indigo-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 opacity-10 p-4">
              <Fingerprint size={100} />
            </div>
            <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
              {t("totalZakatObligation")}
            </p>
            <h3 className="text-5xl font-black tracking-tighter mb-4">
              ${zakatDue.toFixed(2)}
            </h3>
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[10px] font-bold">
              <ShieldCheck size={14} className="text-emerald-400" /> Shariah
              Compliant
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total Assets</span>
              <span className="font-bold">${totalAssets.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total Liabilities</span>
              <span className="font-bold text-rose-500">
                -${totalLiabilities.toLocaleString()}
              </span>
            </div>
            <div className="h-px bg-slate-50 my-2"></div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-900 font-bold">Zakatable Wealth</span>
              <span className="font-black text-indigo-600">
                ${netZakatableWealth.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
            <Info className="text-amber-600 shrink-0" size={18} />
            <p className="text-[10px] text-amber-800 font-medium leading-normal">
              Nisab is currently <b>${nisabValue}</b>. Your net wealth is{" "}
              {isEligible ? "above" : "below"} this threshold.
            </p>
          </div>

          <button
            onClick={() => setZakatStep(4)}
            disabled={zakatDue <= 0}
            className={`w-full p-6 rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${
              zakatDue > 0
                ? "bg-indigo-600 text-white shadow-indigo-900/20 active:scale-[0.98]"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {t("selectDistribution")} <Heart size={20} />
          </button>
        </div>
      )}

      {/* Step 4: Charity Selection */}
      {zakatStep === 4 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 px-2">
              <Heart className="text-indigo-600" size={20} />
              <h3 className="font-bold text-slate-900">
                Step 4: Choose Charity
              </h3>
            </div>

            <div className="space-y-3">
              {charities.map((charity) => (
                <button
                  key={charity.id}
                  onClick={() => setSelectedCharity(charity.id)}
                  className={`w-full p-4 rounded-3xl text-left transition-all border-2 flex items-start gap-4 ${
                    selectedCharity === charity.id
                      ? "border-indigo-600 bg-indigo-50 shadow-sm"
                      : "border-slate-50 bg-slate-50/30 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl ${
                      selectedCharity === charity.id
                        ? "bg-white shadow-sm"
                        : "bg-white border border-slate-100"
                    }`}
                  >
                    {charity.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-bold text-slate-900">{charity.name}</p>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          selectedCharity === charity.id
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {charity.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">
                      {charity.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleFinalPayment}
            disabled={!selectedCharity}
            className={`w-full p-6 rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${
              selectedCharity
                ? "bg-indigo-600 text-white shadow-indigo-900/20 active:scale-[0.98]"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {t("confirmAndDistribute")} <ExternalLink size={20} />
          </button>
        </div>
      )}
    </div>
  );

  // --- MURABAHA CALCULATOR LOGIC (CAR PART) ---
  const renderMurabaha = () => {
    const profitRate = 0.02; // Fixed 2% annual profit rate
    const financedAmount = carPrice - downPayment;
    const totalProfit = financedAmount * profitRate * (term / 12);
    const totalContract = financedAmount + totalProfit;
    const totalWeeks = (term / 12) * 52;
    const totalBiWeeks = (term / 12) * 26;

    // Installment logic based on frequency
    let paymentValue = 0;
    let frequencyLabel = "";

    switch (frequency) {
      case "weekly":
        paymentValue = totalContract / totalWeeks; // Approx weeks in a month
        frequencyLabel = "Weekly";
        break;
      case "bi-weekly":
        paymentValue = totalContract / totalBiWeeks; // Approx bi-weeks in a month
        frequencyLabel = "Bi-Weekly";
        break;
      default:
        paymentValue = totalContract / term;
        frequencyLabel = "Monthly";
    }

    return (
      <div className="space-y-4 pb-24 animate-in slide-in-from-right-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFinancingSubPage("main")}
            className="p-2 bg-white rounded-lg shadow-sm active:scale-90 transition-transform"
          >
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-lg font-bold">Murabaha Auto Finance</h2>
        </div>

        {/* Dynamic Payment Card */}
        <div className="bg-amber-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10 rotate-12">
            <Car size={120} />
          </div>
          <p className="text-amber-200 text-[10px] font-bold uppercase tracking-widest relative z-10">
            {frequencyLabel} Installment
          </p>
          <h3 className="text-5xl font-black mt-1 tracking-tighter relative z-10">
            $
            {paymentValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h3>
          <div className="mt-4 flex items-center gap-2 relative z-10">
            <ShieldCheck size={14} className="text-amber-200" />
            <span className="text-[10px] font-bold text-amber-100 uppercase tracking-tight">
              2.00% Fixed Markup
            </span>
          </div>
        </div>

        {/* Payment Frequency Toggle */}
        <div className="bg-slate-100/50 p-1.5 rounded-2xl flex gap-1">
          {["weekly", "bi-weekly", "monthly"].map((f) => (
            <button
              key={f}
              onClick={() => setFrequency(f)}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${
                frequency === f
                  ? "bg-white text-amber-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {f.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Input Sliders */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 space-y-6 shadow-sm">
          {/* Car Price Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Vehicle Price
              </label>
              <span className="text-lg font-black text-slate-900">
                ${carPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="200000"
              step="1000"
              value={carPrice}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setCarPrice(val);
                if (downPayment > val * 0.9)
                  setDownPayment(Math.floor(val * 0.1));
              }}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>

          {/* Down Payment Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Down Payment
              </label>
              <span className="text-lg font-black text-slate-900">
                ${downPayment.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={carPrice * 0.9}
              step="500"
              value={downPayment}
              onChange={(e) => setDownPayment(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>

          {/* Term Selection */}
          <div className="pt-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
              Financing Duration
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[36, 48, 60, 72, 84].map((t) => (
                <button
                  key={t}
                  onClick={() => setTerm(t)}
                  className={`py-3 rounded-2xl text-[10px] font-black transition-all ${
                    term === t
                      ? "bg-amber-600 text-white shadow-md"
                      : "bg-slate-50 text-slate-400"
                  }`}
                >
                  {t / 12} Years
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Breakdown & Compliance */}
        <div className="bg-white p-5 rounded-[1.5rem] border border-dashed border-slate-200 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">
              Financed Amount
            </p>
            <p className="text-sm font-black text-slate-800">
              ${financedAmount.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">
              Fixed Markup
            </p>
            <p className="text-sm font-black text-emerald-600">
              $
              {totalProfit.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
          <div className="col-span-2 pt-2 border-t border-slate-50 flex items-center gap-3">
            <div className="bg-amber-50 p-2 rounded-lg">
              <Info size={14} className="text-amber-600" />
            </div>
            <p className="text-[10px] text-slate-500 leading-snug">
              This is a <strong>Cost-Plus</strong> agreement. The bank's profit
              is fixed at 2% per annum and added to the purchase price. No
              compounding interest.
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            triggerNotification(
              `${frequencyLabel} plan submitted for approval.`,
            )
          }
          className="w-full bg-slate-900 text-white p-5 rounded-[2rem] font-black text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          Request Approval <CalendarDays size={20} />
        </button>
      </div>
    );
  };

  // Splash Screen
  if (appState === "splash") {
    return (
      <div className="fixed inset-0 bg-[#064e3b] z-[200] flex flex-col items-center justify-center text-white p-6">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-7xl font-black italic tracking-tighter mb-1 animate-pulse">
            noor.
          </h2>
          <p className="text-emerald-400 font-bold tracking-[0.2em] uppercase text-[8px] opacity-80">
            {t("slogan")}
          </p>
        </div>

        <div className="w-full max-w-[200px] mb-20">
          <div className="h-[3px] w-full bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all duration-100 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div className="flex justify-between mt-3 px-1">
            <span className="text-[7px] font-bold text-emerald-400 uppercase tracking-widest">
              Encrypting
            </span>
            <span className="text-[7px] font-mono text-emerald-400">
              {loadProgress}%
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Login Screen
  if (appState === "login") {
    return renderLogin();
  }

  // Main App (Authenticated)
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
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            className="text-xs bg-white border rounded px-2 py-1"
            aria-label="Language selector"
          >
            <option value="en">English</option>
            <option value="fr_qc">Français (QC)</option>
          </select>
          <div className="w-8 h-8 rounded-full bg-slate-200 border border-emerald-900/10 overflow-hidden shadow-sm">
            <img
              src={avatarUrl}
              alt="Shifanul"
              className="w-full h-full object-cover"
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
                {t("donateNow")}
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
          label={t("navHome")}
        />
        <NavButton
          active={activeTab === "financing"}
          onClick={() => {
            setActiveTab("financing");
            setFinancingSubPage("main");
          }}
          icon={<Home />}
          label={t("navEquity")}
        />
        <NavButton
          active={activeTab === "purify"}
          onClick={() => setActiveTab("purify")}
          icon={<Droplets />}
          label={t("navPurity")}
        />
        <NavButton
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
          icon={<CreditCard />}
          label={t("navCard")}
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
