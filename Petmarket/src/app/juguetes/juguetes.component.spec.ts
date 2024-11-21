import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuguetesComponent } from './juguetes.component';

describe('JuguetesComponent', () => {
  let component: JuguetesComponent;
  let fixture: ComponentFixture<JuguetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuguetesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JuguetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
