interface PerformanceMetrics {
  navigation: PerformanceNavigationTiming;
  paint: {
    [key: string]: number;
  };
  resource: PerformanceResourceTiming[];
  longTasks: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics = {} as PerformanceMetrics;
  private observer: PerformanceObserver | null = null;

  // Singleton pattern
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private constructor() {
    this.setupMonitoring();
  }

  private setupMonitoring(): void {
    // Capture navigation timing
    if (performance.getEntriesByType('navigation').length > 0) {
      this.metrics.navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    }

    // Capture paint timing (First Contentful Paint, Largest Contentful Paint)
    if ('paint' in performance) {
      (performance as any).getEntriesByType('paint').forEach((entry: PerformanceEntry) => {
        if (!this.metrics.paint) this.metrics.paint = {};
        this.metrics.paint[entry.name] = entry.startTime;
      });
    }

    // Set up long task observer to detect performance issues
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        const longTasks = list.getEntries().filter(entry => entry.duration > 50); // Tasks > 50ms
        this.metrics.longTasks = (this.metrics.longTasks || 0) + longTasks.length;
      });
      this.observer.observe({ entryTypes: ['longtask'] });
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public logMetrics(): void {
    console.group('Performance Metrics');
    console.log('Navigation Timing:', this.metrics.navigation);
    console.log('Paint Timing:', this.metrics.paint);
    console.log('Long Tasks Count:', this.metrics.longTasks || 0);
    console.groupEnd();
  }

  public async measureComponentRender(componentName: string, renderFunction: () => void): Promise<number> {
    const start = performance.now();
    renderFunction();
    const end = performance.now();
    const duration = end - start;

    console.log(`${componentName} render time: ${duration.toFixed(2)}ms`);

    return duration;
  }

  public measureCLS(): void {
    let clsValue = 0;
    let clsEntries: any[] = []; // Use any type since LayoutShift might not be defined in all environments

    // Check if the browser supports the Layout Instability API
    if (!('PerformanceObserver' in window)) {
      console.log('PerformanceObserver not supported');
      return;
    }

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Check if this is a layout shift entry
        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          clsValue += (entry as any).value || 0;
          clsEntries.push(entry);
        }
      }
      console.log('Current CLS value:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  public cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

export { PerformanceMonitor };