import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './schema/wallet.scheme';
import { User, UserSchema } from 'src/users/schema/users.schema';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports:[
    MongooseModule.forFeature(
    [
      {name:Wallet.name,schema:WalletSchema},
      {name:User.name,schema:UserSchema}
    ]
    ),
    UsersModule
  ],
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}
