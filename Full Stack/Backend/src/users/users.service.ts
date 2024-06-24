import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Users } from "./entity/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomError } from "src/utils/customError";
import { CreateUserTypes } from "./type/createUser.type";
import { encryptPw } from "src/utils/encrytPassword";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>){}

        async registerUser(userDetails: CreateUserTypes) {
            try {
              const { Name, email, password ,Address} = userDetails;
        
              const userCredentials = { email, password: encryptPw(password), Name, Address};
             
              return this.userRepository.save(userCredentials);
            } 
            catch (error) {
            throw new CustomError(HttpStatus.BAD_REQUEST, { message: error.message});
          }
        }
}