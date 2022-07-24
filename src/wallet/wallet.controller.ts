import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req, SetMetadata, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { JwtGuardGuard } from 'src/guards/jwt-guard.guard';
import { Request } from 'express';
import { RolesGuardGuard } from 'src/guards/roles-guard.guard';
import { Rol } from 'src/decorators/rol.decorator';
import { GetWalletDto } from './dto/get-wallet.dto';

@ApiTags('wallet')
@ApiBearerAuth()
@UseGuards(JwtGuardGuard, RolesGuardGuard)
@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly userService: UsersService,
    ) {}

  @Post('create')
  @Rol(['admin','user'])
  @HttpCode(201)
  create(@Req() req:Request, @Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto,req);
  }

  @Get('/all_wallets')
  @Rol(['admin'])
  @HttpCode(200)
  findAll() {
    return this.walletService.findAll();
  }

  @Get('/get_one/:id')
  @Rol(['admin','user'])
  @HttpCode(200)
  findOne(@Param() param: GetWalletDto) {
    return this.walletService.findOne(param);
  }

  @Patch('recharge/:id')
  @Rol(['admin','user'])
  @HttpCode(200)
  update(@Param() param: GetWalletDto, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(param, updateWalletDto);
  }

  @Delete(':id')
  @Rol(['admin'])
  @HttpCode(200)
  remove(@Param() param: GetWalletDto) {
    return this.walletService.remove(param);
  }
}
