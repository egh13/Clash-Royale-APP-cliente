import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazosComponent } from './mazos.component';

describe('MazosComponent', () => {
  let component: MazosComponent;
  let fixture: ComponentFixture<MazosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MazosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MazosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
