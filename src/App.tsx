import {
  Plus,
  Search,
  Home,
  Inbox,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  Package,
  Box,
  Users,
  LineChart,
  Settings2,
  Settings,
  CheckCircle2,
  AlertCircle,
  PanelLeftClose,
  MoreVertical,
  BadgePercent,
  Clover,
  BarChart3,
  Sun,
  Moon,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  History,
  CreditCard,
  DownloadCloud,
  Filter,
  RefreshCw,
  HelpCircle,
  X,
  Check,
  ExternalLink,
  Clock,
  ArrowLeft,
  ArrowUpDown,
  Bell,
  Copy,
  Crown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import manchesterCityLogo from "./assets/images/regenerated_image_1779248543610.png";
import brentfordLogo from "./assets/images/regenerated_image_1779250008986.png";
import bournemouthLogo from "./assets/images/regenerated_image_1779250009287.jpg";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PROCEDURE_TYPES = [
  "Freebet",
  "SuperOdds",
  "Duplo",
  "Extração de Freebet",
];

const BOOKMAKERS = [
  "Apostabet",
  "Estrela",
  "vupi",
  "Vai de bet",
  "betpix365",
  "Kto",
  "Bet7k",
  "Esportiva",
  "Jogo de ouro",
  "br4",
  "7games",
  "betão",
  "Bet365",
  "Betsson",
  "Viva sorte",
  "Sportybet",
  "Betfair",
  "Tradeball",
  "Betesporte",
  "Betano",
  "Sporting",
  "Superbet",
  "Esportes da sorte",
  "Novibet",
  "Meridian",
];

const CHAMPIONSHIPS = [
  { id: "brasileirao", name: "Brasileirão Série A" },
  { id: "premier_league", name: "Premier League" },
  { id: "la_liga", name: "La Liga" },
  { id: "nba", name: "NBA" },
  { id: "f1", name: "Fórmula 1" },
];

const GAMES: Record<string, string[]> = {
  brasileirao: [
    "Flamengo X Palmeiras",
    "São Paulo X Corinthians",
    "Grêmio X Internacional",
  ],
  premier_league: [
    "Man. City X Arsenal",
    "Liverpool X Chelsea",
    "Man. United X Tottenham",
  ],
  la_liga: [
    "Real Madrid X Atlético",
    "Barcelona X Sevilla",
    "Valencia X Villarreal",
  ],
  nba: ["Lakers X Warriors", "Celtics X Heat", "Bulls X Knicks"],
  f1: ["Verstappen (Vencedor)", "Norris no Pódio"],
};

const MOCK_PERCENTAGE_GAMES = [
  {
    id: "1",
    category: "SureBET",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    league: "La Liga",
    stadium: "Santiago Bernabéu",
    time: "HOJE • 21:00",
    profit: "3.50%",
    market: "VENCEDOR DO JOGO",
    bookies: [
      { name: "BET365", odd: "2.05", market: "Real Madrid" },
      { name: "BETANO", odd: "3.40", market: "Empate" },
      { name: "BETFAIR", odd: "2.10", market: "Barcelona" },
    ],
  },
  {
    id: "2",
    category: "SureBET",
    homeTeam: "Man. City",
    awayTeam: "Arsenal",
    league: "Premier League",
    stadium: "Etihad Stadium",
    time: "AMANHÃ • 16:00",
    profit: "2.10%",
    market: "GOLS SUB/SOB",
    bookies: [
      { name: "NOVIBET", odd: "1.95", market: "Over 2.5" },
      { name: "KTO", odd: "3.55", market: "Empate" },
      { name: "BET365", odd: "2.15", market: "Under 2.5" },
    ],
  },
  {
    id: "3",
    category: "PA para os dois Lados",
    homeTeam: "Flamengo",
    awayTeam: "Palmeiras",
    league: "Brasileirão",
    stadium: "Maracanã",
    time: "HOJE • 19:00",
    profit: "12.00%",
    market: "EMPATE ANULA",
    bookies: [
      { name: "ESTRELABET", odd: "2.80", market: "Empate" },
      { name: "SUPERBET", odd: "2.90", market: "Empate" },
      { name: "BETANO", odd: "2.60", market: "Palmeiras" },
    ],
  },
  {
    id: "4",
    category: "PA para o time da casa",
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    league: "NBA Basketball",
    stadium: "Crypto.com Arena",
    time: "HOJE • 23:30",
    profit: "8.40%",
    market: "VENCEDOR DA PARTIDA",
    bookies: [
      { name: "BETFAIR", odd: "1.90", market: "Lakers -4.5" },
      { name: "BET365", odd: "3.10", market: "Empate" },
      { name: "KTO", odd: "1.85", market: "Warriors" },
    ],
  },
  {
    id: "5",
    category: "PA para o time de fora",
    homeTeam: "Milan",
    awayTeam: "Inter",
    league: "Serie A IT",
    stadium: "San Siro",
    time: "SEGUNDA • 15:45",
    profit: "5.20%",
    market: "VENCEDOR SECO",
    bookies: [
      { name: "NOVIBET", odd: "2.95", market: "Milan" },
      { name: "BET7K", odd: "3.20", market: "Empate" },
      { name: "BET7K", odd: "3.10", market: "Inter" },
    ],
  },
];

const MOCK_DOUBLE_CHANCE_GAMES = [
  {
    id: "dc1",
    homeTeam: "Bayern Munich",
    awayTeam: "Real Madrid",
    league: "UEFA Champions League",
    stadium: "Allianz Arena",
    time: "HOJE • 20:45",
    profit: "3.42%",
    market: "VENCEDOR (1X)",
    bookies: [
      { name: "BET365", odd: "1.95", market: "1X" },
      { name: "BETFAIR", odd: "3.60", market: "Empate" },
      { name: "BETFAIR", odd: "2.15", market: "2" },
    ],
  },
  {
    id: "dc2",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    league: "Premier League",
    stadium: "Emirates Stadium",
    time: "AMANHÃ • 16:00",
    profit: "2.85%",
    market: "GOLS (+2.5)",
    bookies: [
      { name: "SUPERBET", odd: "1.82", market: "X2" },
      { name: "NOVIBET", odd: "3.50", market: "Empate" },
      { name: "NOVIBET", odd: "2.28", market: "1" },
    ],
  },
  {
    id: "dc3",
    homeTeam: "Inter Milan",
    awayTeam: "AC Milan",
    league: "Serie A",
    stadium: "San Siro",
    time: "HOJE • 18:00",
    profit: "3.12%",
    market: "AMBOS MARCAM",
    bookies: [
      { name: "SUPERBET", odd: "1.35", market: "12" },
      { name: "ESTRELABET", odd: "3.80", market: "X" },
      { name: "BET365", odd: "2.40", market: "AC Milan" },
    ],
  },
  {
    id: "dc4",
    homeTeam: "Gremio",
    awayTeam: "Internacional",
    league: "Campeonato Gaúcho",
    stadium: "Arena do Grêmio",
    time: "HOJE • 21:00",
    profit: "2.10%",
    market: "DUPLA CHANCE (1X)",
    bookies: [
      { name: "BETFAIR", odd: "1.55", market: "1X" },
      { name: "NOVIBET", odd: "3.10", market: "Empate" },
      { name: "BETANO", odd: "2.50", market: "2" },
    ],
  },
];

export interface Procedure {
  id: string;
  type: string;
  championship: string;
  game: string;
  bookies: string[];
  isWeeklyComplement: boolean;
  bet365Amount: string;
  totalInvestedAmount: string;
  freebetReceived?: string;
  freebetUsedAmount?: string;
  outcome: "lucro" | "perca" | null;
  outcomeAmount: string;
  createdAt: string;
}

export const getDayDiff = (dateStr?: string) => {
  if (!dateStr) return 0;
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = Math.abs(today.getTime() - date.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Handle URL params for stand-alone game view
  const searchParams = new URLSearchParams(window.location.search);
  const urlGameId = searchParams.get("gameId");
  const urlView = searchParams.get("view");
  const urlTheme = searchParams.get("theme") as "dark" | "light";

  useEffect(() => {
    if (urlTheme) setTheme(urlTheme);
  }, [urlTheme]);

  const [currentView, setCurrentView] = useState<
    | "dashboard"
    | "procedures"
    | "percentages"
    | "double-chances"
    | "odds-locator"
    | "conversor"
    | "stats-general"
    | "stats-reports"
    | "settings"
  >(
    urlView === "odds-locator" || urlView === "odds-detail" || urlGameId
      ? "odds-locator"
      : "dashboard",
  );
  const [dashboardActivityFilter, setDashboardActivityFilter] = useState<
    "Hoje" | "Ontem" | "Esta semana"
  >("Hoje");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [procedures, setProcedures] = useState<Procedure[]>(() => {
    const saved = localStorage.getItem("app_procedures");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("app_procedures", JSON.stringify(procedures));
  }, [procedures]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedGameIndex, setSelectedGameIndex] = useState<number | null>(
    null,
  );
  const [showHint, setShowHint] = useState(false);
  const [isNewProcedureModalOpen, setIsNewProcedureModalOpen] = useState(false);
  const [procedureType, setProcedureType] = useState<string>("");
  const [championship, setChampionship] = useState<string>("");
  const [game, setGame] = useState<string>("");
  const [bookmakerInputs, setBookmakerInputs] = useState(["", "", ""]);
  const [selectedBookmakers, setSelectedBookmakers] = useState(["", "", ""]);
  const [activeBookmakerIndex, setActiveBookmakerIndex] = useState<
    number | null
  >(null);
  const [isWeeklyComplement, setIsWeeklyComplement] = useState(false);
  const [bet365Amount, setBet365Amount] = useState("");
  const [totalInvestedAmount, setTotalInvestedAmount] = useState("");
  const [freebetReceived, setFreebetReceived] = useState("");
  const [freebetUsedAmount, setFreebetUsedAmount] = useState("");
  const [outcome, setOutcome] = useState<"lucro" | "perca" | null>(null);
  const [outcomeAmount, setOutcomeAmount] = useState("");

  const filteredBookmakers =
    activeBookmakerIndex !== null
      ? BOOKMAKERS.filter((b) =>
          b
            .toLowerCase()
            .includes(bookmakerInputs[activeBookmakerIndex].toLowerCase()),
        )
      : [];

  const computedPieData = PROCEDURE_TYPES.map((type) => {
    const typeProcedures = procedures.filter((p) => p.type === type);
    const invested = typeProcedures.reduce(
      (sum, p) => sum + (parseFloat(p.totalInvestedAmount) || 0),
      0,
    );
    const profitSum = typeProcedures.reduce((sum, p) => {
      const amount = parseFloat(p.outcomeAmount) || 0;
      if (p.outcome === "lucro") return sum + amount;
      if (p.outcome === "perca") return sum - amount;
      return sum;
    }, 0);
    const color =
      type === "Freebet"
        ? "#22c55e"
        : type === "SuperOdds"
          ? "#f59e0b"
          : "#3b82f6";

    return {
      name: type === "Duplo" ? "Duplos" : type,
      value: typeProcedures.length || 0.01,
      realValue: typeProcedures.length,
      color,
      profitSum,
      invested: `R$ ${invested.toFixed(2).replace(".", ",")}`,
      games: typeProcedures.map((p) => ({
        name: p.game || "Novo Jogo",
        invested: `R$ ${(parseFloat(p.totalInvestedAmount) || 0).toFixed(2).replace(".", ",")}`,
      })),
    };
  }).filter((d) => d.realValue > 0);

  const currentPieData =
    computedPieData.length > 0
      ? computedPieData
      : [
          {
            name: "Sem procedimentos",
            value: 1,
            realValue: 0,
            color: theme === "dark" ? "#333333" : "#e2e8f0",
            invested: "R$ 0,00",
            profitSum: 0,
            games: [],
          },
        ];

  const safeActiveIndex = activeIndex < currentPieData.length ? activeIndex : 0;

  useEffect(() => {
    setSelectedGameIndex(null);
  }, [activeIndex]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const totalInvestedGlobal = procedures.reduce(
    (sum, p) => sum + (parseFloat(p.totalInvestedAmount) || 0),
    0,
  );

  const totalFreebetGenerated =
    procedures.reduce(
      (sum, p) => sum + (parseFloat(p.freebetReceived) || 0),
      0,
    ) + (parseFloat(freebetReceived) || 0);
  const totalFreebetUsed =
    procedures.reduce(
      (sum, p) => sum + (parseFloat(p.freebetUsedAmount) || 0),
      0,
    ) + (parseFloat(freebetUsedAmount) || 0);
  const totalFreebetGlobal = Math.max(
    0,
    totalFreebetGenerated - totalFreebetUsed,
  );
  const generatedCount =
    procedures.filter((p) => (parseFloat(p.freebetReceived) || 0) > 0).length +
    ((parseFloat(freebetReceived) || 0) > 0 ? 1 : 0);
  const usedCount =
    procedures.filter((p) => (parseFloat(p.freebetUsedAmount) || 0) > 0)
      .length + ((parseFloat(freebetUsedAmount) || 0) > 0 ? 1 : 0);
  const activeFreebetsCount = Math.max(0, generatedCount - usedCount);

  const globalProfit = procedures.reduce((sum, p) => {
    const amount = parseFloat(p.outcomeAmount) || 0;
    if (p.outcome === "lucro") return sum + amount;
    if (p.outcome === "perca") return sum - amount;
    return sum;
  }, 0);

  const dashboardProcs = procedures.filter((p) => {
    const diff = getDayDiff(p.createdAt);
    if (dashboardActivityFilter === "Hoje") return diff === 0;
    if (dashboardActivityFilter === "Ontem") return diff === 1;
    if (dashboardActivityFilter === "Esta semana") return diff <= 7;
    return true;
  });

  return (
    <div
      className={`flex h-screen w-full transition-colors duration-500 ${theme === "dark" ? "bg-[#000000] text-[#a1a1aa]" : "bg-white text-slate-900"} font-sans selection:bg-green-500/30 relative overflow-hidden`}
    >
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? 280 : 0,
          opacity: isSidebarOpen ? 1 : 0,
          x: isSidebarOpen ? 0 : -20,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`h-full border-r transition-colors duration-500 flex flex-col shrink-0 overflow-hidden z-40 ${
          theme === "dark"
            ? "bg-[#050505] border-white/5"
            : "bg-slate-50 border-slate-200"
        }`}
      >
        <div className="min-w-[280px] h-full flex flex-col">
          <div className="p-5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white shadow-lg shadow-green-600/20">
              <Clover size={20} strokeWidth={3} />
            </div>
            <div className="flex flex-col">
              <h1
                className={`text-sm font-bold tracking-tight uppercase ${theme === "dark" ? "text-white" : "text-slate-900"}`}
              >
                BetsTips
              </h1>
              <span
                className={`text-[9px] font-medium uppercase tracking-[0.1em] ${theme === "dark" ? "text-[#71717a]" : "text-slate-500"}`}
              >
                As melhores Odds na sua tela
              </span>
            </div>
          </div>

          <div className="px-3 mb-6">
            <NavItem
              label="Localizador de Odds"
              icon={<Search size={18} strokeWidth={2.5} />}
              active={currentView === "odds-locator"}
              onClick={() => setCurrentView("odds-locator")}
              id="nav-odds-locator-sidebar"
              theme={theme}
              variant="header"
            />
          </div>

          <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
            <div className="py-2">
              <NavItem
                icon={<Home size={18} strokeWidth={2.5} />}
                label="Home"
                active={currentView === "dashboard"}
                onClick={() => setCurrentView("dashboard")}
                id="nav-home"
                theme={theme}
                variant="header"
              />
            </div>

            <div className="py-2">
              <NavItem
                label="Melhores porcentagens"
                icon={<BadgePercent size={18} strokeWidth={2.5} />}
                active={currentView === "percentages"}
                onClick={() => setCurrentView("percentages")}
                id="nav-percentages"
                theme={theme}
                variant="header"
              />
            </div>

            <div className="py-2">
              <NavItem
                label="Melhores chances de duplo"
                icon={<RefreshCw size={18} strokeWidth={2.5} />}
                active={currentView === "double-chances"}
                onClick={() => setCurrentView("double-chances")}
                id="nav-double-chances"
                theme={theme}
                variant="header"
              />
            </div>

            <div className="py-2">
              <NavGroup
                label="Conversor de Freebet"
                icon={<Clover size={18} strokeWidth={2.5} />}
                id="group-freebet"
                defaultOpen={false}
                theme={theme}
              >
                <NavItem
                  label="Conversor"
                  active={currentView === "conversor"}
                  onClick={() => setCurrentView("conversor")}
                  id="nav-conversor"
                  theme={theme}
                />
              </NavGroup>
            </div>

            <div className="py-2" id="nav-wrapper-procedimentos">
              <NavItem
                label="Histórico de procedimentos"
                icon={<Box size={18} strokeWidth={2.5} />}
                active={currentView === "procedures"}
                onClick={() => setCurrentView("procedures")}
                id="nav-procedimentos"
                theme={theme}
                variant="header"
              />
            </div>

            <div className="py-2">
              <NavGroup
                label="Ranking de duplos"
                icon={<BarChart3 size={18} strokeWidth={2.5} />}
                id="group-stats"
                defaultOpen={false}
                theme={theme}
              >
                <NavItem
                  label="Geral"
                  active={currentView === "stats-general"}
                  onClick={() => setCurrentView("stats-general")}
                  id="nav-stats-general"
                  theme={theme}
                />
                <NavItem
                  label="Relatórios"
                  active={currentView === "stats-reports"}
                  onClick={() => setCurrentView("stats-reports")}
                  id="nav-stats-reports"
                  theme={theme}
                />
              </NavGroup>
            </div>
          </nav>

          <div className="relative mt-auto">
            <AnimatePresence>
              {isProfileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute bottom-full left-4 right-4 mb-2 p-2 rounded-2xl border shadow-2xl z-50 ${
                    theme === "dark"
                      ? "bg-[#0a0a0a] border-white/5 shadow-black"
                      : "bg-white border-slate-200 shadow-slate-200"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => {
                        setCurrentView("settings");
                        setIsProfileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        currentView === "settings"
                          ? "bg-green-500/10 text-green-500"
                          : theme === "dark"
                            ? "text-slate-400 hover:text-white hover:bg-white/5"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <Settings2 size={16} />
                      Configurações
                    </button>
                    <button
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        theme === "dark"
                          ? "text-slate-400 hover:text-white hover:bg-white/5"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <HelpCircle size={16} />
                      Ajuda e Suporte
                    </button>
                    <div
                      className={`my-1 border-t ${theme === "dark" ? "border-white/5" : "border-slate-100"}`}
                    />
                    <button
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-500 transition-all ${
                        theme === "dark"
                          ? "hover:bg-red-500/10"
                          : "hover:bg-red-50"
                      }`}
                    >
                      <Box size={16} className="rotate-180" />
                      Sair da conta
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className={`p-4 border-t transition-colors duration-500 cursor-pointer ${
                theme === "dark"
                  ? `${isProfileMenuOpen ? "bg-white/[0.02]" : "bg-[#0a0a0a]"} border-white/5`
                  : `${isProfileMenuOpen ? "bg-slate-100" : "bg-slate-50"} border-slate-200`
              }`}
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-700 to-slate-900 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white shadow-inner uppercase">
                    G
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-bold group-hover:text-green-400 transition-colors ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                    >
                      Geovane
                    </span>
                    <span
                      className={`text-[10px] font-medium ${theme === "dark" ? "text-[#71717a]" : "text-slate-500"}`}
                    >
                      Plano Pro
                    </span>
                  </div>
                </div>
                <div
                  className={`flex flex-col gap-0.5 transition-all duration-300 ${isProfileMenuOpen ? "rotate-180 opacity-100 text-green-500" : "opacity-40 group-hover:opacity-100"}`}
                >
                  <ChevronDown size={12} className="-mb-1" />
                  <ChevronDown size={12} className="rotate-180 -mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className={`h-14 border-b flex items-center justify-between px-6 transition-colors duration-500 ${
            theme === "dark"
              ? "bg-[#000000] border-white/5"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              className={`transition-colors cursor-pointer ${theme === "dark" ? "text-[#a1a1aa] hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
              id="panel-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <PanelLeftClose
                size={18}
                className={`transition-transform duration-300 ${!isSidebarOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span
                className={
                  theme === "dark"
                    ? "text-white font-medium"
                    : "text-slate-900 font-medium"
                }
              >
                {currentView === "dashboard"
                  ? "Home"
                  : currentView === "procedures"
                    ? "Histórico de procedimentos"
                    : currentView === "percentages"
                      ? "Melhores porcentagens"
                      : currentView === "double-chances"
                        ? "Melhores chances de duplo"
                        : currentView === "odds-locator"
                          ? "Localizador de Odds"
                          : currentView === "conversor"
                            ? "Conversor de Freebet"
                            : currentView === "stats-general"
                              ? "Geral - Ranking de duplos"
                              : currentView === "stats-reports"
                                ? "Relatórios - Ranking de duplos"
                                : currentView === "settings"
                                  ? "Configurações"
                                  : "Home"}
              </span>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-all duration-300 ${
              theme === "dark"
                ? "bg-[#111111] border-white/10 text-white hover:bg-[#222222]"
                : "bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100"
            }`}
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <Sun size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <Moon size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </header>

        {/* Scrollable Content */}
        <div
          className={`flex-1 overflow-y-auto transition-colors duration-500 ${theme === "dark" ? "bg-[#000000]" : "bg-white"}`}
        >
          <div className="max-w-[1600px] mx-auto p-8 md:p-12">
            {currentView === "dashboard" && (
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2
                    className={`text-2xl font-bold tracking-tight mb-1 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                  >
                    Bem-vindo, Geovane!
                  </h2>
                  <p
                    className={`text-sm ${theme === "dark" ? "text-[#71717a]" : "text-slate-500"}`}
                  >
                    Aqui está o resumo do seu desempenho hoje.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className={`flex items-center gap-2 h-10 px-4 rounded-lg border text-sm font-medium transition-colors ${
                      theme === "dark"
                        ? "bg-[#0a0a0a] border-white/5 hover:bg-[#18181b] text-white"
                        : "bg-white border-slate-200 hover:bg-slate-50 text-slate-900"
                    }`}
                  >
                    <DownloadCloud size={16} className="text-[#a1a1aa]" />
                    <span>Relatório</span>
                  </button>
                  <button
                    onClick={() => setIsNewProcedureModalOpen(true)}
                    className="flex items-center gap-2 h-10 px-4 rounded-lg bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                  >
                    <Plus size={16} />
                    <span>Novo procedimento</span>
                  </button>
                </div>
              </div>
            )}

            {/* Modal for New Procedure */}
            <AnimatePresence>
              {isNewProcedureModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsNewProcedureModalOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className={`relative w-full max-w-3xl p-6 rounded-2xl border shadow-2xl ${
                      theme === "dark"
                        ? "bg-[#0a0a0a] border-white/10"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2
                        className={`text-xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                      >
                        Novo Procedimento
                      </h2>
                      <button
                        onClick={() => setIsNewProcedureModalOpen(false)}
                        className={`p-2 rounded-lg transition-colors ${theme === "dark" ? "hover:bg-white/5 text-[#a1a1aa]" : "hover:bg-slate-100 text-slate-500"}`}
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label
                          className={`block text-xs font-bold uppercase tracking-wider mb-2 ${theme === "dark" ? "text-[#a1a1aa]" : "text-slate-500"}`}
                        >
                          Procedimento:
                        </label>
                        <div className="relative">
                          <select
                            value={procedureType}
                            onChange={(e) => setProcedureType(e.target.value)}
                            className={`w-full h-12 px-4 py-0 rounded-xl border text-sm font-medium appearance-none outline-none transition-colors cursor-pointer ${
                              theme === "dark"
                                ? "bg-[#111111] border-white/10 text-white focus:border-green-500/50 hover:bg-[#18181b]"
                                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-green-500 hover:bg-slate-100"
                            }`}
                          >
                            <option value="" disabled>
                              Selecionar
                            </option>
                            {PROCEDURE_TYPES.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                          <div
                            className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${theme === "dark" ? "text-[#a1a1aa]" : "text-slate-400"}`}
                          >
                            <ChevronDown size={16} />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          className={`block text-xs font-bold uppercase tracking-wider mb-2 ${theme === "dark" ? "text-[#a1a1aa]" : "text-slate-500"}`}
                        >
                          Selecione um jogo:
                        </label>
                        <div className="flex flex-col gap-3">
                          <div className="relative">
                            <select
                              value={championship}
                              onChange={(e) => {
                                setChampionship(e.target.value);
                                setGame("");
                              }}
                              className={`w-full h-12 px-4 py-0 rounded-xl border text-sm font-medium appearance-none outline-none transition-colors cursor-pointer ${
                                theme === "dark"
                                  ? "bg-[#111111] border-white/10 text-white focus:border-green-500/50 hover:bg-[#18181b]"
                                  : "bg-slate-50 border-slate-200 text-slate-900 focus:border-green-500 hover:bg-slate-100"
                              }`}
                            >
                              <option value="" disabled>
                                Selecionar campeonato
                              </option>
                              {CHAMPIONSHIPS.map((champ) => (
                                <option key={champ.id} value={champ.id}>
                                  {champ.name}
                                </option>
                              ))}
                            </select>
                            <div
                              className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${theme === "dark" ? "text-[#a1a1aa]" : "text-slate-400"}`}
                            >
                              <ChevronDown size={16} />
                            </div>
                          </div>

                          <AnimatePresence mode="popLayout">
                            {championship && (
                              <motion.div
                                initial={{
                                  opacity: 0,
                                  height: 0,
                                  marginTop: 0,
                                }}
                                animate={{
                                  opacity: 1,
                                  height: "auto",
                                  marginTop: 12,
                                }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className="relative overflow-hidden"
                              >
                                <select
                                  value={game}
                                  onChange={(e) => setGame(e.target.value)}
                                  className={`w-full h-12 px-4 py-0 rounded-xl border text-sm font-medium appearance-none outline-none transition-colors cursor-pointer ${
                                    theme === "dark"
                                      ? "bg-[#111111] border-white/10 text-white focus:border-green-500/50 hover:bg-[#18181b]"
                                      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-green-500 hover:bg-slate-100"
                                  }`}
                                >
                                  <option value="" disabled>
                                    Selecionar jogo
                                  </option>
                                  {GAMES[championship]?.map((g) => (
                                    <option key={g} value={g}>
                                      {g}
                                    </option>
                                  ))}
                                </select>
                                <div
                                  className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${theme === "dark" ? "text-[#a1a1aa]" : "text-slate-400"}`}
                                >
                                  <ChevronDown size={16} />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="relative z-20 w-full">
                        <label
                          className={`block text-xs font-bold uppercase tracking-wider mb-2 ${theme === "dark" ? "text-[#a1a1aa]" : "text-slate-500"}`}
                        >
                          Quais casas foram utilizadas?
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          {[0, 1, 2].map((index) => (
                            <div key={index} className="relative">
                              <label
                                className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${theme === "dark" ? "text-[#a1a1aa]" : "text-slate-500"}`}
                              >
                                Casa {index + 1}
                              </label>
                              <input
                                type="text"
                                value={
                                  selectedBookmakers[index] ||
                                  bookmakerInputs[index]
                                }
                                onChange={(e) => {
                                  const newInputs = [...bookmakerInputs];
                                  newInputs[index] = e.target.value;
                                  setBookmakerInputs(newInputs);

                                  const newSelected = [...selectedBookmakers];
                                  newSelected[index] = "";
                                  setSelectedBookmakers(newSelected);

                                  setActiveBookmakerIndex(index);
                                }}
                                onFocus={() => setActiveBookmakerIndex(index)}
                                onBlur={() =>
                                  setTimeout(() => {
                                    if (activeBookmakerIndex === index)
                                      setActiveBookmakerIndex(null);
                                  }, 200)
                                }
                                placeholder="Digite a casa..."
                                className={`w-full h-12 px-4 py-0 rounded-xl border text-sm font-medium transition-colors outline-none ${
                                  theme === "dark"
                                    ? "bg-[#111111] border-white/10 text-white focus:border-green-500/50 hover:bg-[#18181b]"
                                    : "bg-slate-50 border-slate-200 text-slate-900 focus:border-green-500 hover:bg-slate-100"
                                }`}
                              />
                              <AnimatePresence>
                                {activeBookmakerIndex === index &&
                                  !selectedBookmakers[index] &&
                                  filteredBookmakers.length > 0 && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 5 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: 5 }}
                                      className={`absolute left-0 right-0 top-full mt-2 rounded-xl border shadow-xl max-h-48 overflow-y-auto z-50 ${
                                        theme === "dark"
                                          ? "bg-[#111111] border-white/10"
                                          : "bg-white border-slate-200"
                                      }`}
                                    >
                                      {filteredBookmakers.map((b) => (
                                        <div
                                          key={b}
                                          onClick={() => {
                                            const newSelected = [
                                              ...selectedBookmakers,
                                            ];
                                            newSelected[index] = b;
                                            setSelectedBookmakers(newSelected);

                                            const newInputs = [
                                              ...bookmakerInputs,
                                            ];
                                            newInputs[index] = b;
                                            setBookmakerInputs(newInputs);

                                            setActiveBookmakerIndex(null);
                                          }}
                                          className={`px-4 py-3 text-sm cursor-pointer transition-colors border-b last:border-0 ${
                                            theme === "dark"
                                              ? "text-[#a1a1aa] border-white/5 hover:bg-[#18181b] hover:text-white"
                                              : "text-slate-600 border-slate-100 hover:bg-slate-50 hover:text-slate-900"
                                          }`}
                                        >
                                          {b}
                                        </div>
                                      ))}
                                    </motion.div>
                                  )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </div>

                      <AnimatePresence>
                        {selectedBookmakers.some(
                          (b) => b.toLowerCase() === "bet365",
                        ) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{
                              opacity: 1,
                              height: "auto",
                              marginTop: 12,
                            }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="space-y-3"
                          >
                            <label
                              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                                isWeeklyComplement
                                  ? theme === "dark"
                                    ? "bg-green-500/10 border-green-500/30"
                                    : "bg-green-50 border-green-200"
                                  : theme === "dark"
                                    ? "bg-[#111111] border-white/5 hover:border-white/10"
                                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${
                                  isWeeklyComplement
                                    ? "bg-green-500 border-green-500"
                                    : theme === "dark"
                                      ? "border-white/20 bg-transparent"
                                      : "border-slate-300 bg-white"
                                }`}
                              >
                                {isWeeklyComplement && (
                                  <Check
                                    size={14}
                                    strokeWidth={3}
                                    className="text-white"
                                  />
                                )}
                              </div>
                              <input
                                type="checkbox"
                                checked={isWeeklyComplement}
                                onChange={(e) =>
                                  setIsWeeklyComplement(e.target.checked)
                                }
                                className="hidden"
                              />
                              <span
                                className={`text-sm font-medium flex items-center gap-1.5 ${
                                  theme === "dark"
                                    ? isWeeklyComplement
                                      ? "text-white"
                                      : "text-[#a1a1aa]"
                                    : isWeeklyComplement
                                      ? "text-green-800"
                                      : "text-slate-600"
                                }`}
                              >
                                Complementar ao semanal 365?
                                <div
                                  className="relative group flex items-center justify-center cursor-help"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  title="Opção para jogadores que completam o semanal da BET365"
                                >
                                  <HelpCircle
                                    size={18}
                                    className={`${theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-500 hover:text-blue-600"}`}
                                  />

                                  {/* Tooltip */}
                                  <div
                                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[220px] p-2.5 rounded-xl text-xs font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[60] text-center shadow-xl ${
                                      theme === "dark"
                                        ? "bg-[#222] text-white border border-white/10"
                                        : "bg-slate-800 text-white"
                                    }`}
                                  >
                                    Opção para jogadores que completam o semanal
                                    da BET365
                                    <div
                                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
                                        theme === "dark"
                                          ? "bg-[#222] border-r border-b border-white/10"
                                          : "bg-slate-800"
                                      }`}
                                    />
                                  </div>
                                </div>
                              </span>
                            </label>

                            <AnimatePresence>
                              {isWeeklyComplement && (
                                <motion.div
                                  initial={{
                                    opacity: 0,
                                    height: 0,
                                    marginTop: 0,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    height: "auto",
                                    marginTop: 12,
                                  }}
                                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                >
                                  <label
                                    className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${theme === "dark" ? "text-[#a1a1aa]" : "text-slate-500"}`}
                                  >
                                    VALOR APOSTADO NA BET365 (ODDS MAIOR OU
                                    IGUAL A 2)
                                  </label>
                                  <div className="relative">
                                    <span
                                      className={`absolute left-4 top-1/2 -translate-y-1/2 font-medium ${theme === "dark" ? "text-[#a1a1aa]" : "text-slate-400"}`}
                                    >
                                      R$
                                    </span>
                                    <input
                                      type="number"
                                      placeholder="0.00"
                                      value={bet365Amount}
                                      onChange={(e) =>
                                        setBet365Amount(e.target.value)
                                      }
                                      className={`w-full h-12 pl-10 pr-4 py-0 rounded-xl border text-sm font-medium transition-colors outline-none ${
                                        theme === "dark"
                                          ? "bg-[#111111] border-white/10 text-white focus:border-green-500/50 hover:bg-[#18181b]"
                                          : "bg-slate-50 border-slate-200 text-slate-900 focus:border-green-500 hover:bg-slate-100"
                                      }`}
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="relative w-full mt-4 space-y-4">
                        <AnimatePresence>
                          {procedureType === "Extração de Freebet" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="flex-1">
                                <label
                                  className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${theme === "dark" ? "text-[#a1a1aa]" : "text-slate-500"}`}
                                >
                                  Qual o valor da freebet utilizada?
                                </label>
                                <div className="relative">
                                  <span
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 font-medium ${theme === "dark" ? "text-[#a1a1aa]" : "text-slate-400"}`}
                                  >
                                    R$
                                  </span>
                                  <input
                                    type="number"
                                    placeholder="0.00"
                                    value={freebetUsedAmount}
                                    onChange={(e) =>
                                      setFreebetUsedAmount(e.target.value)
                                    }
                                    className={`w-full h-12 pl-10 pr-4 py-0 rounded-xl border text-sm font-medium transition-colors outline-none ${
                                      theme === "dark"
                                        ? "bg-[#111111] border-white/10 text-white focus:border-green-500/50 hover:bg-[#18181b]"
                                        : "bg-slate-50 border-slate-200 text-slate-900 focus:border-green-500 hover:bg-slate-100"
                                    }`}
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label
                              className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${theme === "dark" ? "text-[#a1a1aa]" : "text-slate-500"}`}
                            >
                              Qual o valor total investido? (O RETORNO DA
                              OPERAÇÃO)
                            </label>
                            <div className="relative">
                              <span
                                className={`absolute left-4 top-1/2 -translate-y-1/2 font-medium ${theme === "dark" ? "text-[#a1a1aa]" : "text-slate-400"}`}
                              >
                                R$
                              </span>
                              <input
                                type="number"
                                placeholder="0.00"
                                value={totalInvestedAmount}
                                onChange={(e) =>
                                  setTotalInvestedAmount(e.target.value)
                                }
                                className={`w-full h-12 pl-10 pr-4 py-0 rounded-xl border text-sm font-medium transition-colors outline-none ${
                                  theme === "dark"
                                    ? "bg-[#111111] border-white/10 text-white focus:border-green-500/50 hover:bg-[#18181b]"
                                    : "bg-slate-50 border-slate-200 text-slate-900 focus:border-green-500 hover:bg-slate-100"
                                }`}
                              />
                            </div>
                          </div>

                          <div className="w-[180px]">
                            <label
                              className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${theme === "dark" ? "text-[#a1a1aa]" : "text-slate-500"}`}
                            >
                              Resultado
                            </label>
                            <div
                              className={`p-1 rounded-xl flex gap-1 h-12 border ${theme === "dark" ? "bg-[#111111] border-white/10" : "bg-slate-50 border-slate-200"}`}
                            >
                              <button
                                onClick={() => setOutcome("lucro")}
                                className={`flex-1 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-colors ${
                                  outcome === "lucro"
                                    ? "bg-green-500 text-white"
                                    : theme === "dark"
                                      ? "text-slate-400 hover:text-green-500 hover:bg-green-500/10"
                                      : "text-slate-500 hover:text-green-600 hover:bg-green-50"
                                }`}
                              >
                                Lucro
                              </button>
                              <button
                                onClick={() => setOutcome("perca")}
                                className={`flex-1 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-colors ${
                                  outcome === "perca"
                                    ? "bg-red-500 text-white"
                                    : theme === "dark"
                                      ? "text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                                      : "text-slate-500 hover:text-red-600 hover:bg-red-50"
                                }`}
                              >
                                Perca
                              </button>
                            </div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {procedureType === "Freebet" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{
                                opacity: 1,
                                height: "auto",
                                marginTop: 16,
                              }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              className="flex gap-4 overflow-hidden"
                            >
                              <div className="flex-1">
                                <label
                                  className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${theme === "dark" ? "text-[#a1a1aa]" : "text-slate-500"}`}
                                >
                                  Freebet Recebida (Opcional)
                                </label>
                                <div className="relative">
                                  <span
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 font-medium ${theme === "dark" ? "text-[#a1a1aa]" : "text-slate-400"}`}
                                  >
                                    R$
                                  </span>
                                  <input
                                    type="number"
                                    placeholder="0.00"
                                    value={freebetReceived}
                                    onChange={(e) =>
                                      setFreebetReceived(e.target.value)
                                    }
                                    className={`w-full h-12 pl-10 pr-4 py-0 rounded-xl border text-sm font-medium transition-colors outline-none ${
                                      theme === "dark"
                                        ? "bg-[#111111] border-white/10 text-white focus:border-green-500/50 hover:bg-[#18181b]"
                                        : "bg-slate-50 border-slate-200 text-slate-900 focus:border-green-500 hover:bg-slate-100"
                                    }`}
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <AnimatePresence>
                          {outcome && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{
                                opacity: 1,
                                height: "auto",
                                marginTop: 16,
                              }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              className="overflow-hidden"
                            >
                              <label
                                className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${
                                  outcome === "lucro"
                                    ? theme === "dark"
                                      ? "text-green-400"
                                      : "text-green-600"
                                    : theme === "dark"
                                      ? "text-red-400"
                                      : "text-red-600"
                                }`}
                              >
                                Valor de{" "}
                                {outcome === "lucro" ? "lucro" : "perca"}
                              </label>
                              <div className="relative">
                                <span
                                  className={`absolute left-4 top-1/2 -translate-y-1/2 font-medium ${
                                    outcome === "lucro"
                                      ? theme === "dark"
                                        ? "text-green-400/50"
                                        : "text-green-600/50"
                                      : theme === "dark"
                                        ? "text-red-400/50"
                                        : "text-red-600/50"
                                  }`}
                                >
                                  R$
                                </span>
                                <input
                                  type="number"
                                  placeholder="0.00"
                                  value={outcomeAmount}
                                  onChange={(e) =>
                                    setOutcomeAmount(e.target.value)
                                  }
                                  className={`w-full h-12 pl-10 pr-4 py-0 rounded-xl border text-sm font-medium transition-colors outline-none ${
                                    outcome === "lucro"
                                      ? theme === "dark"
                                        ? "bg-[#111111] border-green-500/30 text-green-400 focus:border-green-500 hover:bg-[#18181b]"
                                        : "bg-green-50 border-green-200 text-green-700 focus:border-green-500 hover:bg-green-100/50"
                                      : theme === "dark"
                                        ? "bg-[#111111] border-red-500/30 text-red-400 focus:border-red-500 hover:bg-[#18181b]"
                                        : "bg-red-50 border-red-200 text-red-700 focus:border-red-500 hover:bg-red-100/50"
                                  }`}
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="flex gap-4 justify-end mt-8 pt-4">
                        <button
                          onClick={() => setIsNewProcedureModalOpen(false)}
                          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                            theme === "dark"
                              ? "bg-[#111] hover:bg-[#222] text-white"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                          }`}
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => {
                            if (!procedureType || !championship || !game) {
                              alert(
                                "Preencha ao menos o procedimento, campeonato e jogo.",
                              );
                              return;
                            }
                            setProcedures((prev) => [
                              ...prev,
                              {
                                id: Math.random().toString(36).substr(2, 9),
                                type: procedureType,
                                championship,
                                game,
                                bookies: selectedBookmakers.filter(Boolean),
                                isWeeklyComplement,
                                bet365Amount,
                                totalInvestedAmount,
                                freebetReceived,
                                freebetUsedAmount,
                                outcome,
                                outcomeAmount,
                                createdAt: new Date().toISOString(),
                              },
                            ]);
                            // Reset formulário
                            setProcedureType("");
                            setChampionship("");
                            setGame("");
                            setBookmakerInputs(["", "", ""]);
                            setSelectedBookmakers(["", "", ""]);
                            setIsWeeklyComplement(false);
                            setBet365Amount("");
                            setTotalInvestedAmount("");
                            setFreebetReceived("");
                            setFreebetUsedAmount("");
                            setOutcome(null);
                            setOutcomeAmount("");
                            setIsNewProcedureModalOpen(false);
                          }}
                          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-bold transition-colors"
                        >
                          Salvar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {currentView === "dashboard" ? (
              <>
                {/* Transactions Chart (Moved to top) */}
                <div
                  className={`p-8 rounded-2xl border transition-colors duration-500 mb-8 relative group/section ${
                    theme === "dark"
                      ? "bg-[#050505] border-white/5"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  {/* Help Icon */}
                  <div className="absolute top-6 right-6 z-10">
                    <div
                      className="relative"
                      onMouseEnter={() => setShowHint(true)}
                      onMouseLeave={() => setShowHint(false)}
                      onClick={() => setShowHint(!showHint)}
                    >
                      <HelpCircle
                        size={18}
                        className={`cursor-help transition-colors ${theme === "dark" ? "text-[#a1a1aa] hover:text-green-500" : "text-slate-500 hover:text-green-600"}`}
                      />

                      <AnimatePresence>
                        {showHint && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 5 }}
                            className={`absolute right-0 top-full mt-2 w-64 p-3 rounded-xl border shadow-2xl text-[11px] leading-relaxed z-50 ${
                              theme === "dark"
                                ? "bg-[#0a0a0a] border-white/10 text-[#a1a1aa]"
                                : "bg-white border-slate-200 text-slate-600"
                            }`}
                          >
                            <div className="font-bold text-green-500 mb-1 uppercase tracking-wider">
                              Dica:
                            </div>
                            Clique nas partidas para ver o valor que você
                            investiu no jogo selecionado.
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-12">
                    <div>
                      <h3
                        className={`text-sm font-bold uppercase tracking-wider mb-1 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                      >
                        Procedimentos Pendentes
                      </h3>
                      <p
                        className={`text-xs ${theme === "dark" ? "text-[#71717a]" : "text-slate-500"}`}
                      >
                        Distribuição de operações por categoria
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={currentPieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                            onMouseEnter={(_, index) => setActiveIndex(index)}
                            onClick={(_, index) => setActiveIndex(index)}
                            stroke="none"
                          >
                            {currentPieData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                style={{
                                  filter:
                                    safeActiveIndex === index
                                      ? `drop-shadow(0 0 8px ${entry.color}40)`
                                      : "none",
                                  opacity: safeActiveIndex === index ? 1 : 0.8,
                                  cursor: "pointer",
                                }}
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex flex-col gap-6">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={safeActiveIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center gap-3 mb-1">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor:
                                  currentPieData[safeActiveIndex].color,
                              }}
                            />
                            <h4
                              className={`text-2xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                            >
                              {currentPieData[safeActiveIndex].name}
                            </h4>
                          </div>

                          <div className="mb-6">
                            <div
                              className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${theme === "dark" ? "text-[#52525b]" : "text-slate-400"}`}
                            >
                              Jogos Selecionados
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {currentPieData[safeActiveIndex].games?.length ===
                                0 && (
                                <span
                                  className={`text-[11px] font-medium ${theme === "dark" ? "text-[#71717a]" : "text-slate-500"}`}
                                >
                                  Nenhum jogo selecionado
                                </span>
                              )}
                              {currentPieData[safeActiveIndex].games?.map(
                                (game: any, i: number) => (
                                  <button
                                    key={i}
                                    onClick={() =>
                                      setSelectedGameIndex(
                                        selectedGameIndex === i ? null : i,
                                      )
                                    }
                                    className={`px-3 py-1.5 rounded-md text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-2 group ${
                                      selectedGameIndex === i
                                        ? theme === "dark"
                                          ? "bg-green-500/20 border-green-500/40 text-green-400"
                                          : "bg-green-50 border-green-200 text-green-700"
                                        : theme === "dark"
                                          ? "bg-[#111111] border-white/5 text-[#a1a1aa] hover:border-white/10"
                                          : "bg-white border-slate-100 text-slate-600 shadow-sm hover:border-slate-200"
                                    }`}
                                  >
                                    <span>{game.name}</span>
                                    <AnimatePresence>
                                      {selectedGameIndex === i && (
                                        <motion.span
                                          initial={{ width: 0, opacity: 0 }}
                                          animate={{
                                            width: "auto",
                                            opacity: 1,
                                          }}
                                          exit={{ width: 0, opacity: 0 }}
                                          className="overflow-hidden whitespace-nowrap text-[10px] bg-black/20 px-1.5 py-0.5 rounded"
                                        >
                                          {game.invested}
                                        </motion.span>
                                      )}
                                    </AnimatePresence>
                                  </button>
                                ),
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-8">
                            <div
                              className={`p-4 rounded-xl border ${theme === "dark" ? "bg-[#0a0a0a] border-white/5" : "bg-white border-slate-100 shadow-sm"}`}
                            >
                              <span
                                className={`text-[10px] font-bold uppercase tracking-widest block mb-1 ${theme === "dark" ? "text-[#52525b]" : "text-slate-400"}`}
                              >
                                Total Investido
                              </span>
                              <span
                                className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                              >
                                {currentPieData[safeActiveIndex].invested}
                              </span>
                            </div>
                            <div
                              className={`p-4 rounded-xl border ${theme === "dark" ? "bg-[#0a0a0a] border-white/5" : "bg-white border-slate-100 shadow-sm"}`}
                            >
                              <span
                                className={`text-[10px] font-bold uppercase tracking-widest block mb-1 ${theme === "dark" ? "text-[#52525b]" : "text-slate-400"}`}
                              >
                                Resultado (P/L)
                              </span>
                              <span
                                className={`text-lg font-bold ${currentPieData[safeActiveIndex].profitSum >= 0 ? "text-green-500" : "text-red-500"}`}
                              >
                                {currentPieData[safeActiveIndex].profitSum >= 0
                                  ? "+"
                                  : "-"}
                                R${" "}
                                {Math.abs(
                                  currentPieData[safeActiveIndex].profitSum,
                                )
                                  .toFixed(2)
                                  .replace(".", ",")}
                              </span>
                            </div>
                          </div>

                          <button className="w-full h-12 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20 active:scale-[0.98]">
                            Executar {currentPieData[safeActiveIndex].name}
                          </button>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Summary Cards (Moved below) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <StatCard
                    label="Total investido hoje"
                    value={`R$ ${totalInvestedGlobal.toFixed(2).replace(".", ",")}`}
                    trend={
                      globalProfit >= 0
                        ? `+R$ ${globalProfit.toFixed(2).replace(".", ",")}`
                        : `-R$ ${Math.abs(globalProfit).toFixed(2).replace(".", ",")}`
                    }
                    icon={<Wallet size={20} />}
                    color="green"
                    theme={theme}
                  />
                  <StatCard
                    label="Freebets Ativas"
                    value={`R$ ${totalFreebetGlobal.toFixed(2).replace(".", ",")}`}
                    trend={`${activeFreebetsCount} Ativa${activeFreebetsCount !== 1 ? "s" : ""}`}
                    icon={<Clover size={20} />}
                    color="blue"
                    theme={theme}
                  />
                </div>

                {/* Main Grid (Remaining items) */}
                <div className="grid grid-cols-1">
                  {/* Recent Activity moved here, or somewhere else? I'll keep it in a container */}

                  {/* Recent Activity */}
                  <div
                    className={`p-6 rounded-2xl border transition-colors duration-500 ${
                      theme === "dark"
                        ? "bg-[#050505] border-white/5"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                      <h3
                        className={`text-sm font-bold uppercase tracking-wider ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                      >
                        Atividade Recente
                      </h3>
                      <div
                        className={`flex items-center p-1 rounded-xl border ${theme === "dark" ? "bg-[#111111] border-white/10" : "bg-slate-50 border-slate-200"}`}
                      >
                        {["Hoje", "Ontem", "Esta semana"].map((f) => (
                          <button
                            key={f}
                            onClick={() => setDashboardActivityFilter(f as any)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors ${
                              dashboardActivityFilter === f
                                ? "bg-green-500 text-white shadow-md"
                                : theme === "dark"
                                  ? "text-slate-400 hover:text-white hover:bg-white/5"
                                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-5">
                      {dashboardProcs.length === 0 ? (
                        <span
                          className={`text-[11px] font-medium block text-center py-4 ${theme === "dark" ? "text-[#71717a]" : "text-slate-500"}`}
                        >
                          Nenhuma atividade recente para este período
                        </span>
                      ) : (
                        [...dashboardProcs]
                          .reverse()
                          .map((p) => (
                            <ActivityItem
                              key={p.id}
                              name={p.game || "Novo Jogo"}
                              type={p.type}
                              amount={`R$ ${(parseFloat(p.totalInvestedAmount) || 0).toFixed(2).replace(".", ",")}`}
                              time={
                                p.outcome === "lucro"
                                  ? `Lucro (+R$ ${(parseFloat(p.outcomeAmount) || 0).toFixed(2)})`
                                  : p.outcome === "perca"
                                    ? `Perca (-R$ ${(parseFloat(p.outcomeAmount) || 0).toFixed(2)})`
                                    : "Aguardando"
                              }
                              status={
                                p.outcome === "lucro"
                                  ? "success"
                                  : p.outcome === "perca"
                                    ? "pending"
                                    : "info"
                              }
                              theme={theme}
                              bookies={p.bookies}
                            />
                          ))
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : currentView === "procedures" ? (
              <ProceduresView
                procedures={procedures}
                theme={theme}
                onNewProcedure={() => setIsNewProcedureModalOpen(true)}
              />
            ) : currentView === "percentages" ? (
              <PercentagesView theme={theme} />
            ) : currentView === "double-chances" ? (
              <DoubleChancesView theme={theme} />
            ) : currentView === "odds-locator" ? (
              <OddsLocatorView theme={theme} initialGameId={urlGameId} />
            ) : currentView === "stats-general" ? (
              <StatsGeneralView theme={theme} procedures={procedures} />
            ) : currentView !== "dashboard" ? (
              <SectionView
                title={
                  currentView === "conversor"
                    ? "Conversor de Freebet"
                    : currentView === "stats-general"
                      ? "Estatísticas Gerais"
                      : currentView === "stats-reports"
                        ? "Relatórios de Desempenho"
                        : currentView === "settings"
                          ? "Configurações do Sistema"
                          : "Página"
                }
                theme={theme}
              />
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}

function GameDetailView({
  selectedGame,
  theme,
  isStandalone = false,
  onBack,
}: any) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isStandalone ? 0 : 20,
        y: isStandalone ? 20 : 0,
      }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      className="w-full"
    >
      {!isStandalone && (
        <button
          onClick={onBack}
          className={`flex items-center gap-2 mb-8 text-sm font-bold transition-colors ${theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
        >
          <Plus size={16} className="rotate-45" />
          Voltar para a lista
        </button>
      )}

      {isStandalone && (
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white">
              <BadgePercent size={20} />
            </div>
            <h1
              className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
            >
              Detalles da Oportunidade
            </h1>
          </div>
          <button
            onClick={() => window.close()}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${theme === "dark" ? "bg-white/5 text-slate-400 hover:text-white" : "bg-slate-100 text-slate-500 hover:text-slate-900"}`}
          >
            Fechar Aba
          </button>
        </div>
      )}

      <div
        className={`p-8 rounded-3xl border ${theme === "dark" ? "bg-[#050505] border-white/5" : "bg-white border-slate-200"} ${isStandalone ? "shadow-2xl" : ""}`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex flex-col gap-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-green-500/10 text-green-500 w-fit`}
            >
              {selectedGame.category}
            </span>
            <h2
              className={`text-3xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}
            >
              {selectedGame.homeTeam} X {selectedGame.awayTeam}
            </h2>
            <div className="flex items-center gap-4">
              <span
                className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
              >
                {selectedGame.league}
              </span>
              <span
                className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
              >
                •
              </span>
              <span
                className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
              >
                {selectedGame.time}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span
              className={`text-[10px] font-bold uppercase tracking-widest block mb-1 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
            >
              Lucro Estimado
            </span>
            <span className={`text-4xl font-bold text-green-500`}>
              {selectedGame.profit}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedGame.bookies.map((bookie: any, idx: number) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-[#0a0a0a] border-white/5" : "bg-slate-50 border-slate-200"}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                >
                  {bookie.name}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded bg-blue-500/10 text-blue-500`}
                >
                  {bookie.market}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                >
                  {bookie.odd}
                </span>
                <span
                  className={`text-xs font-medium ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
                >
                  ODD
                </span>
              </div>
              <button className="w-full mt-6 h-10 rounded-lg bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition-colors">
                Ir para {bookie.name}
              </button>
            </div>
          ))}
        </div>

        <div
          className={`mt-8 p-6 rounded-2xl border border-dashed ${theme === "dark" ? "border-white/10 bg-white/[0.01]" : "border-slate-200 bg-slate-50"}`}
        >
          <h4
            className={`text-sm font-bold mb-4 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
          >
            Calculadora Sugerida
          </h4>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <span
                className={`text-[10px] font-bold uppercase tracking-widest block mb-2 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
              >
                Investimento Total
              </span>
              <input
                type="text"
                defaultValue="R$ 100,00"
                className={`w-full h-10 px-4 rounded-lg border text-sm outline-none ${theme === "dark" ? "bg-black border-white/10 text-white" : "bg-white border-slate-200"}`}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center pt-5">
              <button className="h-10 rounded-lg bg-white text-black text-xs font-bold hover:bg-slate-100 transition-colors">
                Calcular Stakes
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function OddsDetailContent({
  theme,
  selectedGame,
}: {
  theme: string;
  selectedGame: any;
}) {
  const tableData = [
    {
      bookie: "Bet365",
      o1: "2.15",
      oX: "3.40",
      o2: "3.10",
      o1X: "1.33",
      o12: "1.28",
      oX2: "1.60",
    },
    {
      bookie: "Betano",
      o1: "2.10",
      oX: "3.35",
      o2: "3.15",
      o1X: "1.30",
      o12: "1.25",
      oX2: "1.58",
    },
    {
      bookie: "Novibet",
      o1: "2.18",
      oX: "3.45",
      o2: "3.05",
      o1X: "1.35",
      o12: "1.30",
      oX2: "1.62",
    },
    {
      bookie: "KTO",
      o1: "2.12",
      oX: "3.30",
      o2: "3.20",
      o1X: "1.32",
      o12: "1.27",
      oX2: "1.55",
    },
    {
      bookie: "Betfair",
      o1: "2.20",
      oX: "3.50",
      o2: "3.00",
      o1X: "1.38",
      o12: "1.32",
      oX2: "1.65",
    },
    {
      bookie: "Superbet",
      o1: "2.14",
      oX: "3.42",
      o2: "3.12",
      o1X: "1.31",
      o12: "1.29",
      oX2: "1.59",
    },
    {
      bookie: "EstrelaBet",
      o1: "2.11",
      oX: "3.38",
      o2: "3.18",
      o1X: "1.29",
      o12: "1.26",
      oX2: "1.57",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-10">
        {/* Calculadora ML */}
        <div
          className={`px-12 py-8 rounded-2xl border ${theme === "dark" ? "bg-[#0a0a0a] border-white/5 shadow-2xl shadow-black/40" : "bg-white border-slate-100 shadow-xl"}`}
        >
          <div className="flex items-center justify-between mb-8">
            <h3
              className={`text-sm font-bold uppercase tracking-widest ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
            >
              Calculadora ML
            </h3>
            <div className="flex items-center gap-3">
              <span
                className={`text-[11px] uppercase font-bold ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
              >
                Total R$
              </span>
              <input
                type="text"
                defaultValue="1000"
                className={`w-28 h-10 px-3 rounded-lg bg-transparent border text-sm font-bold focus:outline-none focus:border-blue-500/50 ${theme === "dark" ? "border-white/10 text-white" : "border-slate-200 text-slate-900"}`}
              />
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr
                  className={`text-[10px] uppercase tracking-widest font-black ${theme === "dark" ? "text-slate-600" : "text-slate-400 border-b border-slate-100"}`}
                >
                  <th className="pb-4">Resultado</th>
                  <th className="pb-4">Odd</th>
                  <th className="pb-4">Com%</th>
                  <th className="pb-4">Aposta</th>
                  <th className="pb-4">Fix</th>
                  <th className="pb-4">Freebet</th>
                  <th className="pb-4 text-right">Retorno</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  {
                    label: selectedGame.home,
                    odd: "2.15",
                    bet: "474.31",
                    return: "1019.77",
                  },
                  {
                    label: "Empate",
                    odd: "3.40",
                    bet: "299.93",
                    return: "1019.76",
                  },
                  {
                    label: selectedGame.away,
                    odd: "3.10",
                    bet: "225.76",
                    return: "1019.85",
                  },
                ].map((row, i) => (
                  <tr key={i} className="group">
                    <td
                      className={`py-4 text-xs font-bold ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                    >
                      {row.label}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-black text-blue-500">
                          {row.odd}
                        </span>
                        <button className="text-slate-600 hover:text-white">
                          <ArrowUpDown size={10} />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 font-mono text-[10px] text-slate-500">
                      0%
                    </td>
                    <td className="py-4">
                      <div
                        className={`px-2 py-1 rounded bg-white/5 text-[10px] font-bold ${theme === "dark" ? "text-white" : "text-slate-900 border border-slate-100"}`}
                      >
                        {row.bet}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="w-3 h-3 rounded-full border border-white/10"></div>
                    </td>
                    <td className="py-4">
                      <div className="w-3 h-3 rounded-full border border-white/10"></div>
                    </td>
                    <td className="py-4 text-right">
                      <span className="text-xs font-black text-green-500">
                        {row.return}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className={`mt-8 pt-8 border-t ${theme === "dark" ? "border-white/5" : "border-slate-100"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-[10px] uppercase font-black tracking-widest ${theme === "dark" ? "text-slate-600" : "text-slate-400"}`}
              >
                Lucro Garantido
              </span>
              <span className="text-lg font-black text-green-500">
                R$ 19,77 (1.98%)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`flex-1 h-10 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${theme === "dark" ? "bg-white/5 text-white hover:bg-white/10" : "bg-slate-100 text-slate-900 hover:bg-slate-200"}`}
              >
                Limpar
              </button>
              <button className="flex-1 h-10 rounded-lg bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                Salvar Simulação
              </button>
            </div>
          </div>
        </div>

        {/* Calculadora DC */}
        <div
          className={`px-12 py-8 rounded-2xl border ${theme === "dark" ? "bg-[#0a0a0a] border-white/5 shadow-2xl shadow-black/40" : "bg-white border-slate-100 shadow-xl"}`}
        >
          <div className="flex items-center justify-between mb-8">
            <h3
              className={`text-sm font-bold uppercase tracking-widest ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
            >
              Calculadora DC (Dupla Chance)
            </h3>
            <div className="flex items-center gap-3">
              <span
                className={`text-[11px] uppercase font-bold ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
              >
                Total R$
              </span>
              <input
                type="text"
                defaultValue="500"
                className={`w-28 h-10 px-3 rounded-lg bg-transparent border text-sm font-bold focus:outline-none focus:border-blue-500/50 ${theme === "dark" ? "border-white/10 text-white" : "border-slate-200 text-slate-900"}`}
              />
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr
                  className={`text-[10px] uppercase tracking-widest font-black ${theme === "dark" ? "text-slate-600" : "text-slate-400 border-b border-slate-100"}`}
                >
                  <th className="pb-4">Resultado</th>
                  <th className="pb-4">Odd</th>
                  <th className="pb-4">Com%</th>
                  <th className="pb-4">Aposta</th>
                  <th className="pb-4 text-right">Retorno</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  {
                    label: "1X (Casa ou Empate)",
                    odd: "1.33",
                    bet: "375.94",
                    return: "500.00",
                  },
                  {
                    label: "2 (Fora)",
                    odd: "3.10",
                    bet: "124.06",
                    return: "384.58",
                  },
                ].map((row, i) => (
                  <tr key={i} className="group">
                    <td
                      className={`py-4 text-xs font-bold ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                    >
                      {row.label}
                    </td>
                    <td className="py-4 text-xs font-black text-blue-500">
                      {row.odd}
                    </td>
                    <td className="py-4 font-mono text-[10px] text-slate-500">
                      0%
                    </td>
                    <td className="py-4">
                      <div
                        className={`px-2 py-1 rounded bg-white/5 text-[10px] font-bold ${theme === "dark" ? "text-white" : "text-slate-900 border border-slate-100"}`}
                      >
                        {row.bet}
                      </div>
                    </td>
                    <td className="py-4 text-right font-black text-slate-500">
                      {row.return}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className={`mt-8 pt-8 border-t ${theme === "dark" ? "border-white/5" : "border-slate-100"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-[10px] uppercase font-black tracking-widest ${theme === "dark" ? "text-slate-600" : "text-slate-400"}`}
              >
                Status
              </span>
              <span className="text-[10px] font-black text-red-500 uppercase tracking-tighter bg-red-500/10 px-2 py-0.5 rounded italic">
                Perda Potencial
              </span>
            </div>
            <div className="flex items-center gap-2 mt-auto">
              <button
                className={`flex-1 h-10 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${theme === "dark" ? "bg-white/5 text-white hover:bg-white/10" : "bg-slate-100 text-slate-900 hover:bg-slate-200"}`}
              >
                Redefinir
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pagamento Antecipado Section */}
      <div
        className={`p-8 rounded-2xl border ${theme === "dark" ? "bg-[#0a0a0a] border-white/5 shadow-2xl" : "bg-white border-slate-100 shadow-xl"}`}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3
              className={`text-lg font-black tracking-tight mb-1 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
            >
              Odds - Pagamento Antecipado
            </h3>
            <p
              className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}
            >
              Comparação de odds entre as principais casas com suporte a P.A.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`p-2 rounded-lg ${theme === "dark" ? "bg-white/5 text-slate-400 hover:text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
            >
              <Bell size={16} />
            </button>
            <button
              className={`p-2 rounded-lg ${theme === "dark" ? "bg-white/5 text-slate-400 hover:text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr
                className={`text-[10px] uppercase tracking-widest font-black ${theme === "dark" ? "text-slate-600" : "text-slate-400"}`}
              >
                <th className="pb-6">Bookmaker</th>
                <th className="pb-6">1 (Casa)</th>
                <th className="pb-6">X (Empate)</th>
                <th className="pb-6">2 (Fora)</th>
                <th className="pb-6">1X (D.C.)</th>
                <th className="pb-6">12 (D.C.)</th>
                <th className="pb-6">X2 (D.C.)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tableData.map((row, i) => (
                <tr
                  key={i}
                  className="group hover:bg-white/[0.01] transition-colors"
                >
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-[10px] font-black ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
                      >
                        {row.bookie[0]}
                      </div>
                      <span
                        className={`text-xs font-bold ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}
                      >
                        {row.bookie}
                      </span>
                    </div>
                  </td>
                  <td className="py-5">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-8 rounded-md border text-[11px] font-black transition-all cursor-pointer ${
                        theme === "dark"
                          ? "border-white/5 bg-white/5 text-blue-400 hover:bg-white/10"
                          : "border-slate-100 bg-slate-50 text-blue-700 hover:bg-slate-100"
                      }`}
                    >
                      {row.o1}
                    </div>
                  </td>
                  <td className="py-5 italic text-[11px] font-bold text-slate-600">
                    {row.oX}
                  </td>
                  <td className="py-5 italic text-[11px] font-bold text-slate-600">
                    {row.o2}
                  </td>
                  <td className="py-5">
                    {row.o1X ? (
                      <div
                        className={`inline-flex items-center justify-center w-14 h-8 rounded-md border border-green-500/20 bg-green-500/5 text-green-400/80 text-[11px] font-bold`}
                      >
                        {row.o1X}
                      </div>
                    ) : (
                      <span className="text-slate-700">-</span>
                    )}
                  </td>
                  <td className="py-5">
                    {row.o12 ? (
                      <div className="inline-flex items-center justify-center w-14 h-8 rounded-md border border-white/10 bg-white/5 text-slate-500 text-[11px] font-bold">
                        {row.o12}
                      </div>
                    ) : (
                      <span className="text-slate-700">-</span>
                    )}
                  </td>
                  <td className="py-5">
                    {row.oX2 ? (
                      <div className="inline-flex items-center justify-center w-14 h-8 rounded-md border border-blue-600/20 bg-blue-600/5 text-blue-400/80 text-[11px] font-bold">
                        {row.oX2}
                      </div>
                    ) : (
                      <span className="text-slate-700">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function OddsLocatorView({
  theme,
  initialGameId,
}: {
  theme: string;
  initialGameId?: string | null;
}) {
  const [search, setSearch] = useState("");

  const mockResults = [
    {
      id: "m1",
      home: "Gremio",
      away: "Palestino",
      league: "Libertadores",
      time: "20/05 21:00",
      market: "Vencedor do Jogo",
      bookie: "Bet365",
      odd: "2.15",
    },
    {
      id: "m2",
      home: "Palmeiras",
      away: "Flamengo",
      market: "Vencedor do Jogo",
      bookie: "Betano",
      odd: "2.10",
    },
    {
      id: "m3",
      home: "Corinthians",
      away: "São Paulo",
      market: "Ambos Marcam",
      bookie: "Novibet",
      odd: "1.95",
    },
    {
      id: "m4",
      home: "Corinthians",
      away: "São Paulo",
      market: "Ambos Marcam",
      bookie: "KTO",
      odd: "1.88",
    },
    ...MOCK_PERCENTAGE_GAMES.map((g) => ({
      id: `p-${g.id}`,
      home: g.homeTeam,
      away: g.awayTeam,
      league: g.league,
      time: g.time,
      market: g.category,
      bookie: g.bookies[0]?.name || "N/A",
      odd: g.bookies[0]?.odd || "N/A",
    })),
  ];

  const [selectedGame, setSelectedGame] = useState<any | null>(null);

  useEffect(() => {
    if (initialGameId && !selectedGame) {
      const game = mockResults.find(
        (g) => g.id === initialGameId || g.id === `p-${initialGameId}`,
      );
      if (game) setSelectedGame(game);
    }
  }, [initialGameId]);

  const filtered = mockResults.filter(
    (r) =>
      r.home.toLowerCase().includes(search.toLowerCase()) ||
      r.away.toLowerCase().includes(search.toLowerCase()),
  );

  if (selectedGame) {
    return (
      <div className="w-full">
        <button
          onClick={() => setSelectedGame(null)}
          className={`flex items-center gap-2 mb-6 text-sm font-bold transition-colors ${theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
        >
          <ArrowLeft size={16} />
          Voltar para a lista
        </button>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Search size={14} />
            </div>
            <h1
              className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
            >
              {selectedGame.home} x {selectedGame.away}
            </h1>
            <div
              className={`flex items-center gap-2 text-sm ml-2 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
            >
              <Clock size={14} />
              <span>{selectedGame.time}</span>
            </div>
          </div>
        </div>

        <div
          className={`p-6 rounded-xl mb-8 ${theme === "dark" ? "bg-[#0a0a0a] border border-white/5" : "bg-white border border-slate-200 shadow-sm"}`}
        >
          <p
            className={`text-xs font-medium mb-4 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
          >
            Pesquise por nome do evento ou campeonato. Exemplo: Napoli x
            Juventus, Bundesliga...
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                defaultValue={`${selectedGame.home} x ${selectedGame.away}`}
                className={`w-full h-12 pl-4 pr-4 rounded-lg text-sm outline-none border focus:border-blue-500/50 transition-all ${
                  theme === "dark"
                    ? "bg-[#111111] border-white/10 text-white"
                    : "bg-slate-50 border-slate-200 text-slate-900"
                }`}
              />
            </div>
            <div
              className={`w-full md:w-48 h-12 px-4 rounded-lg border flex items-center justify-between text-sm cursor-pointer ${
                theme === "dark"
                  ? "bg-[#111111] border-white/10 text-slate-400"
                  : "bg-slate-50 border-slate-200 text-slate-500"
              }`}
            >
              <span>Todos os campos</span>
              <ChevronDown size={16} />
            </div>
            <button className="px-8 h-12 rounded-lg bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors">
              Buscar
            </button>
            <button
              className={`px-4 h-12 rounded-lg border flex items-center gap-2 font-bold text-sm transition-colors ${
                theme === "dark"
                  ? "bg-[#111111] border-white/10 text-white hover:bg-white/[0.05]"
                  : "bg-white border-slate-200 text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Filter size={16} />
              Filtros
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 px-2">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
          >
            Encontrados:{" "}
            <span
              className={theme === "dark" ? "text-white" : "text-slate-900"}
            >
              999 resultados
            </span>
          </span>
          <span
            className={`text-[10px] ${theme === "dark" ? "text-slate-600" : "text-slate-400"}`}
          >
            em 0.68s
          </span>
        </div>

        <OddsDetailContent theme={theme} selectedGame={selectedGame} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-10">
        <h2
          className={`text-2xl font-bold tracking-tight mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
        >
          Localizador de Odds
        </h2>
        <p
          className={`text-sm ${theme === "dark" ? "text-[#71717a]" : "text-slate-500"}`}
        >
          Encontre e compare as melhores odds em tempo real.
        </p>
      </div>

      <div className="mb-8 relative group">
        <Search
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${theme === "dark" ? "text-slate-500 group-focus-within:text-green-500" : "text-slate-400 group-focus-within:text-green-600"}`}
          size={20}
        />
        <input
          type="text"
          placeholder="Pesquise por time, liga ou mercado..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full h-14 pl-12 pr-4 rounded-2xl text-sm font-medium transition-all outline-none border ${
            theme === "dark"
              ? "bg-[#0a0a0a] border-white/5 text-white focus:border-green-500/50 hover:bg-[#0f0f0f]"
              : "bg-white border-slate-200 text-slate-900 focus:border-green-500 hover:bg-slate-50 shadow-sm"
          }`}
        />
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div
            className={`p-20 rounded-3xl border border-dashed flex flex-col items-center justify-center text-center ${
              theme === "dark"
                ? "bg-[#050505] border-white/10"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                theme === "dark"
                  ? "bg-white/5 text-white/20"
                  : "bg-white text-slate-200"
              }`}
            >
              <Search size={32} />
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
            >
              Nenhum resultado
            </h3>
            <p
              className={`max-w-md text-sm leading-relaxed ${theme === "dark" ? "text-[#71717a]" : "text-slate-500"}`}
            >
              Não encontramos odds para sua pesquisa no momento.
            </p>
          </div>
        ) : (
          filtered.map((result) => (
            <div
              key={result.id}
              onClick={() => setSelectedGame(result)}
              className={`p-5 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.01] cursor-pointer ${
                theme === "dark"
                  ? "bg-[#050505] border-white/5 hover:border-green-500/30"
                  : "bg-white border-slate-200 hover:border-green-500 shadow-sm"
              }`}
            >
              <div className="flex flex-col">
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
                >
                  {result.market}
                </span>
                <h4
                  className={`text-base font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                >
                  {result.home} X {result.away}
                </h4>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest block mb-0.5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
                  >
                    {result.bookie}
                  </span>
                  <span className="text-xl font-black text-green-500">
                    {result.odd}
                  </span>
                </div>
                <button
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    theme === "dark"
                      ? "bg-white/5 text-slate-400 hover:bg-green-500 hover:text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-green-500 hover:text-white"
                  }`}
                >
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function SectionView({ title, theme }: { title: string; theme: string }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2
            className={`text-2xl font-bold tracking-tight mb-1 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
          >
            {title}
          </h2>
          <p
            className={`text-sm ${theme === "dark" ? "text-[#71717a]" : "text-slate-500"}`}
          >
            Esta tela está em desenvolvimento ou aguardando integração.
          </p>
        </div>
      </div>

      <div
        className={`p-20 rounded-3xl border border-dashed flex flex-col items-center justify-center text-center ${
          theme === "dark"
            ? "bg-[#050505] border-white/10"
            : "bg-slate-50 border-slate-200"
        }`}
      >
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
            theme === "dark"
              ? "bg-white/5 text-white/20"
              : "bg-white text-slate-200"
          }`}
        >
          <Box size={32} />
        </div>
        <h3
          className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
        >
          Em breve
        </h3>
        <p
          className={`max-w-md text-sm leading-relaxed ${theme === "dark" ? "text-[#71717a]" : "text-slate-500"}`}
        >
          Estamos preparando o conteúdo desta seção. Em breve você terá acesso a
          todas as ferramentas e dados necessários aqui.
        </p>
      </div>
    </div>
  );
}

function StatsGeneralView({
  theme,
  procedures,
}: {
  theme: string;
  procedures: any[];
}) {
  const isDark = theme === "dark";

  // Calculate user points based on real data
  const userPoints = procedures.reduce((sum, p) => {
    if (p.outcome === "lucro") return sum + (parseFloat(p.outcomeAmount) || 0);
    if (p.outcome === "perca") return sum - (parseFloat(p.outcomeAmount) || 0);
    return sum;
  }, 0);

  // Mock users
  const allUsers = [
    {
      id: "u1",
      name: "MANCHESTER CITY",
      points: 0,
      isUser: false,
      avatar: manchesterCityLogo,
    },
    {
      id: "u2",
      name: "BOURNEMOUTH",
      points: 9840,
      isUser: false,
      avatar: bournemouthLogo,
    },
    {
      id: "u3",
      name: "BRENTFORD",
      points: 8120,
      isUser: false,
      avatar: brentfordLogo,
    },
    { id: "u4", name: "Sarah Jenkins", points: 7940, isUser: false },
    { id: "u5", name: "Julian Thorne", points: 7810, isUser: false },
    { id: "u6", name: "Alex Mercer", points: 7500, isUser: false },
    { id: "u7", name: "Victoria Cross", points: 7230, isUser: false },
    {
      id: "me",
      name: "VOCÊ",
      points: Math.max(0, Math.round(userPoints)),
      isUser: true,
    },
  ];

  // Sort and select
  const sortedUsers = [...allUsers].sort((a, b) => b.points - a.points);

  // Quick fix: if user wants Manchester City to be first despite points
  const manCity = sortedUsers.find((u) => u.name === "MANCHESTER CITY");
  if (manCity) {
    sortedUsers.splice(sortedUsers.indexOf(manCity), 1);
    sortedUsers.unshift(manCity);
  }

  const top1 = sortedUsers[0];
  const top2 = sortedUsers[1];
  const top3 = sortedUsers[2];

  const vanguardUsers = sortedUsers.slice(3).map((u, i) => ({
    ...u,
    rank: (i + 4).toString().padStart(2, "0"),
  }));

  // Format points helper
  const formatPts = (pts: number) => pts.toLocaleString("en-US");

  return (
    <div
      className={`w-full min-h-[80vh] flex flex-col items-center pt-8 pb-20 ${isDark ? "bg-transparent" : "bg-transparent"}`}
    >
      {/* Podium Section */}
      <div className="flex items-end justify-center gap-2 md:gap-4 mb-20 relative w-full h-[320px] md:h-[400px] mt-12 md:mt-16">
        {/* Rank 2 */}
        <div className="flex flex-col items-center relative z-10 w-[120px] md:w-[180px]">
          {/* Avatar circle */}
          <div className="absolute -top-12 md:-top-16 flex flex-col items-center">
            <span
              className={`text-[8px] md:text-[10px] font-bold tracking-[0.2em] mb-2 ${isDark ? "text-zinc-500" : "text-slate-500"}`}
            >
              RANK 2
            </span>
            <div
              className={`w-12 h-12 md:w-16 md:h-16 rounded-full border border-zinc-600/50 flex items-center justify-center overflow-hidden ${isDark ? "bg-[#0a0a0c]" : "bg-white shadow-sm"}`}
            >
              {top2?.isUser ? (
                <span className="text-xs font-black text-slate-400">V</span>
              ) : top2?.avatar ? (
                <img
                  src={top2.avatar}
                  alt={top2.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : null}
            </div>
          </div>
          {/* Arch */}
          <div
            className={`w-full h-[220px] md:h-[280px] rounded-t-[80px] md:rounded-t-[100px] flex flex-col items-center justify-center pt-8 md:pt-10 border-t border-l border-r ${top2?.isUser ? "border-blue-500/50" : "border-zinc-700/30"}
            ${isDark ? (top2?.isUser ? "bg-gradient-to-b from-blue-500/20 via-blue-500/5 to-transparent" : "bg-gradient-to-b from-zinc-800/40 via-zinc-900/10 to-transparent") : top2?.isUser ? "bg-gradient-to-b from-blue-200 via-blue-100/50 to-transparent" : "bg-gradient-to-b from-slate-200 via-slate-100/50 to-transparent"}
          `}
          >
            <span
              className={`text-5xl md:text-6xl font-black mb-6 md:mb-8 ${top2?.isUser ? "text-blue-500/80" : isDark ? "text-zinc-500/80" : "text-slate-400"}`}
            >
              2
            </span>
            <div className="flex flex-col items-center mt-auto pb-6 md:pb-8 text-center px-2">
              <span
                className={`text-[10px] md:text-xs font-bold tracking-wider mb-1 ${top2?.isUser ? "text-blue-400" : isDark ? "text-zinc-400" : "text-slate-500"}`}
              >
                {formatPts(top2?.points || 0)} PTS
              </span>
              <span
                className={`text-sm md:text-base font-black tracking-tight uppercase leading-tight ${top2?.isUser ? "text-blue-500" : isDark ? "text-white" : "text-slate-900"}`}
              >
                {top2?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Rank 1 */}
        <div className="flex flex-col items-center relative z-20 w-[140px] md:w-[220px]">
          {/* Avatar circle with glow */}
          <div className="absolute -top-14 md:-top-20 flex flex-col items-center">
            <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-[#eab308] mb-2">
              RANK 1
            </span>
            <div className="relative">
              <motion.div
                animate={{ rotate: [50, 60, 50] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-2 md:-top-1 -right-3 md:-right-4 z-30"
              >
                <Crown
                  className="text-[#eab308] fill-[#eab308] w-5 h-5 md:w-7 md:h-7 drop-shadow-[0_2px_8px_rgba(234,179,8,0.6)]"
                  strokeWidth={1.5}
                />
              </motion.div>
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(234,179,8,0.3)",
                    "0 0 35px rgba(234,179,8,0.7)",
                    "0 0 15px rgba(234,179,8,0.3)",
                  ],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`relative z-10 w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-[#eab308] flex items-center justify-center overflow-hidden ${isDark ? "bg-[#0a0a0c]" : "bg-white"}`}
              >
                {top1?.isUser ? (
                  <span className="text-xl md:text-2xl font-black text-[#eab308]">
                    V
                  </span>
                ) : top1?.avatar ? (
                  <img
                    src={top1.avatar}
                    alt={top1.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : null}
              </motion.div>
            </div>
          </div>
          {/* Arch */}
          <div
            className={`w-full h-[280px] md:h-[350px] rounded-t-[100px] md:rounded-t-[120px] flex flex-col items-center justify-center pt-10 md:pt-12 border-t border-l border-r border-[#eab308]/40
            ${isDark ? "bg-gradient-to-b from-[#eab308]/20 via-[#eab308]/5 to-transparent" : "bg-gradient-to-b from-amber-200/60 via-amber-100/30 to-transparent"}
          `}
          >
            <span className="text-7xl md:text-8xl font-black mb-8 md:mb-10 text-[#eab308]">
              1
            </span>
            <div className="flex flex-col items-center mt-auto pb-8 md:pb-10 text-center px-2">
              <span className="text-xs md:text-sm font-black text-[#eab308] tracking-wider mb-1 px-2 py-0.5 rounded-full bg-[#eab308]/10">
                {formatPts(top1?.points || 0)} PTS
              </span>
              <span
                className={`text-base md:text-xl font-black tracking-tight uppercase leading-tight mt-1 ${isDark ? "text-white" : "text-slate-900"}`}
              >
                {top1?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Rank 3 */}
        <div className="flex flex-col items-center relative z-10 w-[120px] md:w-[180px]">
          {/* Avatar circle */}
          <div className="absolute -top-12 md:-top-16 flex flex-col items-center">
            <span
              className={`text-[8px] md:text-[10px] font-bold tracking-[0.2em] mb-2 ${isDark ? "text-zinc-600" : "text-slate-500"}`}
            >
              RANK 3
            </span>
            <div
              className={`w-12 h-12 md:w-16 md:h-16 rounded-full border border-zinc-800/80 flex items-center justify-center overflow-hidden ${isDark ? "bg-[#0a0a0c]" : "bg-white shadow-sm"}`}
            >
              {top3?.isUser ? (
                <span className="text-xs font-black text-slate-500">V</span>
              ) : top3?.avatar ? (
                <img
                  src={top3.avatar}
                  alt={top3.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : null}
            </div>
          </div>
          {/* Arch */}
          <div
            className={`w-full h-[190px] md:h-[240px] rounded-t-[80px] md:rounded-t-[100px] flex flex-col items-center justify-center pt-8 md:pt-10 border-t border-l border-r ${top3?.isUser ? "border-blue-500/40" : "border-zinc-800/30"}
            ${isDark ? (top3?.isUser ? "bg-gradient-to-b from-blue-500/10 via-blue-500/5 to-transparent" : "bg-gradient-to-b from-zinc-800/20 via-zinc-900/5 to-transparent") : top3?.isUser ? "bg-gradient-to-b from-blue-200/50 via-blue-100/20 to-transparent" : "bg-gradient-to-b from-slate-200/50 via-slate-100/20 to-transparent"}
          `}
          >
            <span
              className={`text-5xl md:text-6xl font-black mb-6 md:mb-8 ${top3?.isUser ? "text-blue-500/60" : isDark ? "text-zinc-600/60" : "text-slate-300"}`}
            >
              3
            </span>
            <div className="flex flex-col items-center mt-auto pb-6 md:pb-8 text-center px-2">
              <span
                className={`text-[10px] md:text-xs font-bold tracking-wider mb-1 ${top3?.isUser ? "text-blue-400" : isDark ? "text-zinc-500" : "text-slate-400"}`}
              >
                {formatPts(top3?.points || 0)} PTS
              </span>
              <span
                className={`text-sm md:text-base font-black tracking-tight uppercase leading-tight ${top3?.isUser ? "text-blue-500" : isDark ? "text-white" : "text-slate-900"}`}
              >
                {top3?.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className={`w-full max-w-2xl h-px ${isDark ? "bg-zinc-800/50 text-transparent" : "bg-slate-200"} mb-14`}
      ></div>

      {/* List Header */}
      <div className="mb-6 w-full max-w-2xl text-center">
        <h3
          className={`text-xs md:text-sm tracking-[0.3em] font-bold ${isDark ? "text-zinc-400" : "text-slate-500"}`}
        >
          THE VANGUARD
        </h3>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2.5 w-full max-w-2xl px-4 md:px-0">
        {vanguardUsers.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center justify-between p-4 px-6 rounded-xl border transition-all duration-300 hover:scale-[1.01] ${
              user.isUser
                ? isDark
                  ? "bg-blue-500/10 border-blue-500/30"
                  : "bg-blue-50 border-blue-200"
                : isDark
                  ? "bg-[#0e0e11]/50 border-zinc-800/60 hover:bg-[#121215]/80 hover:border-zinc-700"
                  : "bg-white border-slate-200 shadow-sm hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-5 md:gap-8">
              <span
                className={`font-mono text-xs md:text-sm font-bold tracking-wider ${user.isUser ? "text-blue-500" : isDark ? "text-zinc-500" : "text-slate-400"}`}
              >
                {user.rank}
              </span>
              <span
                className={`font-bold text-sm md:text-base ${user.isUser ? "text-blue-500" : isDark ? "text-white" : "text-slate-900"}`}
              >
                {user.name}
              </span>
            </div>
            <span
              className={`font-mono text-xs md:text-sm font-medium tracking-wider ${user.isUser ? "text-blue-500" : isDark ? "text-zinc-500" : "text-slate-500"}`}
            >
              {formatPts(user.points)} PTS
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PercentagesView({ theme }: { theme: string }) {
  const [activeTab, setActiveTab] = useState<
    | "SureBET"
    | "PA para os dois Lados"
    | "PA para o time da casa"
    | "PA para o time de fora"
  >("SureBET");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "SureBET", label: "SureBET" },
    { id: "PA para os dois Lados", label: "PA para os dois Lados" },
    { id: "PA para o time da casa", label: "PA para o time da casa" },
    { id: "PA para o time de fora", label: "PA para o time de fora" },
  ];

  const filteredGames = MOCK_PERCENTAGE_GAMES.filter((game) => {
    const matchesTab = game.category === activeTab;
    const matchesSearch =
      game.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.league.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleOpenInNewTab = (gameId: string) => {
    const url = `${window.location.origin}${window.location.pathname}?gameId=${gameId}&view=odds-locator&theme=${theme}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <h2
          className={`text-2xl font-bold tracking-tight mb-6 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
        >
          Melhores Porcentagens
        </h2>

        <div
          className={`flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b relative ${theme === "dark" ? "border-white/5" : "border-slate-100"}`}
        >
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 text-[13px] font-bold transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? theme === "dark"
                      ? "text-white"
                      : "text-slate-900"
                    : theme === "dark"
                      ? "text-slate-500 hover:text-slate-300"
                      : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96 mb-4 group lowercase">
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${theme === "dark" ? "text-slate-500 group-focus-within:text-green-500" : "text-slate-400 group-focus-within:text-green-600"}`}
              size={16}
            />
            <input
              type="text"
              placeholder="Pesquisar jogos ou ligas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full h-12 pl-11 pr-4 rounded-xl text-xs font-medium transition-all outline-none border ${
                theme === "dark"
                  ? "bg-[#0a0a0a] border-white/5 text-white focus:border-green-500/50 hover:bg-[#0f0f0f]"
                  : "bg-white border-slate-200 text-slate-900 focus:border-green-500 hover:bg-slate-50 shadow-sm"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {filteredGames.length === 0 ? (
          <div
            className={`p-20 rounded-3xl border border-dashed flex flex-col items-center justify-center text-center ${
              theme === "dark"
                ? "bg-[#050505] border-white/10"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                theme === "dark"
                  ? "bg-white/5 text-white/20"
                  : "bg-white text-slate-200"
              }`}
            >
              <Search size={32} />
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
            >
              Nenhuma oportunidade encontrada
            </h3>
            <p
              className={`max-w-md text-sm leading-relaxed ${theme === "dark" ? "text-[#71717a]" : "text-slate-500"}`}
            >
              Tente redefinir sua pesquisa ou verificar outras categorias para
              encontrar {activeTab.toLowerCase()}.
            </p>
          </div>
        ) : (
          filteredGames.map((game) => (
            <motion.div
              layoutId={game.id}
              key={game.id}
              onClick={() => handleOpenInNewTab(game.id)}
              className={`p-4 md:p-5 rounded-2xl border cursor-pointer group transition-all duration-300 hover:scale-[1.01] ${
                theme === "dark"
                  ? "bg-[#0a0a0c] border-[#1d1d21]/60 hover:border-zinc-700/80 shadow-xl shadow-black/40"
                  : "bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left side: Metadata & Teams */}
                <div className="flex-1">
                  {/* Top line: Date only */}
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase ${theme === "dark" ? "text-zinc-500" : "text-slate-400"}`}
                    >
                      {game.time}
                    </span>
                  </div>

                  {/* Team titles */}
                  <h3
                    className={`text-lg md:text-xl font-black tracking-tight mb-1 transition-colors ${
                      theme === "dark"
                        ? "text-white group-hover:text-green-500"
                        : "text-slate-900 group-hover:text-green-600"
                    }`}
                  >
                    {game.homeTeam}{" "}
                    <span
                      className={`${theme === "dark" ? "text-zinc-600" : "text-slate-300"} font-normal uppercase text-base md:text-lg px-1`}
                    >
                      X
                    </span>{" "}
                    {game.awayTeam}
                  </h3>

                  {/* Subtitle: league & stadium */}
                  <p
                    className={`text-xs font-medium ${theme === "dark" ? "text-zinc-500" : "text-slate-400"}`}
                  >
                    {game.league} {game.stadium ? `— ${game.stadium}` : ""}
                  </p>
                </div>

                {/* Right side: PROFIT & Odds */}
                <div className="flex flex-col items-start md:items-end gap-2.5 self-start md:self-center w-full md:w-auto">
                  {/* PROFIT badge positioned on top of the odds columns */}
                  <div className="flex items-center md:justify-end w-full">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500 font-extrabold uppercase tracking-wider">
                      PROFIT {game.profit}
                    </span>
                  </div>

                  {/* Bookies/Odds columns */}
                  <div className="flex items-center gap-2">
                    {game.bookies.map((b: any, i: number) => (
                      <div
                        key={i}
                        className={`w-20 h-20 rounded-xl border flex flex-col justify-center items-center px-2 py-1.5 transition-colors ${
                          theme === "dark"
                            ? "bg-[#101012]/40 border-zinc-805/80 group-hover:bg-[#101012] group-hover:border-zinc-700/60"
                            : "bg-slate-50/50 border-slate-200 group-hover:bg-slate-50 group-hover:border-slate-300"
                        }`}
                      >
                        <span
                          className={`text-[10px] font-black tracking-wider uppercase mb-1 px-2 py-0.5 rounded-full ${
                            theme === "dark"
                              ? "bg-emerald-500/15 text-emerald-400 font-black"
                              : "bg-emerald-500/10 text-emerald-600 font-black"
                          }`}
                        >
                          {i === 0 ? "1" : i === 1 ? "X" : "2"}
                        </span>
                        <span
                          className={`text-lg font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                        >
                          {b.odd}
                        </span>
                        <span
                          className={`text-[8px] font-black tracking-wider uppercase mt-0.5 ${theme === "dark" ? "text-zinc-500" : "text-slate-400"}`}
                        >
                          {b.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

function ProceduresView({ procedures, theme, onNewProcedure }: any) {
  const [filter, setFilter] = useState<
    "Todos" | "Hoje" | "Ontem" | "Esta semana" | "Personalizado"
  >("Todos");
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");

  // Sort procedures descending by createdAt
  const sortedProcedures = [...procedures].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  const filteredProcs = sortedProcedures.filter((p) => {
    if (filter === "Todos") return true;
    const diff = getDayDiff(p.createdAt);
    if (filter === "Hoje") return diff === 0;
    if (filter === "Ontem") return diff === 1;
    if (filter === "Esta semana") return diff <= 7;
    if (filter === "Personalizado") {
      if (!p.createdAt) return true;
      const procDate = new Date(p.createdAt).getTime();
      const start = customStartDate
        ? new Date(customStartDate + "T00:00:00").getTime()
        : 0;
      const end = customEndDate
        ? new Date(customEndDate + "T23:59:59").getTime()
        : Infinity;
      return procDate >= start && procDate <= end;
    }
    return true; // default
  });

  // Group procedures by date label
  const groupedProcs = filteredProcs.reduce((acc: any, p: Procedure) => {
    let group = "Histórico Antigo";
    const diff = getDayDiff(p.createdAt);
    if (diff === 0) group = "Hoje";
    else if (diff === 1) group = "Ontem";
    else if (diff <= 7) group = "Esta semana";
    else if (p.createdAt)
      group = new Date(p.createdAt).toLocaleDateString("pt-BR");

    if (!acc[group]) acc[group] = [];
    acc[group].push(p);
    return acc;
  }, {});

  const groupOrder = ["Hoje", "Ontem", "Esta semana"];

  const sortedGroups = Object.keys(groupedProcs).sort((a, b) => {
    const indexA = groupOrder.indexOf(a);
    const indexB = groupOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    if (a === "Histórico Antigo") return 1;
    if (b === "Histórico Antigo") return -1;
    return b.localeCompare(a); // Sort dates descending
  });

  return (
    <div className="w-full relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h2
            className={`text-2xl font-bold tracking-tight mb-1 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
          >
            Procedimentos
          </h2>
          <p
            className={`text-sm ${theme === "dark" ? "text-[#71717a]" : "text-slate-500"}`}
          >
            Histórico das suas atividades de aposta.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center p-1 rounded-xl border ${theme === "dark" ? "bg-[#111111] border-white/10" : "bg-slate-50 border-slate-200"}`}
          >
            {["Todos", "Hoje", "Ontem", "Esta semana", "Personalizado"].map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    filter === f
                      ? "bg-green-500 text-white shadow-md"
                      : theme === "dark"
                        ? "text-slate-400 hover:text-white hover:bg-white/5"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                  }`}
                >
                  {f}
                </button>
              ),
            )}
          </div>
          <button
            onClick={onNewProcedure}
            className="flex items-center gap-2 h-10 px-4 rounded-lg bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20 whitespace-nowrap"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Novo</span>
          </button>
        </div>
      </div>

      {filter === "Personalizado" && (
        <div
          className={`p-4 rounded-xl border mb-8 flex items-center gap-4 ${theme === "dark" ? "bg-[#0a0a0a] border-white/5" : "bg-white border-slate-200"}`}
        >
          <div className="flex flex-col flex-1">
            <label
              className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
            >
              Data Inicial
            </label>
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              className={`w-full h-10 px-3 rounded-lg border text-sm transition-colors outline-none ${
                theme === "dark"
                  ? "bg-[#111111] border-white/10 text-white focus:border-green-500/50 hover:bg-[#18181b] [color-scheme:dark]"
                  : "bg-slate-50 border-slate-300 text-slate-900 focus:border-green-500 hover:bg-slate-100"
              }`}
            />
          </div>
          <span
            className={`text-sm font-medium ${theme === "dark" ? "text-slate-500" : "text-slate-400"} mt-5`}
          >
            Até
          </span>
          <div className="flex flex-col flex-1">
            <label
              className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
            >
              Data Final
            </label>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              className={`w-full h-10 px-3 rounded-lg border text-sm transition-colors outline-none ${
                theme === "dark"
                  ? "bg-[#111111] border-white/10 text-white focus:border-green-500/50 hover:bg-[#18181b] [color-scheme:dark]"
                  : "bg-slate-50 border-slate-300 text-slate-900 focus:border-green-500 hover:bg-slate-100"
              }`}
            />
          </div>
        </div>
      )}

      <div className="space-y-8">
        {procedures.length === 0 ? (
          <div
            className={`p-10 rounded-2xl border text-center ${theme === "dark" ? "bg-[#050505] border-white/5 text-[#a1a1aa]" : "bg-slate-50 border-slate-200 text-slate-500"}`}
          >
            <Box size={48} className="mx-auto mb-4 opacity-20" />
            <h3
              className={`text-lg font-bold mb-1 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
            >
              Sem procedimentos
            </h3>
            <p className="text-sm">
              Você ainda não registrou nenhum procedimento.
            </p>
          </div>
        ) : (
          sortedGroups.map((group) => (
            <div key={group} className="space-y-4">
              <h3
                className={`text-xs font-bold uppercase tracking-widest ${theme === "dark" ? "text-[#71717a]" : "text-slate-500"}`}
              >
                {group}
              </h3>
              <div
                className={`rounded-2xl border overflow-hidden ${theme === "dark" ? "bg-[#050505] border-white/5" : "bg-white border-slate-200"}`}
              >
                {groupedProcs[group].map((p: Procedure, index: number) => (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between p-5 transition-colors ${index !== groupedProcs[group].length - 1 ? (theme === "dark" ? "border-b border-white/5" : "border-b border-slate-100") : ""} ${theme === "dark" ? "hover:bg-white/[0.02]" : "hover:bg-slate-50"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                          theme === "dark"
                            ? "bg-[#111111] text-white"
                            : "bg-slate-100 text-slate-900"
                        }`}
                      >
                        {p.type.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={`text-[15px] font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                        >
                          {p.game || "Novo Jogo"}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              p.type === "Freebet"
                                ? "bg-green-500/10 text-green-500"
                                : p.type === "SuperOdds"
                                  ? "bg-orange-500/10 text-orange-500"
                                  : "bg-blue-500/10 text-blue-500"
                            }`}
                          >
                            {p.type}
                          </span>
                          <span
                            className={`text-[11px] font-medium ${theme === "dark" ? "text-[#52525b]" : "text-slate-400"}`}
                          >
                            {p.championship}
                          </span>
                        </div>
                        {p.bookies && p.bookies.length > 0 && (
                          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                            <span
                              className={`text-[9px] font-black uppercase tracking-wider ${theme === "dark" ? "text-zinc-600" : "text-slate-400"}`}
                            >
                              Casas:
                            </span>
                            {p.bookies.map((bookie: string, idx: number) => (
                              <span
                                key={idx}
                                className={`text-[9.5px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                                  theme === "dark"
                                    ? "bg-zinc-900 border border-zinc-800/80 text-emerald-400"
                                    : "bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 shadow-sm"
                                }`}
                              >
                                {bookie}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="flex flex-col text-right">
                        <span
                          className={`text-[11px] font-medium uppercase tracking-wider mb-0.5 ${theme === "dark" ? "text-[#52525b]" : "text-slate-400"}`}
                        >
                          Investimento
                        </span>
                        <span
                          className={`text-sm font-bold ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                        >
                          R${" "}
                          {(parseFloat(p.totalInvestedAmount) || 0)
                            .toFixed(2)
                            .replace(".", ",")}
                        </span>
                      </div>
                      <div className="flex flex-col text-right w-24">
                        <span
                          className={`text-[11px] font-medium uppercase tracking-wider mb-0.5 ${theme === "dark" ? "text-[#52525b]" : "text-slate-400"}`}
                        >
                          Retorno
                        </span>
                        {p.outcome === "lucro" ? (
                          <span
                            className={`${theme === "dark" ? "text-green-400" : "text-green-600"} text-sm font-bold`}
                          >
                            +R${" "}
                            {(parseFloat(p.outcomeAmount) || 0)
                              .toFixed(2)
                              .replace(".", ",")}
                          </span>
                        ) : p.outcome === "perca" ? (
                          <span
                            className={`${theme === "dark" ? "text-red-400" : "text-red-600"} text-sm font-bold`}
                          >
                            -R${" "}
                            {(parseFloat(p.outcomeAmount) || 0)
                              .toFixed(2)
                              .replace(".", ",")}
                          </span>
                        ) : (
                          <span
                            className={`${theme === "dark" ? "text-[#71717a]" : "text-slate-400"} text-sm font-bold`}
                          >
                            PENDENTE
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, icon, color, theme }: any) {
  const colorClasses = {
    green: "bg-green-500/10 text-green-500",
    blue: "bg-blue-500/10 text-blue-500",
    orange: "bg-orange-500/10 text-orange-500",
  };

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-500 hover:scale-[1.02] ${
        theme === "dark"
          ? "bg-[#050505] border-white/5"
          : "bg-slate-50 border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-2.5 rounded-xl ${colorClasses[color as keyof typeof colorClasses]}`}
        >
          {icon}
        </div>
        <div
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            trend.startsWith("+")
              ? "bg-green-500/10 text-green-500"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {trend}
        </div>
      </div>
      <div>
        <p
          className={`text-xs font-medium mb-1 ${theme === "dark" ? "text-[#71717a]" : "text-slate-500"}`}
        >
          {label}
        </p>
        <h4
          className={`text-xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}
        >
          {value}
        </h4>
      </div>
    </div>
  );
}

function ActivityItem({
  name,
  type,
  amount,
  time,
  status,
  theme,
  bookies,
}: any) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            theme === "dark"
              ? "bg-[#111111] text-white"
              : "bg-white border border-slate-100 text-slate-900"
          }`}
        >
          {name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span
            className={`text-[13px] font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
          >
            {name}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-[11px] font-medium ${theme === "dark" ? "text-[#52525b]" : "text-slate-400"}`}
            >
              {type}
            </span>
            {bookies && bookies.length > 0 && (
              <span
                className={`text-[8.5px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
                  theme === "dark"
                    ? "bg-zinc-850/60 text-emerald-400 border border-zinc-800/40"
                    : "bg-emerald-500/5 text-emerald-600 border border-emerald-500/10"
                }`}
              >
                {bookies.join(" / ")}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end text-right">
        <span
          className={`text-[13px] font-bold ${
            status === "success"
              ? theme === "dark"
                ? "text-green-400"
                : "text-green-600"
              : status === "pending"
                ? theme === "dark"
                  ? "text-orange-400"
                  : "text-orange-600"
                : theme === "dark"
                  ? "text-blue-400"
                  : "text-blue-600"
          }`}
        >
          {amount}
        </span>
        <span
          className={`text-[11px] font-medium ${theme === "dark" ? "text-[#52525b]" : "text-slate-400"}`}
        >
          {time}
        </span>
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  badge,
  active = false,
  className = "",
  id,
  theme,
  onClick,
  variant = "default",
}: any) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 ${variant === "header" ? "py-2" : "py-1.5"} rounded-md transition-all group relative ${
        active
          ? theme === "dark"
            ? "bg-green-600/10 text-white"
            : "bg-green-50 text-green-700"
          : theme === "dark"
            ? "text-white hover:bg-[#121214]"
            : "text-slate-900 hover:bg-slate-200/50"
      } ${className}`}
    >
      <div
        className={`flex items-center ${variant === "header" ? "gap-2.5" : "gap-3"}`}
      >
        {active && (
          <motion.div
            layoutId="active-nav-line"
            className="absolute left-0 w-0.5 h-4 bg-green-500 rounded-full"
          />
        )}
        {icon && (
          <div
            className={`flex-shrink-0 transition-colors ${theme === "dark" ? "text-[#71717a] group-hover:text-green-400" : "text-slate-400 group-hover:text-green-600"}`}
          >
            {icon}
          </div>
        )}
        <span
          className={
            variant === "header"
              ? "text-[10px] uppercase tracking-[0.15em] font-bold"
              : "text-[13px] font-medium leading-none"
          }
        >
          {label}
        </span>
      </div>
      {badge && (
        <span className="bg-green-600/10 text-green-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-1 ring-green-500/20">
          {badge}
        </span>
      )}
    </button>
  );
}

function NavGroup({
  label,
  icon,
  children,
  id,
  defaultOpen = true,
  theme,
}: any) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div id={id} className="space-y-0.5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-bold flex items-center justify-between group transition-colors ${
          theme === "dark" ? "text-white hover:opacity-80" : "text-slate-900"
        }`}
      >
        <div className="flex items-center gap-2.5">
          {icon && (
            <div
              className={`transition-colors flex-shrink-0 ${
                theme === "dark"
                  ? "text-[#71717a] group-hover:text-green-400"
                  : "text-slate-400 group-hover:text-green-600"
              }`}
            >
              {icon}
            </div>
          )}
          <span className="truncate">{label}</span>
        </div>
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${!isOpen ? "-rotate-90" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden relative"
      >
        {/* Guide Line */}
        <div
          className={`absolute left-[13px] top-0 bottom-0 w-px ${theme === "dark" ? "bg-white/5" : "bg-slate-200"}`}
        />

        <div className="pl-4 space-y-0.5 pt-1 pb-1">{children}</div>
      </motion.div>
    </div>
  );
}

function DoubleChancesView({ theme }: { theme: string }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = MOCK_DOUBLE_CHANCE_GAMES.filter((game) => {
    const matchesSearch =
      game.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.league.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleOpenInNewTab = (gameId: string) => {
    const url = `${window.location.origin}${window.location.pathname}?gameId=${gameId}&view=odds-locator&theme=${theme}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <h2
          className={`text-2xl font-bold tracking-tight mb-6 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
        >
          Melhores Chances de Duplo
        </h2>

        <div
          className={`flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b pb-4 relative ${theme === "dark" ? "border-white/5" : "border-slate-100"}`}
        >
          <div className="relative w-full lg:w-96 group lowercase">
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${theme === "dark" ? "text-slate-500 group-focus-within:text-green-500" : "text-slate-400 group-focus-within:text-green-600"}`}
              size={16}
            />
            <input
              type="text"
              placeholder="Pesquisar jogos ou ligas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full h-12 pl-11 pr-4 rounded-xl text-xs font-medium transition-all outline-none border ${
                theme === "dark"
                  ? "bg-[#0a0a0a] border-white/5 text-white focus:border-green-500/50 hover:bg-[#0f0f0f]"
                  : "bg-white border-slate-200 text-slate-900 focus:border-green-500 hover:bg-slate-50 shadow-sm"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {filteredGames.length === 0 ? (
          <div
            className={`p-20 rounded-3xl border border-dashed flex flex-col items-center justify-center text-center ${
              theme === "dark"
                ? "bg-[#050505] border-white/10"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                theme === "dark"
                  ? "bg-white/5 text-white/20"
                  : "bg-white text-slate-200"
              }`}
            >
              <Search size={32} />
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
            >
              Nenhuma oportunidade encontrada
            </h3>
            <p
              className={`max-w-md text-sm leading-relaxed ${theme === "dark" ? "text-[#71717a]" : "text-slate-500"}`}
            >
              Tente redefinir sua pesquisa para encontrar oportunidades de
              chance dupla.
            </p>
          </div>
        ) : (
          filteredGames.map((game) => (
            <motion.div
              layoutId={game.id}
              key={game.id}
              onClick={() => handleOpenInNewTab(game.id.replace("dc", ""))}
              className={`p-4 md:p-5 rounded-2xl border cursor-pointer group transition-all duration-300 hover:scale-[1.01] ${
                theme === "dark"
                  ? "bg-[#0a0a0c] border-zinc-800/40 hover:border-zinc-700/80 shadow-xl shadow-black/40"
                  : "bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left side: Metadata & Teams */}
                <div className="flex-1">
                  {/* Top line: Date only */}
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase ${theme === "dark" ? "text-zinc-500" : "text-slate-400"}`}
                    >
                      {game.time}
                    </span>
                  </div>

                  {/* Team titles */}
                  <h3
                    className={`text-lg md:text-xl font-black tracking-tight mb-1 transition-colors ${
                      theme === "dark"
                        ? "text-white group-hover:text-green-500"
                        : "text-slate-900 group-hover:text-green-600"
                    }`}
                  >
                    {game.homeTeam}{" "}
                    <span
                      className={`${theme === "dark" ? "text-zinc-600" : "text-slate-300"} font-normal uppercase text-base md:text-lg px-1`}
                    >
                      X
                    </span>{" "}
                    {game.awayTeam}
                  </h3>

                  {/* Subtitle: league & stadium */}
                  <p
                    className={`text-xs font-medium ${theme === "dark" ? "text-zinc-500" : "text-slate-400"}`}
                  >
                    {game.league} {game.stadium ? `— ${game.stadium}` : ""}
                  </p>
                </div>

                {/* Right side: PROFIT & Odds */}
                <div className="flex flex-col items-start md:items-end gap-2.5 self-start md:self-center w-full md:w-auto">
                  {/* PROFIT badge positioned on top of the odds columns */}
                  <div className="flex items-center md:justify-end w-full">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500 font-extrabold uppercase tracking-wider">
                      PROFIT {game.profit}
                    </span>
                  </div>

                  {/* Bookies/Odds columns */}
                  <div className="flex items-center gap-2">
                    {game.bookies.map((b: any, i: number) => (
                      <div
                        key={i}
                        className={`w-20 h-20 rounded-xl border flex flex-col justify-center items-center px-2 py-1.5 transition-colors ${
                          theme === "dark"
                            ? "bg-[#101012]/40 border-[#1d1d21]/60 group-hover:bg-[#101012] group-hover:border-zinc-700/60"
                            : "bg-slate-50/50 border-slate-200 group-hover:bg-slate-50 group-hover:border-slate-300"
                        }`}
                      >
                        <span
                          className={`text-[10px] font-black tracking-wider uppercase mb-1 px-2 py-0.5 rounded-full ${
                            theme === "dark"
                              ? "bg-emerald-500/15 text-emerald-400 font-black"
                              : "bg-emerald-500/10 text-emerald-600 font-black"
                          }`}
                        >
                          {i === 0 ? "1" : i === 1 ? "X" : "2"}
                        </span>
                        <span
                          className={`text-lg font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                        >
                          {b.odd}
                        </span>
                        <span
                          className={`text-[8px] font-black tracking-wider uppercase mt-0.5 ${theme === "dark" ? "text-zinc-500" : "text-slate-400"}`}
                        >
                          {b.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
