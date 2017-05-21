export class Response {
    result: boolean;
    msg: string;
    Token?: string;
    User?: any;
    constructor() {
        this.result = false;
        this.msg = '';
    }
};
export class Dangky {
    UserName: string;
    Password: string;
    ConfirmPassword: string;
    Phone: string;
    Email:  string;
    Captcha: string;
    constructor(){
        this.UserName="";
        this.Password="";
        this.ConfirmPassword="";
        this.Email="";
        this.Phone="";
        this.Captcha="";
    }
};