import { Module } from '@nestjs/common';
import { ConceitosAutomaticoController } from './conceitos-automatico.controller';

@Module({
    imports: [],
    controllers: [ConceitosAutomaticoController],
    providers: [],
    exports: [],
})
export class ConceitosAutomaticoModule {}
