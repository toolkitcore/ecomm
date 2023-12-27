import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingModel } from '../models/paging.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private readonly http: HttpClient) { }

  getUsers(pageIndex: number, pageSize: number, username: string) {
    return this.http.get<PagingModel<User>>('api/auth/users', {
      params: {
        pageIndex: `${pageIndex}`,
        pageSize: `${pageSize}`,
        username
      }
    });
  }

  updateUserInfo(id: string, role: string, lastName: string, firstName: string) {
    return this.http.put(`api/auth/users/${id}`, {
      role,
      lastName,
      firstName,
    });
  }

  deleteUser(id: string) {
    return this.http.delete(`api/auth/users/${id}`);
  }

  adminUpdatePassword(id: string, newPassword: string) {
    return this.http.put(`api/auth/users/${id}/password`, {
      newPassword
    });
  }

  createUser(username: string, password: string, role: string, lastName: string, firstName: string) {
    return this.http.post('api/auth/user', {
      username,
      password,
      role,
      firstName,
      lastName
    });
  }

  userUpdatePassword(currentPassword: string, newPassword: string) {
    return this.http.put('api/auth/users/password', {
      currentPassword,
      newPassword
    });
  }
}