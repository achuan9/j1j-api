// 把TYPES定义和冰岛inversify.config.ts中，其他文件导入的时候就会提示找不到TYPES，可能是循环依赖导致的问题

export const TYPES = {
  /** Entities */
  UserService: Symbol.for("UserService"),
  UserController: Symbol.for("UserController"),
  UserRepository: Symbol.for("UserRepository"),

  /** Utils */
  LoggerService: Symbol.for("LoggerService"),
  ConfigService: Symbol.for("ConfigService"),
  PrismaService: Symbol.for("PrismaService"),
};
