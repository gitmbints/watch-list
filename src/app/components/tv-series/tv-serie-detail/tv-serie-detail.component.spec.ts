import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvSerieDetailComponent } from './tv-serie-detail.component';

describe('TvSerieDetailComponent', () => {
  let component: TvSerieDetailComponent;
  let fixture: ComponentFixture<TvSerieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvSerieDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvSerieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
