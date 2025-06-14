import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { HashingService } from 'src/auth/hashing/hashing.service';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    private readonly hashingService: HashingService,
  ) {}

  async create(createPessoaDto: CreatePessoaDto): Promise<Pessoa> {
    try {
      const passwordHash = await this.hashingService.hash(
        createPessoaDto.password,
      );

      const novaPessoa = {
        email: createPessoaDto.email,
        passwordHash: passwordHash,
        nome: createPessoaDto.nome,
      };

      const pessoa = this.pessoaRepository.create(novaPessoa);
      return await this.pessoaRepository.save(pessoa);
    } catch (error: any) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        (error as { code?: string }).code === '23505'
      ) {
        throw new ConflictException('Email já cadastrado');
      }
      throw error;
    }
  }

  async findAll(): Promise<Pessoa[]> {
    const pessoas = await this.pessoaRepository.find({ order: { id: 'ASC' } });
    return pessoas;
  }

  async findOne(id: number): Promise<Pessoa> {
    const pessoa = await this.pessoaRepository.findOne({
      where: { id },
    });
    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto): Promise<Pessoa> {
    const partialUpdatePessoaDto = {
      nome: updatePessoaDto?.nome,
    };

    if (updatePessoaDto?.password) {
      const passwordHash = await this.hashingService.hash(
        updatePessoaDto.password,
      );
      partialUpdatePessoaDto['passwordHash'] = passwordHash;
    }

    const pessoa = await this.pessoaRepository.preload({
      id,
      ...partialUpdatePessoaDto,
    });

    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    const novaPessoa = await this.pessoaRepository.save(pessoa);
    return novaPessoa;
  }

  async remove(id: number) {
    const pessoa = await this.pessoaRepository.findOne({
      where: { id },
    });
    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    await this.pessoaRepository.remove(pessoa);
  }
}
