import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvSeriesListComponent } from './tv-series-list.component';

describe('TvSeriesListComponent', () => {
  let component: TvSeriesListComponent;
  let fixture: ComponentFixture<TvSeriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvSeriesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvSeriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
