export default function BuyEcoinLoading() {
  return (
    <main className="min-h-screen w-full bg-[#070B12] px-4 py-6 md:px-8">
      <div className="mx-auto w-full max-w-7xl animate-pulse space-y-6">
        <div className="h-12 w-full rounded-2xl bg-white/5" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5 rounded-2xl border border-white/10 bg-[#101923] p-5">
            <div className="h-6 w-40 rounded bg-white/10" />
            <div className="h-28 rounded-xl bg-white/5" />
            <div className="h-10 rounded-xl bg-white/5" />
            <div className="h-28 rounded-xl bg-white/5" />
            <div className="h-12 rounded-xl bg-white/10" />
          </div>

          <div className="space-y-4 rounded-2xl border border-white/10 bg-[#101923] p-5">
            <div className="h-5 w-36 rounded bg-white/10" />
            <div className="h-20 rounded-xl bg-white/5" />
            <div className="h-20 rounded-xl bg-white/5" />
            <div className="h-12 rounded-xl bg-white/10" />
          </div>
        </div>

        <p className="text-center text-xs text-neutral-500">
          A carregar o EdenKingDom Converter...
        </p>
      </div>
    </main>
  );
}