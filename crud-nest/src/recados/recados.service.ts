import { PaginationDto } from './../common/dto/paginatio.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entites/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from '../pessoas/pessoas.service';
import { RecadosUtils } from './recados.utils';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService,
    private readonly recadosUtils: RecadosUtils,
  ) {}

  async findAll(paginationDto?: PaginationDto): Promise<Recado[]> {
    const { limit = 10, offset = 0 } = paginationDto ?? {};

    const recados = await this.recadoRepository.find({
      take: limit,
      skip: offset,
      relations: ['de', 'para'],
      order: {
        id: 'DESC',
      },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });
    return recados;
  }

  async findOne(id: number): Promise<Recado> {
    const recado = await this.recadoRepository.findOne({
      where: { id },
      relations: ['de', 'para'],
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    if (!recado) {
      throw new NotFoundException('Recado não encontrado');
    }
    return recado;
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const { deId, paraId } = createRecadoDto;
    const de = await this.pessoasService.findOne(deId);
    const para = await this.pessoasService.findOne(paraId);

    const novoRecado = {
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };

    const recado = this.recadoRepository.create(novoRecado);
    await this.recadoRepository.save(recado);
    return {
      ...recado,
      de: {
        id: recado.de.id,
      },
      para: {
        id: recado.para.id,
      },
    };
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto): Promise<Recado> {
    const recado = await this.findOne(id);
    recado.texto = updateRecadoDto?.texto ?? recado.texto;
    recado.lido = updateRecadoDto?.lido ?? recado.lido;

    const novoRecado = await this.recadoRepository.save(recado);
    return novoRecado;
  }

  async remove(id: number): Promise<void> {
    const recado = await this.recadoRepository.findOne({
      where: { id },
    });

    if (!recado) {
      throw new NotFoundException('Recado não encontrado');
    }
    await this.recadoRepository.remove(recado);
  }
}
