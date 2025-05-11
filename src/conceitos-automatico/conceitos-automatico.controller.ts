import { ConceitosAutomaticoService } from './conceitos-automatico.service';
import { Controller, Get } from '@nestjs/common';

@Controller('conceitos-automatico')
export class ConceitosAutomaticoController {
    constructor(private readonly ConceitosAutomaticoService: ConceitosAutomaticoService) {}

    @Get()
    home(): string {
        return this.ConceitosAutomaticoService.getHome();
    }
}
