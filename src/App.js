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
  ArrowRight,
  Building,
  X,
  DollarSign,
  Clock,
  FileText,
  Sparkles,
  CalendarDays,
  Settings,
} from "lucide-react";
import avatarUrl from "./IMG_3519.png";
import translations from "./i18n";

const App = () => {
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "en");
  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  // Online/Offline Detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

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

  const [transferAmount, setTransferAmount] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [transferType, setTransferType] = useState("");

  // E-Transfer State
  const [eTransferMode, setETransferMode] = useState("send"); // 'send', 'receive', 'request'
  const [recipientIdentifier, setRecipientIdentifier] = useState(""); // email or phone
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [autodeposit, setAutodeposit] = useState(false);
  const [useOneTimeContact, setUseOneTimeContact] = useState(false);
  const [requestAmount, setRequestAmount] = useState("");
  const [eTransferHistory, setETransferHistory] = useState([
    {
      id: 1,
      recipient: "sarah@email.com",
      name: "Sarah Ahmed",
      amount: 150,
      date: "2 days ago",
      status: "completed",
      expiryDate: "Feb 22, 2026",
    },
    {
      id: 2,
      recipient: "+1 (555) 234-5678",
      name: "Omar Farooq",
      amount: 50,
      date: "1 week ago",
      status: "completed",
      expiryDate: "Feb 28, 2026",
    },
  ]);
  const autoDepositSettings = {
    enabled: false,
    emailLinked: "user@email.com",
    phoneLinked: "+1 (555) 123-4567",
  };
  const [showETransferSettings, setShowETransferSettings] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [newContactEmail, setNewContactEmail] = useState("");

  // Internal Transfer State
  const [fromAccount, setFromAccount] = useState("current");
  const [toAccount, setToAccount] = useState("investment");
  const [internalTransferAmount, setInternalTransferAmount] = useState("");

  // Beneficiary Management
  const [beneficiaries, setBeneficiaries] = useState([
    {
      id: 1,
      name: "Sarah Ahmed",
      email: "sarah@email.com",
      phone: "+1 (555) 123-4567",
      verified: true,
      favorite: true,
      type: "personal",
      addedDate: "2025-12-15",
    },
    {
      id: 2,
      name: "Islamic Relief",
      email: "donate@relief.org",
      phone: "+1 (555) 987-6543",
      verified: true,
      favorite: false,
      type: "charity",
      addedDate: "2026-01-10",
    },
  ]);
  const [showAddBeneficiary, setShowAddBeneficiary] = useState(false);
  const [newBeneficiaryName, setNewBeneficiaryName] = useState("");
  const [newBeneficiaryEmail, setNewBeneficiaryEmail] = useState("");
  const [newBeneficiaryPhone, setNewBeneficiaryPhone] = useState("");
  const [newBeneficiaryType, setNewBeneficiaryType] = useState("personal");

  // Transfer Receipt & Modal
  const [showTransferReceipt, setShowTransferReceipt] = useState(false);
  const [lastTransferReceipt, setLastTransferReceipt] = useState(null);

  // Scheduled & Recurring Transfers
  const [showScheduleTransfer, setShowScheduleTransfer] = useState(false);
  const [scheduledTransfers, setScheduledTransfers] = useState([
    {
      id: 1,
      recipient: "Sarah Ahmed",
      amount: 500,
      frequency: "monthly",
      nextDate: "2026-03-16",
      status: "active",
    },
  ]);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleFrequency, setScheduleFrequency] = useState("once"); // once, weekly, monthly, yearly

  // Transfer Categories
  const [transferCategory, setTransferCategory] = useState("personal");

  // Transfer Analytics
  const [analyticsView, setAnalyticsView] = useState(false);

  // Security Features
  const [requireBiometric, setRequireBiometric] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [deviceFingerprint] = useState(
    "device_" + Math.random().toString(36).substr(2, 9),
  );

  // Offline Support
  const [isOnline, setIsOnline] = useState(true);
  const [offlineQueue, setOfflineQueue] = useState([]);

  // Advanced History
  const [historyFilter, setHistoryFilter] = useState("all"); // all, sent, received, pending
  const [showDetailedTransaction, setShowDetailedTransaction] = useState(null);

  const userAccounts = [
    {
      id: "current",
      name: "Current Account",
      balance: 12450.75,
      type: "current",
      description: "For daily transactions",
    },
    {
      id: "investment",
      name: "Investment Account",
      balance: 5200.0,
      type: "investment",
      description: "Halal investments (Mudharabah)",
    },
    {
      id: "emergency",
      name: "Emergency Fund",
      balance: 8950.5,
      type: "emergency",
      description: "Safe capital preservation",
    },
  ];

  const contacts = [
    {
      id: 1,
      name: "Sarah Ahmed",
      initial: "S",
      color: "bg-[#D9B18E]",
      email: "sarah@email.com",
    },
    {
      id: 2,
      name: "Omar Farooq",
      initial: "O",
      color: "bg-[#0D2B1D]",
      email: "omar@email.com",
    },
    {
      id: 3,
      name: "Zainab K.",
      initial: "Z",
      color: "bg-[#AEC3B0]",
      email: "zainab@email.com",
    },
    {
      id: 4,
      name: "Ibrahim J.",
      initial: "I",
      color: "bg-[#0D2B1D]",
      email: "ibrahim@email.com",
    },
  ];

  const handleTransferSubmit = () => {
    const amt = parseFloat(transferAmount) || 0;
    if (amt <= 0) return;

    setAppState("success");
    setBalance((prev) => prev - amt);
    setTransactions((prev) => [
      {
        id: Date.now(),
        name: selectedContact
          ? `Transfer to ${selectedContact.name}`
          : `Bank Transfer`,
        amount: -amt,
        time: "Just now",
        status: "completed",
        type: "transfer",
      },
      ...prev,
    ]);

    setTimeout(() => {
      setAppState("dashboard");
      setTransferAmount("");
      setSelectedContact(null);
    }, 2500);
  };

  // Helper Functions
  const generateTransactionId = () =>
    `TXN-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`.toUpperCase();

  const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const createTransferReceipt = (transferData) => ({
    id: generateTransactionId(),
    timestamp: new Date().toLocaleString(),
    date: new Date().toLocaleDateString(),
    recipient: transferData.recipient,
    amount: transferData.amount,
    category: transferData.category,
    status: "completed",
    method: transferData.method,
    senderName: "You",
    senderAccount: "Current Account",
    recipientEmail: transferData.email,
    recipientPhone: transferData.phone,
    isHalal: true,
    sharahComplianceId: "SC-" + generateTransactionId(),
  });

  const calculateMonthlyStats = () => {
    const now = new Date();
    const thisMonth = transactions.filter((tx) => {
      const txDate = new Date(tx.time);
      return (
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear()
      );
    });

    const totalSent = Math.abs(
      thisMonth
        .filter((tx) => tx.amount < 0)
        .reduce((sum, tx) => sum + tx.amount, 0),
    );
    const totalReceived = thisMonth
      .filter((tx) => tx.amount > 0)
      .reduce((sum, tx) => sum + tx.amount, 0);
    const transactionCount = thisMonth.length;
    const avgTransfer =
      transactionCount > 0 ? (totalSent + totalReceived) / transactionCount : 0;

    return { totalSent, totalReceived, transactionCount, avgTransfer };
  };

  const getCategoryIcon = (category) => {
    const icons = {
      personal: "👤",
      charity: "❤️",
      zakat: "🕌",
      bills: "📄",
      family: "👨‍👩‍👧",
      business: "💼",
    };
    return icons[category] || "💸";
  };

  const getTransferStatusColor = (status) => {
    const colors = {
      completed: "text-[#0d2b1d] bg-[#f2f1ef]",
      pending: "text-amber-600 bg-amber-50",
      failed: "text-rose-600 bg-rose-50",
      cancelled: "text-[#0D2B1D]/70 bg-[#F7F5F0]",
    };
    return colors[status] || "text-[#0D2B1D]/70 bg-[#F7F5F0]";
  };

  const handleAddBeneficiary = () => {
    if (!newBeneficiaryName || (!newBeneficiaryEmail && !newBeneficiaryPhone))
      return;

    const newBeneficiary = {
      id: beneficiaries.length + 1,
      name: newBeneficiaryName,
      email: newBeneficiaryEmail,
      phone: newBeneficiaryPhone,
      verified: false,
      favorite: false,
      type: newBeneficiaryType,
      addedDate: new Date().toISOString().split("T")[0],
    };

    setBeneficiaries([...beneficiaries, newBeneficiary]);
    setNewBeneficiaryName("");
    setNewBeneficiaryEmail("");
    setNewBeneficiaryPhone("");
    setShowAddBeneficiary(false);
    triggerNotification(
      "Beneficiary Added",
      `${newBeneficiaryName} added successfully`,
    );
  };

  const toggleFavoriteBeneficiary = (id) => {
    setBeneficiaries(
      beneficiaries.map((b) =>
        b.id === id ? { ...b, favorite: !b.favorite } : b,
      ),
    );
  };

  const handleScheduleTransfer = () => {
    if (!scheduleDate || !transferAmount) return;
    const newScheduled = {
      id: scheduledTransfers.length + 1,
      recipient: selectedContact?.name || "Scheduled Transfer",
      amount: parseFloat(transferAmount),
      frequency: scheduleFrequency,
      nextDate: scheduleDate,
      status: "active",
    };
    setScheduledTransfers([...scheduledTransfers, newScheduled]);
    triggerNotification(
      "Transfer Scheduled",
      `Transfer scheduled for ${scheduleDate}`,
    );
    setShowScheduleTransfer(false);
    setScheduleDate("");
    setTransferAmount("");
  };

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
      icon: <Globe className="text-[#D9B18E]" size={18} />,
      url: "https://www.launchgood.com/zakat",
    },
    {
      id: "ir",
      name: "Islamic Relief",
      description: "Global emergency aid & development.",
      tag: "International",
      icon: <Heart className="text-[#0D2B1D]" size={18} />,
      url: "https://www.islamic-relief.org/zakat/",
    },
    {
      id: "nzf",
      name: "National Zakat Foundation",
      description: "Local distribution to those in need.",
      tag: "Local Support",
      icon: <Building2 className="text-[#0D2B1D]" size={18} />,
      url: "https://nzf.org.uk/pay-zakat/",
    },
    {
      id: "skz",
      name: "Shaukat Khanum",
      description: "Cancer treatment for the underprivileged.",
      tag: "Healthcare",
      icon: <Stethoscope className="text-[#0D2B1D]" size={18} />,
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
        name: "Rizq. Basic",
        price: "Free",
        hardware: "Virtual Card Only",
        color: "bg-[#AEC3B0]",
        icon: <Smartphone className="text-[#0D2B1D]/60" size={20} />,
        features: [
          "Halal Filter AI (Digital)",
          "Standard Digital Card",
          "Purification Ledger",
        ],
      },
      {
        id: "premium",
        name: "Rizq. Premium",
        price: "$9.99/mo",
        hardware: "rPVC Ocean Plastic",
        color: "bg-[#aec3b0]",
        icon: <CheckCircle2 className="text-[#0d2b1d]" size={20} />,
        features: [
          "0.5% Cash-back",
          "rPVC Card Delivery",
          "Priority Support",
          "Airport Lounges",
        ],
      },
      {
        id: "elite",
        name: "Rizq. Elite",
        price: "$24.99/mo",
        hardware: "Metal Veneer Card",
        color: "bg-[#0D2B1D]",
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
            className="p-2 bg-\[#F2F1EF\] rounded-xl shadow-sm border border-[#AEC3B0]"
          >
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-xl font-bold text-[#0D2B1D]">
            {t("subscriptionPlans")}
          </h2>
        </div>

        <div className="space-y-4">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`p-6 rounded-[2rem] border transition-all duration-300 ${
                currentTier === tier.id
                  ? "border-[#0D2B1D] bg-[#F2F1EF] ring-4 ring-[#0D2B1D]/5 shadow-lg"
                  : "border-[#AEC3B0] bg-[#F2F1EF] shadow-sm"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-[#0D2B1D]">
                    {tier.name}
                  </h3>
                  <p className="text-xs font-bold text-[#0D2B1D]/40 uppercase tracking-widest">
                    {tier.price}
                  </p>
                </div>
                {currentTier === tier.id ? (
                  <span className="bg-[#0D2B1D] text-white text-[10px] px-3 py-1.5 rounded-full font-black uppercase flex items-center gap-1.5">
                    <Check size={12} strokeWidth={3} /> Active
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentTier(tier.id);
                      triggerNotification(`Upgraded to ${tier.name}`);
                    }}
                    className="bg-[#0D2B1D] text-[#D9B18E] text-[10px] px-4 py-1.5 rounded-full font-bold uppercase hover:bg-[#243332] transition-colors"
                  >
                    Select Plan
                  </button>
                )}
              </div>
              <ul className="space-y-2.5">
                {tier.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 text-xs text-[#0D2B1D]/60 font-medium"
                  >
                    <CheckCircle2
                      size={16}
                      className={
                        currentTier === tier.id
                          ? "text-[#0d2b1d]"
                          : "text-[#AEC3B0]"
                      }
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-\[#F2F1EF\] p-6 rounded-[2rem] border border-[#AEC3B0] shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={16} className="text-[#0d2b1d]" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#0D2B1D]/40">
              Membership Agreement
            </h3>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] text-[#0D2B1D]/60 leading-relaxed">
              By subscribing, you enter into a{" "}
              <span className="text-[#0D2B1D] font-bold">
                Wakalah Agreement
              </span>{" "}
              where Rizq. acts as your agent for ethical financial management.
            </p>
            <div className="flex items-start gap-2 text-[10px] text-[#0D2B1D]/40 bg-[#F7F5F0] p-3 rounded-xl border border-[#AEC3B0]">
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
    <div className="fixed inset-0 bg-[#F7F5F0] z-[150] flex flex-col items-center px-8 pt-20 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black italic tracking-tighter text-[#D9B18E] mb-2">
          Rizq.
        </h1>
        <p className="text-[#0D2B1D]/60 text-[10px] font-bold uppercase tracking-[0.2em]">
          {t("secureAccess")}
        </p>
      </div>

      <div className="flex flex-col items-center mb-12">
        <div
          className={`w-24 h-24 rounded-full bg-[#aec3b0]/50 flex items-center justify-center border-2 border-[#aec3b0]/30 mb-4 transition-all ${
            isFaceScanning ? "scale-110 border-emerald-400" : ""
          }`}
        >
          {isFaceScanning ? (
            <ScanFace className="text-emerald-600 animate-pulse" size={40} />
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
        <h2 className="text-[#D9B18E] font-bold text-lg">
          {t("welcomeBack", { name: "Shifanul" })}
        </h2>
        <p className="text-[#0D2B1D]/40 text-xs mt-1">
          {t("enterPin", { pin: "1234" })}
        </p>
      </div>

      <div className="flex gap-4 mb-12 h-4 items-center">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-3.5 h-3.5 rounded-full border-2 border-emerald-700/50 transition-all duration-200 ${
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
            className="w-14 h-14 rounded-full flex items-center justify-center text-[#D9B18E] text-2xl font-medium active:bg-\[#F2F1EF\]/10 transition-colors"
          >
            {num}
          </button>
        ))}
        <button
          onClick={handleFaceId}
          className="w-14 h-14 rounded-full flex items-center justify-center text-[#0d2b1d] active:bg-\[#F2F1EF\]/10"
        >
          <ScanFace size={28} />
        </button>
        <button
          onClick={() => pin.length < 4 && setPin(pin + "0")}
          className="w-14 h-14 rounded-full flex items-center justify-center text-[#D9B18E] text-2xl font-medium active:bg-\[#F2F1EF\]/10"
        >
          0
        </button>
        <button
          onClick={() => setPin(pin.slice(0, -1))}
          className="w-14 h-14 rounded-full flex items-center justify-center text-[#D9B18E]/40 active:bg-\[#F2F1EF\]/10"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <button className="mt-12 text-[#0D2B1D]/40 text-[10px] font-bold uppercase tracking-widest hover:text-[#D9B18E] transition-colors">
        {t("forgotPin")}
      </button>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-4 pb-24 animate-in fade-in duration-500">
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={simulateSync}
          className="whitespace-nowrap bg-[#D9B18E] text-white text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-2 shadow hover:opacity-90 active:scale-95 transition-all"
        >
          <RefreshCcw size={12} className={isSyncing ? "animate-spin" : ""} />{" "}
          {t("sync")}
        </button>
        <button
          onClick={addRandomTransaction}
          className="whitespace-nowrap bg-[#AEC3B0] text-[#0D2B1D] text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-2 shadow hover:opacity-90 active:scale-95 transition-all"
        >
          <Zap size={12} /> {t("simulate")}
        </button>
      </div>

      <div className="bg-[#AEC3B0] rounded-[2rem] p-6 text-[#0D2B1D] border border-[#AEC3B0] shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">
            {t("totalWealth")}
          </p>
          <h1 className="text-3xl font-bold mt-1 tracking-tight">
            ${balance.toLocaleString()}
          </h1>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-[#0D2B1D] font-bold text-xs">
              <TrendingUp size={14} /> <span>+4.2% APY</span>
            </div>
            <div className="bg-\[#F2F1EF\]/10 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-tighter">
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
            color: "bg-[#0D2B1D] text-[#AEC3B0]/70",
            action: () => {
              setActiveTab("transfer-hub");
            },
          },
          {
            icon: <ArrowDownRight size={20} />,
            label: t("deposit"),
            color: "bg-[#0D2B1D] text-[#AEC3B0]/70",
          },
          {
            icon: <Wallet size={20} />,
            label: t("equity"),
            color: "bg-[#0D2B1D] text-[#AEC3B0]/70",
            action: () => {
              setActiveTab("financing");
            },
          },
          {
            icon: <Fingerprint size={20} />,
            label: t("zakat"),
            color: "bg-[#0D2B1D] text-[#AEC3B0]/70",
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
            <span className="text-[9px] font-bold text-[#0D2B1D]/60 uppercase tracking-tighter">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-2">
        <h2 className="text-lg font-bold mb-3 px-1 text-[#0D2B1D]">
          {t("activity")}
        </h2>
        <div className="space-y-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className={`bg-[#AEC3B0] p-3.5 rounded-2xl border flex items-center justify-between shadow-sm ${
                tx.status === "declined"
                  ? "border-rose-100 opacity-80"
                  : "border-[#F7F5F0]"
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    tx.status === "declined"
                      ? "bg-rose-50 text-rose-500"
                      : "bg-[#F7F5F0] text-[#0D2B1D]/70"
                  }`}
                >
                  {tx.status === "declined" ? (
                    <ShieldX size={16} />
                  ) : tx.type === "profit" ? (
                    <Zap size={16} className="text-[#0d2b1d]" />
                  ) : (
                    <CreditCard size={16} />
                  )}
                </div>
                <div className="truncate">
                  <p
                    className={`font-bold text-xs truncate ${
                      tx.status === "declined"
                        ? "text-rose-900"
                        : "text-[#0D2B1D]"
                    }`}
                  >
                    {tx.name}
                  </p>
                  <p className="text-[9px] text-white/40 font-bold uppercase">
                    {tx.time}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-2">
                <p
                  className={`font-bold text-xs ${
                    tx.status === "declined"
                      ? "text-rose-300 line-through"
                      : "text-[#0D2B1D]"
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

  const renderTransferHub = () => {
    if (showETransferSettings) {
      return (
        <div className="animate-in slide-in-from-right-10 duration-300 h-full flex flex-col pt-4">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setShowETransferSettings(false)}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-90 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold">E-Transfer Settings</h2>
            <div className="w-10" />
          </div>

          <div className="space-y-6">
            {/* AutoDeposit Section */}
            <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100">
              <h3 className="text-sm font-bold text-blue-900 mb-4">
                AutoDeposit
              </h3>
              <p className="text-xs text-blue-700/80 mb-4 leading-relaxed">
                Link your email or phone to automatically receive E-Transfer
                funds without needing to enter a security answer. Reduces
                phishing risks.
              </p>

              <div className="space-y-3">
                <div className="bg-\[#F2F1EF\] p-4 rounded-xl">
                  <p className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest mb-2">
                    Email Address
                  </p>
                  <p className="text-sm font-bold text-[#0D2B1D]">
                    {autoDepositSettings.emailLinked}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs py-2 px-4 rounded-lg bg-blue-100 text-blue-700 font-bold active:scale-90 transition-transform">
                      Change Email
                    </button>
                    <button
                      className={`text-xs py-2 px-4 rounded-lg font-bold active:scale-90 transition-transform ${
                        autodeposit &&
                        recipientIdentifier === autoDepositSettings.emailLinked
                          ? "bg-[#f2f1ef] text-[#0d2b1d]"
                          : "bg-[#AEC3B0] text-[#0D2B1D]/70"
                      }`}
                    >
                      {autodeposit &&
                      recipientIdentifier === autoDepositSettings.emailLinked
                        ? "✓ Active"
                        : "Activate"}
                    </button>
                  </div>
                </div>

                <div className="bg-\[#F2F1EF\] p-4 rounded-xl">
                  <p className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest mb-2">
                    Phone Number
                  </p>
                  <p className="text-sm font-bold text-[#0D2B1D]">
                    {autoDepositSettings.phoneLinked}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs py-2 px-4 rounded-lg bg-[#AEC3B0] text-[#0D2B1D]/70 font-bold active:scale-90 transition-transform">
                      Change Phone
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Limits */}
            <div className="bg-[#F7F5F0] p-6 rounded-[2rem] border border-[#AEC3B0]">
              <h3 className="text-sm font-bold text-[#0D2B1D] mb-4">
                Transaction Limits
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#0D2B1D]/70">
                    Max per Transaction
                  </span>
                  <span className="text-sm font-black text-[#0D2B1D]">
                    $3,000
                  </span>
                </div>
                <div className="w-full bg-[#AEC3B0] rounded-full h-2">
                  <div
                    className="bg-[#aec3b0] h-2 rounded-full"
                    style={{ width: "30%" }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-xs text-[#0D2B1D]/60">
                  <span>Personal Account</span>
                  <span>Upgrade to Business for $25,000 limit</span>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100">
              <h3 className="text-sm font-bold text-amber-900 mb-4">
                Important Terms
              </h3>
              <div className="space-y-2 text-xs text-amber-700/80">
                <p>
                  ✓ <strong>Irreversible:</strong> Once accepted, transfers
                  cannot be reversed
                </p>
                <p>
                  ✓ <strong>Expiry:</strong> Transfers expire after 30 days if
                  not accepted
                </p>
                <p>
                  ✓ <strong>Instant:</strong> Funds available within minutes of
                  acceptance
                </p>
                <p>
                  ✓ <strong>No Bank Info:</strong> Recipients remain anonymous
                  to senders
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (showAddContact) {
      return (
        <div className="animate-in slide-in-from-right-10 duration-300 h-full flex flex-col pt-4">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setShowAddContact(false)}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-90 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold">Add New Contact</h2>
            <div className="w-10" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                className="w-full bg-\[#F2F1EF\] border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Email or Phone
              </label>
              <input
                type="text"
                placeholder="email@example.com or +1 (555) 123-4567"
                value={newContactEmail}
                onChange={(e) => setNewContactEmail(e.target.value)}
                className="w-full bg-\[#F2F1EF\] border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none"
              />
            </div>

            <button
              disabled={!newContactName || !newContactEmail}
              onClick={() => {
                setShowAddContact(false);
                triggerNotification(
                  "Contact Added",
                  `Added ${newContactName} to your contacts`,
                );
              }}
              className="w-full mt-auto bg-[#F7F5F0] text-[#D9B18E] py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all disabled:opacity-50"
            >
              Save Contact
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-in slide-in-from-right-10 duration-300 h-full flex flex-col pt-4">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setActiveTab("dashboard")}
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-90 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-black italic tracking-tighter">
            Rizq.{" "}
            <span className="text-[#0d2b1d] not-italic">{t("transfer")}</span>
          </h2>
          <button
            onClick={() => setShowETransferSettings(true)}
            className="p-2 rounded-full hover:bg-slate-100 active:scale-90 transition-all"
          >
            <Settings size={20} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <button
            onClick={() => {
              setActiveTab("e-transfer");
              setTransferType("E-Transfer");
              setETransferMode("send");
            }}
            className="w-full bg-\[#F2F1EF\] p-6 rounded-[2.5rem] border-2 border-transparent hover:border-[#aec3b0] shadow-sm flex items-center gap-5 group transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#AEC3B0] text-[#D9B18E] flex items-center justify-center group-hover:bg-[#D9B18E] group-hover:text-[#F7F5F0] transition-all">
              <Smartphone size={24} />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#0D2B1D]">E-transfer</p>
              <p className="text-xs text-[#0D2B1D]/40 font-medium">
                Send money via phone or email
              </p>
            </div>
            <ArrowRight
              className="ml-auto text-slate-300 group-hover:text-[#0d2b1d] transition-all"
              size={20}
            />
          </button>

          <button
            onClick={() => {
              setActiveTab("bank-transfer");
              setTransferType("Bank Transfer");
            }}
            className="w-full bg-\[#F2F1EF\] p-6 rounded-[2.5rem] border-2 border-transparent hover:border-[#aec3b0] shadow-sm flex items-center gap-5 group transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#f2f1ef] text-[#0d2b1d] flex items-center justify-center group-hover:bg-[#aec3b0] group-hover:text-[#D9B18E] transition-all">
              <Building size={24} />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#0D2B1D]">Bank Transfer</p>
              <p className="text-xs text-[#0D2B1D]/40 font-medium">
                Transfer to another account
              </p>
            </div>
            <ArrowRight
              className="ml-auto text-slate-300 group-hover:text-[#0d2b1d] transition-all"
              size={20}
            />
          </button>

          <button
            onClick={() => {
              setActiveTab("internal-transfer");
              setTransferType("Internal Transfer");
            }}
            className="w-full bg-\[#F2F1EF\] p-6 rounded-[2.5rem] border-2 border-transparent hover:border-[#aec3b0] shadow-sm flex items-center gap-5 group transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-[#D9B18E] transition-all">
              <RefreshCcw size={24} />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#0D2B1D]">Internal Transfer</p>
              <p className="text-xs text-[#0D2B1D]/40 font-medium">
                Move between your accounts
              </p>
            </div>
            <ArrowRight
              className="ml-auto text-slate-300 group-hover:text-[#0d2b1d] transition-all"
              size={20}
            />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <button
            onClick={() => setActiveTab("beneficiary-manager")}
            className="bg-\[#F2F1EF\] p-4 rounded-2xl border border-[#AEC3B0] hover:border-[#D9B18E] flex flex-col items-center gap-2 group transition-all active:scale-95"
          >
            <div className="text-2xl group-hover:scale-110 transition-transform">
              👥
            </div>
            <p className="text-[10px] font-bold text-[#0D2B1D]/70 text-center">
              Beneficiaries
            </p>
          </button>

          <button
            onClick={() => setActiveTab("transfer-history")}
            className="bg-\[#F2F1EF\] p-4 rounded-2xl border border-[#AEC3B0] hover:border-emerald-300 flex flex-col items-center gap-2 group transition-all active:scale-95"
          >
            <div className="text-2xl group-hover:scale-110 transition-transform">
              📋
            </div>
            <p className="text-[10px] font-bold text-[#0D2B1D]/70 text-center">
              History
            </p>
          </button>

          <button
            onClick={() => setActiveTab("transfer-analytics")}
            className="bg-\[#F2F1EF\] p-4 rounded-2xl border border-[#AEC3B0] hover:border-blue-300 flex flex-col items-center gap-2 group transition-all active:scale-95"
          >
            <div className="text-2xl group-hover:scale-110 transition-transform">
              📊
            </div>
            <p className="text-[10px] font-bold text-[#0D2B1D]/70 text-center">
              Analytics
            </p>
          </button>

          <button
            onClick={() => setShowScheduleTransfer(true)}
            className="bg-\[#F2F1EF\] p-4 rounded-2xl border border-[#AEC3B0] hover:border-amber-300 flex flex-col items-center gap-2 group transition-all active:scale-95"
          >
            <div className="text-2xl group-hover:scale-110 transition-transform">
              ⏰
            </div>
            <p className="text-[10px] font-bold text-[#0D2B1D]/70 text-center">
              Schedule
            </p>
          </button>
        </div>

        {/* E-Transfer History */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest">
              Recent Transfers
            </p>
            <button
              onClick={() => setShowAddContact(true)}
              className="text-xs font-bold text-[#0d2b1d] hover:text-[#0d2b1d] active:scale-90 transition-all"
            >
              + Add Contact
            </button>
          </div>
          <div className="space-y-2 max-h-[180px] overflow-y-auto">
            {eTransferHistory.slice(0, 3).map((transfer) => (
              <div
                key={transfer.id}
                className="bg-\[#F2F1EF\] p-4 rounded-xl border border-[#AEC3B0] flex items-center justify-between hover:border-[#aec3b0] transition-all"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-[#AEC3B0] flex items-center justify-center">
                    <ArrowUpRight
                      size={16}
                      className={
                        transfer.amount >= 0
                          ? "text-[#0d2b1d]"
                          : "text-[#0D2B1D]/70"
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#0D2B1D] truncate">
                      {transfer.name}
                    </p>
                    <p className="text-xs text-[#0D2B1D]/40 font-bold uppercase">
                      {transfer.date}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-[#0D2B1D]">
                    ${transfer.amount.toFixed(2)}
                  </p>
                  <p
                    className={`text-[10px] font-bold uppercase ${
                      transfer.status === "completed"
                        ? "text-[#0d2b1d]"
                        : "text-amber-600"
                    }`}
                  >
                    {transfer.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto bg-[#f2f1ef] p-6 rounded-[2rem] border border-[#aec3b0]">
          <div className="flex gap-4 items-start">
            <div className="p-2 bg-[#f2f1ef] text-[#0d2b1d] rounded-lg">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0d2b1d]">
                Interest-Free Routing
              </p>
              <p className="text-xs text-[#0d2b1d]/70 mt-1 leading-relaxed">
                Transactions are processed instantly through our ethical
                clearing network.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderScheduleTransfer = () => {
    if (!showScheduleTransfer) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[250] p-4 animate-in fade-in duration-300">
        <div className="bg-\[#F2F1EF\] rounded-[2rem] w-full max-w-[450px] p-6 space-y-4 animate-in zoom-in-95 duration-300 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Schedule Transfer</h2>
            <button
              onClick={() => setShowScheduleTransfer(false)}
              className="p-2 hover:bg-[#F7F5F0] rounded-lg transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest">
                Recipient
              </label>
              <select className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-xl p-3 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none">
                <option value="">Select a beneficiary</option>
                {beneficiaries.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest">
                Amount
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D2B1D]/40"
                  size={18}
                />
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-xl p-3 pl-12 text-sm font-bold focus:ring-2 ring-emerald-500 outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest">
                Frequency
              </label>
              <select
                value={scheduleFrequency}
                onChange={(e) => setScheduleFrequency(e.target.value)}
                className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-xl p-3 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none"
              >
                <option value="once">One Time</option>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest">
                Start Date
              </label>
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-xl p-3 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest">
                Category
              </label>
              <select
                value={transferCategory}
                onChange={(e) => setTransferCategory(e.target.value)}
                className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-xl p-3 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none"
              >
                <option value="personal">👤 Personal</option>
                <option value="charity">❤️ Charity</option>
                <option value="zakat">🕌 Zakat</option>
                <option value="bills">📄 Bills</option>
                <option value="family">👨‍👩‍👧 Family</option>
                <option value="business">💼 Business</option>
              </select>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-xs text-blue-700">
              <p className="font-bold mb-2">
                ✓ Scheduled transfers are automatic
              </p>
              <p>
                Your transfer will be processed on the scheduled date(s) without
                manual intervention.
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowScheduleTransfer(false)}
              className="flex-1 bg-[#AEC3B0] text-[#0D2B1D]/70 py-3 rounded-xl font-bold transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              disabled={!scheduleDate || !transferAmount}
              onClick={handleScheduleTransfer}
              className="flex-1 bg-[#F7F5F0] text-[#D9B18E] py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50"
            >
              Schedule Transfer
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderETransfer = () => {
    const MAX_TRANSFER_AMOUNT = 3000;
    const DEFAULT_EXPIRY_DAYS = 30;

    const handleETransferSubmit = () => {
      const amt = parseFloat(transferAmount) || 0;
      if (amt <= 0 || amt > MAX_TRANSFER_AMOUNT) {
        triggerNotification(
          "Transfer Limit",
          `Max per transaction: $${MAX_TRANSFER_AMOUNT}`,
        );
        return;
      }

      if (
        eTransferMode === "send" &&
        !recipientIdentifier &&
        !selectedContact
      ) {
        triggerNotification("Required", "Please select a recipient");
        return;
      }

      if (eTransferMode === "send" && !autodeposit && !securityQuestion) {
        triggerNotification("Security", "Please set a security question");
        return;
      }

      // Check if biometric is required for large transfers
      if (amt > 500) {
        setRequireBiometric(true);
        setShowOTPModal(true);
        const otp = generateOTP();
        setOtpInput(otp);
        triggerNotification("Security Check", `OTP: ${otp}`);
        return;
      }

      // Add to offline queue if offline
      if (!isOnline) {
        const transfer = {
          type: "e-transfer",
          recipient: selectedContact?.email || recipientIdentifier,
          amount: amt,
          timestamp: new Date().toISOString(),
          deviceFingerprint,
        };
        setOfflineQueue([...offlineQueue, transfer]);
        triggerNotification(
          "Offline Mode",
          "Transfer queued. Will send when online.",
        );
        return;
      }

      // Add to history
      const recipient = selectedContact?.email || recipientIdentifier;
      const name = selectedContact?.name || "One-time recipient";
      const newTransfer = {
        id: Date.now(),
        recipient,
        name,
        amount: amt,
        date: "Just now",
        status: "pending",
        expiryDate: new Date(
          Date.now() + DEFAULT_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
        ).toLocaleDateString(),
      };

      setETransferHistory((prev) => [newTransfer, ...prev]);
      setBalance((prev) => prev - amt);

      // Reset form
      setTransferAmount("");
      setSelectedContact(null);
      setRecipientIdentifier("");
      setSecurityQuestion("");
      setSecurityAnswer("");
      setETransferMode("send");
      setUseOneTimeContact(false);
      setRequestAmount("");

      setAppState("success");
      setTimeout(() => {
        setAppState("dashboard");
        setActiveTab("transfer-hub");
      }, 2500);
    };

    // Show Add Contact form if requested
    if (showAddContact) {
      return (
        <div className="animate-in slide-in-from-right-10 duration-300 h-full flex flex-col pt-4">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setShowAddContact(false)}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-90 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold">Add New Contact</h2>
            <div className="w-10" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                className="w-full bg-\[#F2F1EF\] border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Email or Phone
              </label>
              <input
                type="text"
                placeholder="email@example.com or +1 (555) 123-4567"
                value={newContactEmail}
                onChange={(e) => setNewContactEmail(e.target.value)}
                className="w-full bg-\[#F2F1EF\] border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none"
              />
            </div>

            <button
              disabled={!newContactName || !newContactEmail}
              onClick={() => {
                setShowAddContact(false);
                triggerNotification(
                  "Contact Added",
                  `Added ${newContactName} to your contacts`,
                );
              }}
              className="w-full mt-auto bg-[#F7F5F0] text-[#D9B18E] py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all disabled:opacity-50"
            >
              Save Contact
            </button>
          </div>
        </div>
      );
    }

    // Send Mode
    if (eTransferMode === "send" && !selectedContact) {
      return (
        <div className="animate-in slide-in-from-right-10 duration-300 h-full flex flex-col pt-4">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => {
                setETransferMode("send");
                setActiveTab("transfer-hub");
              }}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-90 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold">New E-Transfer</h2>
            <div className="w-10" />
          </div>

          {/* Mode Selector */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setETransferMode("send")}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                eTransferMode === "send"
                  ? "bg-[#f2f1ef] text-[#0d2b1d]"
                  : "bg-[#F2F1EF] text-slate-600"
              }`}
            >
              Send
            </button>
            <button
              onClick={() => setETransferMode("request")}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                eTransferMode === "request"
                  ? "bg-[#f2f1ef] text-[#0d2b1d]"
                  : "bg-[#F2F1EF] text-slate-600"
              }`}
            >
              Request
            </button>
          </div>

          {/* Recipient Selection */}
          <div className="space-y-4 mb-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest ml-1">
                Send To (Email or Phone)
              </label>
              <input
                type="text"
                placeholder="email@example.com or +1 (555) 123-4567"
                value={recipientIdentifier}
                onChange={(e) => setRecipientIdentifier(e.target.value)}
                className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none"
              />
            </div>

            {/* One-Time Contact Toggle */}
            <div className="flex items-center justify-between bg-[#F7F5F0] p-4 rounded-xl">
              <div>
                <p className="text-sm font-bold text-[#0D2B1D]">
                  One-Time Contact
                </p>
                <p className="text-xs text-[#0D2B1D]/40">Don't save contact</p>
              </div>
              <button
                onClick={() => setUseOneTimeContact(!useOneTimeContact)}
                className={`w-12 h-6 rounded-full transition-all ${
                  useOneTimeContact ? "bg-[#aec3b0]" : "bg-[#AEC3B0]"
                }`}
              />
            </div>

            {/* Quick Contacts */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest">
                  {t("quick Contacts")}
                </p>
                <button
                  onClick={() => setShowAddContact(true)}
                  className="text-xs font-bold text-[#0d2b1d] hover:text-[#0d2b1d] active:scale-90 transition-all"
                >
                  + Add Contact
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => {
                      setRecipientIdentifier(contact.email);
                      setSelectedContact(contact);
                    }}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div
                      className={`w-14 h-14 rounded-full ${contact.color} flex items-center justify-center text-white font-black text-lg shadow-md group-active:scale-90 transition-all`}
                    >
                      {contact.initial}
                    </div>
                    <span className="text-[9px] font-bold text-slate-600 text-center">
                      {contact.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Security & Autodeposit */}
          <div className="space-y-4 mb-6">
            {/* Autodeposit Option */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-bold text-blue-900">AutoDeposit</p>
                  <p className="text-xs text-blue-700/70">
                    Link email for instant deposits
                  </p>
                </div>
                <button
                  onClick={() => setAutodeposit(!autodeposit)}
                  className={`w-12 h-6 rounded-full transition-all ${
                    autodeposit ? "bg-blue-500" : "bg-[#AEC3B0]"
                  }`}
                />
              </div>
              {autodeposit && (
                <p className="text-xs text-blue-700 bg-\[#F2F1EF\]/60 p-2 rounded">
                  ✓ Recipient will receive funds automatically without security
                  questions
                </p>
              )}
            </div>

            {/* Security Question (if not Autodeposit) */}
            {!autodeposit && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest ml-1">
                    Security Question
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., What is your favorite color?"
                    value={securityQuestion}
                    onChange={(e) => setSecurityQuestion(e.target.value)}
                    className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest ml-1">
                    Answer
                  </label>
                  <input
                    type="text"
                    placeholder="Your answer"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Amount Input */}
          <div className="space-y-2 mb-6">
            <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest ml-1">
              Amount (Max: ${MAX_TRANSFER_AMOUNT})
            </label>
            <div className="relative">
              <DollarSign
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D2B1D]/40"
                size={18}
              />
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-2xl p-4 pl-12 text-sm font-black focus:ring-2 ring-emerald-500 outline-none"
                placeholder="0.00"
                max={MAX_TRANSFER_AMOUNT}
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-[#f2f1ef] p-4 rounded-xl border border-[#aec3b0] mb-6 text-xs text-[#0d2b1d] space-y-2">
            <div className="flex gap-2">
              <Clock size={14} className="shrink-0 mt-0.5" />
              <span>Typically available within minutes of acceptance</span>
            </div>
            <div className="flex gap-2">
              <Clock size={14} className="shrink-0 mt-0.5" />
              <span>Expires in {DEFAULT_EXPIRY_DAYS} days if not accepted</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={
              !transferAmount ||
              !recipientIdentifier ||
              (!autodeposit && !securityQuestion)
            }
            onClick={handleETransferSubmit}
            className="w-full mt-auto mb-4 bg-[#F2F1EF] text-[#D9B18E] py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all disabled:opacity-50"
          >
            Send E-Transfer
          </button>
        </div>
      );
    }

    // Request Money Mode
    if (eTransferMode === "request") {
      return (
        <div className="animate-in slide-in-from-right-10 duration-300 h-full flex flex-col pt-4">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setETransferMode("send")}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-90 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold">Request Money</h2>
            <div className="w-10" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest ml-1">
                Request From (Email or Phone)
              </label>
              <input
                type="text"
                placeholder="email@example.com or +1 (555) 123-4567"
                value={recipientIdentifier}
                onChange={(e) => setRecipientIdentifier(e.target.value)}
                className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none"
              />
            </div>

            <div className="bg-[#F7F5F0] rounded-xl p-4">
              <p className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest mb-3">
                Quick Contacts
              </p>
              <div className="grid grid-cols-4 gap-3">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setRecipientIdentifier(contact.email)}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div
                      className={`w-14 h-14 rounded-full ${contact.color} flex items-center justify-center text-[#D9B18E] font-black text-lg shadow-md group-active:scale-90 transition-all`}
                    >
                      {contact.initial}
                    </div>
                    <span className="text-[9px] font-bold text-slate-600 text-center">
                      {contact.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest ml-1">
                Amount to Request (Max: ${MAX_TRANSFER_AMOUNT})
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D2B1D]/40"
                  size={18}
                />
                <input
                  type="number"
                  value={requestAmount}
                  onChange={(e) => setRequestAmount(e.target.value)}
                  className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-2xl p-4 pl-12 text-sm font-black focus:ring-2 ring-emerald-500 outline-none"
                  placeholder="0.00"
                  max={MAX_TRANSFER_AMOUNT}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest ml-1">
                Reason (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., Rent payment, Bill split..."
                className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none"
              />
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-xs text-amber-700">
              <div className="flex gap-2">
                <FileText size={14} className="shrink-0 mt-0.5" />
                <span>
                  Recipient will receive a request notification and can choose
                  to accept or decline
                </span>
              </div>
            </div>

            <button
              disabled={!requestAmount || !recipientIdentifier}
              onClick={() => {
                setTransferAmount(requestAmount);
                handleETransferSubmit();
              }}
              className="w-full mt-auto bg-[#F7F5F0] text-[#D9B18E] py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all disabled:opacity-50"
            >
              Send Request
            </button>
          </div>
        </div>
      );
    }

    // Confirm Mode (after selection)
    if (selectedContact) {
      return (
        <div className="animate-in slide-in-from-right-10 duration-300 h-full flex flex-col pt-4">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSelectedContact(null)}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-90 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold">Confirm Transfer</h2>
            <div className="w-10" />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#AEC3B0] flex items-center justify-center mb-4 relative">
              <div
                className={`w-full h-full rounded-full ${selectedContact.color} flex items-center justify-center text-[#D9B18E] font-black text-2xl`}
              >
                {selectedContact.initial}
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="absolute -top-1 -right-1 bg-\[#F2F1EF\] border shadow-sm rounded-full p-1"
              >
                <X size={14} />
              </button>
            </div>
            <p className="font-bold text-[#0D2B1D] mb-1">
              {selectedContact.name}
            </p>
            <p className="text-xs text-[#0D2B1D]/40 mb-8">
              {selectedContact.email}
            </p>

            <div className="w-full text-center mb-8">
              <div className="flex items-center justify-center gap-1">
                <span className="text-4xl font-bold text-[#AEC3B0]">$</span>
                <span className="text-6xl font-black tracking-tighter text-[#0D2B1D]">
                  {transferAmount || "0"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-y-4 gap-x-12 w-full max-w-[280px] mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "del"].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    if (num === "del")
                      setTransferAmount((prev) => prev.slice(0, -1));
                    else if (num === "." && transferAmount.includes("."))
                      return;
                    else if (transferAmount.length < 7)
                      setTransferAmount((prev) => `${prev}${num}`);
                  }}
                  className="h-12 flex items-center justify-center text-xl font-bold text-[#0D2B1D] active:bg-[#F7F5F0] rounded-full transition-all"
                >
                  {num === "del" ? <RefreshCcw size={20} /> : num}
                </button>
              ))}
            </div>

            <button
              disabled={!transferAmount}
              onClick={handleETransferSubmit}
              className="w-full mb-4 bg-[#F7F5F0] text-[#D9B18E] py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all disabled:opacity-50"
            >
              Confirm & Send
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderBankTransfer = () => (
    <div className="animate-in slide-in-from-right-10 duration-300 h-full flex flex-col pt-4">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setActiveTab("transfer-hub")}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-90 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold">Bank Transfer</h2>
        <div className="w-10" />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Recipient Name
          </label>
          <input
            type="text"
            className="w-full bg-\[#F2F1EF\] border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none"
            placeholder="Full Legal Name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest ml-1">
            Account Number
          </label>
          <input
            type="text"
            className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none font-mono"
            placeholder="0000 0000 0000"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest ml-1">
            Amount
          </label>
          <div className="relative">
            <DollarSign
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D2B1D]/40"
              size={18}
            />
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-2xl p-4 pl-12 text-sm font-black focus:ring-2 ring-emerald-500 outline-none"
              placeholder="0.00"
            />
          </div>
        </div>

        <button
          onClick={handleTransferSubmit}
          disabled={!transferAmount}
          className="w-full mt-4 bg-[#F7F5F0] text-[#D9B18E] py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all disabled:opacity-50"
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );

  const renderInternalTransfer = () => {
    const fromAccountData = userAccounts.find((acc) => acc.id === fromAccount);
    const toAccountData = userAccounts.find((acc) => acc.id === toAccount);

    const handleInternalTransfer = () => {
      const amt = parseFloat(internalTransferAmount) || 0;
      if (amt <= 0) {
        triggerNotification(
          "Invalid Amount",
          "Please enter an amount greater than 0",
        );
        return;
      }

      if (fromAccountData.balance < amt) {
        triggerNotification(
          "Insufficient Balance",
          `Your ${fromAccountData.name} has insufficient funds`,
        );
        return;
      }

      if (fromAccount === toAccount) {
        triggerNotification("Same Account", "Select different accounts");
        return;
      }

      // Update balances
      setBalance((prev) => prev - amt); // Deduct from checking (main balance)
      setTransactions((prev) => [
        {
          id: Date.now(),
          name: `Transfer: ${fromAccountData.name} → ${toAccountData.name}`,
          amount: -amt,
          time: "Just now",
          status: "completed",
          type: "transfer",
        },
        ...prev,
      ]);

      // Reset form
      setInternalTransferAmount("");
      setFromAccount("current");
      setToAccount("investment");

      triggerNotification(
        "Transfer Complete",
        `$${amt.toFixed(2)} moved to ${toAccountData.name}`,
      );

      setTimeout(() => {
        setActiveTab("transfer-hub");
      }, 1500);
    };

    return (
      <div className="animate-in slide-in-from-right-10 duration-300 h-full flex flex-col pt-4">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setActiveTab("transfer-hub")}
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-90 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-bold">Internal Transfer</h2>
          <div className="w-10" />
        </div>

        <div className="space-y-6">
          {/* From Account */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest ml-1">
              From Account
            </label>
            <div className="space-y-2">
              {userAccounts
                .filter((acc) => acc.id !== toAccount)
                .map((account) => (
                  <button
                    key={account.id}
                    onClick={() => setFromAccount(account.id)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                      fromAccount === account.id
                        ? "border-[#aec3b0] bg-[#f2f1ef]"
                        : "border-[#AEC3B0] bg-[#F2F1EF] hover:border-emerald-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[#0D2B1D]">
                          {account.name}
                        </p>
                        <p className="text-xs text-[#0D2B1D]/40 font-bold uppercase">
                          Available Balance
                        </p>
                      </div>
                      <p className="font-black text-[#0D2B1D]">
                        ${account.balance.toFixed(2)}
                      </p>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                setFromAccount(toAccount);
                setToAccount(fromAccount);
              }}
              className="p-2 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 active:scale-90 transition-all"
            >
              <RefreshCcw size={20} />
            </button>
          </div>

          {/* To Account */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest ml-1">
              To Account
            </label>
            <div className="space-y-2">
              {userAccounts
                .filter((acc) => acc.id !== fromAccount)
                .map((account) => (
                  <button
                    key={account.id}
                    onClick={() => setToAccount(account.id)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                      toAccount === account.id
                        ? "border-[#aec3b0] bg-[#f2f1ef]"
                        : "border-[#AEC3B0] bg-[#F2F1EF] hover:border-emerald-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[#0D2B1D]">
                          {account.name}
                        </p>
                        <p className="text-xs text-[#0D2B1D]/40 font-bold uppercase">
                          Current Balance
                        </p>
                      </div>
                      <p className="font-black text-[#0D2B1D]">
                        ${account.balance.toFixed(2)}
                      </p>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest ml-1">
              Amount
            </label>
            <div className="relative">
              <DollarSign
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D2B1D]/40"
                size={18}
              />
              <input
                type="number"
                value={internalTransferAmount}
                onChange={(e) => setInternalTransferAmount(e.target.value)}
                className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-2xl p-4 pl-12 text-sm font-black focus:ring-2 ring-emerald-500 outline-none"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Transfer Summary */}
          {internalTransferAmount && fromAccountData && toAccountData && (
            <div className="bg-[#F7F5F0] p-4 rounded-2xl border border-[#AEC3B0]">
              <p className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest mb-3">
                Transfer Summary
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#0D2B1D]/70">From:</span>
                  <span className="font-bold text-[#0D2B1D]">
                    {fromAccountData.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0D2B1D]/70">To:</span>
                  <span className="font-bold text-[#0D2B1D]">
                    {toAccountData.name}
                  </span>
                </div>
                <div className="h-px bg-slate-300 my-2"></div>
                <div className="flex justify-between text-base font-black">
                  <span>Amount:</span>
                  <span className="text-[#0d2b1d]">
                    ${parseFloat(internalTransferAmount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleInternalTransfer}
          disabled={!internalTransferAmount || fromAccount === toAccount}
          className="w-full mt-auto mb-4 bg-[#F7F5F0] text-[#D9B18E] py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all disabled:opacity-50"
        >
          Complete Transfer
        </button>
      </div>
    );
  };

  // Beneficiary Manager
  const renderBeneficiaryManager = () => {
    if (showAddBeneficiary) {
      return (
        <div className="animate-in slide-in-from-right-10 duration-300 h-full flex flex-col pt-4">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setShowAddBeneficiary(false)}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-90 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold">Add Beneficiary</h2>
            <div className="w-10" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest ml-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={newBeneficiaryName}
                onChange={(e) => setNewBeneficiaryName(e.target.value)}
                className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest ml-1">
                Email
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                value={newBeneficiaryEmail}
                onChange={(e) => setNewBeneficiaryEmail(e.target.value)}
                className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest ml-1">
                Phone
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={newBeneficiaryPhone}
                onChange={(e) => setNewBeneficiaryPhone(e.target.value)}
                className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest ml-1">
                Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["personal", "charity", "family"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setNewBeneficiaryType(type)}
                    className={`py-3 px-2 rounded-xl font-bold text-sm capitalize transition-all ${
                      newBeneficiaryType === type
                        ? "bg-[#f2f1ef] text-[#0d2b1d]"
                        : "bg-[#AEC3B0] text-[#0D2B1D]/70"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={
                !newBeneficiaryName ||
                (!newBeneficiaryEmail && !newBeneficiaryPhone)
              }
              onClick={handleAddBeneficiary}
              className="w-full mt-auto bg-[#F7F5F0] text-[#D9B18E] py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all disabled:opacity-50"
            >
              Save Beneficiary
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-in slide-in-from-right-10 duration-300 h-full flex flex-col pt-4">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setActiveTab("dashboard")}
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-90 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-black italic tracking-tighter">
            Rizq.{" "}
            <span className="text-[#0d2b1d] not-italic">Beneficiaries</span>
          </h2>
          <button
            onClick={() => setShowAddBeneficiary(true)}
            className="text-[#0d2b1d] font-bold text-sm active:scale-90 transition-all"
          >
            + Add
          </button>
        </div>

        <div className="space-y-3 flex-1">
          {beneficiaries.map((ben) => (
            <div
              key={ben.id}
              className="bg-\[#F2F1EF\] p-4 rounded-2xl border border-[#AEC3B0] hover:border-[#aec3b0] transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-[#f2f1ef] flex items-center justify-center text-[#0d2b1d] font-bold">
                  {ben.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{ben.name}</p>
                  <p className="text-xs text-slate-400">
                    {ben.email || ben.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {ben.verified && <Check size={16} className="text-[#0d2b1d]" />}
                <button
                  onClick={() => toggleFavoriteBeneficiary(ben.id)}
                  className={`text-lg ${
                    ben.favorite ? "text-amber-500" : "text-slate-300"
                  }`}
                >
                  ⭐
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Transfer Receipt Modal
  const renderTransferReceipt = () => {
    if (!lastTransferReceipt) return null;
    const receipt = lastTransferReceipt;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[250] p-4 animate-in fade-in duration-300">
        <div className="bg-\[#F2F1EF\] rounded-[2rem] w-full max-w-[400px] p-6 space-y-6 animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Transfer Receipt</h2>
            <button
              onClick={() => setShowTransferReceipt(false)}
              className="p-1 hover:bg-slate-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* Shariah Compliance Badge */}
          <div className="bg-[#f2f1ef] p-4 rounded-xl border border-[#aec3b0] text-center">
            <div className="text-4xl mb-2">✅</div>
            <p className="font-bold text-[#0d2b1d]">Shariah Compliant</p>
            <p className="text-[10px] text-[#0d2b1d] mt-1">
              Interest-Free Transfer
            </p>
            <p className="text-[9px] text-[#0d2b1d] mt-2">
              ID: {receipt.sharahComplianceId}
            </p>
          </div>

          {/* Receipt Details */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#0D2B1D]/70">Transaction ID</span>
              <span className="font-mono font-bold text-[#0D2B1D]">
                {receipt.id}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0D2B1D]/70">Date & Time</span>
              <span className="font-bold text-[#0D2B1D]">
                {receipt.timestamp}
              </span>
            </div>
            <div className="h-px bg-[#AEC3B0]"></div>
            <div className="flex justify-between">
              <span className="text-[#0D2B1D]/70">Recipient</span>
              <span className="font-bold text-[#0D2B1D]">
                {receipt.recipient}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0D2B1D]/70">Category</span>
              <span className="font-bold text-[#0D2B1D] capitalize">
                {getCategoryIcon(receipt.category)} {receipt.category}
              </span>
            </div>
            <div className="h-px bg-[#AEC3B0]"></div>
            <div className="flex justify-between text-base">
              <span className="font-bold text-[#0D2B1D]">Amount</span>
              <span className="font-black text-[#0d2b1d]">
                ${receipt.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0D2B1D]/70">Status</span>
              <span className="font-bold text-[#0d2b1d] capitalize">
                {receipt.status}
              </span>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              onClick={() => setShowTransferReceipt(false)}
              className="flex-1 py-3 bg-[#AEC3B0] text-[#0D2B1D]/70 rounded-xl font-bold text-sm"
            >
              Done
            </button>
            <button className="flex-1 py-3 bg-[#f2f1ef] text-[#0d2b1d] rounded-xl font-bold text-sm active:scale-90 transition-transform">
              Share Receipt
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Transfer Analytics Dashboard
  const renderTransferAnalytics = () => {
    const stats = calculateMonthlyStats();

    return (
      <div className="animate-in slide-in-from-right-10 duration-300 h-full flex flex-col pt-4">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setActiveTab("transfer-hub")}
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-90 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-bold">Transfer Analytics</h2>
          <button
            onClick={() => setAnalyticsView(!analyticsView)}
            className="p-2 rounded-full hover:bg-slate-100 active:scale-90 transition-all"
          >
            {analyticsView ? "📊" : "📈"}
          </button>
        </div>

        <div className="space-y-6 flex-1">
          {!analyticsView ? (
            <>
              {/* Summary View */}
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  This Month
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#f2f1ef] p-4 rounded-2xl border border-[#aec3b0]">
                    <p className="text-[10px] text-[#0d2b1d] font-bold uppercase mb-2">
                      Sent
                    </p>
                    <p className="text-2xl font-black text-[#0d2b1d]">
                      ${stats.totalSent.toFixed(0)}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
                    <p className="text-[10px] text-blue-700 font-bold uppercase mb-2">
                      Received
                    </p>
                    <p className="text-2xl font-black text-blue-900">
                      ${stats.totalReceived.toFixed(0)}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Detailed View */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-[2rem] border border-[#aec3b0]">
                <p className="text-[10px] text-[#0d2b1d] font-black uppercase mb-2">
                  Performance
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700 font-bold">
                      Total Volume
                    </span>
                    <span className="text-2xl font-black text-[#0d2b1d]">
                      ${(stats.totalSent + stats.totalReceived).toFixed(0)}
                    </span>
                  </div>
                  <div className="w-full bg-\[#F2F1EF\]/50 rounded-full h-3">
                    <div
                      className="bg-[#aec3b0] h-3 rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          ((stats.totalSent + stats.totalReceived) / 5000) *
                            100,
                          100,
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Statistics */}
          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Statistics
            </p>
            <div className="space-y-2">
              <div className="flex justify-between bg-\[#F2F1EF\] p-3 rounded-xl">
                <span className="text-slate-600 text-sm">Transactions</span>
                <span className="font-bold text-slate-900">
                  {stats.transactionCount}
                </span>
              </div>
              <div className="flex justify-between bg-\[#F2F1EF\] p-3 rounded-xl">
                <span className="text-slate-600 text-sm">Average Transfer</span>
                <span className="font-bold text-slate-900">
                  ${stats.avgTransfer.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Top Recipients */}
          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Top Recipients
            </p>
            <div className="space-y-2">
              {beneficiaries.slice(0, 3).map((ben) => (
                <div
                  key={ben.id}
                  className="flex justify-between bg-\[#F2F1EF\] p-3 rounded-xl"
                >
                  <span className="text-slate-600 text-sm">{ben.name}</span>
                  <span className="font-bold text-slate-900">3 transfers</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Advanced Transfer History with Filters
  const renderAdvancedTransferHistory = () => {
    const filteredTransactions = transactions.filter((tx) => {
      if (historyFilter === "all") return true;
      if (historyFilter === "sent") return tx.amount < 0;
      if (historyFilter === "received") return tx.amount > 0;
      if (historyFilter === "pending") return tx.status === "pending";
      return true;
    });

    if (showDetailedTransaction) {
      const tx = transactions.find((t) => t.id === showDetailedTransaction);
      if (!tx) return null;

      return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[250] p-4 animate-in fade-in">
          <div className="bg-\[#F2F1EF\] rounded-[2rem] w-full max-w-[400px] p-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Transaction Details</h2>
              <button
                onClick={() => setShowDetailedTransaction(null)}
                className="p-1 hover:bg-slate-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-[#0D2B1D]/70">Type</span>
                <span className="font-bold capitalize">{tx.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#0D2B1D]/70">Amount</span>
                <span
                  className={`font-bold ${
                    tx.amount > 0 ? "text-[#0d2b1d]" : "text-[#0D2B1D]"
                  }`}
                >
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#0D2B1D]/70">Date</span>
                <span className="font-bold">{tx.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#0D2B1D]/70">Status</span>
                <span
                  className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${getTransferStatusColor(
                    tx.status,
                  )}`}
                >
                  {tx.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-in slide-in-from-right-10 duration-300 h-full flex flex-col pt-4">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setActiveTab("transfer-hub")}
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-90 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-bold">Transfer History</h2>
          <div className="w-10" />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["all", "sent", "received", "pending"].map((filter) => (
            <button
              key={filter}
              onClick={() => setHistoryFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                historyFilter === filter
                  ? "bg-[#f2f1ef] text-[#0d2b1d]"
                  : "bg-[#F2F1EF] text-[#0D2B1D]/70 border border-[#AEC3B0]"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <div className="space-y-2 flex-1 overflow-y-auto">
          {filteredTransactions.map((tx) => (
            <button
              key={tx.id}
              onClick={() => setShowDetailedTransaction(tx.id)}
              className="w-full bg-\[#F2F1EF\] p-4 rounded-xl border border-[#AEC3B0] hover:border-[#aec3b0] transition-all text-left flex items-center justify-between group"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#f2f1ef] transition-colors">
                  {tx.amount > 0 ? (
                    <ArrowDownRight size={16} className="text-[#0d2b1d]" />
                  ) : (
                    <ArrowUpRight size={16} className="text-slate-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-slate-900">{tx.name}</p>
                  <p className="text-xs text-slate-400">{tx.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-black text-sm ${
                    tx.amount > 0 ? "text-[#0d2b1d]" : "text-[#0D2B1D]"
                  }`}
                >
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </p>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${getTransferStatusColor(
                    tx.status,
                  )}`}
                >
                  {tx.status}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // OTP Modal for Large Transfers
  const renderOTPModal = () => {
    if (!showOTPModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[300] p-4 animate-in fade-in duration-300">
        <div className="bg-\[#F2F1EF\] rounded-[2rem] w-full max-w-[400px] p-6 space-y-6 animate-in zoom-in-95 duration-300">
          <div className="text-center">
            <h2 className="text-lg font-bold">Verify Transfer</h2>
            <p className="text-slate-500 text-sm mt-2">
              Enter the OTP sent to your email
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-2">
                Transaction
              </p>
              <p className="font-bold text-blue-900">${transferAmount}</p>
            </div>

            <input
              type="text"
              placeholder="000000"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value.slice(0, 6))}
              maxLength="6"
              className="w-full text-center text-2xl tracking-[0.5em] font-bold border-2 border-[#AEC3B0] rounded-2xl p-4 focus:ring-2 ring-emerald-500 outline-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowOTPModal(false)}
              className="flex-1 py-3 bg-[#AEC3B0] text-[#0D2B1D]/70 rounded-xl font-bold text-sm"
            >
              Cancel
            </button>
            <button
              disabled={otpInput.length < 6}
              onClick={() => {
                setShowOTPModal(false);
                // After OTP, show receipt
                setLastTransferReceipt(
                  createTransferReceipt({
                    recipient: selectedContact?.name || recipientIdentifier,
                    amount: parseFloat(transferAmount),
                    category: transferCategory,
                    method: "E-Transfer",
                    email: selectedContact?.email || recipientIdentifier,
                    phone: selectedContact?.phone || "",
                  }),
                );
                setShowTransferReceipt(true);
                setOtpInput("");
              }}
              className="flex-1 py-3 bg-[#aec3b0] text-[#D9B18E] rounded-xl font-bold text-sm active:scale-95 transition-transform disabled:opacity-50"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Biometric Confirmation Modal
  const renderBiometricModal = () => {
    const amt = parseFloat(transferAmount) || 0;
    if (amt <= 500) return null;
    if (!showOTPModal || !requireBiometric) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[300] p-4 animate-in fade-in duration-300">
        <div className="bg-\[#F2F1EF\] rounded-[2rem] w-full max-w-[400px] p-6 space-y-6 animate-in zoom-in-95 duration-300 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-lg font-bold">Security Verification</h2>
          <p className="text-[#0D2B1D]/70 text-sm">
            Transfer amount exceeds $500
          </p>
          <p className="text-[#0D2B1D]/70 text-sm">
            Use biometric or PIN to proceed
          </p>

          <div className="space-y-2">
            <button
              onClick={() => {
                setRequireBiometric(false);
                triggerNotification("Verified", "Fingerprint authenticated");
              }}
              className="w-full py-4 bg-[#f2f1ef] text-[#0d2b1d] rounded-2xl font-bold border-2 border-[#aec3b0] hover:bg-[#f2f1ef] transition-all active:scale-95"
            >
              👆 Use Fingerprint
            </button>
            <button
              onClick={() => {
                setRequireBiometric(false);
                triggerNotification("Verified", "Face ID authenticated");
              }}
              className="w-full py-4 bg-blue-50 text-blue-700 rounded-2xl font-bold border-2 border-blue-200 hover:bg-blue-100 transition-all active:scale-95"
            >
              😊 Use Face ID
            </button>
          </div>

          <button
            onClick={() => setRequireBiometric(false)}
            className="w-full py-3 text-slate-600 font-bold text-sm"
          >
            Skip for now
          </button>
        </div>
      </div>
    );
  };

  const renderSuccess = () => (
    <div className="fixed inset-0 bg-\[#F2F1EF\] flex flex-col items-center justify-center z-[200] p-8 text-center animate-in fade-in duration-500">
      <div className="w-24 h-24 rounded-full bg-[#f2f1ef] flex items-center justify-center mb-6 animate-in zoom-in-50 duration-500 delay-200">
        <CheckCircle2 className="text-[#0d2b1d]" size={48} />
      </div>
      <h2 className="text-3xl font-black text-[#0D2B1D] tracking-tighter mb-2">
        Funds Sent.
      </h2>
      <p className="text-[#0D2B1D]/70 text-sm font-medium max-w-[200px]">
        Your transfer is being processed securely.
      </p>

      <div className="mt-8 pt-8 border-t w-full max-w-[240px] space-y-2">
        <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
          <span className="text-[#0D2B1D]/40">Amount</span>
          <span className="text-[#0D2B1D]">
            ${parseFloat(transferAmount).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
          <span className="text-[#0D2B1D]/40">Method</span>
          <span className="text-[#0D2B1D]">{transferType}</span>
        </div>
      </div>
    </div>
  );

  const renderCard = () => {
    if (subscriptionView === "manage") return renderSubscriptionManagement();

    return (
      <div className="space-y-6 pb-24 animate-in slide-in-from-bottom-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xl font-bold text-[#0D2B1D]">{t("yourCard")}</h2>
          <div className="bg-[#f2f1ef] px-3 py-1 rounded-full flex items-center gap-1.5">
            <Gem size={12} className="text-[#0d2b1d]" />
            <span className="text-[10px] font-black uppercase text-[#0d2b1d] tracking-tighter">
              {currentTier}
            </span>
          </div>
        </div>

        {/* Card Visual */}
        <div
          className={`w-full max-w-[340px] mx-auto aspect-[1.58/1] rounded-[1.5rem] p-6 text-white shadow-2xl relative flex flex-col justify-between transition-all duration-500 overflow-hidden ${
            isFrozen
              ? "grayscale bg-slate-800"
              : "bg-gradient-to-br from-[#043d2e] via-[#043d2e] to-[#022c22]"
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-400/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="flex justify-between items-start relative z-10">
            <span className="font-black text-2xl italic tracking-tighter">
              Rizq.
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
                className="p-1.5 bg-\[#F2F1EF\]/10 hover:bg-\[#F2F1EF\]/20 rounded-full transition-colors active:scale-90"
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
                <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-emerald-600/70 mb-0.5">
                  Expiry
                </span>
                <span className="text-sm font-mono font-medium tracking-widest">
                  {showCardDetails ? "09/28" : "••/••"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-emerald-600/70 mb-0.5">
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
        <div className="bg-\[#F2F1EF\] rounded-[1.5rem] p-1 border border-[#AEC3B0] shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-[#F7F5F0]">
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
                halalFilterActive ? "bg-[#aec3b0]" : "bg-slate-200"
              }`}
            >
              <div
                className={`w-4 h-4 bg-[#F2F1EF] rounded-full shadow-sm transition-transform ${
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
                className={`w-4 h-4 bg-[#F2F1EF] rounded-full shadow-sm transition-transform ${
                  isFrozen ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Feature Highlights Component */}
        <div className="bg-\[#F2F1EF\] rounded-[1.5rem] p-6 border border-[#AEC3B0] shadow-sm">
          <div className="space-y-6">
            <div className="flex gap-4">
              <ShieldCheck className="text-[#0d2b1d] shrink-0" size={20} />
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
        <div className="p-6 bg-slate-900 rounded-[2.5rem] text-[#D9B18E]">
          <div className="flex items-center gap-2 mb-3">
            <Info size={16} className="text-emerald-600" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
              {t("whySubscription")}
            </h3>
          </div>
          <p className="text-[11px] text-[#AEC3B0] leading-relaxed">
            Traditional banks make money by lending yours out at interest
            (Riba). <strong>Rizq. does not.</strong> To keep our infrastructure
            interest-free and purely ethical, we charge a transparent monthly
            fee. This ensures our interests are aligned with your values, not
            bank profits.
          </p>
        </div>

        <button
          onClick={() => setSubscriptionView("manage")}
          className="w-full bg-\[#F2F1EF\] border border-[#AEC3B0] text-[#0D2B1D] p-5 rounded-[2rem] font-bold text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
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
        <div className="bg-\[#F2F1EF\] p-6 rounded-[2rem] shadow-lg border border-[#AEC3B0] text-center">
          <h2 className="text-xl font-bold mb-1 text-[#0D2B1D]">Home Equity</h2>
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
        <div className="bg-\[#F2F1EF\] p-6 rounded-[2.5rem] border border-[#AEC3B0] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#f2f1ef] rounded-2xl text-[#0d2b1d]">
                <Gem size={20} />
              </div>
              <div>
                <p className="font-black text-[#0D2B1D]">Rizq. Premium</p>
                <p className="text-[10px] text-[#0D2B1D]/40 font-bold uppercase tracking-widest">
                  $9.99 / Month
                </p>
              </div>
            </div>
            <span className="bg-[#aec3b0] text-white text-[9px] px-3 py-1 rounded-full font-black uppercase">
              Active
            </span>
          </div>

          <div className="h-px bg-[#AEC3B0]"></div>

          <div className="space-y-4 pt-2">
            <div className="flex gap-4">
              <ShieldCheck className="text-[#0d2b1d] shrink-0" size={20} />
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
            className="p-3 bg-\[#F2F1EF\] rounded-2xl shadow-sm border border-[#AEC3B0] active:scale-95 transition-transform"
          >
            <ChevronLeft className="text-[#0D2B1D]/70" />
          </button>
          <h2 className="text-xl font-black text-[#0D2B1D] tracking-tight">
            Zakat Portal
          </h2>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 w-6 rounded-full transition-all duration-500 ${
                zakatStep >= s ? "bg-[#D9B18E]" : "bg-[#AEC3B0]"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Step 1: Assets */}
      {zakatStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-\[#F2F1EF\] p-6 rounded-[2.5rem] border border-[#AEC3B0] shadow-sm space-y-6">
            <div className="flex items-center gap-3 px-2">
              <TrendingUp className="text-[#D9B18E]" size={20} />
              <h3 className="font-bold text-[#0D2B1D]">
                Step 1: Zakatable Assets
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-[#f2f1ef] rounded-2xl border border-[#aec3b0]">
                <div className="flex items-center gap-3">
                  <Wallet className="text-[#0d2b1d]" size={20} />
                  <span className="font-bold text-slate-700">
                    Rizq. Balance (Auto)
                  </span>
                </div>
                <span className="font-black text-[#0d2b1d]">
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
            className="w-full bg-indigo-600 text-[#D9B18E] p-6 rounded-[2rem] font-black text-lg shadow-xl shadow-indigo-900/20 active:scale-[0.98] transition-all"
          >
            Continue to Liabilities
          </button>
        </div>
      )}

      {/* Step 2: Liabilities */}
      {zakatStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-\[#F2F1EF\] p-6 rounded-[2.5rem] border border-[#AEC3B0] shadow-sm space-y-6">
            <div className="flex items-center gap-3 px-2 text-rose-600">
              <TrendingDown size={20} />
              <h3 className="font-bold text-[#0D2B1D]">Step 2: Liabilities</h3>
            </div>
            <p className="text-xs text-[#0D2B1D]/40 px-2 leading-relaxed">
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
                  <label className="text-[10px] font-black text-[#0D2B1D]/40 uppercase tracking-widest px-2">
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
            className="w-full bg-indigo-600 text-[#D9B18E] p-6 rounded-[2rem] font-black text-lg shadow-xl shadow-indigo-900/20 active:scale-[0.98] transition-all"
          >
            Review Calculation
          </button>
        </div>
      )}

      {/* Step 3: Calculation Review */}
      {zakatStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-indigo-900 p-8 rounded-[3rem] text-[#D9B18E] shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 opacity-10 p-4">
              <Fingerprint size={100} />
            </div>
            <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
              {t("totalZakatObligation")}
            </p>
            <h3 className="text-5xl font-black tracking-tighter mb-4">
              ${zakatDue.toFixed(2)}
            </h3>
            <div className="inline-flex items-center gap-2 bg-\[#F2F1EF\]/10 px-4 py-2 rounded-full text-[10px] font-bold">
              <ShieldCheck size={14} className="text-emerald-600" /> Shariah
              Compliant
            </div>
          </div>

          <div className="bg-\[#F2F1EF\] p-6 rounded-[2.5rem] border border-slate-100 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total Assets</span>
              <span className="font-bold">${totalAssets.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#0D2B1D]/70">Total Liabilities</span>
              <span className="font-bold text-rose-500">
                -${totalLiabilities.toLocaleString()}
              </span>
            </div>
            <div className="h-px bg-[#AEC3B0] my-2"></div>
            <div className="flex justify-between text-sm">
              <span className="text-[#0D2B1D] font-bold">Zakatable Wealth</span>
              <span className="font-black text-[#D9B18E]">
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
                ? "bg-[#D9B18E] text-[#0D2B1D] shadow-[#D9B18E]/20 active:scale-[0.98]"
                : "bg-[#AEC3B0] text-[#0D2B1D]/40 cursor-not-allowed"
            }`}
          >
            {t("selectDistribution")} <Heart size={20} />
          </button>
        </div>
      )}

      {/* Step 4: Charity Selection */}
      {zakatStep === 4 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-\[#F2F1EF\] p-6 rounded-[2.5rem] border border-[#AEC3B0] shadow-sm space-y-6">
            <div className="flex items-center gap-3 px-2">
              <Heart className="text-[#D9B18E]" size={20} />
              <h3 className="font-bold text-[#0D2B1D]">
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
                      ? "border-[#D9B18E] bg-[#F7F5F0] shadow-sm"
                      : "border-[#AEC3B0] bg-[#F7F5F0]/30 hover:bg-[#F7F5F0]"
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl ${
                      selectedCharity === charity.id
                        ? "bg-[#F2F1EF] shadow-sm"
                        : "bg-[#F2F1EF] border border-[#AEC3B0]"
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
                            ? "bg-[#D9B18E] text-[#0D2B1D]"
                            : "bg-[#AEC3B0] text-[#0D2B1D]/70"
                        }`}
                      >
                        {charity.tag}
                      </span>
                    </div>
                    <p className="text-xs text-[#0D2B1D]/70 leading-snug">
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
                ? "bg-[#D9B18E] text-[#0D2B1D] shadow-[#D9B18E]/20 active:scale-[0.98]"
                : "bg-[#AEC3B0] text-[#0D2B1D]/40 cursor-not-allowed"
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
            className="p-2 bg-\[#F2F1EF\] rounded-lg shadow-sm active:scale-90 transition-transform"
          >
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-lg font-bold">Murabaha Auto Finance</h2>
        </div>

        {/* Dynamic Payment Card */}
        <div className="bg-[#D9B18E] rounded-[2.5rem] p-8 text-[#0D2B1D] shadow-xl relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10 rotate-12">
            <Car size={120} />
          </div>
          <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest relative z-10">
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
            <ShieldCheck size={14} className="text-emerald-600/70" />
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
                  ? "bg-[#F2F1EF] text-[#D9B18E] shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {f.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Input Sliders */}
        <div className="bg-\[#F2F1EF\] p-6 rounded-[2rem] border border-slate-100 space-y-6 shadow-sm">
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
                      ? "bg-[#D9B18E] text-white shadow-md"
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
        <div className="bg-\[#F2F1EF\] p-5 rounded-[1.5rem] border border-dashed border-slate-200 grid grid-cols-2 gap-4">
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
            <p className="text-sm font-black text-[#0d2b1d]">
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
          className="w-full bg-slate-900 text-[#D9B18E] p-5 rounded-[2rem] font-black text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          Request Approval <CalendarDays size={20} />
        </button>
      </div>
    );
  };

  // Splash Screen
  if (appState === "splash") {
    return (
      <div className="fixed inset-0 bg-[#F7F5F0] z-[200] flex flex-col items-center justify-center text-[#D9B18E] p-6">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-5xl font-black italic tracking-tighter mb-1 animate-pulse">
            Rizq.
          </h2>
          <p className="text-[#623817] font-bold tracking-[0.2em] uppercase text-[8px] opacity-80">
            {t("slogan")}
          </p>
        </div>

        <div className="w-full max-w-[200px] mb-20">
          <div className="h-[3px] w-full bg-\[#F2F1EF\]/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all duration-100 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div className="flex justify-between mt-3 px-1">
            <span className="text-[7px] font-bold text-[#623817] uppercase tracking-widest">
              Encrypting
            </span>
            <span className="text-[7px] font-mono text-emerald-600">
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
    <div
      className="min-h-screen bg-[#f8f7f5] flex flex-col px-5 pt-[env(safe-area-inset-top,20px)] select-none overflow-hidden font-sans"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {notification && (
        <div className="fixed top-8 left-5 right-5 z-[100] bg-[#aec3b0] shadow-2xl rounded-2xl p-3 border-l-4 border-[#d9b18e] animate-in slide-in-from-top-4 flex items-center gap-3">
          <CheckCircle2 className="text-[#0d2b1d] shrink-0" size={18} />
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

      {/* Modals */}
      {renderOTPModal()}
      {renderBiometricModal()}
      {renderTransferReceipt()}
      {showTransferReceipt && lastTransferReceipt && renderTransferReceipt()}

      <header className="flex justify-between items-center py-4 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="bg-[#F7F5F0] p-1.5 rounded-lg">
            <Lock size={12} className="text-[#D9B18E]" />
          </div>
          <span className="font-black text-xl tracking-tighter">Rizq.</span>
          {!isOnline && (
            <span className="text-[9px] font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-full ml-2">
              Offline
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Bell size={20} className="text-slate-400" />
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            className="text-xs bg-[#F2F1EF] border rounded px-2 py-1 text-[#0D2B1D]"
            aria-label="Language selector"
          >
            <option value="en">English</option>
            <option value="fr_qc">Français (QC)</option>
            <option value="ar">العربية</option>
          </select>
          <div className="w-8 h-8 rounded-full bg-[#aec3b0] border border-[#aec3b0]/20 overflow-hidden shadow-sm">
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
        {activeTab === "transfer-hub" && renderTransferHub()}
        {activeTab === "e-transfer" && renderETransfer()}
        {activeTab === "bank-transfer" && renderBankTransfer()}
        {activeTab === "internal-transfer" && renderInternalTransfer()}
        {activeTab === "beneficiary-manager" && renderBeneficiaryManager()}
        {activeTab === "transfer-history" && renderAdvancedTransferHistory()}
        {activeTab === "transfer-analytics" && renderTransferAnalytics()}
        {activeTab === "success" && renderSuccess()}
        {renderScheduleTransfer()}
        {renderBiometricModal()}
        {activeTab === "purify" && (
          <div className="space-y-4 animate-in zoom-in-95 duration-200">
            <div className="bg-\[#F2F1EF\] p-8 rounded-[2rem] shadow border border-slate-50 text-center">
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
                className="w-full bg-[#aec3b0] text-[#0f172a] p-4 rounded-xl font-black shadow-lg active:scale-95 transition-transform"
              >
                {t("donateNow")}
              </button>
            </div>
          </div>
        )}
        {activeTab === "settings" && renderCard()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-\[#F2F1EF\]/95 backdrop-blur-xl border-t border-slate-50 px-6 flex justify-between items-center h-[75px] pb-safe">
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
      active ? "text-[#0d2b1d]" : "text-slate-300"
    }`}
  >
    <div
      className={`p-2 rounded-lg transition-all ${
        active ? "bg-[#f2f1ef]" : "bg-transparent"
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
