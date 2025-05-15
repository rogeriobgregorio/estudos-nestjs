import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entites/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Este é o primeiro recado',
      de: 'João',
      para: 'Maria',
      lido: false,
      data: new Date(),
    },
  ];

  findAll(): Recado[] {
    return this.recados;
  }

  findOne(id: number): Recado {
    const recado = this.recados.find(recado => recado.id === id);
    if (!recado) {
      throw new NotFoundException('Recado não encontrado');
    }
    return recado;
  }

  create(createRecadoDto: CreateRecadoDto): Recado {
    this.lastId++;
    const id = this.lastId;
    const novoRecado: Recado = {
      id,
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };
    this.recados.push(novoRecado);
    return novoRecado;
  }

  update(id: number, updateRecadoDto: UpdateRecadoDto): Recado {
    const index = this.recados.findIndex(recado => recado.id === id);
    if (index === -1) {
      throw new NotFoundException('Recado não encontrado');
    }
    this.recados[index] = { ...this.recados[index], ...updateRecadoDto };
    return this.recados[index];
  }

  remove(id: number): void {
    const index = this.recados.findIndex(recado => recado.id === id);
    if (index === -1) {
      throw new NotFoundException('Recado não encontrado');
    }
    this.recados.splice(index, 1);
  }
}
