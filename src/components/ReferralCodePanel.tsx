"use client";

import { useState } from "react";

import {
  useReferralCodeRegistry
}
from "@/hooks/useReferralCodeRegistry";

export default function ReferralCodePanel() {

  const {
    registerCode
  } = useReferralCodeRegistry();

  const [code, setCode] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  return (
    <div className="space-y-4">

      <input
        value={code}
        onChange={(e)=>
          setCode(e.target.value)
        }
        placeholder="KING123"
        className="w-full p-3 rounded-xl"
      />

      <button
        onClick={async()=>{

          try{

            setLoading(true);

            await registerCode(code);

            alert("Code created");

          }finally{

            setLoading(false);

          }

        }}
      >
        {
          loading
            ? "Creating..."
            : "Create Code"
        }
      </button>

    </div>
  );
}