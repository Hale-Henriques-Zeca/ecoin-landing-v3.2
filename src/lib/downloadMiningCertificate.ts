export async function downloadMiningCertificate(
  session: any
) {

  const canvas =
    document.createElement("canvas");

  canvas.width = 1080;
  canvas.height = 1350;

  const ctx =
    canvas.getContext("2d");

  if (!ctx) return;

  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      1080,
      1350
    );

  gradient.addColorStop(
    0,
    "#0f172a"
  );

  gradient.addColorStop(
    1,
    "#111827"
  );

  ctx.fillStyle = gradient;
  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.strokeStyle = "#D4AF37";
  ctx.lineWidth = 8;

  ctx.strokeRect(
    40,
    40,
    1000,
    1270
  );

  ctx.fillStyle = "#D4AF37";

  ctx.font =
    "bold 58px Arial";

  ctx.textAlign = "center";

  ctx.fillText(
    "E-Coin Mining Certificate",
    540,
    140
  );

  ctx.fillStyle = "#ffffff";

  ctx.font =
    "32px Arial";

  ctx.fillText(
    `Session #${session.id}`,
    540,
    220
  );

  ctx.font =
    "24px Arial";

  let y = 320;

  const draw = (
    label: string,
    value: string
  ) => {

    ctx.fillStyle = "#D4AF37";

    ctx.fillText(
      label,
      540,
      y
    );

    y += 40;

    ctx.fillStyle = "#ffffff";

    ctx.fillText(
      value,
      540,
      y
    );

    y += 80;
  };

  draw(
    "Wallet",
    session.wallet
  );

  draw(
    "Upline",
    session.upline
  );

  draw(
    "Referral ID",
    session.referralCode
  );

  draw(
    "Gas Purchased",
    (
      Number(
        session.gasPurchased
      ) / 1e18
    ).toFixed(2)
  );

  draw(
    "Gas Consumed",
    (
      Number(
        session.gasConsumed
      ) / 1e18
    ).toFixed(2)
  );

  draw(
    "Claimed USDT",
    (
      Number(
        session.claimedUSDT
      ) / 1e18
    ).toFixed(4)
  );

  draw(
    "Claimed EUSD",
    (
      Number(
        session.claimedEUSD
      ) / 1e18
    ).toFixed(4)
  );

  ctx.fillStyle = "#94a3b8";

  ctx.font =
    "22px Arial";

  ctx.fillText(
    "Powered by E-Coin Mining Infrastructure",
    540,
    1280
  );

  const image =
    canvas.toDataURL(
      "image/jpeg",
      1
    );

  const link =
    document.createElement("a");

  link.href = image;

  link.download =
    `Mining-Session-${session.id}.jpg`;

  link.click();
}