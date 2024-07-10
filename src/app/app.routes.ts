import { Routes } from '@angular/router';
import { HomepageComponent } from "./homepage/homepage.component";
import { SkillsComponent } from "./skills/skills.component";
import { DegreesComponent } from "./degrees/degrees.component";
import { ExperienceComponent } from "./experience/experience.component";
import { AboutComponent } from './about/about.component';
import { NgGdComponent } from './ng-gd/ng-gd.component';
export const routes: Routes = [{ component: HomepageComponent, path: '' },
{ component: SkillsComponent, path: 'skills' },
{ component: DegreesComponent, path: 'degrees' },
{ component: ExperienceComponent, path: 'experience' },
{ component: NgGdComponent, path: 'ng-gd' },
{ component: AboutComponent, path: 'about' }
];
