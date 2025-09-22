import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypecoursComponent } from './typecours.component';

describe('TypecoursComponent', () => {
  let component: TypecoursComponent;
  let fixture: ComponentFixture<TypecoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypecoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypecoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
