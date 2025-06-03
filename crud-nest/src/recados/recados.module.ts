import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entites/recado.entity';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils } from './recados.utils';
import { SERVER_NAME } from 'src/common/constants/server-name.constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recado]),
    forwardRef(() => PessoasModule),
  ],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    RecadosUtils,
    {
      provide: 'SERVER_NAME',
      useValue: SERVER_NAME,
    },
  ],
  exports: [RecadosService, RecadosUtils],
})
export class RecadosModule {}
