import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureAdventuresComponent } from './future-adventures.component';

describe('FutureAdventuresComponent', () => {
  let component: FutureAdventuresComponent;
  let fixture: ComponentFixture<FutureAdventuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutureAdventuresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutureAdventuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
