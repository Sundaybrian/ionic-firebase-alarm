import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  canLoad: [AuthGuard]
},
  // { path: 'alarm', loadChildren: './alarm/alarm.module#AlarmPageModule' },
  // { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  // { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule',
  canLoad: [AuthGuard]
 },
  // { path: 'logs', loadChildren: './logs/logs.module#LogsPageModule' },
  // { path: 'alarm', loadChildren: './home/alarm/alarm.module#AlarmPageModule' },
  // { path: 'logss', loadChildren: './home/logss/logss.module#LogssPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
