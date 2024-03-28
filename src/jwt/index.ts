import { injectable } from "inversify";
import jsonwebtoken from "jsonwebtoken";
import passport from "passport";
import {
  ExtractJwt,
  Strategy,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";

@injectable()
export class JWT {
  private jwtOptions: StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  constructor() {
    this.strategy();
  }

  static middleware() {
    return passport.authenticate("jwt", { session: false });
  }
  public strategy() {
    const str = new Strategy(this.jwtOptions, (payload, done) => {
      done(null, payload);
    });
    passport.use(str);
  }
  /**
   *生成token
   * @param data
   */
  public createToken(data: any) {
    console.log(process.env.JWT_SECRET);

    return jsonwebtoken.sign(data, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  }
  /**
   * 会通过app.use(container.get(JWT).init())来关联express
   * @returns
   */
  public init() {
    return passport.initialize();
  }
}
