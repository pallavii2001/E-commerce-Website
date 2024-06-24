import { Controller, Get, HttpStatus, Param, Req, Res, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { TokenVerificationGuard } from "src/auth/guard/verifyToken";
import { ApiResponse } from "src/utils/response";
import { Request, Response } from "express";
import { CustomError } from "src/utils/customError";

@Controller("myorders")
export class OrdersController {
  constructor(private orderService: OrdersService) {}
@UseGuards(TokenVerificationGuard)
  @Get()
  async viewOrders(@Res() res: Response, @Req() req:Request){
    const userOrders = await this.orderService.viewOrders(req);
    new ApiResponse(res, 200, {message:"Data fetched", userOrders: userOrders})

  }

  @UseGuards(TokenVerificationGuard)
  @Get(":id")
  async viewOrderbyId(@Param("id") id:string, @Res() response:Response){
    try{
      const orderDetails = await this.orderService.viewSpecificOrder(id)
      new ApiResponse(response, 200, {message:"Data fetched", order:orderDetails})
    }
    catch(error){
      throw new CustomError(HttpStatus.BAD_REQUEST, {message:error.message})
    }
  }


}