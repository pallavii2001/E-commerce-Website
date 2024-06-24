import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "./entity/product.entity"
import { ProductsController } from "./product.controller";
import { ProductsService } from "./product.service";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

@Module({
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forFeature([Products]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
  })
  export class ProductsModule {}