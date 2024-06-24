import { JwtModule } from "@nestjs/jwt";
import { Orders } from "./entity/orders.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { Users } from "src/users/entity/users.entity";

@Module({
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forFeature([Orders, Users]),
      JwtModule.register({
        secret: process.env.JWT_KEY,
      }),
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
  })
  export class OrderModule {}