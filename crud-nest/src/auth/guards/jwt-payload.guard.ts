export interface JwtPayload {
  sub: string | number;
  email: string;
  secret: string;
  audience: string;
  issuer: string;
  expiresIn: string | number;
}
