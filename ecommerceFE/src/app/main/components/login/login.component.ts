import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isModalVisible!: boolean;

  username!: string;
  password!: string;
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly nzMessage: NzMessageService) { }

  ngOnInit(): void {
    this.isModalVisible = false;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  login(): void {
    this.isModalVisible = false;
    this.authenticationService.login(this.username, this.password).subscribe(
      () => {
        this.nzMessage.success('Đăng nhập thành công');
      },
      (err) => this.nzMessage.error(err.error.detail)
    );
  }

}
