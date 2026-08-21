export function buildMarkdownPrompt(preserveMarkdown = true): string {
  if (!preserveMarkdown) return "";
  return "Preserve all Markdown syntax (e.g., **, ##, [], (), ```) intact, translating only the natural text content.";
}