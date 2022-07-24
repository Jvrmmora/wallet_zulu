import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, HttpCode, HttpException, HttpStatus, ParseUUIDPipe, UseInterceptors, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { LoggerInterceptor } from 'src/utils/logger.interceptor';
import { Rol } from 'src/decorators/rol.decorator';
import { JwtGuardGuard } from 'src/guards/jwt-guard.guard';
import { RolesGuardGuard } from 'src/guards/roles-guard.guard';
import { GetUserDto } from './dto/get-user.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtGuardGuard, RolesGuardGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Rol(['admin'])
  @Get('/get_all')
  findAll() {
    return this.usersService.findAll();
  }

  @Rol(['admin','user'])
  @Get('/get_one/:id')
  findOne(@Param() param: GetUserDto) {
    return this.usersService.findOne(param);
  }

  @Rol(['admin','user'])
  @Patch('/update_info/:id')
  update(@Param() param: GetUserDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(param, updateUserDto);
  }
  
  @Rol(['admin'])
  @Delete(':id')
  remove(@Param() param: GetUserDto) {
    return this.usersService.remove(param);
  }
}
