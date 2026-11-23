import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { InitTutor } from './init-tutor';

describe('InitTutor', () => {
  let component: InitTutor;
  let fixture: ComponentFixture<InitTutor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitTutor],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(InitTutor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
