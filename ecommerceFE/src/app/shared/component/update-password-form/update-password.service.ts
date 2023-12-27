import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserApiService } from './../../api-services/user-api.service';

@Injectable({providedIn: 'root'})
export class UpdatePasswordService {
  isUpdatePasswordFormVisible$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly userApiService: UserApiService
  ) {}

  openUpdatePasswordForm(): void {
    this.isUpdatePasswordFormVisible$.next(true);
  }

  closeUpdatePasswordForm(): void {
    this.isUpdatePasswordFormVisible$.next(false);
  }

  updatePassword(newPassword: string, currentPassword: string) {
    return this.userApiService.userUpdatePassword(currentPassword, newPassword);
  }
}
