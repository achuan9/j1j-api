import { Prisma, Post } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";

export interface IPostRepository
  extends BaseRepository<Post, Prisma.PostCreateInput, Prisma.PostUpdateInput> {
  findByUserId(userId: number): Promise<Post[]>;
}
