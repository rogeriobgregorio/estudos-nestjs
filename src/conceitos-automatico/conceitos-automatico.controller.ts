import { Controller, Get } from '@nestjs/common';

@Controller('conceitos-automatico')
export class ConceitosAutomaticoController {

    @Get()
    home(): string {
        return "Hello from Conceitos Automatico!";
    }
}
