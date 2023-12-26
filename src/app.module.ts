import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          username: config.get('TYPEORM_USERNAME'),
          password: config.get('TYPEORM_PASSWORD'),
          database: config.get('TYPEORM_DATABASE'),
          port: +config.get('TYPEORM_PORT'),
          entities: [__dirname + 'dist/**/*.entity{.ts, .js}'],
          synchronize: true,
          autoLoadEntities: true,
          logging: true,
        };
      },
    }),
    UsersModule,
  ],
  providers: [],
})
export class AppModule {}
