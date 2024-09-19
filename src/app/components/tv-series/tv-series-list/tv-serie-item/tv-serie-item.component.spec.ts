import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvSerieItemComponent } from './tv-serie-item.component';

describe('TvSerieItemComponent', () => {
  let component: TvSerieItemComponent;
  let fixture: ComponentFixture<TvSerieItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvSerieItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvSerieItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
