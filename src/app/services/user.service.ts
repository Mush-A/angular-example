import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../component/model/user.model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'https://api.github.com/users/ChaminduWeerasinghe/repos';

  private currentUserSource = new BehaviorSubject<User[] | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.baseUrl).pipe(
      map((response: User[]) => {
        console.log(response);
        const user = response;
        if (user) {
          this.currentUserSource.next(user);
        }
      })
    );
  }
}
