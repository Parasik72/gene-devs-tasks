import { AxiosResponse } from 'axios';
import { HttpService } from '../http';
import { BACKEND_KEYS } from '../../constants/app-keys.constants';
import { IUserToken } from './user.types';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';

class UserService {
  constructor(private httpService: HttpService) {}

  async registration(dto: RegistrationDto): Promise<IUserToken> {
    const response: AxiosResponse<IUserToken> = await this.httpService.create({
      url: BACKEND_KEYS.REGISTRATION,
      data: dto
    }, false);
    return response.data;
  }

  async login(dto: LoginDto): Promise<IUserToken> {
    const response: AxiosResponse<IUserToken> = await this.httpService.create({
      url: BACKEND_KEYS.LOGIN,
      data: dto
    }, false);
    return response.data;
  }

  async checkAuth(): Promise<IUserToken> {
    const response: AxiosResponse<IUserToken> = await this.httpService.get({
      url: BACKEND_KEYS.CHECK_AUTH
    });
    return response.data;
  }
}

export const userService = new UserService(new HttpService());
