import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiconnectedComponentsComponent } from './biconnected-components.component';

describe('BiconnectedComponentsComponent', () => {
  let component: BiconnectedComponentsComponent;
  let fixture: ComponentFixture<BiconnectedComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiconnectedComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiconnectedComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
