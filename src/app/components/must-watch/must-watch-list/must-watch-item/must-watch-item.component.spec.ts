import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MustWatchItemComponent } from './must-watch-item.component';

describe('MustWatchItemComponent', () => {
  let component: MustWatchItemComponent;
  let fixture: ComponentFixture<MustWatchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MustWatchItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MustWatchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
