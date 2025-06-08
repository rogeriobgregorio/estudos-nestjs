import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from '../recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from '../pessoas/pessoas.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RecadosModule,
    PessoasModule,
    // Configuration module to load environment variables
    ConfigModule.forRoot(),
    // TypeORM configuration
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES),
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE), // Note: set to false in production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
