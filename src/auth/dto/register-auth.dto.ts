import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength, Length, IsString, Matches} from "class-validator";

export class RegisterAuthDto {
    @ApiProperty({
        description: 'This email for client Use',
        example:"test@test.com"
    })
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    fullName:string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(1,15)
    cedula:string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(1,50)
    direccion:string;
}
