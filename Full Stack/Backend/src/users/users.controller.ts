import { Body, Controller, Post, Res, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { ApiResponse } from "src/utils/response";
import { CustomError } from "src/utils/customError";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async registerUser(@Body(ValidationPipe) createUserDto: CreateUserDto,@Res() response: Response,
  ) {
    try {
      const createdUser = await this.usersService.registerUser(createUserDto);     
      return new ApiResponse(response, 200, { message: 'User Created' });
    } catch (error) {
      throw new CustomError(404, { message: error.message });
    }
  }
}