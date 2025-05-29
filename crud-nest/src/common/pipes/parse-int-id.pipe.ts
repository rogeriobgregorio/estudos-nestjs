import {
  ArgumentMetadata,
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      throw new BadRequestException('ParseIntPipe espera un número');
    }

    if (parsedValue <= 0) {
      throw new BadRequestException('ParseIntPipe espera un número positivo');
    }

    return parsedValue;
  }
}
