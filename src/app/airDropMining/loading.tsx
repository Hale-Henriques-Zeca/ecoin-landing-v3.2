export default function ECoinDualAirdropMiningLoading() {
  return (
    <main className="min-h-screen w-full bg-[#070B12] text-white">
      <section className="mx-auto w-full max-w-6xl animate-pulse space-y-6 px-4 py-6">
        {/* Skeleton do Header Principal */}
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-r from-black via-slate-950 to-[#111] p-6">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            {/* Lado Esquerdo: Título, Subtítulo, Temporada, Profile & Logout */}
            <div className="space-y-4">
              <div className="space-y-2.5">
                <div className="h-5 w-48 rounded-full bg-[#D4AF37]/15" />
                <div className="h-8 w-72 rounded-xl bg-white/10 sm:w-96" />
                <div className="h-4 w-64 rounded bg-white/5 sm:w-80" />
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="h-9 w-44 rounded-xl border border-emerald-500/20 bg-black/60" />
                <div className="h-9 w-64 rounded-xl border border-white/10 bg-white/5" />
              </div>
            </div>

            {/* Lado Direito: Card PancakeSwap Market & Binance */}
            <div className="w-full shrink-0 space-y-2.5 rounded-2xl border border-[#D4AF37]/25 bg-black/60 p-4 lg:w-72">
              <div className="h-3.5 w-44 rounded bg-white/10 lg:ml-auto" />
              <div className="h-11 w-full rounded-xl bg-[#D4AF37]/25" />
              <div className="h-3 w-40 rounded bg-white/5 lg:ml-auto" />
              <div className="h-6 w-56 rounded-lg bg-[#D4AF37]/10 lg:ml-auto" />
            </div>
          </div>
        </div>

        {/* Skeleton Seletor Mobile */}
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-slate-900/80 p-1.5 md:hidden">
          <div className="h-9 rounded-xl bg-[#D4AF37]/25" />
          <div className="h-9 rounded-xl bg-white/5" />
        </div>

        {/* Skeleton dos 2 Cards de Mineração (E-Coin & E-USD) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[0, 1].map((card) => (
            <div
              key={card}
              className={`space-y-5 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-black to-slate-900 p-6 ${
                card === 1 ? "hidden md:block" : ""
              }`}
            >
              {/* Cabeçalho do Token */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="h-6 w-36 rounded bg-white/10" />
                  <div className="h-3.5 w-44 rounded bg-white/5" />
                </div>
                <div className="h-6 w-20 rounded-full bg-white/10" />
              </div>

              {/* Bloco Principal: Mining Realised Balance */}
              <div className="space-y-2 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5">
                <div className="mx-auto h-3.5 w-40 rounded bg-[#D4AF37]/20" />
                <div className="mx-auto h-9 w-52 rounded-lg bg-white/10" />
                <div className="mx-auto h-3 w-44 rounded bg-white/5" />
              </div>

              {/* Blocos Secundários: Available & Remaining */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="mx-auto h-3 w-24 rounded bg-white/5" />
                  <div className="mx-auto h-6 w-28 rounded bg-white/10" />
                </div>
                <div className="space-y-2 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="mx-auto h-3 w-24 rounded bg-white/5" />
                  <div className="mx-auto h-6 w-28 rounded bg-white/10" />
                </div>
              </div>

              {/* Taxas de Mineração */}
              <div className="space-y-3 rounded-xl border border-white/5 bg-black/40 p-4">
                <div className="h-3.5 w-48 rounded bg-white/5" />
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <div className="h-12 rounded-lg bg-black/60" />
                  <div className="h-12 rounded-lg bg-black/60" />
                  <div className="h-12 rounded-lg bg-black/60" />
                  <div className="h-12 rounded-lg bg-black/60" />
                </div>
              </div>

              {/* Barra de Progresso */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-3 w-32 rounded bg-white/5" />
                  <div className="h-3 w-12 rounded bg-[#D4AF37]/20" />
                </div>
                <div className="h-2.5 w-full rounded-full bg-white/10" />
              </div>

              {/* Bloco Motivacional de Referência (3 Níveis) */}
              <div className="space-y-3 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-4">
                <div className="h-4 w-56 rounded bg-[#D4AF37]/20" />
                <div className="h-10 w-full rounded-xl bg-black/50" />
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-14 rounded-xl bg-black/60" />
                  <div className="h-14 rounded-xl bg-black/60" />
                  <div className="h-14 rounded-xl bg-black/60" />
                </div>
              </div>

              {/* Botão Start Mining / Claim */}
              <div className="h-12 w-full rounded-xl bg-[#D4AF37]/25" />
            </div>
          ))}
        </div>

        <p className="text-center font-mono text-xs text-slate-500">
          A carregar o E-Coin Dual Airdrop & Mineração...
        </p>
      </section>
    </main>
  );
}