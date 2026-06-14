"use client";

type Props = {
  state:
    | "idle"
    | "wallet"
    | "submitted"
    | "confirming"
    | "success"
    | "error";

  idleText: string;

  className?: string;

  onClick: () => void;

  disabled?: boolean;
};

export default function TxButton({
  state,
  idleText,
  className,
  onClick,
  disabled,
}: Props) {

  const label =
    state === "wallet"
      ? "PROCESSING..."
      : state === "submitted"
      ? "PROCESSING..."
      : state === "confirming"
      ? "CONFIRMING..."
      : state === "success"
      ? "SUCCESS✅"
      : state === "error"
      ? "ERRO"
      : idleText;

  return (
    <button
      disabled={
        disabled ||
        state !== "idle"
      }
      onClick={onClick}
      className={className}
    >
      {label}
    </button>
  );
}