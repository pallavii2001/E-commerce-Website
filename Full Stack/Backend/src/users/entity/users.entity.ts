import { Orders } from "src/orders/entity/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class Users{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({ nullable : false})
    Name: string

    @Column({ nullable : false, unique : true })
    email: string;

    @Column(  { nullable : false}  )
    password: string;

    @Column({ nullable : false})
    Address: string;

    @OneToMany(() => Orders, orders => orders.user)
    orders: Orders[];

}