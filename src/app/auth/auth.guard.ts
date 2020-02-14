import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { FcmService } from '../Services/fcm.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private fcm: FcmService,
    private router: Router
    ) {

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.fcm.isAuthenticated) {
        this.router.navigate(['/auth']);

      }

      return this.fcm.isAuthenticated();
  }

}
