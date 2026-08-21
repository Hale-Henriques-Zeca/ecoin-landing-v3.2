export interface UsageStats {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export class UsageTracker {
  private static accumulatedTokens = 0;

  public static track(stats?: UsageStats): void {
    if (stats?.totalTokens) {
      this.accumulatedTokens += stats.totalTokens;
    }
  }

  public static getTotalTokens(): number {
    return this.accumulatedTokens;
  }
}