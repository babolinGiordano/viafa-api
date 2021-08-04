import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DriversService } from 'src/features/drivers/drivers.service';
import { Driver } from './entity/driver.entity';

@Controller('api/drivers')
export class DriversController {
  constructor(private readonly _driversService: DriversService) {}

  @Get()
  findAll(): Promise<Driver[]> {
    return this._driversService.findAll();
  }

  @Get(':id')
  findById(@Param() id: string): Promise<Driver> {
    return this._driversService.findById(id);
  }

  @Post()
  addDriver(@Body() driver: Driver): Promise<Driver> {
    return this._driversService.save(driver);
  }

  @Put(':id')
  updateDriver(@Body() driver: Driver): Promise<Driver> {
    return this._driversService.update(driver);
  }

  @Delete(':id')
  deleteDriver(@Param() id: string) {
    return this._driversService.delete(id);
  }
}
