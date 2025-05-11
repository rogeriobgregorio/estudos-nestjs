import { Module } from '@nestjs/common';
import { ConceitosAutomaticoController } from './conceitos-automatico.controller';
import { ConceitosAutomaticoService } from './conceitos-automatico.service';

@Module({
    imports: [],
    controllers: [ConceitosAutomaticoController],
    providers: [ConceitosAutomaticoService],
    exports: [],
})
export class ConceitosAutomaticoModule {}
