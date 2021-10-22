
import istoric from "./istoric.js";
import userController from "./userController.js";

export default class istoricController{
    constructor(){
        this.lista = [];

        this.uController = new userController();
        
        this.contor = localStorage.getItem('istoricContor');

        this.load();
    }

    getTime=()=>{
        let time = new Date();
        let h = time.getHours();
        let m = time.getMinutes();
        let s = time.getSeconds();
        let finalTime = `${h}:${m}:${s}`;

        return finalTime;
    }

    load=()=>{

        let i = 1;
        let aux = 0;

        while(aux <=this.contor){
            
            let obj = JSON.parse(localStorage.getItem(i+'I'));

            if(obj){
                this.lista.push(new istoric(obj.id, obj.data, obj.caine, obj.propietar));
            }

            i++;
            aux++;
        }

        this.contor = localStorage.getItem('istoricContor');
    }

    create=(userName, dogName)=>{
        let userId= this.getUserId(userName);
        let id = parseInt(this.contor)+1;
        let date = this.getTime();
        let nou = new istoric(id+'I', date, dogName, userName);

        localStorage.setItem(id+'I', JSON.stringify(nou));
        localStorage.setItem('istoricContor',id);
        this.load();
        return id;
    }

    getUserId=(userName)=>{
        for(let i = 0; i<this.uController.lista.length; i++){
            if(userName == this.uController.lista[i].name){
               return this.uController.lista[i].id;
            }
        }

    }

    getAllAdoptari=(table)=>{
        this.lista.forEach((e)=>{
            table.innerHTML += 
                `
                <tr>
                    <td>${e.data}</td>
                    <td>${e.caine}</td>
                    <td>${e.propietar}</td>
                </tr>
                `
        });
    }

    getAdoptie=(id,table)=>{
        for(let i =0; i<this.lista.length; i++){
            let id2 = parseInt(this.lista[i].id);

            if(id == id2){
                table.innerHTML += 
                `
                <tr>
                    <td>${this.lista[i].data}</td>
                    <td>${this.lista[i].caine}</td>
                    <td>${this.lista[i].propietar}</td>
                </tr>
                `
            }
        }

    }
    
}