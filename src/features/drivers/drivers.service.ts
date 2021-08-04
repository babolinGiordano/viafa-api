import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from 'src/features/drivers/entity/driver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driversRepository: Repository<Driver>
  ) {}

  async findAll(): Promise<Driver[]> {
    return this.driversRepository.find();
  }

  async findById(id: string): Promise<Driver> {
    const driver = this.driversRepository.findOne(id);

    if (!driver) {
      throw new HttpException(
        `Driver item doesn't exist`,
        HttpStatus.BAD_REQUEST
      );
    }

    return driver;
  }

  async save(driver: Driver): Promise<Driver> {
    return this.driversRepository.save(driver);
  }

  async update(driver: Driver): Promise<Driver> {
    const id = driver.id;

    if (!(await this.driversRepository.findOne(id))) {
      throw new HttpException(`Driver doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.driversRepository.update({ id }, driver);

    return driver;
  }

  async delete(id: string) {
    if (!(await this.driversRepository.findOne(id))) {
      throw new HttpException(`Driver doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.driversRepository.delete(id);
  }
}
