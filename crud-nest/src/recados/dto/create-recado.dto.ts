import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateRecadoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly texto: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(250)
  readonly de: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(250)
  readonly para: string;
}
