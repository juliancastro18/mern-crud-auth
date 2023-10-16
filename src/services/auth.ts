import { Service, Inject } from "typedi";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import config from "../config/index.js";
import { randomBytes } from "crypto";
import { IUser, IUserInputDTO } from "../interfaces/IUser.js";

@Service()
export default class AuthService {
  constructor(
    @Inject("userModel")
    private userModel: Models.UserModel
  ) {}

  public async SignUp(
    userInputDTO: IUserInputDTO
  ): Promise<{ user: IUser; token: string }> {
    try {
      const salt = randomBytes(32);

      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      const userRecord = await this.userModel.create({
        ...userInputDTO,
        salt: salt.toString("hex"),
        password: hashedPassword,
      });
      
      if (!userRecord) {
        throw new Error("User cannot be created");
      }
      const token = this.generateToken(userRecord);

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, "password");
      Reflect.deleteProperty(user, "salt");
      return { user, token };
    } catch (e) {
      throw e;
    }

  }

  public async SignIn(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }> {
    const userRecord = await this.userModel.findOne({ email });
    if (!userRecord) {
      throw new Error("User not registered");
    }
    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      const token = this.generateToken(userRecord);

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, "password");
      Reflect.deleteProperty(user, "salt");
      return { user, token };
    } else {
      throw new Error("Invalid Password");
    }
  }

  public async GetProfile(userId: string): Promise<IUser> {
    const userRecord = await this.userModel.findById(userId);
    if (!userRecord) {
      throw new Error("Error retrieving user");
    }
    const user = userRecord.toObject();
    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');
    return user;
  }

  private generateToken(user: IUser) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        _id: user._id,
        // role: user.role,
        username: user.username,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
  }
}
