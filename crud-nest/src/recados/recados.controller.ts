import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('recados')
export class RecadosController {

    @HttpCode(HttpStatus.OK)
    @Get()
    findAll(@Query() pagination: any) {
        const { limit, offset } = pagination;
        return `This action returns all recados with ${limit} limit and ${offset} offset`;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} recado`;
    }

    @Post()
    create(@Body() body: any) {
        return body;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return {
            id,
            ...body,
        };
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} recado`;
    }
}
