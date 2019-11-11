import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidacionComponent } from './consolidacion.component';

describe('ConsolidacionComponent', () => {
  let component: ConsolidacionComponent;
  let fixture: ComponentFixture<ConsolidacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
