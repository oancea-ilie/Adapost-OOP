import Api from "./api.js";
import Dog from "./dog.js";

export default class DogController{
    constructor(){
        this.listaBreeds = [];
        this.contor = localStorage.getItem('dogContor');
        
        this.api = new Api();
        
    }
    
    createName=(obj)=>{
        let id = 1;
        for(let prop in obj){
            this.api.getRandomImg(prop).then(data=> 
                data.json()).then(data=>console.log(data));

        }
    }



}