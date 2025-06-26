import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import { HashingService } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenPayloadDto } from './dto/token-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    private readonly hashingService: HashingService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const pessoa = await this.pessoaRepository.findOneBy({
      email: loginDto.email,
      active: true, // Ensure the user is active
    });

    if (!pessoa) {
      throw new UnauthorizedException('User not found or inactive');
    }

    const passwordIsValid = await this.hashingService.compare(
      loginDto.password,
      pessoa.passwordHash,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.createTokens(pessoa);
  }

  private async createTokens(pessoa: Pessoa) {
    const accessTokenPromise = this.signJwtAsync<Partial<Pessoa>>(
      pessoa.id,
      this.jwtConfiguration.jwtttl,
      {
        email: pessoa.email,
      },
    );

    const refreshTokenPromise = this.signJwtAsync(
      pessoa.id,
      this.jwtConfiguration.jwtRefreshTtl,
    );

    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    return { accessToken, refreshToken };
  }

  private async signJwtAsync<T>(sub: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: sub,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: expiresIn,
      },
    );
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<TokenPayloadDto>(
        refreshTokenDto.refreshToken,
        this.jwtConfiguration,
      );

      const Pessoa = await this.pessoaRepository.findOneBy({
        id: sub,
        active: true, // Ensure the user is active
      });

      if (!Pessoa) {
        throw new Error('User not found or inactive');
      }

      return this.createTokens(Pessoa);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unauthorized';
      throw new UnauthorizedException(message);
    }
  }
}
