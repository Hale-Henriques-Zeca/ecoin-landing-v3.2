/**
 * ============================================================================
 * ENGINE MATEMÁTICO PURO (MATH UTILS - TIER-1 ARCHITECTURE)
 * No business logic, no hooks, no React. Pure state-free calculations.
 * ============================================================================
 */

/**
 * 1) Arredonda um número com precisão fixa de casas decimais (evita problemas de ponto flutuante do JS)
 */
export function round(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * 2) Calcula a percentagem de um valor em relação a um total
 */
export function percentage(value: number, total: number): number {
  if (total <= 0) return 0;
  return (value / total) * 100;
}

/**
 * 3) Calcula a razão/fração direta entre dois números (Muito utilizada em Pool Shares)
 */
export function ratio(numerator: number, denominator: number): number {
  if (denominator <= 0) return 0;
  return numerator / denominator;
}

/**
 * 4) Interpolação Linear (Mapeia um valor contido num intervalo A para um intervalo B)
 */
export function interpolate(
  value: number,
  min: number,
  max: number,
  targetMin: number,
  targetMax: number
): number {
  if (max === min) return targetMin;
  const clampedValue = clamp(value, min, max);
  const normalized = (clampedValue - min) / (max - min);
  return targetMin + normalized * (targetMax - targetMin);
}

/**
 * 5) Clamping (Restringe um valor num limite mínimo e máximo inclusivo)
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * 6) Normalização (Mapeia um número contido entre min/max para um valor decimal entre 0 e 1)
 */
export function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0;
  const clampedValue = clamp(value, min, max);
  return (clampedValue - min) / (max - min);
}

/**
 * 7) Escala Logarítmica para Sliders
 * Mapeia uma entrada linear (ex: posição do slider de 0 a 100%) para uma curva logarítmica (ex: 0.001 a 10000)
 */
export function logarithmicScale(
  sliderValue: number,
  minOutput: number,
  maxOutput: number,
  sliderMin = 0,
  sliderMax = 100
): number {
  const clampedSlider = clamp(sliderValue, sliderMin, sliderMax);
  
  // Evita log(0) garantindo limites estritamente positivos
  const minLog = Math.log(minOutput <= 0 ? 0.001 : minOutput);
  const maxLog = Math.log(maxOutput <= 0 ? 10000 : maxOutput);
  
  // Normaliza o input do slider entre 0 e 1
  const scale = (clampedSlider - sliderMin) / (sliderMax - sliderMin);
  
  // Expande o expoente de forma linear na escala logarítmica
  return Math.exp(minLog + scale * (maxLog - minLog));
}

/**
 * 8) Escala Logarítmica Inversa para Sliders
 * Converte um valor do ecossistema (ex: 1000 ecGas) de volta para a posição linear correta do Slider (ex: 0 a 100%)
 */
export function inverseLogarithmicScale(
  actualValue: number,
  minOutput: number,
  maxOutput: number,
  sliderMin = 0,
  sliderMax = 100
): number {
  const safeValue = actualValue <= 0 ? 0.001 : actualValue;
  const minLog = Math.log(minOutput <= 0 ? 0.001 : minOutput);
  const maxLog = Math.log(maxOutput <= 0 ? 10000 : maxOutput);
  
  const currentLog = Math.log(safeValue);
  
  // Extrai a fração normalizada
  const normalized = (currentLog - minLog) / (maxLog - minLog);
  const result = sliderMin + normalized * (sliderMax - sliderMin);
  
  return clamp(result, sliderMin, sliderMax);
}

/**
 * 9) Calcula o progresso percentual normalizado (Útil para ROI Progress Bars e Gauges de Capacidade)
 */
export function calculateProgress(current: number, target: number): number {
  if (target <= 0) return 0;
  const progressPercent = percentage(current, target);
  return clamp(progressPercent, 0, 100);
}