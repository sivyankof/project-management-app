import { Injectable } from '@angular/core';
import { ISignUp } from '@modules/auth/models/auth';
import { IUser } from '@shared/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpService } from './http.service';
import { SnackBarService } from './snack-bar.service';

@Injectable()
export class UserService {
    private user$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

    constructor(private http: HttpService, private snackBarService: SnackBarService) {}

    public initCurrentUser(): void {
        const userId = JSON.parse(localStorage.getItem('login')).id;
        this.http
            .get(`users/${userId}`)
            .pipe(take(1))
            .subscribe((user) => this.user$.next(user));
    }

    public getCurrentUser(): Observable<IUser> {
        return this.user$.asObservable();
    }

    public updateUser(user: ISignUp): void {
        const userId = JSON.parse(localStorage.getItem('login')).id;
        this.http
            .put(`users/${userId}`, user)
            .pipe(take(1))
            .subscribe((response) => {
                if (response['id']) {
                    this.snackBarService.openSnackBar(
                        $localize`:user edited msg@@userEditedMsg:User was edited`,
                    );
                    this.user$.next(response);
                } else {
                    this.snackBarService.openSnackBar(
                        $localize`:user edited msg@@userNotEditedMsg:User was not edited!`,
                    );
                }
            });
    }

    public deleteUser(id: string): void {
        this.http.delete(`users/${id}`).pipe(take(1)).subscribe();
    }
}
