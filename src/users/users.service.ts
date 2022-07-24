import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/users.schema';
import { Model, Types } from 'mongoose'
import { GetUserDto } from './dto/get-user.dto';

interface ModelExt<T> extends Model<T>{
  delete:Function;
}


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModule:ModelExt<UserDocument>){}

  async create(createUserDto: CreateUserDto) {
    const userCreated = await this.usersModule.create(createUserDto)
    return userCreated
  }

  async findAll() {
    const list = await this.usersModule.find({});
    return list;
  }

  findOne(param: GetUserDto) {
    const {id} = param
    return this.usersModule.findOne({id})
  }

  update(param: GetUserDto, updateUserDto: UpdateUserDto) {
    const {id} = param
    return this.usersModule.findOneAndUpdate({id},updateUserDto, {
      upsert:true,
      new:true
    })
  }

  remove(param: GetUserDto) {
    const {id} = param
    const _id = new Types.ObjectId(id)
    const response = this.usersModule.delete({_id})
    return response
  }
}
