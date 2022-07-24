import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/users.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from './utils/handleBcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService:JwtService,
        private readonly eventEmitter:EventEmitter2,
        @InjectModel(User.name) private usersModule:Model<UserDocument>
    ){}

    public async register(userBody:RegisterAuthDto){
        try {

            const {password,...user} = userBody;
            const userExist = await this.usersModule.findOne({email:userBody.email})
            const userExistDoc = await this.usersModule.findOne({cedula:userBody.cedula})
            if(userExist || userExistDoc) throw new HttpException('El usuario ya existe, inicia sesion', HttpStatus.BAD_REQUEST);
            const userParse ={
                ...user,
                password: await generateHash(password)
            }

            const newUser = await this.usersModule.create(userParse)

            this.eventEmitter.emit('user.created', newUser); //Evento al crear usuario

            return newUser
        } catch (error) {
            throw new HttpException(`Error: ${error}`, HttpStatus.BAD_REQUEST);
        }
    }

    public async login(userLoginBody:LoginAuthDto){
        const {password} = userLoginBody;

        const userExist = await this.usersModule.findOne({email:userLoginBody.email})
        if(!userExist) throw new HttpException('El usuario no existe, por favor registrate', HttpStatus.NOT_FOUND);


        const isCheck = await compareHash(password,userExist.password)
        if(!isCheck) throw new HttpException('Contraseña invalida', HttpStatus.CONFLICT);

        const userFlat = userExist.toObject() //no mostrar el password en login
        delete userFlat.password

        const payload = {
            id:userFlat._id
        }

        const token = await this.jwtService.sign(payload)

        const data = {
            token,
            user:userFlat
        }

        this.eventEmitter.emit('user.login', data); //Evento al iniciar sesion
        
        return data
    }

}
