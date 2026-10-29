"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import ResponsiveShell from "@/components/eCoinCloudWallet/components/layout/ResponsiveShell";
import DashboardView from "@/components/eCoinCloudWallet/components/dashboard/DashboardView";
import { EcoinCloudWalletProviders } from "./providers";
import { ShieldCheck, Sparkles } from "lucide-react";

function WalletContent() {
  const { data: session, status } = useSession();
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [appleNotice, setAppleNotice] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogleLogin() {
    try {
      setError("");
      setLoadingProvider("google");
      await signIn("google", { callbackUrl: "/eCoinCloudWallet" });
    } catch (err) {
      setError("Falha ao iniciar autenticação com Google. Tente novamente.");
      setLoadingProvider(null);
    }
  }

  function handleAppleLogin() {
    setAppleNotice(true);
    setTimeout(() => setAppleNotice(false), 5000);
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080b12] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
          <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            Sincronizando Identidade Neural...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <main className="relative flex min-h-screen items-center justify-center bg-[#080b12] px-4 py-10 text-white overflow-hidden select-none">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00FF9C]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none" />

        <section className="relative z-10 w-full max-w-md rounded-[2.5rem] border border-[#D4AF37]/30 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          
          {/* Top Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3 h-3" />
              <span>Web3 Smart Vault</span>
            </div>
          </div>

          {/* Logo / Header */}
          <div className="text-center mb-8">
            <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#F9D13E] to-[#D4AF37] text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] border border-white/20">
              <div className="absolute inset-0 rounded-3xl border border-white/40 animate-pulse pointer-events-none" />
              <span className="text-3xl font-black font-mono">E</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              eCoin Smart Cloud Wallet
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 font-medium">
              Uma Identidade Descentralizada. A sua carteira inteligente de alta performance.
            </p>
          </div>

          {/* Login Actions */}
          <div className="space-y-3.5">
            {/* Google Button */}
            <button
              type="button"
              disabled={loadingProvider !== null}
              onClick={handleGoogleLogin}
              className="w-full relative group overflow-hidden rounded-2xl bg-white px-5 py-4 font-bold text-black shadow-xl transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.2 21.32 7.24 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.12 0 9.99 0 12s.43 3.88 1.19 5.42l4.09-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.24 0 3.2 2.68 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span className="text-sm font-extrabold tracking-wide">
                {loadingProvider === "google" ? "A conectar ao Google..." : "Continuar com Google"}
              </span>
            </button>

            {/* Apple Button (Com aviso de em desenvolvimento) */}
            <button
              type="button"
              onClick={handleAppleLogin}
              className="w-full relative group overflow-hidden rounded-2xl bg-[#12181F] border border-white/10 px-5 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:bg-black hover:border-[#D4AF37]/50 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2..77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.83 5.37c.56-.69.94-1.65.84-2.61-.82.04-1.82.55-2.41 1.24-.53.61-.99 1.59-.87 2.54.92.07 1.88-.47 2.44-1.17z"/>
              </svg>
              <span className="text-sm font-extrabold tracking-wide text-gray-200">
                Continuar com Apple
              </span>
            </button>
          </div>

          {/* Apple Dev Notice Banner */}
          {appleNotice && (
            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs text-center font-medium animate-pulse">
              ⚠️ A autenticação com Apple ID encontra-se atualmente em desenvolvimento. Por favor, utilize o Google.
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
              {error}
            </div>
          )}

          {/* Security Footnote */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-gray-500 text-[11px] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#00FF9C]" />
            <span>Segurança Criptográfica & Encriptação Ponta-a-Ponta</span>
          </div>
        </section>
      </main>
    );
  }

  return (
    <ResponsiveShell>
      <DashboardView />
    </ResponsiveShell>
  );
}

export default function WalletPage() {
  return (
    <EcoinCloudWalletProviders>
      <WalletContent />
    </EcoinCloudWalletProviders>
  );
}