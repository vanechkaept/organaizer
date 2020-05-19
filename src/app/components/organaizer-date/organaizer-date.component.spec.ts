import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganaizerDateComponent } from './organaizer-date.component';

describe('OrganaizerDateComponent', () => {
  let component: OrganaizerDateComponent;
  let fixture: ComponentFixture<OrganaizerDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganaizerDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganaizerDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
