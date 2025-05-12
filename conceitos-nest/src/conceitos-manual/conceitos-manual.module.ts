import { Module } from "@nestjs/common";
import { ConceitosManualController } from "./conceitos-manual.controller";
import { ConceitosManualService } from "./conceitos-manual.service";

@Module({
    imports: [],
    controllers: [
        ConceitosManualController
    ],
    providers: [ConceitosManualService],
    exports: [],
})
export class ConceitosManualModule {}