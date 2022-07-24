import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuardGuard implements CanActivate {

  constructor(private readonly reflector:Reflector){

  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const getRolMeta = this.reflector.get<string[]>('rol',context.getHandler()) //Roles permitidos por controlador
    
    const req = context.getArgByIndex(0)
    const {roles}  = req.user; //Roles que tiene el usuario

    const isAllow = roles.some((rol) => getRolMeta.includes(rol)) //Compara los roles si puede entrar

    return isAllow;
  }
}
