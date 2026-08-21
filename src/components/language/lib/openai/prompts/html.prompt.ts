export function buildHtmlPrompt(preserveHtml = true): string {
  if (!preserveHtml) return "";
  return "Preserve all HTML/JSX tags (e.g., <span>, <div>, <button>), inline parameters, and attributes completely intact.";
}