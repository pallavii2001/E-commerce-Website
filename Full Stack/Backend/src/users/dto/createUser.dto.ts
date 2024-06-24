import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString  } from 'class-validator';

export class CreateUserDto{
  
    @IsString() 
    @IsNotEmpty()
    Name: string
  
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString() 
    @IsNotEmpty()
    password: string;

    @IsString() 
    @IsNotEmpty()
    Address: string;

    



}