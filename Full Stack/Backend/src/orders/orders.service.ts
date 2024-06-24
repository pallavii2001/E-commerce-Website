import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './entity/orders.entity';
import { Request } from "express";
import { Users } from 'src/users/entity/users.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>
  ) {}

  async viewOrders(req: Request) {
    const emailId = req['user']['email'];
    const fetchedUser = await this.userRepository.findOne({ where: { email: emailId } });

    const orders = await this.orderRepository.createQueryBuilder('order')
        .select(['order.id', 'order.product_name', 'order.quantity', 'order.orderPlacedAt'])
        .where('order.userId = :userId', { userId: fetchedUser.id })
        .getRawMany();

    return orders;
}


  async viewSpecificOrder(id:string){
    const orderDetails = await this.orderRepository.findOneOrFail({where:{id:id}, select:["id", "product_name","quantity", "orderPlacedAt", "price", "status", "Address", "total_amount", "mode_of_payment"]})
    return orderDetails
  }

}

