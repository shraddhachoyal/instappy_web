import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Faqcomponent } from './faq.component';

describe('Faqcomponent', () => {
  let component: Faqcomponent;
  let fixture: ComponentFixture<Faqcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Faqcomponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Faqcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
