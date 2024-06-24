import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Users } from './users/entity/users.entity';
import { Products } from './products/entity/product.entity';
import { Orders } from './orders/entity/orders.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/product.module';
import { OrderModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type:"mysql",
      host:process.env.MYSQL_HOST,
      port:+process.env.MYSQL_PORT,
      username:process.env.MYSQL_USER,
      password:process.env.MYSQL_PASSWORD,
      database:process.env.MYSQL_DATABASE,
      entities:[Users,Products,Orders],
      synchronize:true
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
