import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OnlyLowercaseLettersRegex } from './only-lowercase-letters.regex';
import { RegexProtocol } from './regex.protocol';
import { RemoveSpacesRegex } from './remove-spaces.regex';

export type ClassNames = 'OnlyLowercaseLettersRegex' | 'RemoveSpacesRegex';

@Injectable()
export class RegexFactory {
  create(className: ClassNames): RegexProtocol {
    switch (className) {
      case 'OnlyLowercaseLettersRegex':
        return new OnlyLowercaseLettersRegex();
      case 'RemoveSpacesRegex':
        return new RemoveSpacesRegex();
      default:
        throw new InternalServerErrorException(
          `Regex class not found: ${className as string}`,
        );
    }
  }
}
