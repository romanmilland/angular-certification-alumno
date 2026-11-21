import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InitTutor } from './init-tutor';

describe('InitTutor', () => {
  let component: InitTutor;
  let fixture: ComponentFixture<InitTutor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitTutor]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InitTutor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
