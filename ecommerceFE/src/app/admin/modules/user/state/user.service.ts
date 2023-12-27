import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { UserApiService } from './../../../../shared/api-services/user-api.service';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private userStore: UserStore, private userApiService: UserApiService) {
  }

  getUsers(pageIndex: number, pageSize: number, username: string) {
    return this.userApiService.getUsers(pageIndex, pageSize, username).pipe(
      tap(res => {
        this.userStore.update({ userPaging: res });
      })
    );
  }

  updateUserInfo(id: string, role: string, lastName: string, firstName: string) {
    return this.userApiService.updateUserInfo(id, role, lastName, firstName);
  }

  deleteUser(id: string) {
    return this.userApiService.deleteUser(id);
  }

  updatePassword(id: string, newPassword: string) {
    return this.userApiService.adminUpdatePassword(id, newPassword);
  }

  createUser(username: string, password: string, role: string, lastName: string, firstName: string) {
    return this.userApiService.createUser(username, password, role, lastName, firstName);
  }

}
