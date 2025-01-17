import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListComponent } from './chatList.component';

describe('ChatComponent', () => {
  let component: ChatListComponent;
  let fixture: ComponentFixture<ChatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
