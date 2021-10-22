import User from "./user.js";


export default class userController{
    constructor (){
        this.lista = [];
        this.contor = localStorage.getItem('userContor');

        this.load();
    }

    load=()=>{

        let i = 1;
        let aux = 0;

        while(aux <=this.contor){
            
            let obj = JSON.parse(localStorage.getItem(i+'U'));

            if(obj){
                this.lista.push(new User(obj.id, obj.name, obj.email, obj.password));
            }

            i++;
            aux++;
        }
    }

    create=(name,email,pass)=>{

        let id = parseInt(this.contor)+1;
        let nou = new User(id+'U',name, email,pass);

        localStorage.setItem(id+'U', JSON.stringify(nou));
        localStorage.setItem('userContor',id);

        this.load();
    }


    checkLogin=(name, password)=>{

        for(let i = 0; i<this.lista.length; i++){
            if(this.lista[i].name == name && this.lista[i].password == password){
                return true;
            }
        }
        return false;

    }

    checkSign=(name,email,password)=>{

        if(name != '' && email != '' && password != ''){
            return true;
        }
        return false;
        
    }
    
    delete=(id)=>{
        if(localStorage.getItem(id)){
            localStorage.removeItem(id);
        }else{
            console.log('Utilizatorul nu exista in baza de date!');
        }
        this.contor = localStorage.getItem('userContor');
        this.load();
    }


}