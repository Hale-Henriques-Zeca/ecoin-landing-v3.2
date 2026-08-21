export function buildGlossaryPrompt(glossary?: Record<string, string>): string {
  if (!glossary || Object.keys(glossary).length === 0) return "";
  
  return [
    "Strict Glossary Constraint:",
    "Do NOT translate or alter the following mandatory domain terms:",
    JSON.stringify(glossary, null, 2)
  ].join("\n");
}