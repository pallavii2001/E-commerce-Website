import { Users } from "src/users/entity/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'orders'})
export class Orders{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({ nullable : false})
    quantity: number;

    @Column({ nullable : false})
    orderPlacedAt: Date;
    
    @Column()
    product_name: string;

    @Column(  { nullable : false}  )
    price: number;

    @Column({ nullable : false})
    status: string;

    @Column({nullable: false})
    Address: string;

    @Column()
    total_amount: number;

    @Column()
    mode_of_payment: string;

    @ManyToOne(() => Users, user => user.orders)
    user: Users;

}