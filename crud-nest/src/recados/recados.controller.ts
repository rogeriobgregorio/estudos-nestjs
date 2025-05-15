import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { RecadosService } from './recados.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('recados')
export class RecadosController {
  constructor(private readonly RecadosService: RecadosService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() pagination: { limit: number; offset: number }) {
    const { limit, offset } = pagination;
    return this.RecadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.RecadosService.findOne(+id);
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
  remove(@Param('id') id: string) {
    return this.RecadosService.remove(+id);
  }
}
