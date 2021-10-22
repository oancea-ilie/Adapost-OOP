
import userController from "./userController.js";
import ViewAccountDetails from "./viewAccountDetails.js";
import ViewSign from "./viewSign.js";
import viewHome from "./viewHome.js";

export default class ViewLogin{
    constructor(){
        this.body = document.querySelector('body');

        this.setHead();
        this.setLogin();

        this.homeText = document.querySelector(".home-text");
        this.homeText.addEventListener('click',this.handleHomeText);

        this.container = document.querySelector('.login-main');
        
        this.eror = document.querySelector(".eror-login");
        this.name = document.querySelector('.login-name');
        this.password = document.querySelector(".login-password");

        this.buton = document.querySelector('.login');
        this.link = document.querySelector(".sign-up-link");
        this.link.addEventListener("click",this.handleLink);
        
        this.buton.addEventListener("click", this.handleLogin);

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
    
    setLogin=()=>{
        this.body.innerHTML +=
        `
        <section class="login-main">
            <h2>Login</h2>

            <section class="login-data">
                <p class="eror-login"></p>
                <p>Name:</p>
                <input type="text" class="login-name">
                <p>Password:</p>
                <input type="password" class="login-password">

                <button class="login">Login</button>
                <p>Don't have an account?<a href="#" class="sign-up-link">sign up</a></p>
            </section>
        </section>
        `;
    }

    handleHomeText=()=>{
        let nou = new viewHome();
    }

    handleLogin=()=>{
        if(this.uController.checkLogin(this.name.value, this.password.value) == true){
            let nou = new ViewAccountDetails(this.name.value);
        }else{
            this.eror.textContent = 'Wrong name or password!';
            this.eror.style.color = 'red';
        }
    }

    handleLink=()=>{
        let nou = new ViewSign();
    }

}