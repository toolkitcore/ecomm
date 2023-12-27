import { NzMessageService } from 'ng-zorro-antd/message';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { UpdatePasswordService } from './update-password.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.scss']
})
export class UpdatePasswordFormComponent implements OnInit {
  isModalVisible$!: BehaviorSubject<boolean>;
  updatePasswordForm!: FormGroup;
  constructor(
    private readonly updatePasswordService: UpdatePasswordService,
    private readonly nzMessage: NzMessageService
  ) { }

  ngOnInit(): void {
    this.setupModalVisible();
    this.initForm();
  }

  setupModalVisible(): void {
    this.isModalVisible$ = this.updatePasswordService.isUpdatePasswordFormVisible$;
  }

  initForm(): void {
    this.updatePasswordForm = new FormGroup(
      {
        currentPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required, this.confirmationValidator.bind(this)])
      }
    );
  }

  confirmationValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.updatePasswordForm.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  closeModal(): void {
    this.updatePasswordService.closeUpdatePasswordForm();
  }

  updatePassword(): void {
    for (const i in this.updatePasswordForm.controls) {
      if (this.updatePasswordForm.controls.hasOwnProperty(i)) {
        this.updatePasswordForm.controls[i].markAsDirty();
        this.updatePasswordForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.updatePasswordForm.invalid) {
      return;
    }
    const { newPassword, currentPassword } = this.updatePasswordForm.value;
    this.updatePasswordService.updatePassword(newPassword, currentPassword).subscribe(
      (_) => {
        this.nzMessage.success('Cập nhật mật khẩu thành công');
        this.closeModal();
        this.updatePasswordForm.reset();
      },
      (err) => this.nzMessage.error(err.error.detail)
    );
  }
}
