import { Controller, Get } from "@nestjs/common";

@Controller("conceitos-manual")
export class ConceitosManualController {

    @Get()
    home(): string {
        return "Hello from Conceitos Manual!";
    }
}