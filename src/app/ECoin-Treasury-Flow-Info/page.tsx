"use client";

import Link from "next/link";

export default function ECoinTreasuryFlowInfo() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-20 lg:px-32 text-gray-900">

      <h1 className="text-4xl font-bold text-center mb-12 text-[#D4AF37]">
        💰 Fluxo de Caixa – Conversor E-Coin / USDT
      </h1>

      <div className="space-y-12">

        {/* 1️⃣ Entrada de usuários */}
        <section className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">1️⃣ Entrada de usuários (Buy-in)</h2>
          <p className="mb-2">Taxa cobrada: <span className="font-semibold">0,5%</span> sobre o valor de entrada.</p>
          <p className="mb-2">
            Exemplo: usuário converte <span className="font-semibold">1.000 USDT → E-Coin</span>:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Taxa: 1.000 * 0.5% = 5 USDT</li>
            <li>Valor convertido: 1.000 - 5 = 995 USDT em E-Coin.</li>
          </ul>
          <p className="mb-2">Se 1 milhão de usuários fizerem isso:</p>
          <ul className="list-disc list-inside">
            <li>Taxa total coletada: 1.000.000 * 5 = 5.000.000 USDT.</li>
          </ul>
          <p className="mt-4 font-semibold">
            Distribuição real:
          </p>
          <ul className="list-disc list-inside">
            <li>70% dos USDT entram no <span className="text-green-600 font-semibold">TreasuryVault</span> → cobre futuras conversões de E-Coin → USDT.</li>
            <li>30% dos USDT vão para o <span className="text-blue-600 font-semibold">LiquidityReserveVault</span> → prepara liquidez para listagem e market making.</li>
          </ul>
          <p className="mt-2 text-green-700 font-semibold">✅ Esse é o “cofre principal” que garante sustentabilidade do protocolo.</p>
        </section>

        {/* 2️⃣ Saída de usuários */}
        <section className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">2️⃣ Saída de usuários (Redeem / Convert back)</h2>
          <p className="mb-2">Taxa de saída: <span className="font-semibold">2,5%</span> sobre o valor que está dentro do sistema.</p>
          <p className="mb-2">
            Exemplo: usuário quer sacar 995 USDT em E-Coin → USDT:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Taxa: 995 * 2,5% ≈ 24,875 USDT</li>
            <li>Valor entregue ao usuário: 995 - 24,875 ≈ 970,125 USDT</li>
          </ul>
          <p className="mb-2">
            No total de 1 milhão de usuários:
          </p>
          <ul className="list-disc list-inside mb-2">
            <li>Entrada: 5.000.000 USDT (taxa 0,5%)</li>
            <li>Saída: 24.875.000 USDT (taxa 2,5%)</li>
          </ul>
          <p className="mb-2">Total retido pelo protocolo: ~29,875.000 USDT</p>
          <p className="text-gray-700">💡 Observação: essas taxas não saem do treasury, elas são convertidas em E-Coin para staking e buyback, mas 70% do valor permanece em USDT para garantir liquidez.</p>
        </section>

        {/* 3️⃣ Distribuição de taxas */}
        <section className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">3️⃣ Distribuição de taxas pelo ConvertFeeCollector</h2>
          <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Destino</th>
                <th className="border border-gray-300 px-4 py-2 text-left">BP (%)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Treasury</td>
                <td className="border border-gray-300 px-4 py-2">20%</td>
                <td className="border border-gray-300 px-4 py-2">Cobertura de liquidez interna (em USDT)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Buyback</td>
                <td className="border border-gray-300 px-4 py-2">30%</td>
                <td className="border border-gray-300 px-4 py-2">Compra de E-Coin no mercado para manter preço estável</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">LP Vault</td>
                <td className="border border-gray-300 px-4 py-2">20%</td>
                <td className="border border-gray-300 px-4 py-2">Adição de liquidez para pools de negociação</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Staking</td>
                <td className="border border-gray-300 px-4 py-2">10%</td>
                <td className="border border-gray-300 px-4 py-2">Pagamento de rewards em E-Coin aos stakers</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Reserve</td>
                <td className="border border-gray-300 px-4 py-2">20%</td>
                <td className="border border-gray-300 px-4 py-2">Fundo de segurança / contingência</td>
              </tr>
            </tbody>
          </table>
          <p>Importante: os valores que vão para staking e buyback são pagos em E-Coin, não USDT.</p>
          <p className="mt-2 text-green-700 font-semibold">
            70% do valor das taxas fica em USDT no TreasuryVault, garantindo que o sistema possa responder aos conversions back (E-Coin → USDT) mesmo se houver grandes saídas.
          </p>
        </section>

        {/* 4️⃣ Sustentabilidade e controles */}
        <section className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">4️⃣ Sustentabilidade e controles do sistema</h2>
          <p>O contrato <span className="font-semibold">CorporateSwap</span> aplica:</p>
          <ul className="list-disc list-inside mt-2">
            <li><span className="font-semibold">Controle de saída (_maxOutflowUSD):</span> Baseado na cobertura do treasury vs. supply total de E-Coin. Limita quanto USDT pode sair em cada epoch de 1 hora.</li>
            <li><span className="font-semibold">Pressão de venda (sellPressure):</span> Se houver transações muito concentradas, reduz a quantidade máxima de saída.</li>
            <li><span className="font-semibold">Anti-flash loan / cooldown:</span> Evita que um mesmo endereço faça compras e vendas rápidas.</li>
          </ul>
          <p className="mt-2 text-green-700 font-semibold">✅ Isso garante que, mesmo em cenários de alto volume, o treasury consegue honrar conversões e pagamentos de staking/referência.</p>
        </section>

        {/* 5️⃣ Pagamento de claims e comissões */}
        <section className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">5️⃣ Pagamento de claims e comissões de referência</h2>
          <ul className="list-disc list-inside">
            <li><span className="font-semibold">Claims de staking:</span> Recebem E-Coin diretamente do ConvertFeeCollector. Valores distribuídos proporcionalmente aos stakers ativos.</li>
            <li><span className="font-semibold">Comissões de referência:</span> Também pagas em E-Coin, retiradas do mesmo pool do staking/buyback.</li>
          </ul>
          <p className="mt-2">
            O fluxo de USDT do treasury garante que quando um usuário converte E-Coin → USDT, há cobertura suficiente para honrar o valor da conversão.
          </p>
          <p className="mt-4 font-semibold">💡 Fluxo resumido:</p>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
Usuário compra E-Coin (USDT) 
       ↓
Taxa 0,5% → ConvertFeeCollector
       ↓
Distribuição:
  70% USDT → TreasuryVault (garante conversões)
  30% USDT → LiquidityReserveVault (liquidez de mercado)
  10% E-Coin → Staking (claims)
  30% E-Coin → Buyback (mantém preço)
  20% E-Coin → Reserve (contingência)
       ↓
Usuário saca E-Coin → USDT
       ↓
TreasuryVault cobre 70% em USDT
Claims e referências pagas em E-Coin
          </pre>
        </section>

        {/* 6️⃣ Observações */}
        <section className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">6️⃣ Observações importantes</h2>
          <ul className="list-disc list-inside">
            <li>O sistema não depende de entradas externas para pagar staking ou referências; as taxas do conversor sustentam isso.</li>
            <li>70% dos USDT permanecem no treasury → garante liquidez para conversões.</li>
            <li>30% dos USDT vão para reservas de liquidez → suportam listagem e pools de mercado.</li>
            <li>E-Coin do staking e buyback mantém incentivo e preço estável.</li>
            <li>O modelo é sólido, mas precisa monitorar:
              <ul className="list-disc list-inside ml-4">
                <li>Saídas concentradas (flash runs)</li>
                <li>Rounding / decimal errors</li>
                <li>Cobertura do treasury vs. supply total de E-Coin</li>
              </ul>
            </li>
          </ul>
        </section>

      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/ecoin-converter"
          className="inline-block px-10 py-4 bg-black text-white font-semibold rounded-full hover:bg-[#D4AF37] hover:text-black transition-all duration-300 shadow-lg"
        >
          Ir para o Conversor E-Coin →
        </Link>
      </div>

    </div>
  );
}