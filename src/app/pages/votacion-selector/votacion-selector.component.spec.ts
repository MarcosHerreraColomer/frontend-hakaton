import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotacionSelectorComponent } from './votacion-selector.component';

describe('VotacionSelectorComponent', () => {
  let component: VotacionSelectorComponent;
  let fixture: ComponentFixture<VotacionSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotacionSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotacionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
