import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILoggerService } from "../logger/ILoggerService";
import { IPrismaService } from "../db/IPrismaService";

@injectable()
export abstract class BaseRepository<Model, CreateInput, UpdateInput> {
  @inject(TYPES.LoggerService) protected readonly _logger: ILoggerService;
  @inject(TYPES.PrismaService) protected readonly _prisma: IPrismaService;
  protected model: Prisma.ModelName;
  // this._prisma.client: PrismaClient;

  constructor(model: Prisma.ModelName) {
    this.model = model;
  }

  public async create(data: CreateInput): Promise<Model> {
    try {
      return await this._prisma.client[this.model].create({ data });
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  public async update(id: number, data: UpdateInput): Promise<Model> {
    try {
      return await this._prisma.client[this.model].update({
        where: { id },
        data,
      });
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  public async deleteById(id: number): Promise<Model> {
    try {
      return await this._prisma.client[this.model].delete({
        where: { id },
      });
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  public async find(option): Promise<Model[]> {
    return this._prisma.client[this.model].findMany({ ...option });
  }

  public async findOne(option): Promise<Model> {
    return this._prisma.client[this.model].findFirst({ ...option });
  }

  public async findById(id: number): Promise<Model> {
    try {
      return await this._prisma.client[this.model].findFirst({
        where: { id },
      });
    } catch (error) {
      throw this._logger.error(error);
    }
  }

  public async findAll(): Promise<Model[]> {
    try {
      return await this._prisma.client[this.model].findMany();
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  public async count(): Promise<number> {
    try {
      return await this._prisma.client[this.model].count();
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }
}
