import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { User, UserRole } from '../../users/user.model';
import { UserService } from '../services/user-service';
import { ListUser } from './list-user';

const MOCK_USERS: User[] = [
  { id: 1, name: 'Ana', email: 'ana@correo.com', role: 'Admin' },
  { id: 2, name: 'Juan', email: 'juan@correo.com', role: 'Editor' },
  { id: 3, name: 'Maria', email: 'maria@correo.com', role: 'Viewer' },
];

describe('ListUser', () => {
  let component: ListUser;
  let fixture: ComponentFixture<ListUser>;
  let userServiceMock: Partial<UserService>;

  beforeEach(async () => {
    userServiceMock = {
      role: signal<UserRole | null>('Admin'),
      getUsers: vi.fn().mockReturnValue(of([...MOCK_USERS])),
      removeUser: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ListUser],
      providers: [
        provideRouter([]), { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should read the role from UserService', () => {
      expect(component['userRole']()).toBe('Admin');
    });

    it('should call getUsers', () => {
      expect(userServiceMock.getUsers).toHaveBeenCalledTimes(1);
      expect(component['userList']()).toEqual(MOCK_USERS);
    });
  });

  describe('modal', () => {
    it('should show the modal and id', () => {
      component.openDeleteModal(2);

      expect(component['showDeleteModal']()).toBe(true);
      expect(component['userToDeleteId']()).toBe(2);
    });

    it('should hide the modal and delete id', () => {
      component.openDeleteModal(2);
      component.cancelDelete();

      expect(component['showDeleteModal']()).toBe(false);
      expect(component['userToDeleteId']()).toBeNull();
    });

    it('should remove the deleted user from userList', () => {
      (userServiceMock.removeUser as ReturnType<typeof vi.fn>).mockReturnValue(
        of(MOCK_USERS[0]),
      );

      component.openDeleteModal(1);
      component.confirmDelete();

      const remaining = component['userList']();
      expect(remaining.length).toBe(2);
      expect(remaining.find(u => u.id === 1)).toBeUndefined();
      expect(component['showDeleteModal']()).toBe(false);
      expect(component['userToDeleteId']()).toBeNull();
    });

    it('should show a success toast after deleting a user', () => {
      (userServiceMock.removeUser as ReturnType<typeof vi.fn>).mockReturnValue(
        of(MOCK_USERS[0]),
      );

      component.openDeleteModal(1);
      component.confirmDelete();

      const toast = component['toast']();
      expect(toast?.type).toBe('success');
      expect(toast?.message).toBeTruthy();
    });

    it('should close the modal', () => {
      (userServiceMock.removeUser as ReturnType<typeof vi.fn>).mockReturnValue(
        throwError(() => new Error('delete failed')),
      );

      component.openDeleteModal(1);
      component.confirmDelete();

      expect(component['showDeleteModal']()).toBe(false);
      expect(component['userToDeleteId']()).toBeNull();
    });

    it('should show an error toast when removeUser fails', () => {
      (userServiceMock.removeUser as ReturnType<typeof vi.fn>).mockReturnValue(
        throwError(() => new Error('delete failed')),
      );

      component.openDeleteModal(1);
      component.confirmDelete();

      const toast = component['toast']();
      expect(toast?.type).toBe('error');
      expect(toast?.message).toBeTruthy();
    });

    it('should do nothing when userToDeleteId is null', () => {
      component.confirmDelete();

      expect(userServiceMock.removeUser).not.toHaveBeenCalled();
    });
  });
});
