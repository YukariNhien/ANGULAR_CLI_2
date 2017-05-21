import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../theme/validators';
import { LoginService } from './login.service';
import { Router } from "@angular/router";
import { Cookie } from 'ng2-cookies';
import { Response, Dangky } from '../theme/model/class';
import {ClientService} from '../app.service';

@Component({
    selector: 'login-client',
    templateUrl: './login.component.html',

})

export class Login {
    public form: FormGroup;
    public formregister: FormGroup;
    public submited: boolean = false;
    public message: string = "";
    private key: string = "login";
    private time: number = 30;
    public show: boolean = false;
    imgCaptcha: string = '';
    constructor(
        private fb: FormBuilder, private router: Router,
        private server: ClientService
    ) {
        this.initForm();
        this.initFormRegis();
        this.RandomNumber();
    }
    private ngOnInit(){
        let user = Cookie.get(this.key);
        if(Cookie.check(this.server.key)){
            window.history.back();
        }
    }
    private RandomNumber() {
        this.imgCaptcha = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (let i = 0; i < 5; i++)
            this.imgCaptcha += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    initForm() {
        this.form = this.fb.group({
            UserName: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])],
            Password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(200)])]
        });
    }
    initFormRegis() {
        this.formregister = this.fb.group({
            UserName: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(50)])],
            Password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
            ConfirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
            Phone: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20)])],
            Email: ['', Validators.compose([Validators.maxLength(200)])],
            Captcha: ['', Validators.compose([Validators.required])]
        });
    }
    // signIn(provider) {
    //   this._auth.login(provider).subscribe(
    //     (data) => {
    //       // this.user = data;
    //       // localStorage.setItem("currentUser", this.user.email);
    //       this.router.navigate(['/']); return;
    //     }, error => { this.message = error; }
    //   );
    // }

    // logout() {
    //   this._auth.logout().subscribe(
    //     // (data) => {this.user = null; }
    //   );
    //   localStorage.clear();
    //   window.location.reload();
    // }

    public loginSubmit(values: any) {

        if (!this.submited) {
            this.submited = true;
            this.server.post('Autho/Token',values).subscribe((data: Response) => {
                console.log(data);
                if (!data.result) {
                    this.message = data.msg;
                    this.startTime();
                }
                else {
                    Cookie.set(this.server.key, data.Token, 0.02083333333);
                    this.initForm();
                }
                this.submited = false;
            }, error => { console.log(error); this.message = error.msg; this.submited = false; this.startTime(); });
        }
    }
    public startTime(): void {
        setTimeout(() => { this.message = ""; }, 5000);
    }
    public registerSubmit(values: Dangky) {
        console.log(values);
        if (values.Password != values.ConfirmPassword) {
            this.message = "Mật khẩu khồn trùng khớp";
            this.startTime();
            return;
        }
        if (values.Captcha.toUpperCase() != this.imgCaptcha) {
            this.message = "Mã xác nhận không chính xác";
            this.RandomNumber();
            this.startTime();
            return;
        }
        if (!this.submited) {
            this.submited = true;
            this.server.post('Autho/register',values).subscribe((data: Response) => {
                if (!data.result) {
                    this.message = data.msg;
                    this.RandomNumber();
                    this.startTime();
                }
                else {
                    this.message= data.msg;
                    setTimeout(() => { this.show = false; }, 5000);
                    this.RandomNumber();
                   this.startTime();
                    this.initFormRegis();
                }
                this.submited = false;
            }, error => { console.log(error); this.message = error.msg; this.submited = false; this.startTime(); });
        }
    }

}