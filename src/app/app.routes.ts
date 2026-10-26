import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadComponent: () => import('./homepage/homepage.component').then(m => m.HomepageComponent),
        data: { state: 'home' }
    },
    {
        path: 'skills',
        loadComponent: () => import('./table-skills/table-skills.component').then(m => m.TableSkillsComponent),
        data: { state: 'skills', preload: true }
    },
    {
        path: 'degrees',
        loadComponent: () => import('./degrees/degrees.component').then(m => m.DegreesComponent),
        data: { state: 'degrees' }
    },
    {
        path: 'experience',
        loadComponent: () => import('./experience/experience.component').then(m => m.ExperienceComponent),
        data: { state: 'experience' }
    },
    {
        path: 'ng-gd',
        loadComponent: () => import('./ng-gd/ng-gd.component').then(m => m.NgGdComponent),
        data: { state: 'ng-gd' }
    },
    {
        path: 'about',
        loadComponent: () => import('./about/about.component').then(m => m.AboutComponent),
        data: { state: 'about' }
    }
];
