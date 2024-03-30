import { PrismaClient } from "@prisma/client";
import { IPrismaService } from "./IPrismaService";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILoggerService } from "../logger/ILoggerService";

@injectable()
export class PrismaService implements IPrismaService {
  @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService;
  public client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  public async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.loggerService.log(
        `[PrismaService] Successfuly connected to database`
      );
    } catch (e) {
      if (e instanceof Error) {
        this.loggerService.error(
          `[PrismaService] Error while connection to database` + e.message
        );
      }
    }
  }

  public async disconnect(): Promise<void> {
    await this.client.$disconnect();
    this.loggerService.log(
      `[PrismaService] Successfuly disconnected from database`
    );
  }
}
