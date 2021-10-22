
import userController from "./userController.js";
import ViewLogin from "./viewLogin.js";
import viewHome from "./viewHome.js";

export default class ViewSign{
    constructor(){
        this.body = document.querySelector('body');

        this.setHead();
        this.setMain();
        this.homeText = document.querySelector(".home-text");
        this.homeText.addEventListener('click',this.handleHomeText);

        this.container = document.querySelector('.sign-main');

        this.eror = document.querySelector('.eror-sign');

        this.name = document.querySelector('.sign-name');
        this.email = document.querySelector('.sign-email');
        this.password = document.querySelector('.sign-password');

        this.buton = document.querySelector('.sign-buton');
        this.buton.addEventListener("click", this.handleSign);

        this.link = document.querySelector('.login-link');
        this.link.addEventListener("click",this.handleLink);

        this.uController = new userController();
    }

    setHead=()=>{
        this.body.innerHTML = '';
        this.body.innerHTML +=
        `
        <header>
            <a class="home-text"><h1>Adapost de caini</h1></a>
        </header>
        `;
    }

    setMain=()=>{
        this.body.innerHTML +=
        `
        <section class="sign-main">
            <h2>Sign Up</h2>

            <section class="sign-data">
                <p class="eror-sign"></p>
                <p>Name:</p>
                <input type="text" class="sign-name">
                <p>Email:</p>
                <input type="text" class="sign-email">
                <p>Passowrd:</p>
                <input type="password" class="sign-password">

                <button class="sign-buton">Sign Up</button>
                <p>Already have an account?<a href="#" class="login-link">login</a></p>
            </section>
        </section>
        `;
    }

    handleHomeText=()=>{
        let nou = new viewHome();
    }

    checkName=(string)=>{
        let regex = /[0-9]/g;
        
        return regex.test(string);
    }

    checkEmail=(string)=>{

        let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        return regex.test(string);
    }

    //NU MERGEEE!
    checkPassword=(string)=>{
        let text = '';
        let text2 = '';

        let regex1 = /[0-9]/g;
        if(regex1.test(string) ==false){
            text += '\nYou need to have a number in your password!';
        }

        let regex2 = /[A-Z]/g;

        if(regex1.test(string) ==false){
            text2 += '\nYou need to have a capital letter in your password!';
        }

        return text+text2;

    }

    handleSign=()=>{
        if(this.uController.checkSign(this.name.value,this.email.value,this.password.value) == true){

            if(this.checkName(this.name.value) == true){
                this.eror.textContent = 'You can \'t have a number in your name!';
                this.eror.style.color = 'red';
            }
            else if(this.checkEmail(this.email.value) == false){
                this.eror.textContent = 'Enter a valid email!';
                this.eror.style.color = 'red';
            }
            else if(this.checkPassword(this.password.value) !=''){
                this.eror.textContent = this.checkPassword(this.password.value);
                this.eror.style.color = 'red';
            }else{
                this.uController.create(this.name.value,this.email.value,this.password.value);
                this.eror.textContent = 'Registration complete!';
                this.eror.style.color = 'green';
    
                setTimeout(()=>{
                    let nou = new ViewLogin();
                },2000);
                
            }
                
        }else{
            this.eror.textContent = 'Fill all the imputs!';
            this.eror.style.color = 'red';
        }

    }
    handleLink=()=>{
        let nou = new ViewLogin();
    }
}