export default class Api{
    constructor (){

    }

    fetchJson=(url)=>{
        return fetch(url)
        .then(data => data.json())
        .then(data => data.message);
    }


    getRandomImg=(hound)=>{
        return (this.fetchJson(`https://dog.ceo/api/breed/${hound}/images/random`));

    };



    getPagination=(paginationNumber ,numberOfCards)=>{
        
        return this.fetchJson(`https://dog.ceo/api/breeds/list/all`)
        .then(obj =>{
            let arr =[];
            let i = 0;
            for(let p in obj){
                if(i<50){
                    arr.push(p);
                    i++;
                }
            }
            return arr;
        });
    }
    
    


   


}