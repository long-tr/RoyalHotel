import { Controller, Get, Param } from '@nestjs/common';
import { Room } from './room.entity';
import { RoomService } from './room.service'
@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService){}
    @Get(':id')
    getOne(@Param('id') id: number): Promise<Room> {
      return this.roomService.findOne(id)
    }
}
