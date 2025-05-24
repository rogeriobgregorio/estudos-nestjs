import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { RecadosService } from './recados.service';
import { PaginationDto } from '../common/dto/paginatio.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';

@Controller('recados')
@UsePipes(ParseIntPipe)
export class RecadosController {
  constructor(private readonly RecadosService: RecadosService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @UseInterceptors(AddHeaderInterceptor)
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
