import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsPositive,
} from 'class-validator';

export class CreateRecadoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly texto: string;

  @IsPositive()
  paraId: number;
}
