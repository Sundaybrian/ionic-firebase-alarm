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
                loadChildren: './alarm/alarm.module#AlarmPageModule',
            },
            {
                path: 'logss',
                loadChildren: './logss/logss.module#LogssPageModule'
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
