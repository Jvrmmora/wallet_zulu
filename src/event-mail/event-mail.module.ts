import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDocument } from 'src/users/schema/users.schema';

@Module({})
export class EventMailModule {

    constructor(private readonly mailService:MailerService){

    }

    @OnEvent('user.login')
        handleUserLoginEvent(user: any) {
        console.log("inicio sesion",user)
    }

    @OnEvent('user.created')
        handleOrderCreatedEvent(user: UserDocument) {
        console.log('Enviando Email....');
        this.mailService.sendMail({
            to:user.email,
            template:'welcome',
            subject: "Welcome zulu Wallet ✔",
            context:{
                fullName: user.fullName
            }
        })
    }

}
