import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'products'})
export class Products{
    @PrimaryColumn()
    product_id:string;

    @Column({ nullable : false})
    product_name: string

    @Column({ nullable : false})
    product_model: string;

    @Column(  { nullable : false}  )
    availability: string;

    @Column({ nullable : false})
    rating: number;

    @Column()
    type: string;

    @Column()
    product_price: number;

}