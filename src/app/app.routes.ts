import { Routes } from '@angular/router';
import { HomepageComponent } from "./homepage/homepage.component";
import { SkillsComponent } from "./skills/skills.component";
import { DegreesComponent } from "./degrees/degrees.component";
export const routes: Routes = [{ component: HomepageComponent, path: '' },
{ component: SkillsComponent, path: 'skills' },
{ component: DegreesComponent, path: 'degrees' }];
