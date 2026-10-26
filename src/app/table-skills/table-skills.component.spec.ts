import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { TableSkillsComponent } from './table-skills.component';

describe('TableSkillsComponent', () => {
  let component: TableSkillsComponent;
  let fixture: ComponentFixture<TableSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSkillsComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TableSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
