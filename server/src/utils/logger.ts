export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  info(message: string, meta?: Record<string, unknown>): void {
    console.log(`[INFO] [${this.context}] ${message}`, meta ? JSON.stringify(meta) : '');
  }

  error(message: string, error?: Error): void {
    console.error(`[ERROR] [${this.context}] ${message}`, error?.stack || '');
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    console.warn(`[WARN] [${this.context}] ${message}`, meta ? JSON.stringify(meta) : '');
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] [${this.context}] ${message}`, meta ? JSON.stringify(meta) : '');
    }
  }
}
