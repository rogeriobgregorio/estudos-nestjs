import { Pessoa } from 'src/pessoas/entities/pessoa.entity';

export class TokenPayloadDto {
  sub: number;
  email: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  pessoa: Pessoa; // Attach the Pessoa entity to the payload
}
