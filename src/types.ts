export const TYPES = {
  Application: Symbol.for("Application"),

  /** Entities */
  UserService: Symbol.for("UserService"),
  UserController: Symbol.for("UserController"),
  UserRepository: Symbol.for("UserRepository"),

  /** Utils */
  LoggerService: Symbol.for("LoggerService"),
  ConfigServer: Symbol.for("ConfigService"),
  PrismaService: Symbol.for("PrismaService"),
};
