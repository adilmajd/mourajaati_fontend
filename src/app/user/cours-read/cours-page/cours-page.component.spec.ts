import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursPageComponent } from './cours-page.component';

describe('CoursPageComponent', () => {
  let component: CoursPageComponent;
  let fixture: ComponentFixture<CoursPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
