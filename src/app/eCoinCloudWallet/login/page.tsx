
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

type LoginProvider = "google";

export default function EcoinWalletLoginPage() {
  const [loading, setLoading] =
    useState<LoginProvider | null>(null);
  const [error, setError] = useState("");

  async function handleGoogleLogin() {
    try {
      setError("");
      setLoading("google");

      await signIn("google", {
        callbackUrl: "/eCoinCloudWallet",
      });
    } catch {
      setError(
        "Não foi possível iniciar o login com Google. Tenta novamente."
      );
      setLoading(null);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080b12] px-4 py-10 text-white">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F9D13E] text-2xl font-black text-black">
            E
          </div>

          <h1 className="text-2xl font-bold">
            eCoin Cloud Wallet
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Uma identidade. A tua carteira inteligente.
          </p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            disabled={loading !== null}
            onClick={handleGoogleLogin}
            className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading === "google"
              ? "A abrir Google..."
              : "Continuar com Google"}
          </button>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 text-sm text-red-400"
          >
            {error}
          </p>
        )}

        <p className="mt-6 text-center text-xs leading-5 text-gray-500">
          A autenticação permite aceder à tua identidade.
          A criação e autorização da carteira blockchain
          são etapas separadas.
        </p>
      </section>
    </main>
  );
}
