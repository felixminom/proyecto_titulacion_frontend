import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotacionComponent } from './anotacion.component';

describe('AnotacionComponent', () => {
  let component: AnotacionComponent;
  let fixture: ComponentFixture<AnotacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnotacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
