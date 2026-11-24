export type UserRole = 'Admin' | 'Editor' | 'Viewer';

export interface User {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly role: UserRole;
}

export type UserDraft = Omit<User, 'id'>;
export type UserCredencials = Omit<User, 'id' | 'role'>;
export type UserId = Pick<User, 'id'>;
