import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { InitProject } from './init-project';

describe('InitProject', () => {
  let component: InitProject;
  let fixture: ComponentFixture<InitProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitProject],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(InitProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
