import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, } from "class-validator";

export class GetWalletDto {
    @ApiProperty({
        description: 'This is id of wallet',
        example:"9ac7e773-dcd7-4e9d-8e4f-e804ca5b4b84"
    })
    @IsNotEmpty()
    @IsUUID()
    id:string;
}
