import { Controller, Get, HttpStatus, Param, Query, Res} from '@nestjs/common';

import { ApiResponse} from 'src/utils/response';
import { Response } from 'express';
import { ProductsService } from './product.service';
import { CustomError } from 'src/utils/customError';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async viewProducts(@Res() response:Response, @Query() params){
    const data=await this.productsService.viewProducts(params)
    return new ApiResponse(response, 200, {message:'Data fetched successfull', data:data})
  }
  
  @Get(":id")
  async viewSpecificProduct(@Param("id") id:string, @Res() response:Response){
    try{
      const productDetails = await this.productsService.viewSpecificProduct(id)
      new ApiResponse(response, 200, {message:"Data fetched", product:productDetails})
    }
    catch(error){
      throw new CustomError(HttpStatus.BAD_REQUEST, {message:error.message})
    }
  }
}










