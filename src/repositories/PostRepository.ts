import { injectable } from "inversify";
import { IPostRepository } from "./IPostRepository";
import { BaseRepository } from "./BaseRepository";
import { Prisma, Post } from "@prisma/client";

@injectable()
export class PostRepository
  extends BaseRepository<Post, Prisma.PostCreateInput, Prisma.PostUpdateInput>
  implements IPostRepository
{
  constructor() {
    super(Prisma.ModelName.Post);
  }
  public async findByUserId(userId: number): Promise<Post[]> {
    return await this.prismaClient.post.findMany({
      where: { authorId: userId },
    });
  }
}
