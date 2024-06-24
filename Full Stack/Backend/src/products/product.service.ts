import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';


import { Products } from './entity/product.entity';
import { CustomError } from 'src/utils/customError';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {}

  async viewProducts(params) {
    try {
        const { page = 1, sortBy = 'product_id', sortOrder = 'ASC', filters = {} } = params;
        const limit = 10;
        const offset = (page - 1) * limit;
        const queryBuilder = this.productRepository.createQueryBuilder('product');

      
        queryBuilder.select(['product.product_id', 'product.product_name', 'product.product_model', 'product.rating', 'product.product_price']);

      
        Object.entries(filters).forEach(([key, value]) => {
            queryBuilder.andWhere(`product.${key} = :${key}`, { [key]: value });
        });

  
        queryBuilder.skip(offset).take(limit);

       
        queryBuilder.orderBy(`product.${sortBy}`, sortOrder);
        const data = await queryBuilder.getMany();
        if (!data || data.length === 0) {
            throw new CustomError(404, 'Not found');
        }

        return data;
    } catch (error) {
        throw new CustomError(error.status || 500, error.message);
    }
}


  async viewSpecificProduct(id:string){
    const productDetails = await this.productRepository.findOneOrFail({where:{product_id:id}, select:["product_id","product_name", "product_model", "product_price", "availability","rating","type"]})
    return productDetails
  }

}









