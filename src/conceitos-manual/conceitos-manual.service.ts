import { Injectable } from "@nestjs/common";

@Injectable()
export class ConceitosManualService {

    solucionaHome(): string {
        return 'Home do conceitos manual funcionando';
    }
}