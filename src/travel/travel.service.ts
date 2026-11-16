import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Travel } from './entities/travel.entity';

@Injectable()
export class TravelService {
  private travels: Travel[] = [
    { id: 1, name: 'To china', price: 9000 },
    { id: 2, name: 'To morocco', price: 4000 },
  ];

  create(createTravelDto: CreateTravelDto): Travel {
    const nextId =
      this.travels.length > 0
        ? Math.max(...this.travels.map((t) => t.id)) + 1
        : 1;

    const newTravel: Travel = { id: nextId, ...createTravelDto };
    this.travels.push(newTravel);
    return newTravel;
  }

  findAll(): Travel[] {
    return this.travels;
  }

  findOne(id: number): Travel {
    const travel = this.travels.find((t) => t.id === id);
    if (!travel) {
      throw new NotFoundException(`Voyage #${id} introuvable`);
    }
    return travel;
  }

  update(id: number, updateTravelDto: UpdateTravelDto): Travel {
    const travel = this.findOne(id);
    Object.assign(travel, updateTravelDto);
    return travel;
  }

  remove(id: number): Travel {
    const travel = this.findOne(id);
    this.travels = this.travels.filter((t) => t.id !== id);
    return travel;
  }
}