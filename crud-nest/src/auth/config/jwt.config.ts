import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  audience: process.env.JWT_TOKEN_AUDIENCE,
  issuer: process.env.JWT_TOKEN_ISSUER,
  jwtttl: Number(process.env.JWT_TTL),
  jwtRefreshTtl: Number(process.env.JWT_REFRESH_TOKEN_TTL),
}));
