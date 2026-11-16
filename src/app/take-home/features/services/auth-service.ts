import { Injectable, computed, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { INITIAL_USERS } from '../../core/data/users.seed';
import { User, UserCredencials, UserId } from '../../users/user.model';


@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly usersState = signal<User[]>([...INITIAL_USERS]);

    readonly users = this.usersState.asReadonly();
    readonly total = computed(() => this.usersState().length);

    login(userCredencials: UserCredencials): Observable<UserId>{
        const user = (this.usersState().find(
            user => user.name === userCredencials.name && 
                    user.email === userCredencials.email
        ));

        if(!user){
            return throwError(() => new Error('User not found'));
        };

        return of({id: user.id});
    }


    logout(): void{
        localStorage.removeItem('isLogged')
    }

}
