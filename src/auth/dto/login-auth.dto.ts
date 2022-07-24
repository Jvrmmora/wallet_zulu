import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength,MaxLength } from "class-validator";

export class LoginAuthDto {
    @ApiProperty({
        description: 'This email for client Use',
        example:"test@test.com"
    })
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    password:string;
}
