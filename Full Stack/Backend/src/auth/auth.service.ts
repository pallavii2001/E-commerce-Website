import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/users/entity/users.entity";
import { CustomError } from "src/utils/customError";
import { Repository } from "typeorm";
import { LoginUserTypes } from "./type/login.type";
import { encryptPw } from "src/utils/encrytPassword";

@Injectable()
export class AuthService {

 constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
 ){};

  async login(loginDetails: LoginUserTypes): Promise<any> {
    const { email, password } = loginDetails;
    const user = await this.userRepository.findOneOrFail({
      where: { email, password: encryptPw(password)},
    });
    if (user) {
      const payload = { email: user.email};
      return this.jwtService.sign(payload);
    } 
    else {
      throw new CustomError(400, { message: 'Invalid email or password' });
    }
  }
}