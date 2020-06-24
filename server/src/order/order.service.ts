import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity'
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ){}
    async getAllOrder(): Promise<Order[]>{
        return this.orderRepository.find()
    }
    async addOne(order: OrderDto): Promise<any>{
        const newOrder = new Order()
        newOrder.name = order.name
        newOrder.adult = order.adult
        newOrder.child = order.child
        newOrder.startDate = order.startDate
        newOrder.endDate = order.endDate
        newOrder.numberOfRoom = order.numberOfRoom
        newOrder.numberOfDate = order.numberOfDate
        newOrder.totalPrice = order.totalPrice
        await this.orderRepository.save(newOrder)
        return {
            success: true,
            msg: 'Đặt phòng thành công'
        }
    }
}
