import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondentsComponent } from './respondents.component';

describe('RespondentsComponent', () => {
  let component: RespondentsComponent;
  let fixture: ComponentFixture<RespondentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RespondentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespondentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
