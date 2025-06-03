import { RecadosUtils } from 'src/recados/recados.utils';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { RecadosService } from './recados.service';
import { PaginationDto } from '../common/dto/paginatio.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SERVER_NAME } from '../common/constants/server-name.constant';

@Controller('recados')
export class RecadosController {
  constructor(
    private readonly RecadosService: RecadosService,
    private readonly recadosUtils: RecadosUtils,
    @Inject(SERVER_NAME)
    private readonly serverName: string,
  ) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.RecadosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.RecadosService.findOne(id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.RecadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.RecadosService.update(+id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.RecadosService.remove(id);
  }
}
