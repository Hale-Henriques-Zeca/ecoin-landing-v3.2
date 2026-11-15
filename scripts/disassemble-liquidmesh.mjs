
import fs from "node:fs";
import path from "node:path";

const BYTECODE_FILE = path.resolve(
  "scripts/liquidmesh-implementation-bytecode.txt"
);

const OUTPUT_FILE = path.resolve(
  "scripts/liquidmesh-implementation-disassembly.txt"
);

const raw = fs.readFileSync(BYTECODE_FILE, "utf8").trim();

if (!/^0x[0-9a-fA-F]+$/.test(raw)) {
  throw new Error("Invalid EVM bytecode.");
}

let hex = raw.slice(2).toLowerCase();

if (hex.length % 2 !== 0) {
  throw new Error("Bytecode has an odd number of hex characters.");
}

const fullByteLength = hex.length / 2;

// --------------------------------------------------
// 1. Detect Solidity CBOR metadata
// --------------------------------------------------

function stripSolidityMetadata(code) {
  const length = code.length / 2;

  if (length < 3) {
    return { code, metadata: null };
  }

  const metadataLength = parseInt(code.slice(-4), 16);
  const metadataStart = length - 2 - metadataLength;

  if (metadataLength <= 0 || metadataStart < 0) {
    return { code, metadata: null };
  }

  const metadataHex = code.slice(
    metadataStart * 2,
    (length - 2) * 2
  );

  const firstByte = parseInt(metadataHex.slice(0, 2), 16);

  // CBOR map major type = 5
  if ((firstByte & 0xe0) !== 0xa0) {
    return { code, metadata: null };
  }

  return {
    code: code.slice(0, metadataStart * 2),
    metadata: {
      start: metadataStart,
      length: metadataLength,
      hex: metadataHex
    }
  };
}

const stripped = stripSolidityMetadata(hex);

hex = stripped.code;

const byteLength = hex.length / 2;

console.log("LIQUIDMESH EVM DISASSEMBLER");
console.log("Original bytecode bytes:", fullByteLength);
console.log("Executable candidate bytes:", byteLength);

if (stripped.metadata) {
  console.log(
    "Solidity metadata detected:",
    stripped.metadata.length,
    "bytes"
  );

  console.log(
    "Metadata starts at:",
    "0x" + stripped.metadata.start.toString(16)
  );
} else {
  console.log("No valid CBOR metadata trailer detected.");
}

// --------------------------------------------------
// 2. Opcode names
// --------------------------------------------------

const names = {
  0x00: "STOP",
  0x01: "ADD",
  0x02: "MUL",
  0x03: "SUB",
  0x04: "DIV",
  0x05: "SDIV",
  0x06: "MOD",
  0x08: "ADDMOD",
  0x09: "MULMOD",
  0x0a: "EXP",
  0x10: "LT",
  0x11: "GT",
  0x12: "SLT",
  0x13: "SGT",
  0x14: "EQ",
  0x15: "ISZERO",
  0x16: "AND",
  0x17: "OR",
  0x18: "XOR",
  0x19: "NOT",
  0x1a: "BYTE",
  0x1b: "SHL",
  0x1c: "SHR",
  0x1d: "SAR",
  0x20: "KECCAK256",
  0x30: "ADDRESS",
  0x31: "BALANCE",
  0x32: "ORIGIN",
  0x33: "CALLER",
  0x34: "CALLVALUE",
  0x35: "CALLDATALOAD",
  0x36: "CALLDATASIZE",
  0x37: "CALLDATACOPY",
  0x38: "CODESIZE",
  0x39: "CODECOPY",
  0x3b: "EXTCODESIZE",
  0x3c: "EXTCODECOPY",
  0x3d: "RETURNDATASIZE",
  0x3e: "RETURNDATACOPY",
  0x40: "BLOCKHASH",
  0x41: "COINBASE",
  0x42: "TIMESTAMP",
  0x43: "NUMBER",
  0x44: "PREVRANDAO",
  0x45: "GASLIMIT",
  0x46: "CHAINID",
  0x47: "SELFBALANCE",
  0x48: "BASEFEE",
  0x50: "POP",
  0x51: "MLOAD",
  0x52: "MSTORE",
  0x53: "MSTORE8",
  0x54: "SLOAD",
  0x55: "SSTORE",
  0x56: "JUMP",
  0x57: "JUMPI",
  0x58: "PC",
  0x59: "MSIZE",
  0x5a: "GAS",
  0x5b: "JUMPDEST",
  0xf0: "CREATE",
  0xf1: "CALL",
  0xf2: "CALLCODE",
  0xf3: "RETURN",
  0xf4: "DELEGATECALL",
  0xf5: "CREATE2",
  0xfa: "STATICCALL",
  0xfd: "REVERT",
  0xfe: "INVALID",
  0xff: "SELFDESTRUCT"
};

// --------------------------------------------------
// 3. Decode EVM instructions
// --------------------------------------------------

function decode(code) {
  const instructions = [];
  let pc = 0;

  while (pc < code.length / 2) {
    const offset = pc;

    const opcode = parseInt(
      code.slice(pc * 2, pc * 2 + 2),
      16
    );

    pc++;

    let name = names[opcode] ?? "UNKNOWN";
    let immediate = "";

    if (opcode >= 0x60 && opcode <= 0x7f) {
      const size = opcode - 0x5f;

      name = `PUSH${size}`;

      const available = Math.min(
        size,
        code.length / 2 - pc
      );

      immediate = code.slice(
        pc * 2,
        (pc + available) * 2
      );

      if (available !== size) {
        immediate += " [TRUNCATED]";

        instructions.push({
          offset,
          opcode,
          name,
          immediate,
          truncated: true
        });

        console.warn(
          `WARNING: ${name} at 0x${offset.toString(16)} ` +
          `has only ${available}/${size} immediate bytes.`
        );

        // Não existem bytes suficientes para continuar
        // a descodificação desta sequência linear.
        break;
      }

      pc += size;
    } else if (opcode >= 0x80 && opcode <= 0x8f) {
      name = `DUP${opcode - 0x7f}`;
    } else if (opcode >= 0x90 && opcode <= 0x9f) {
      name = `SWAP${opcode - 0x8f}`;
    } else if (opcode >= 0xa0 && opcode <= 0xa4) {
      name = `LOG${opcode - 0xa0}`;
    }

    instructions.push({
      offset,
      opcode,
      name,
      immediate
    });
  }

  return instructions;
}

// --------------------------------------------------
// 4. Inspect final bytecode region
// --------------------------------------------------

console.log("\nFINAL BYTECODE INSPECTION");

const tailStart = Math.max(0, byteLength - 100);

for (let i = tailStart; i < byteLength; i += 16) {
  const chunk = hex.slice(
    i * 2,
    Math.min((i + 16) * 2, hex.length)
  );

  console.log(
    "0x" + i.toString(16).padStart(4, "0"),
    chunk
  );
}

console.log("\nBytes around failing offset:");

const failingOffset = 0x4f9a;

console.log(
  hex.slice(
    Math.max(0, (failingOffset - 16) * 2),
    Math.min(byteLength * 2, (failingOffset + 40) * 2)
  )
);

// --------------------------------------------------
// 5. Decode bytecode
// --------------------------------------------------

const instructions = decode(hex);

console.log("\nDecoded instructions:", instructions.length);

// --------------------------------------------------
// 6. Display instruction windows
// --------------------------------------------------

function showWindow(target, count = 70) {
  const index = instructions.findIndex(
    (item) => item.offset === target
  );

  console.log("\n" + "=".repeat(75));

  console.log(
    `OFFSET 0x${target.toString(16).padStart(4, "0")}`
  );

  console.log("=".repeat(75));

  if (index < 0) {
    console.log("Instruction not found at exact offset.");
    return;
  }

  for (
    let i = index;
    i < Math.min(index + count, instructions.length);
    i++
  ) {
    const item = instructions[i];

    console.log(
      `${item.offset.toString(16).padStart(6, "0")}  ` +
      `${item.opcode.toString(16).padStart(2, "0")}  ` +
      `${item.name.padEnd(16)} ${item.immediate}`
    );
  }
}

// --------------------------------------------------
// 8. Targeted LiquidMesh function analysis
// --------------------------------------------------

showWindow(0x0210, 35);
showWindow(0x04c0, 180);
showWindow(0x0555, 120);

showWindow(0x23ac, 180);
showWindow(0x236f, 80);
showWindow(0x241b, 100);
showWindow(0x244c, 80);
showWindow(0x2454, 80);
showWindow(0x245c, 80);
showWindow(0x246f, 60);
showWindow(0x24ae, 60);
showWindow(0x255e, 60);
showWindow(0x263d, 100);
showWindow(0x285f, 100);

showWindow(0x1540, 100);
showWindow(0x15d3, 100);
showWindow(0x17a0, 100);
showWindow(0x33cb, 120);

// --------------------------------------------------
// 7. Save full disassembly
// --------------------------------------------------

const output = instructions.map((item) => {
  return (
    `${item.offset.toString(16).padStart(6, "0")}  ` +
    `${item.opcode.toString(16).padStart(2, "0")}  ` +
    `${item.name} ${item.immediate}`
  );
}).join("\n");

fs.writeFileSync(OUTPUT_FILE, output);

console.log("\nFull disassembly saved:");
console.log(OUTPUT_FILE);
