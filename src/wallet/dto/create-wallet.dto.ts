import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID, Min } from "class-validator";

export class CreateWalletDto {
    @ApiProperty({
        description: 'User id to add money for wallet'
    })
    @IsUUID()
    @IsNotEmpty()
    idUser:string;

    @ApiProperty({
        description: 'Value to recharge You can start with 0 Currency COP (Colombian pesos), ',
        example:0
    })
    @IsNumber()
    @Min(0,{ message: 'balanceCOP: No permit values < 0'})
    balanceCOP:number;
}
