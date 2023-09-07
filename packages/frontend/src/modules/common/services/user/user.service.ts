import { AxiosResponse } from 'axios';
import { HttpService } from '../http';
import { BACKEND_KEYS } from '../../constants/app-keys.constants';
import { IUserAccess } from './user.types';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { createUserModel } from './user.model';
import { UserFromServerDto } from './dto/user-from-server.dto';

class UserService {
  constructor(private httpService: HttpService) {}

  async registration(dto: RegistrationDto): Promise<IUserAccess> {
    const response: AxiosResponse<UserFromServerDto> = await this.httpService.create({
      url: BACKEND_KEYS.REGISTRATION,
      data: dto
    }, false);
    return {
      accessToken: response.data.accessToken,
      user: createUserModel(true, response.data.email)
    };
  }

  async login(dto: LoginDto): Promise<IUserAccess> {
    const response: AxiosResponse<UserFromServerDto> = await this.httpService.create({
      url: BACKEND_KEYS.LOGIN,
      data: dto
    }, false);
    return {
      accessToken: response.data.accessToken,
      user: createUserModel(true, response.data.email)
    };
  }

  async checkAuth(): Promise<IUserAccess> {
    const response: AxiosResponse<UserFromServerDto> = await this.httpService.get({
      url: BACKEND_KEYS.CHECK_AUTH
    });
    return {
      accessToken: response.data.accessToken,
      user: createUserModel(true, response.data.email)
    };
  }
}

export const userService = new UserService(new HttpService());
