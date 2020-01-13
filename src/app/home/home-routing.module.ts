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
                loadChildren: './home/alarm/alarm.module#AlarmPageModule',
            },
            {
                path: 'logss',
                loadChildren: './home/logss/logss.module#LogssPageModule'
            }
        ]
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule {

}
