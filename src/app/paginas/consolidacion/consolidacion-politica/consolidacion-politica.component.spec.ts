import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidacionPoliticaComponent } from './consolidacion-politica.component';

describe('ConsolidacionPoliticaComponent', () => {
  let component: ConsolidacionPoliticaComponent;
  let fixture: ComponentFixture<ConsolidacionPoliticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidacionPoliticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidacionPoliticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
