import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorDialogoComponent } from './valor-dialogo.component';

describe('ValorDialogoComponent', () => {
  let component: ValorDialogoComponent;
  let fixture: ComponentFixture<ValorDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValorDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValorDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
