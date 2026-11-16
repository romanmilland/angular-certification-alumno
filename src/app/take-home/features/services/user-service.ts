import { Injectable, computed, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { INITIAL_USERS } from '../../core/data/users.seed';
import { User, UserDraft } from '../../users/user.model';


@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly usersState = signal<User[]>([...INITIAL_USERS]);

    readonly users = this.usersState.asReadonly();
    readonly total = computed(() => this.usersState().length);

    getUser(idUser: number): Observable<User>{
        const user = (this.usersState().find(
            user => user.id === idUser
        ));

        if(!user){
            return throwError(() => new Error('User not found'));
        };

        return of(user);
    }

    addUser(_draft: UserDraft): User {
        throw new Error('TODO: implementar alta de usuario');
    }

    updateUser(_id: number, _draft: UserDraft): boolean {
        throw new Error('TODO: implementar edición de usuario');
    }

    removeUser(_id: number): boolean {
        throw new Error('TODO: implementar eliminación de usuario');
    }
}
