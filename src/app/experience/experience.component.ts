import { Component, ChangeDetectionStrategy } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
    selector: 'app-experience',
    imports: [MatExpansionModule],
    templateUrl: './experience.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './experience.component.scss'
})
export class ExperienceComponent {

}
