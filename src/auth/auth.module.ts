import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { jwtConstants } from 'src/auth/constants';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from 'src/auth/models/auth.model';
import { RolesGuard } from 'src/auth/auth-strategy/roles-guard';
import { AuthGuard } from 'src/auth/auth-strategy/auth-guard';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { JwtStrategy } from 'src/auth/auth-strategy/jwt-strategy';
import { AuthGuard1 } from 'src/auth/auth.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([Auth]),
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      // signOptions: { expiresIn: '60s' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    {
      provide: APP_GUARD,
      useClass: AuthGuard1,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule { }
