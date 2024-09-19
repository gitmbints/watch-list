import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MustWatchListComponent } from './must-watch-list.component';

describe('MustWatchListComponent', () => {
  let component: MustWatchListComponent;
  let fixture: ComponentFixture<MustWatchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MustWatchListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MustWatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
