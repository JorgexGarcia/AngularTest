import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSettingsTableComponent } from './change-settings-table.component';

describe('ChangeSettingsTableComponent', () => {
  let component: ChangeSettingsTableComponent;
  let fixture: ComponentFixture<ChangeSettingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSettingsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSettingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
