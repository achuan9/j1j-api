import { injectable } from "inversify";
import { ILogObj, Logger } from "tslog";
import { ILoggerService } from "./ILoggerService";

@injectable()
export class LoggerService implements ILoggerService {
  readonly logger: Logger<ILogObj>;
  constructor() {
    this.logger = new Logger();
  }
  info(...args: unknown[]): void {
    this.logger.info(...args);
  }
  debug(...args: unknown[]): void {
    this.logger.debug(...args);
  }

  log(...args: unknown[]) {
    this.logger.info(...args);
  }

  error(...args: unknown[]) {
    this.logger.error(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}
