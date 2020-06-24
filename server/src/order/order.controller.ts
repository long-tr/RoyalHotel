import { Controller, Get, Post, Body } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderService } from './order.service'
import { OrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){}
    @Get()
    getOne(): Promise<Order[]> {
      return this.orderService.getAllOrder()
    }

    @Post()
    addOne(@Body() order: OrderDto): Promise<any>{
        return this.orderService.addOne(order)
    }
}
