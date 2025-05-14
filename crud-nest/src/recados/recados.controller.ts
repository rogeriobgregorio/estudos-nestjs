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
  create(@Body() body: any) {
    return this.RecadosService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.RecadosService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.RecadosService.remove(+id);
  }
}
