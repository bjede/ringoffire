import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPlayerMessageComponent } from './dialog-add-player-message.component';

describe('DialogAddPlayerMessageComponent', () => {
  let component: DialogAddPlayerMessageComponent;
  let fixture: ComponentFixture<DialogAddPlayerMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddPlayerMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddPlayerMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
