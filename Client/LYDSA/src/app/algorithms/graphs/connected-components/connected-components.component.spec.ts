import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedComponentsComponent } from './connected-components.component';

describe('ConnectedComponentsComponent', () => {
  let component: ConnectedComponentsComponent;
  let fixture: ComponentFixture<ConnectedComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectedComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
