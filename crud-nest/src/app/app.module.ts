import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from '../recados/recados.module';
import { PessoasModule } from '../pessoas/pessoas.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import * as Joi from 'joi';
import appConfig from './app.config';

@Module({
  imports: [
    RecadosModule,
    PessoasModule,
    AuthModule,

    // Load and validate environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: Joi.object({
        DATABASE_TYPE: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_DATABASE: Joi.string().required(),
        DATABASE_AUTOLOADENTITIES: Joi.boolean()
          .truthy('true')
          .falsy('false')
          .default(true),
        DATABASE_SYNCHRONIZE: Joi.boolean()
          .truthy('true')
          .falsy('false')
          .default(false),
      }),
    }),

    // TypeORM async configuration with injected appConfig
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        ConfigModule.forFeature(appConfig), // <- Necessário para CONFIGURATION(app)
      ],
      inject: [appConfig.KEY],
      useFactory: (config: ConfigType<typeof appConfig>) => ({
        type: config.database.type as 'postgres',
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
        autoLoadEntities: config.database.autoLoadEntities,
        synchronize: config.database.synchronize,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
