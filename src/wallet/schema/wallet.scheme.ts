import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from "uuid";

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
    @Prop({unique:true, default:uuidv4})
    id:string;

    @Prop({required:true})
    idUser: string;

    @Prop({default:0})
    balanceUSD: number;
    
    @Prop({default:0})
    balanceCOP: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
//Relation with User with wallet
WalletSchema.statics.findAllWallets = function(){
    const list = this.aggregate([
        {   $lookup: {
                from: 'users', 
                foreignField: 'id',
                localField: 'idUser',
                as: 'client',
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            fullName: 1,
                            email: 1,
                            cedula: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: '$client',
        },
    ]);
    
    return list;
};
WalletSchema.statics.findOneWallet = function(id:string){
    const list = this.aggregate([
        {$match:{id}},
        {   $lookup: {
                from: 'users', 
                foreignField: 'id',
                localField: 'idUser',
                as: 'client',
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            fullName: 1,
                            email: 1,
                            cedula: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: '$client',
        },
    ]);
    
    return list;
};