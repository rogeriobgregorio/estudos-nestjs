import { ConceitosManualService } from './conceitos-manual.service';
import { Controller, Get } from "@nestjs/common";

@Controller("conceitos-manual")
export class ConceitosManualController {
    constructor(private readonly ConceitosManualService: ConceitosManualService) {}

    @Get()
    home(): string {
        return this.ConceitosManualService.solucionaHome();
    }
}