import { Injectable, computed, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { INITIAL_USERS } from '../../core/data/users.seed';
import { User, UserDraft } from '../../users/user.model';


@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly usersState = signal<User[]>([...INITIAL_USERS]);
    readonly users = this.usersState.asReadonly();
    readonly total = computed(() => this.usersState().length);

    private readonly _user = signal<User | undefined>(this.loadUserStorage());
    readonly user = this._user.asReadonly();
    readonly role = computed(() => this._user()?.role ?? null);

    refreshCurrentUser(): void {
        this._user.set(this.loadUserStorage());
    }

    getUser(idUser: number): Observable<User> {
        const user = this.usersState().find(
            user => user.id === idUser
        );

        if (!user) {
            return throwError(() => new Error('User not found'));
        }

        return of(user);
    }

    getUsers(): Observable<User[]>{
        if(!this.usersState()){
            return throwError(() => new Error('User not found'));
        };

        return of(this.usersState());
    }

    addUser(newUser: UserDraft): Observable<User> {
        const lastId = this.usersState().at(-1)?.id || 1;

        let addUser: User = {
            id: lastId + 1,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }

        this.usersState.update(users => [...users, addUser]);
        return of(addUser);
    }

    updateUser(updateUser: User): Observable<User> {
        this.usersState.update(users =>
            users.map(user => user.id === updateUser.id 
                ? updateUser : user 
            )
        );
        return of(updateUser)
    }

    removeUser(_id: number): Observable<User> {
        const userDeleted = this.usersState().find(u => u.id === _id);

        if (!userDeleted) {
            return throwError(() => new Error('User not found'));
        }

        this.usersState.update(users => users.filter(u => u.id !== _id));
        return of(userDeleted);
    }

    private loadUserStorage(): User | undefined {
        const id = localStorage.getItem('isLogged');

        if (id === null) return undefined;
        const parsedId = Number(id);

        if (!Number.isSafeInteger(parsedId)) {
            return undefined;
        }

        return this.usersState().find(
            user => user.id === parsedId
        );
    }

}
