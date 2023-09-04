import express from 'express';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { RegistrationDto } from './dto/registration.dto';
import { HttpException } from '../exceptions/http.exception';
import { TokenService } from '../token/token.service';
import { LoginDto } from './dto/login.dto';

class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async register(req: express.Request<{}, {}, RegistrationDto>) {
    const { email, password } = req.body;
    const user = await this.userService.getOneUserByEmail(email);
    if (user) {
      throw new HttpException('This email is already in use', 400);
    }
    const hashedPassword = await this.userService.hashPassword(password);
    await this.userService.createUser({ email, password: hashedPassword });
    const accessToken = this.tokenService.generateAccessToken({ email });
    return { accessToken };
  }

  async login(req: express.Request<{}, {}, LoginDto>) {
    const { email, password } = req.body;
    const user = await this.userService.getOneUserByEmail(email);
    if (!user) {
      throw new HttpException('The user was not found', 404);
    }
    const verifyPassword = await this.userService.verifyPassword(password, user.password);
    if (!verifyPassword) {
      throw new HttpException('Password is not correct', 400);
    }
    const accessToken = this.tokenService.generateAccessToken({ email });
    return { accessToken };
  }

  async auth(req: express.Request) {
    const { email } = req.user!;
    const user = await this.userService.getOneUserByEmail(email);
    if (!user) {
      throw new HttpException('The user was not found', 404);
    }
    const accessToken = this.tokenService.generateAccessToken({ email });
    return { accessToken };
  }
}

export default new UserController(
  new UserService(new UserRepository()),
  new TokenService()
);
