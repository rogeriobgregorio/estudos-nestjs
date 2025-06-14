import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from '../recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from '../pessoas/pessoas.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import Joi from '@hapi/joi';
import appConfig from './app.config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    RecadosModule,
    PessoasModule,
    AuthModule,
    ConfigModule.forFeature(appConfig), // Import the app configuration
    // Configuration module to load environment variables
    ConfigModule.forRoot({
      // envFilePath: ['.env', '.env.local'], // Load .env and .env.local files
      // ignoreEnvFile: false, // Do not ignore .env files
      load: [appConfig], // Load custom configuration
      // Validate environment variables using Joi
      validationSchema: Joi.object({
        DATABASE_TYPE: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_AUTOLOADENTITIES: Joi.boolean().default(true),
        DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
      }),
    }),
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
    // Alternatively, using TypeORM with async configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [appConfig.KEY],
      useFactory: (appConfigurations: ConfigType<typeof appConfig>) => {
        return {
          type: appConfigurations.database.type as 'postgres',
          host: appConfigurations.database.host,
          port: appConfigurations.database.port,
          username: appConfigurations.database.username,
          database: appConfigurations.database.database,
          password: appConfigurations.database.password,
          autoLoadEntities: appConfigurations.database.autoLoadEntities,
          synchronize: appConfigurations.database.synchronize,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
