export class TokenPayloadDto {
  sub: string | number;
  email: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}
