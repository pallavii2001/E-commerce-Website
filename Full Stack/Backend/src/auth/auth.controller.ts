import { Body, Controller, Post, Res, UnauthorizedException, ValidationPipe } from "@nestjs/common";
import { UserLoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { ApiResponse } from "src/utils/response";

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {};

  @Post('login')
  async login(@Body(ValidationPipe) loginUserDto: UserLoginDto, @Res() response: Response) {
    try {
      const token = await this.authService.login(loginUserDto);
      return new ApiResponse(response, 200, { token });
    } 
    catch (error) {
      if (error instanceof UnauthorizedException) {
        return new ApiResponse(response, 401, {message: 'Invalid email or password',});
      } 
      else {
        return new ApiResponse(response, 500, { message: 'Failed to login' });
      }
    }
  }
}