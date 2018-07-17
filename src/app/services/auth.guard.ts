import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {MessageService}  from './message.service';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private messageService: MessageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        this.messageService.add("auth.guard: ");
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}