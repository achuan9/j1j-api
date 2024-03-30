import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILoggerService } from "../logger/ILoggerService";
import { PrismaService } from "../db/PrismaService";

@injectable()
export abstract class BaseRepository<Model extends Prisma.ModelName> {
  @inject(TYPES.LoggerService) public readonly logger: ILoggerService;
  @inject(TYPES.PrismaService) public readonly prismaService: PrismaService;
  protected model: Prisma.ModelName;

  constructor(model: Prisma.ModelName) {
    this.model = model;
  }

  async create<CreateInput>(
    payload: CreateInput
  ): Promise<Prisma.TypeMap["model"][Model]["operations"]["create"]["result"]> {
    return await this.prismaService.client[this.model].create({
      data: payload,
    });
  }

  async findAll(
    payload: Prisma.TypeMap["model"][Model]["operations"]["findMany"]["args"]
  ): Promise<
    Prisma.TypeMap["model"][Model]["operations"]["findMany"]["result"]
  > {
    return this.prismaService.client[this.model].findMany(payload);
  }

  async findById(
    id: Prisma.TypeMap["model"][Model]["operations"]["findUnique"]["args"]["where"]["id"]
  ): Promise<
    Prisma.TypeMap["model"][Model]["operations"]["findMany"]["result"] | null
  > {
    return this.prismaService.client[this.model].findUnique({ where: { id } });
  }

  async update(
    id: Prisma.TypeMap["model"][Model]["operations"]["update"]["args"]["where"]["id"],
    data: Prisma.TypeMap["model"][Model]["operations"]["update"]["args"]["data"]
  ): Promise<Prisma.TypeMap["model"][Model]["operations"]["update"]["result"]> {
    return this.prismaService.client[this.model].update({
      where: { id },
      data,
    });
  }

  async delete(
    id: Prisma.TypeMap["model"][Model]["operations"]["delete"]["args"]["where"]["id"]
  ): Promise<Prisma.TypeMap["model"][Model]["operations"]["delete"]["result"]> {
    return this.prismaService.client[this.model].delete({ where: { id } });
  }
}
