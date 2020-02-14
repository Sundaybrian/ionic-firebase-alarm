import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: HomePage,
        children: [
            {
                path: 'alarm',
                loadChildren: () => import('./alarm/alarm.module').then( m => m.AlarmPageModule)
            },
            {
                path: 'logss',
                loadChildren: () => import('./logss/logss.module').then( m => m.LogssPageModule)

            },
            {
                path: '',
                redirectTo: '/home/tabs/alarm',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/home/tabs/alarm',
        pathMatch: 'full'
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule {

}
