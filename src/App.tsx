/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, ShieldCheck, Zap, Code, 
  Terminal, DollarSign, CheckCircle2, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Star, 
  Users, Trophy, ArrowRight, Lock, Sparkles, HelpCircle, AlertCircle,
  Clock, Flame, Check, CreditCard, X, MessageSquare, Timer, ShoppingBag, Radio,
  MoreVertical, CheckCheck, Eye
} from 'lucide-react';

export default function App() {
  // VSL State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(342); // 5:42 video duration
  const [showTranscript, setShowTranscript] = useState(false);
  const [viewerCount, setViewerCount] = useState(3425);

  // Dynamic live buyers count (starts around 3421 and increments)
  const [lifeChangedCount, setLifeChangedCount] = useState(3421);

  // Recent buyer popup toast state
  const [recentBuyer, setRecentBuyer] = useState({ name: "Lucas Mendes (SP)", time: "Há 12 segundos" });
  const [showBuyerToast, setShowBuyerToast] = useState(true);

  // Black Friday Countdown Timer State (e.g. 11 hours 42 mins 15 secs)
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 42, seconds: 15 });

  // Income Calculator State
  const [mapsPerMonth, setMapsPerMonth] = useState(4);
  const [pricePerMap, setPricePerMap] = useState(1500);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', paymentMethod: 'pix' });

  // Simulated VSL timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Randomize viewer count and life changed count to simulate active purchases
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 7) - 3);
      if (Math.random() > 0.4) {
        setLifeChangedCount(prev => prev + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Cycle recent buyers every 7 seconds
  useEffect(() => {
    const buyersList = [
      { name: "Lucas Mendes (SP)", time: "Há alguns segundos" },
      { name: "Matheus Rodrigues (RJ)", time: "Há 1 minuto" },
      { name: "Gabriel Souza (MG)", time: "Há 45 segundos" },
      { name: "João Victor (PR)", time: "Há 2 minutos" },
      { name: "Felipe Azevedo (SC)", time: "Há 30 segundos" },
      { name: "Carlos Eduardo (BA)", time: "Há 1 minuto" },
      { name: "Rafael Silveira (RS)", time: "Há 10 segundos" },
    ];

    const buyerInterval = setInterval(() => {
      setShowBuyerToast(false);
      setTimeout(() => {
        const randomBuyer = buyersList[Math.floor(Math.random() * buyersList.length)];
        setRecentBuyer(randomBuyer);
        setShowBuyerToast(true);
      }, 500);
    }, 7000);

    return () => clearInterval(buyerInterval);
  }, []);

  // Black Friday countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainSecs = secs % 60;
    return `${mins}:${remainSecs < 10 ? '0' : ''}${remainSecs}`;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Por favor, preencha seu nome e e-mail.');
      return;
    }
    setCheckoutStep('success');
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 selection:bg-rose-500 selection:text-white overflow-x-hidden relative pb-16">
      

      {/* TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800 px-4 md:px-8 py-3.5 flex items-center justify-center">
        {/* Zone 1: Brand wordmark centered */}
        <a href="#" className="flex items-center justify-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ec4899] via-[#8b5cf6] to-[#06b6d4] flex items-center justify-center font-black text-white text-sm tracking-wider shadow-lg shadow-pink-500/25 border border-pink-400/40 group-hover:scale-105 transition-transform duration-200">
            GTA
          </div>
          <span className="text-lg sm:text-xl font-black tracking-tight text-white whitespace-nowrap">
            Mestres do <span className="text-amber-400">GTA VI RP</span>
          </span>
        </a>
      </header>

      {/* HERO SECTION WITH VSL */}
      <section id="vsl" className="relative pt-12 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        
        {/* Live Online Count Badge above Headline */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] sm:text-xs font-medium text-zinc-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span><strong className="text-white font-mono">{viewerCount.toLocaleString('pt-BR')}</strong> pessoas online agora</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Saia do <span className="text-rose-500 font-extrabold">CLT</span> faturando de <span className="text-amber-400">R$ 5.000 a R$ 20.000 por Mês</span> Programando Mapas para o GTA VI RP Usando Apenas IA
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Descubra o método inédito que permite a qualquer iniciante criar mapas, cidades e sistemas hiper-realistas para servidores FiveM e GTA VI RP em minutos — <strong className="text-white">sem saber escrever uma única linha de código.</strong>
          </p>
        </div>

        {/* VSL VIDEO PLAYER CONTAINER */}
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
          
          {/* Live Viewer badge in RED */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-rose-500/40 text-xs font-medium text-rose-500">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-rose-500 font-bold">🔴 {viewerCount} pessoas assistindo agora</span>
          </div>

          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1 bg-rose-500 text-white font-bold backdrop-blur-md rounded-full text-xs uppercase tracking-wider shadow-md">
            🔥 Black Friday Ativa
          </div>

          {/* Video Screen / Poster */}
          <div className="relative aspect-video w-full bg-zinc-900 group cursor-pointer overflow-hidden" onClick={() => setIsPlaying(!isPlaying)}>
            <img 
              src="/src/assets/images/gta6_hero_banner_1793160202521.jpg" 
              alt="GTA VI RP Map Maker Preview" 
              className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105 opacity-90' : 'group-hover:scale-105'}`}
            />
            
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 flex flex-col items-center justify-center">
              {!isPlaying && (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-rose-500 hover:bg-rose-400 text-white flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 animate-pulse">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1" />
                </div>
              )}

              {!isPlaying && (
                <div className="mt-4 text-center px-4">
                  <p className="text-white font-bold text-lg sm:text-xl drop-shadow-md">CLIQUE PARA ASSISTIR À APRESENTAÇÃO SECRETA</p>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1">Descubra o segredo por trás do mercado bilionário do GTA RP</p>
                </div>
              )}
            </div>
          </div>

          {/* Video Controls Bar */}
          <div className="bg-zinc-900 px-4 py-3 border-t border-zinc-800 flex flex-col gap-2">
            {/* Progress bar */}
            <div className="relative w-full h-1.5 bg-zinc-800 rounded-full cursor-pointer overflow-hidden" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              setCurrentTime(Math.floor(pos * duration));
            }}>
              <div 
                className="absolute top-0 left-0 h-full bg-rose-500 transition-all"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-rose-500 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:text-rose-500 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="hover:text-white transition-colors underline underline-offset-4"
                >
                  {showTranscript ? 'Ocultar Transcrição' : 'Ver Transcrição'}
                </button>
                <button 
                  onClick={() => {
                    const el = document.documentElement;
                    if (!document.fullscreenElement) el.requestFullscreen();
                    else document.exitFullscreen();
                  }}
                  className="text-white hover:text-rose-500 transition-colors"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Transcript Drawer */}
          {showTranscript && (
            <div className="bg-zinc-950 p-6 border-t border-zinc-800 text-sm text-zinc-300 max-h-60 overflow-y-auto space-y-3 font-sans">
              <h4 className="font-bold text-white mb-2">Transcrição do Vídeo Exclusivo:</h4>
              <p><strong>[0:00]</strong> "Se você acha que precisa passar 5 anos na faculdade de Ciência da Computação para ganhar dinheiro com jogos, você está completamente errado..."</p>
              <p><strong>[1:15]</strong> "Com a chegada explosiva do ecossistema do GTA VI RP e o avanço das IAs generativas, qualquer pessoa pode criar mapas personalizados de alto padrão em questão de minutos."</p>
              <p><strong>[2:30]</strong> "Donos de servidores estão pagando entre R$ 1.500 e R$ 5.000 por cada mapa ou sistema otimizado. Aproveite o preço de <span className="text-rose-500 font-bold">Black Friday</span> porque essa condição vai sair do ar em breve..."</p>
            </div>
          )}
        </div>

        {/* Hero CTA Button (Pulsing) */}
        <div className="text-center mt-10">
          <button 
            onClick={scrollToPricing}
            className="w-full sm:w-auto px-12 py-6 bg-rose-500 hover:bg-rose-400 text-white font-black text-xl sm:text-2xl rounded-2xl shadow-xl shadow-rose-500/40 transition-all transform hover:scale-105 flex items-center justify-center gap-3 mx-auto animate-pulse"
          >
            <span>QUERO MUDAR DE VIDA COM GTA VI RP</span>
            <ArrowRight className="w-7 h-7" />
          </button>
          <p className="text-xs text-zinc-400 mt-3">⚡ Oferta exclusiva de <span className="text-rose-500 font-bold">Black Friday</span> — <span className="text-rose-500">Desconto</span> válido apenas hoje.</p>
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section className="border-y border-zinc-800 bg-[#0c0c0e] py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">+R$ 2.4 Milhões</div>
            <div className="text-xs text-zinc-400 mt-1">Faturados por alunos no último ano</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">+1.250</div>
            <div className="text-xs text-zinc-400 mt-1">Servidores de GTA RP usando nossos mapas</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">Zero</div>
            <div className="text-xs text-zinc-400 mt-1">Conhecimento prévio em programação necessário</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100% com IA</div>
            <div className="text-xs text-zinc-400 mt-1">Metodologia 100% validada e prática</div>
          </div>
        </div>
      </section>

      {/* FAMOUS STREAMERS SECTION (GTA RP & GTA VI) */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold mb-4">
            <Radio className="w-4 h-4 text-rose-500" />
            <span>Grandes Nomes do Cenário</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Os Maiores Streamers de GTA RP Já se Preparam para o GTA VI
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto text-sm sm:text-base">
            Os maiores ícones das transmissões do Brasil dominam o cenário de Roleplay e movimentam milhões de fãs. Quem criar os melhores mapas para eles vai faturar alto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Streamer 1: Cerol */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:border-zinc-700 transition-all group">
            <div className="aspect-square relative overflow-hidden bg-zinc-950">
              <img 
                src="/assets/aistudio/images__2__eb194e58.jpg" 
                alt="Cerol" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-white">Cerol</h3>
            </div>
          </div>

          {/* Streamer 2: Paulinho O Loko */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:border-zinc-700 transition-all group">
            <div className="aspect-square relative overflow-hidden bg-zinc-950">
              <img 
                src="/assets/aistudio/images_aca61ee6.jpg" 
                alt="Paulinho O Loko" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-white">Paulinho O Loko</h3>
            </div>
          </div>

          {/* Streamer 3: Coringa */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:border-zinc-700 transition-all group">
            <div className="aspect-square relative overflow-hidden bg-zinc-950">
              <img 
                src="/assets/aistudio/images__1__1b5fff10.jpg" 
                alt="Coringa" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-white">Coringa</h3>
            </div>
          </div>

          {/* Streamer 4: Luquet4 */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:border-zinc-700 transition-all group">
            <div className="aspect-square relative overflow-hidden bg-zinc-950">
              <img 
                src="/assets/aistudio/images__3__481fe476.jpg" 
                alt="Luquet4" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-white">Luquet4</h3>
            </div>
          </div>
        </div>
      </section>

      {/* WHY GTA VI RP + AI IS THE BIGGEST GOLDMINE */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>O Maior Boom da História dos Games</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              Por que o Mercado de GTA VI RP vai Criar os Novos Milionários Digitais?
            </h2>
            <p className="text-zinc-300 mb-4 leading-relaxed">
              O lançamento do GTA VI vai movimentar bilhões de dólares em servidores de Roleplay. Donos de servidores do mundo todo estão desesperados por mapas exclusivos, ilhas paradisíacas, boates futuristas e sistemas otimizados.
            </p>
            <p className="text-zinc-300 mb-6 leading-relaxed">
              Antigamente, você precisaria de uma equipe de 10 programadores e designers 3D trabalhando por meses. <strong className="text-white">Hoje, com as técnicas avançadas de IA que ensinamos, você faz o trabalho de um mês em apenas 45 minutos.</strong>
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-200">Demanda infinita por novos mapas e otimizações.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-200">Margem de lucro de quase 100% (custo zero com infraestrutura).</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-200">Trabalhe de casa, direto do seu computador, cobrando em Reais ou Dólares.</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl">
              <img 
                src="/src/assets/images/course_module_ai_1793160202557.jpg" 
                alt="AI Code Generator Dashboard" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* INCOME CALCULATOR SECTION */}
      <section id="calculator" className="py-20 px-4 md:px-8 bg-[#0c0c0e] border-y border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Quanto Você Pode Ganhar por Mês?
          </h2>
          <p className="text-zinc-300 mb-10 max-w-2xl mx-auto">
            Simule seu potencial de ganhos criando mapas automatizados por IA para servidores de GTA RP.
          </p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-xl text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Slider 1 */}
              <div>
                <label className="block text-sm font-bold text-white mb-2 flex justify-between">
                  <span>Mapas Criados por Mês:</span>
                  <span className="text-rose-500 font-mono text-lg">{mapsPerMonth} mapas</span>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="15" 
                  value={mapsPerMonth} 
                  onChange={(e) => setMapsPerMonth(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-1">
                  <span>1 mapa</span>
                  <span>15 mapas</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div>
                <label className="block text-sm font-bold text-white mb-2 flex justify-between">
                  <span>Preço Médio Cobrado por Mapa:</span>
                  <span className="text-rose-500 font-mono text-lg">R$ {pricePerMap.toLocaleString('pt-BR')}</span>
                </label>
                <input 
                  type="range" 
                  min="500" 
                  max="5000" 
                  step="250"
                  value={pricePerMap} 
                  onChange={(e) => setPricePerMap(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-1">
                  <span>R$ 500</span>
                  <span>R$ 5.000</span>
                </div>
              </div>
            </div>

            {/* Total Result Box */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 text-center">
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-1">Seu Faturamento Potencial Estimado:</p>
              <div className="text-4xl sm:text-5xl font-extrabold text-rose-500 font-mono my-2">
                R$ {(mapsPerMonth * pricePerMap).toLocaleString('pt-BR')},00 <span className="text-sm text-zinc-400 font-sans font-normal">/ mês</span>
              </div>
              <p className="text-xs text-zinc-400 mt-2">Trabalhando poucas horas por semana com auxílio de Inteligência Artificial.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION: Pessoas que já começaram antes de lançar o GTA VI */}
      <section id="provas-sociais" className="py-20 px-2 sm:px-4 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-10 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] sm:text-xs font-medium text-zinc-300 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span><strong className="text-white font-mono">{viewerCount.toLocaleString('pt-BR')}</strong> pessoas online agora</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Pessoas que já começaram antes de lançar o GTA VI
          </h2>
          <p className="text-zinc-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Veja conversas reais de alunos que não esperaram o jogo sair: já estão fechando parcerias, vendendo acessos, criando servidores e faturando alto com IA.
          </p>
        </div>

        {/* Automatic Continuous Slow Marquee Container (No manual buttons, advances smoothly on its own) */}
        <div className="relative w-full overflow-hidden select-none py-2">
          {/* Subtle side fade gradients for smooth entering and exiting cards */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-zinc-950 via-zinc-950/70 to-transparent z-10" />

          {/* Continuous slow-scrolling track */}
          <div className="animate-marquee-slow flex items-center gap-5 sm:gap-6">
            {[1, 2].map((cycle) => (
              <React.Fragment key={`cycle-${cycle}`}>
                {/* Card 1: Print real 1 enviado pelo usuário (Servidor Pronto) */}
                <div className="bg-[#111b21] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px] w-[330px] sm:w-[370px] flex-shrink-0">
                  <div className="relative w-full h-full bg-[#0b141a] overflow-hidden">
                    <img 
                      src="/assets/aistudio/Conversa_WhatsApp_em_Tema_Escuro_e052e497.png" 
                      alt="Conversa WhatsApp aluno com servidor pronto" 
                      className="w-full h-full object-cover object-top select-none"
                    />
                  </div>
                </div>

                {/* Card 2: Print real 2 enviado pelo usuário (Contratos e Parcerias) */}
                <div className="bg-[#111b21] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px] w-[330px] sm:w-[370px] flex-shrink-0">
                  <div className="relative w-full h-full bg-[#0b141a] overflow-hidden">
                    <img 
                      src="/assets/aistudio/Conversa_sobre_o_lan_amento_do_GTA_6_36bb1bb8.png" 
                      alt="Conversa WhatsApp contratos e pagamentos com IA" 
                      className="w-full h-full object-cover object-top select-none"
                    />
                  </div>
                </div>

                {/* Card 3: Gabriel Alcântara (Dev Freelancer de Mapas) */}
                <div className="bg-[#111b21] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px] w-[330px] sm:w-[370px] flex-shrink-0">
                  <div className="p-4 bg-[#0b141a] space-y-2.5 flex-1 flex flex-col justify-between text-[13px] leading-relaxed select-none overflow-y-auto">
                    <div className="space-y-2.5">
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm">
                        <p>Irmão do céu, tu não vai acreditar kkkkk</p>
                        <p className="mt-1">Fechei com uma facção do servidor Complexo pra criar a favela deles no GTA VI RP!</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1">14:22</span>
                      </div>
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm">
                        <p>Usei a IA do método pra renderizar o mapa 3D completo em menos de 1 hora.</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1">14:23</span>
                      </div>
                      <div className="bg-[#005c4b] text-slate-100 p-2.5 rounded-2xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
                        <p>Caraca Gabriel!! Quanto você cobrou deles? 👏</p>
                        <span className="text-[10px] text-emerald-300 flex items-center justify-end gap-1 mt-1">
                          14:25 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </span>
                      </div>
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[92%] shadow-sm">
                        <p>Mandei proposta de R$ 3.800,00 e aceitaram na hora! Já caiu 50% de entrada no PIX (R$ 1.900,00)!</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1.5">14:27</span>
                      </div>
                      <div className="bg-[#005c4b] text-slate-100 p-2 rounded-2xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
                        <p>Sensacional demais irmão! Recuperou 20x o curso antes do jogo sair! 🔥</p>
                        <span className="text-[10px] text-emerald-300 flex items-center justify-end gap-1 mt-1">
                          14:28 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 4: Matheus Vinicius (Dono de Servidor - Pré-Vendas) */}
                <div className="bg-[#111b21] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px] w-[330px] sm:w-[370px] flex-shrink-0">
                  <div className="p-4 bg-[#0b141a] space-y-2.5 flex-1 flex flex-col justify-between text-[13px] leading-relaxed select-none overflow-y-auto">
                    <div className="space-y-2.5">
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm">
                        <p>Fala mestre! Passando pra deixar meu feedback da consultoria e do pack.</p>
                        <p className="mt-1">Abri a pré-venda de VIPs e mansões personalizadas pro servidor que montei com os scripts da IA.</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1">18:04</span>
                      </div>
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm">
                        <p>Bateu mais de 1.800 membros no Discord em 4 dias só com os teasers que a IA gerou.</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1">18:06</span>
                      </div>
                      <div className="bg-[#005c4b] text-slate-100 p-2.5 rounded-2xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
                        <p>Que massa Matheus! E a galera já comprou antes de lançar o GTA VI?</p>
                        <span className="text-[10px] text-emerald-300 flex items-center justify-end gap-1 mt-1">
                          18:08 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </span>
                      </div>
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[92%] shadow-sm">
                        <p>Demais! Já vendemos 47 passes VIPs Antecipados. Já bateu mais de R$ 7.050,00 na semana!</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1.5">18:10</span>
                      </div>
                      <div className="bg-[#005c4b] text-slate-100 p-2 rounded-2xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
                        <p>Visão pura! Enquanto muitos esperam, vocês já estão faturando alto! 🚀</p>
                        <span className="text-[10px] text-emerald-300 flex items-center justify-end gap-1 mt-1">
                          18:11 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 5: Felipe Andrade (Saiu do CLT) */}
                <div className="bg-[#111b21] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px] w-[330px] sm:w-[370px] flex-shrink-0">
                  <div className="p-4 bg-[#0b141a] space-y-2.5 flex-1 flex flex-col justify-between text-[13px] leading-relaxed select-none overflow-y-auto">
                    <div className="space-y-2.5">
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm">
                        <p>Mano, preciso te agradecer de coração.</p>
                        <p className="mt-1">Eu trabalhava 10h por dia no mercado ganhando 1 salário mínimo no <span className="text-rose-400 font-bold">CLT</span> e sem tempo pra nada.</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1">10:15</span>
                      </div>
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm">
                        <p>Fiz o primeiro mapa de concessionária pra um servidor usando a IA semana passada.</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1">10:17</span>
                      </div>
                      <div className="bg-[#005c4b] text-slate-100 p-2.5 rounded-2xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
                        <p>Que orgulho irmão! E como foram os outros projetos?</p>
                        <span className="text-[10px] text-emerald-300 flex items-center justify-end gap-1 mt-1">
                          10:19 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </span>
                      </div>
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[92%] shadow-sm">
                        <p>Me indicaram pra mais 2 servidores de streamers. Fechei R$ 6.200 em 15 dias!</p>
                        <p className="mt-1 font-bold text-rose-400">Hoje entreguei minha demissão do CLT. Vou viver 100% de IA no GTA VI RP! 🚀</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1.5">10:22</span>
                      </div>
                      <div className="bg-[#005c4b] text-slate-100 p-2 rounded-2xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
                        <p>Essa liberdade não tem preço! Parabéns por largar o CLT irmão! 🦅</p>
                        <span className="text-[10px] text-emerald-300 flex items-center justify-end gap-1 mt-1">
                          10:24 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 6: Lucas Henrique (Mods e Carros com IA) */}
                <div className="bg-[#111b21] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px] w-[330px] sm:w-[370px] flex-shrink-0">
                  <div className="p-4 bg-[#0b141a] space-y-2.5 flex-1 flex flex-col justify-between text-[13px] leading-relaxed select-none overflow-y-auto">
                    <div className="space-y-2.5">
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm">
                        <p>Olha esse teste com o gerador de texturas e física que você ensinou no módulo 3...</p>
                        <p className="mt-1">Criei um pack com 12 viaturas da ROTA e BOPE customizadas pro GTA VI RP.</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1">16:40</span>
                      </div>
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm">
                        <p>Coloquei pra vender num fórum gringo e nos grupos de RP brasileiros.</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1">16:42</span>
                      </div>
                      <div className="bg-[#005c4b] text-slate-100 p-2.5 rounded-2xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
                        <p>E a procura foi boa, Lucas?</p>
                        <span className="text-[10px] text-emerald-300 flex items-center justify-end gap-1 mt-1">
                          16:44 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </span>
                      </div>
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[92%] shadow-sm">
                        <p>Vendeu 23 cópias em 48h a R$ 120 cada! Mais de R$ 2.760 no bolso sem esforço!</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1.5">16:46</span>
                      </div>
                      <div className="bg-[#005c4b] text-slate-100 p-2 rounded-2xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
                        <p>Quem souber usar IA agora vai monopolizar o mercado do GTA VI! 🚀</p>
                        <span className="text-[10px] text-emerald-300 flex items-center justify-end gap-1 mt-1">
                          16:48 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>


      {/* PRICING & BLACK FRIDAY OFFER SECTION (Main Checkout Button at Bottom) */}
      <section id="pricing-section" className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 p-8 sm:p-12 shadow-2xl">
          
          <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-extrabold px-6 py-2 rounded-bl-2xl uppercase tracking-widest shadow-md">
            ⚡ <span className="underline">BLACK FRIDAY</span>: 80% OFF
          </div>

          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] sm:text-xs font-medium text-zinc-300 mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span><strong className="text-white font-mono">{viewerCount.toLocaleString('pt-BR')}</strong> pessoas online agora</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Bora sair do <span className="text-rose-500 font-extrabold">CLT</span> aproveitando esse mega <span className="text-rose-500 font-extrabold underline">desconto</span> da <span className="text-rose-500">Black Friday</span>.
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base font-semibold">
              Essa é uma oportunidade única da sua vida e nunca mais vai aparecer, então aproveite.
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto mb-8 text-center">
            <div className="inline-block bg-zinc-900 border border-zinc-800 text-rose-500 px-3 py-1 rounded-full text-xs font-bold uppercase mb-3">
              Economia de R$ 650,00 HOJE
            </div>
            
            {/* Preço Riscado (Âncora de R$ 797,00) */}
            <div className="flex items-center justify-center gap-2 mb-2 text-zinc-400 text-sm">
              <span>De</span>
              <span className="text-zinc-500 text-lg sm:text-xl font-bold line-through">R$ 797,00</span>
              <span>por apenas</span>
            </div>

            {/* Installment Price LARGER as primary, Cash Price smaller underneath (R$ 147) */}
            <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Parcelado no Cartão em até 12x</div>
            <div className="text-4xl sm:text-6xl lg:text-7xl font-black text-rose-500 tracking-tight drop-shadow-[0_0_35px_rgba(244,63,94,0.35)] mb-2 flex items-baseline justify-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-zinc-300">12x de</span>
              <span className="bg-gradient-to-r from-rose-400 via-rose-500 to-red-500 bg-clip-text text-transparent">R$ 15,14</span>
            </div>
            <div className="text-zinc-400 text-sm mb-6 flex items-center justify-center gap-1.5 font-medium">
              <span>ou</span>
              <span className="text-white font-bold bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded-md text-base">R$ 147,00</span>
              <span>à vista</span>
            </div>

            <div className="space-y-3 text-left mb-8 border-t border-zinc-800 pt-6">
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <Check className="w-5 h-5 text-rose-500 shrink-0" />
                <span>Acesso Vitalício a Todos os Módulos Práticos do Zero ao Avançado</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <Check className="w-5 h-5 text-rose-500 shrink-0" />
                <span>Pack com +100.000 Prompts Prontos para IA Gerar Mapas e Códigos</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <Check className="w-5 h-5 text-rose-500 shrink-0" />
                <span>Comunidade VIP no Discord com Donos de Servidores</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <Check className="w-5 h-5 text-rose-500 shrink-0" />
                <span className="font-bold text-rose-400">50 IAs grátis para usar</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <Check className="w-5 h-5 text-rose-500 shrink-0" />
                <span className="font-bold text-rose-400">Ferramentas secretas de mapeamento 3D</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <Check className="w-5 h-5 text-rose-500 shrink-0" />
                <span className="font-bold text-rose-400">Suporte direto com especialistas</span>
              </div>
            </div>

            {/* MAIN CHECKOUT BUTTON AT BOTTOM (Pulsing) */}
            <a 
              href="https://pay.kirvano.com/e5337846-5d0d-4b85-9aba-9a3911e13492"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-6 bg-rose-500 hover:bg-rose-400 text-white font-black text-xl rounded-2xl shadow-xl shadow-rose-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-3 animate-pulse text-center"
            >
              <Zap className="w-6 h-6 fill-white" />
              <span>QUERO MUDAR DE VIDA E FATURAR ALTO</span>
            </a>
          </div>

          {/* Guarantee Badge */}
          <div className="flex items-center justify-center gap-4 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-rose-500 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-white text-sm">Garantia Incondicional de 7 Dias</h4>
              <p className="text-xs text-zinc-400">Se você não gostar ou achar que não é para você, devolvemos 100% do seu dinheiro sem burocracia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 px-4 md:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
            <span>Dúvidas Frequentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-zinc-300">
            Tudo o que você precisa saber antes de dar o próximo passo.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Preciso saber programar ou ter experiência anterior?",
              a: "Absolutamente não! O treinamento foi desenhado exatamente para quem é iniciante absoluto. A inteligência artificial faz todo o trabalho pesado de programação; você só precisa saber direcionar com os comandos certos que ensinamos."
            },
            {
              q: "Por que o preço está tão baixo (<span class='text-rose-500'>Black Friday</span>)?",
              a: "Esta é nossa campanha anual de <span className='text-rose-500 font-bold'>Black Friday</span>. Decidimos liberar o treinamento completo por apenas R$ 147 à vista ou 12x de R$ 14,70 para formar a maior turma de programadores de GTA VI RP do Brasil antes do lançamento oficial do GTA VI."
            },
            {
              q: "Como vou receber o acesso ao treinamento?",
              a: "Imediatamente após a confirmação do pagamento (via PIX ou cartão), você receberá os dados de acesso em seu e-mail cadastrado."
            },
            {
              q: "O mercado de GTA RP realmente paga bem?",
              a: "Sim. Donos de servidores de GTA RP movimentam milhares de reais mensalmente com doações e VIPs. Eles investem pesado em mapas exclusivos e otimizados para atrair jogadores."
            },
            {
              q: "E se eu não gostar do curso?",
              a: "Você tem 7 dias de garantia total. Basta nos enviar um único e-mail e devolveremos 100% do seu investimento, sem perguntas."
            }
          ].map((item, idx) => (
            <div key={idx} className="border border-zinc-800 bg-zinc-900 rounded-xl overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-sm sm:text-base"
              >
                <span dangerouslySetInnerHTML={{ __html: item.q }}></span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 text-rose-500" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-0 text-zinc-300 text-sm leading-relaxed border-t border-zinc-800 pt-3" dangerouslySetInnerHTML={{ __html: item.a }}>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-12 px-4 text-center text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center font-extrabold text-white text-xs">
              GTA
            </div>
            <span className="text-sm font-bold text-zinc-300">Mestres do GTA VI RP com IA — Edição <span className="text-rose-500 font-bold">Black Friday</span></span>
          </div>
          <p>© 2026 Mestres do GTA RP. Todos os direitos reservados. Rockstar Games.</p>
          <div className="flex justify-center gap-6 text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>
        </div>
      </footer>

      {/* FLOATING RECENT BUYER TOAST (Bottom fixed banner) */}
      {showBuyerToast && (
        <div className="fixed bottom-4 left-4 z-50 bg-zinc-900/95 border border-rose-500/40 backdrop-blur-md rounded-xl p-3.5 shadow-2xl flex items-center gap-3 animate-bounce max-w-xs">
          <div className="w-9 h-9 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-white">{recentBuyer.name}</span>
            <p className="text-rose-500 font-semibold">comprou e aproveitou a <span className="underline">Black Friday</span>!</p>
            <span className="text-[10px] text-zinc-400">{recentBuyer.time}</span>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
            <button 
              onClick={() => { setIsCheckoutOpen(false); setCheckoutStep('form'); }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {checkoutStep === 'form' ? (
              <div>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950 border border-rose-500/30 text-rose-500 text-xs font-semibold mb-2">
                    <Lock className="w-3 h-3" /> Checkout <span className="text-rose-500 font-bold">Black Friday</span> Seguro
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">Finalizar Inscrição</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    De <span className="line-through text-zinc-500 font-semibold">R$ 797,00</span> por <strong className="text-white">12x de R$ 15,14</strong> ou <strong className="text-rose-400">R$ 147 à vista</strong> (Economia de R$ 650,00)
                  </p>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">E-mail (para envio dos dados)</label>
                    <input 
                      type="email" 
                      required
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">WhatsApp / Telefone</label>
                    <input 
                      type="text" 
                      placeholder="(11) 99999-9999"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-2">Forma de Pagamento</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        type="button"
                        onClick={() => {}}
                        className={`p-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all border-rose-500 bg-rose-500/10 text-white`}
                      >
                        <Zap className="w-4 h-4 text-rose-500" /> PIX (Aprovação Imediata)
                      </button>
                      <button 
                        type="button"
                        onClick={() => {}}
                        className={`p-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all border-zinc-800 bg-zinc-950 text-zinc-400`}
                      >
                        <CreditCard className="w-4 h-4 text-zinc-400" /> Cartão 12x
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a 
                      href="https://pay.kirvano.com/e5337846-5d0d-4b85-9aba-9a3911e13492"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center w-full py-4 bg-rose-500 hover:bg-rose-400 text-white font-extrabold rounded-xl shadow-lg shadow-rose-500/30 transition-all text-sm animate-pulse"
                    >
                      GARANTIR PREÇO DE BLACK FRIDAY (R$ 147)
                    </a>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center ry-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Inscrição Pré-Confirmada!</h3>
                <p className="text-zinc-300 text-sm mb-6">
                  Parabéns, <strong>{formData.name}</strong>! Sua vaga de <span className="text-rose-500 font-bold">Black Friday</span> foi garantida e as instruções foram enviadas para <span className="text-rose-500">{formData.email}</span>.
                </p>
                <button 
                  onClick={() => { setIsCheckoutOpen(false); setCheckoutStep('form'); }}
                  className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs uppercase"
                >
                  Fechar Janela
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
