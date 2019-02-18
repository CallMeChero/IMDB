import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSerieComponent } from './delete-serie.component';

describe('DeleteSerieComponent', () => {
  let component: DeleteSerieComponent;
  let fixture: ComponentFixture<DeleteSerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
