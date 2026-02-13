import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoSyncComponent } from './geo-sync.component';

describe('GeoSyncComponent', () => {
  let component: GeoSyncComponent;
  let fixture: ComponentFixture<GeoSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeoSyncComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeoSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
