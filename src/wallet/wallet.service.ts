import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/users.schema';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { GetWalletDto } from './dto/get-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet, WalletDocument } from './schema/wallet.scheme';

interface ModelExt<T> extends Model<T>{
  delete:Function;
  findAllWallets:Function;
  findOneWallet:Function;
}


@Injectable()
export class WalletService {


  constructor(
    @InjectModel(Wallet.name) private readonly walletModule:ModelExt<WalletDocument>,
    @InjectModel(User.name) private readonly userModule:ModelExt<UserDocument>,
  ){}

  async create(createWalletDto: CreateWalletDto, req:any) {
    var balanceUSD;
    const userExist = await this.userModule.findOne({id:createWalletDto.idUser})
    if(!userExist) throw new HttpException('El usuario no existe, registrate', HttpStatus.BAD_REQUEST);
    const userHaveWalet = await this.walletModule.findOne({idUser:userExist.id})
    if(userHaveWalet) throw new HttpException('El usuario ya cuenta con una billetera', HttpStatus.CONFLICT);
    console.log(createWalletDto)
    const USD = createWalletDto.balanceCOP / parseInt(process.env.TRM_DAY)
    balanceUSD = USD.toFixed(2)
    
    const walletToCreate = {...createWalletDto,balanceUSD}

    const walletCreated = await this.walletModule.create(walletToCreate)
    return walletCreated;
  }

  async findAll() {
    return this.walletModule.findAllWallets()
  }

  async findOne(param: GetWalletDto) {
    const {id} = param
    return this.walletModule.findOneWallet(id)
  }

  async update(param: GetWalletDto, updateWalletDto: UpdateWalletDto) {
    //This is module for recharge money in wallet
    const {id} = param

    const USD = updateWalletDto.balanceCOP / parseInt(process.env.TRM_DAY)
    const actualBalance = await this.walletModule.findOne({id})
    const usdSum = actualBalance.balanceUSD + USD
    const balanceUSD = usdSum.toFixed(2)
    updateWalletDto.balanceCOP = actualBalance.balanceCOP + updateWalletDto.balanceCOP
    
    const walletToUpdate = {...updateWalletDto,balanceUSD}

    return this.walletModule.findOneAndUpdate({id},walletToUpdate, {
      upsert:true,
      new:true
    })
  }

  async remove(param: GetWalletDto) {
    const {id} = param
    const _id = new Types.ObjectId(id)
    const response = this.walletModule.delete({_id})
    return response
  }
}
