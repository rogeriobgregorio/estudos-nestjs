import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entites/recado.entity';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils } from './recados.utils';

@Module({
  imports: [TypeOrmModule.forFeature([Recado]), PessoasModule],
  controllers: [RecadosController],
  providers: [RecadosService, RecadosUtils],
})
export class RecadosModule {}
