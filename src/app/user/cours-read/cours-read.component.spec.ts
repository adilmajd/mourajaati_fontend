import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursReadComponent } from './cours-read.component';

describe('CoursReadComponent', () => {
  let component: CoursReadComponent;
  let fixture: ComponentFixture<CoursReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
