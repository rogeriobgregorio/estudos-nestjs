import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticoService {
    getHome(): string {
        return 'Home do conceitos automatico funcionando';
    }
}
