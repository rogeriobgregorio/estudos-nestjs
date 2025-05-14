import { Injectable } from '@nestjs/common';
import { Recado } from './entites/recado.entity';

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
    const recado = this.recados.find((recado) => recado.id === id);
    if (!recado) {
      throw new Error('Recado não encontrado');
    }
    return recado;
  }

  create(recado: any) {
    this.lastId++;
    const id = this.lastId;
    const novoRecado: Recado = {
      id,
      ...recado,
    };
    this.recados.push(novoRecado);
    return novoRecado;
  }

  update(id: number, recado: Recado): Recado {
    const index = this.recados.findIndex((recado) => recado.id === id);
    if (index === -1) {
      throw new Error('Recado não encontrado');
    }
    this.recados[index] = { ...this.recados[index], ...recado };
    return this.recados[index];
  }

  remove(id: number): void {
    const index = this.recados.findIndex((recado) => recado.id === id);
    if (index === -1) {
      throw new Error('Recado não encontrado');
    }
    this.recados.splice(index, 1);
  }
}
