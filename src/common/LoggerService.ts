import { ILogObj, Logger } from "tslog";
import { ILoggerService } from "./ILoggerService";
import { injectable } from "inversify";

@injectable()
export class LoggerService implements ILoggerService {
  readonly logger: Logger<ILogObj>;
  constructor() {
    this.logger = new Logger();
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
