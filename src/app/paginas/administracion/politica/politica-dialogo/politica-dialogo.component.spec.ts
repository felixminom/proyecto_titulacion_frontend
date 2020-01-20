import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaDialogoComponent } from './politica-dialogo.component';

describe('PoliticaDialogoComponent', () => {
  let component: PoliticaDialogoComponent;
  let fixture: ComponentFixture<PoliticaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
