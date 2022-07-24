import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, Length, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {
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

    @ApiProperty()
    @IsNotEmpty()
    @Length(1,100)
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
