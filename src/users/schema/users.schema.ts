import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from "uuid";

export type UserDocument = User & Document;

@Schema({timestamps:true})
export class User {
    @Prop({unique:true, default:uuidv4})
    id:string;

    @Prop({required:true, unique:true})
    email: string;
    
    @Prop({required:true})
    password: string;

    @Prop({
        default:['user']
    })
    roles: string[];
    
    @Prop({required:true})
    fullName: string;

    @Prop({required:true, unique:true})
    cedula: string;

    @Prop()
    direccion: string;
}

export const UserSchema = SchemaFactory.createForClass(User);