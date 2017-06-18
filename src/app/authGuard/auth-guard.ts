import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { FbloginService } from '../fblogin/fblogin.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private fbloginService: FbloginService) {}

  canActivate() {
    return this.fbloginService.isLoggedIn();
  }
}