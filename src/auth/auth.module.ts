import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports:[
    JwtModule.registerAsync({
      useFactory:() => {
        return {
          signOptions: { expiresIn: '1d' },
          secret: process.env.JWT_SECRET || 'zulu2207',
        }
      }
    }),
    MongooseModule.forFeature([
      {name:User.name,schema:UserSchema}
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
