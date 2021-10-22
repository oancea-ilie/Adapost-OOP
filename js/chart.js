import Api from "./api.js";


export default class Charts{
    constructor(where){
        this.where = where;
        
        this.api = new Api();
        
        this.api.fetchJson('https://dog.ceo/api/breeds/list/all').then(rez=>this.lineChart(rez));
    }

    lineChart(obj){
        let trafficChart = new Chart(this.where,{
            type:"doughnut",
            data: this.lineChartData(obj),
            options: this.lineChartOptions()
        });
    }

    lineChartOptions(){
        let lineOptions={
            responsive:true,
            plugins:{
                legend:{
                    position: 'top',
                    labels:{
                        usePointStyle:true,
                    },
                },
            }
        };

        return lineOptions;
    }


    lineChartData=(obj)=>{
        let arr = [];
        let i = 1;
        for(let prop in obj){
            if(i<=15){
                arr.push(prop);
                i++;
            }
        }
        
        let trafficData={
            labels: arr,
            datasets:[
                {
                    data:[4, 10, 1, 14, 7, 6,12,20,30,11,7,5,3,15,2],
                    backgroundColor:['red','blue','purple','yellow','green','violet','royalblue','rebeccapurple','gold','grey','yellowgreen','black','wheat','goldenrod','ghostwhite']
                },
            ],
        
        };
        return trafficData;
    }
    
}

