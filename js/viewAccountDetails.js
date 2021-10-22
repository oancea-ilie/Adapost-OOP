
import Api from "./api.js";
import Charts from "./chart.js";
import DogController from "./dogController.js";
import istoricController from "./istoricController.js";
import viewHome from "./viewHome.js";

export default class ViewAccountDetails{
    constructor(name){
        this.name = name;
        this.pushedButton=1;
        this.nrElemente = 3;
        this.nrPagini = 17;
        
        this.body = document.querySelector('body');
        this.header = document.querySelector('header');
        this.setHead();
        this.setMain();
        this.select = document.querySelector('select');

        this.logOutButon = document.querySelector('.log-out');
        this.logOutButon.addEventListener('click',this.handleLogOut);

        this.trafficChart = document.querySelector('.traffic-chart');
        this.nou = new Charts(this.trafficChart);
        this.dogControl = new DogController();
        this.api = new Api();

        this.setSelect();
        this.selectImg = document.querySelector('.select-img');
        this.api.getRandomImg('affenpinscher')
        .then(data=> this.selectImg.style.backgroundImage = `url('${data}')`);

        this.select.addEventListener('change',(e)=>{
            this.api.getRandomImg(e.target.value).then((rez)=>{

                 let text=`url('${rez}')`
                    this.selectImg.style.backgroundImage =text;
            })
        });

        this.galerie = document.querySelector('.galerie');
        this.setGalerie();


        this.pagination = document.querySelector('.pagination');
        this.resize();
        this.paginationCreater();
        this.handleButons();

        this.btn1 = document.querySelector('.btn1');
        this.btn2 = document.querySelector('.btn2');
        this.btn3 = document.querySelector('.btn3');

        this.api.getPagination().then( (arr)=>{
            let n = this.Vfiltrat(arr,this.pushedButton,this.nrElemente);
            this.showCard(n);
            this.btn1.addEventListener('click',()=>this.butonHandle(this.btn1,arr));
            this.btn2.addEventListener('click',()=>this.butonHandle(this.btn2,arr));
            this.btn3.addEventListener('click',()=>this.butonHandle(this.btn3,arr));
        });

        window.addEventListener('resize',()=>{
            this.resize();
        });


        this.adopteaza  = document.querySelector(".adopteaza");
        this.btnAdopteaza = document.querySelector('.btn-adopteza');
        this.btnAdopteaza.addEventListener('click',this.setAdopteaza);

        this.iController = new istoricController();
        this.table = document.querySelector('table');

        this.iController.getAllAdoptari(this.table);

    }

    setHead=()=>{
        this.body.innerHTML = '';
        this.body.innerHTML +=
        `<header>
            <a class="home-text"><h1>Adapost de caini</h1></a>
            <p style = "color:white;">Hi, ${this.name}</p>
            <a href="#" class="log-out">Log Out</a>
        </header>
        `;
    }

    setSelect=()=>{
        this.select.innerHTML = '';

        this.api.fetchJson('https://dog.ceo/api/breeds/list/all').then((rez)=>{
            for(let prop in rez){
                let option = document.createElement('option');
                option.textContent = prop;
                this.select.appendChild(option);
            }
        });
        
    }

    setMain=()=>{
        this.body.innerHTML += 
        `
        <main class="main">
            <a href="#" class="btn-adopteza">Adopteaza un caine</a>
            <section class="adopteaza">
            </section>
            <section class="img"></section>
            <h2>Caini disponibili</h2>
            <section class="caini-adoptati">
                <canvas class="traffic-chart"></canvas>
            </section>

            <section class="lista-raselor">
                <h2>Lista Raselor</h2>
                
                <select>
                    <option>ciobanesc</option>
                    <option>american</option>
                    <option>labrador</option>
                </select>

                <section class="select-img">
                </section>
            </section>

            <section class="istoric-adoptii">
                <h2>Istoricul adoptilor</h2>
                <table>
                    <tr>
                        <th>Data</th>
                        <th>Caine</th>
                        <th>Propietar</th>
                    </tr>
                </table>
            </section>

            <h2>Galerie</h2>
            <section class="galerie">
                
                <section class="galerie-img">
                    <p>Labrador</p>
                    <img src="/img/dog1.jpg" alt="">
                </section>
                <section class="galerie-img">
                    <p>Labrador2</p>
                    <img src="/img/dog1.jpg" alt="">
                </section>
                <section class="galerie-img">
                    <p>Labrador3</p>
                    <img src="/img/dog1.jpg" alt="">
                </section>
                <section class="galerie-img">
                    <p>Labrador4</p>
                    <img src="/img/dog1.jpg" alt="">
                </section>
            </section>

            <section class="pagination">
                <a>1</a>
                <a>2</a>
                <a>3</a>
                <a>4</a>
                <a>5</a>
                <a>6</a>
                <a>7</a>
            </section>
        </main>
        `
    }

    setGalerie=()=>{
        this.galerie.innerHTML = '';
        let i = 1;
        this.api.fetchJson('https://dog.ceo/api/breeds/list/all').then((rez)=>{
            for(let prop in rez){
                this.api.getRandomImg(prop).then((data)=>{
                    if(i <=5){
                    `
                    <section class="galerie-img">
                        <p>${prop}</p>
                        <img src="${data}" class="card-img">
                    </section>
                    `;
                    i++;
                }
                });
            }
        });
    }

    setAdopteaza=()=>{
        this.adopteaza.style.display = 'flex';
        this.adopteaza.innerHTML = '';
        this.adopteaza.innerHTML +=
        `
        <section class="card">
            <i class="fas fa-times close"></i>
            <h2>Ce caine doriti sa adoptati?</h2>
            <select>
                <option>test1</option>
                <option>test2</option>
                <option>test3</option>
            </select>
            <img src="#" class="card-img">
            <a href="#" class="vreau-caine">Vreau Cainele!</a>
        </section>
        `;

        let select = document.querySelector('.card select');
        select.innerHTML = '';

        this.api.fetchJson('https://dog.ceo/api/breeds/list/all').then((rez)=>{
            for(let prop in rez){
                let option = document.createElement('option');
                option.textContent = prop;
                select.appendChild(option);
            }
        });

        let cardImg = document.querySelector('.card-img');
        this.api.getRandomImg('affenpinscher').then((rez)=>{
            cardImg.src = rez;
       })

        select.addEventListener('change',(e)=>{
            this.api.getRandomImg(e.target.value).then((rez)=>{
                 cardImg.src = rez;
            })
        });

        let x = document.querySelector('.fas');
        x.addEventListener('click',this.handleX);

        let vreauCaine = document.querySelector('.vreau-caine');
        vreauCaine.addEventListener('click',this.handleVreauCaine);
        
    }

    handleX=()=>{
        this.adopteaza.style.display = 'none';
    }

    handleVreauCaine=()=>{
        let select = document.querySelector('.card select');
        let id = this.iController.create(this.name,select.value);
        this.iController.getAdoptie(id,this.table);
        this.adopteaza.style.display = 'none';

    }

    handleLogOut=()=>{
        let nou = new viewHome();
    }
    
    Vfiltrat=(vec, pushedButton, elemente)=>{

        let nou = [];
        let start = elemente *(pushedButton-1);
        let sfarsit = start + elemente;
    
        for(let i = start; i<sfarsit && i<vec.length; i++){
            nou.push(vec[i]);
        }
         
        return nou;
    }

    showCard=(arr)=>{
        this.galerie.innerHTML = '';
        for(let i=0; i<arr.length; i++){
            this.api.getRandomImg(arr[i])
            .then((data)=>{
                this.galerie.innerHTML +=
                `   
                <section class="galerie-img">
                <p>${arr[i]}</p>
                <img src="${data}" class="card-img">
                </section>
                `;
            });
        }

    }

    changeContentCresc=(a)=>{
        let btn1 = document.querySelector(".btn1").textContent = a;
        let btn2 = document.querySelector(".btn2").textContent = a+1;
        let btn3 = document.querySelector(".btn3").textContent = a+2;
    }

    changeContentDescres=(b)=>{
        let btn1 = document.querySelector(".btn1").textContent = b-2;
        let btn2 = document.querySelector(".btn2").textContent = b-1;
        let btn3 = document.querySelector(".btn3").textContent = b;
    }

    prevArrowClick=()=>{
         let btn3 = document.querySelector(".btn1").textContent;
         let btn1 = document.querySelector(".btn1").textContent;
         let prev = document.querySelector('.prev');
         let next = document.querySelector('.next');
         
         if(btn1 !=1){
            prev.style.cursor = 'pointer';
            prev.style.backgroundColor = 'rgb(33, 100, 223)';
            this.changeContentDescres(btn3-1);

            next.style.cursor = 'pointer';
            next.style.backgroundColor = 'rgb(33, 100, 223)';
            
            let btn11 = document.querySelector(".btn1").textContent;
            if(btn11==1){
                prev.style.cursor = 'default';
                prev.style.backgroundColor = 'grey';
            }

         }


    }

    nextArrowClick=()=>{
        
        let btn1 = document.querySelector('.btn1');
        let btn2 = document.querySelector('.btn2');
        let btn3 = document.querySelector('.btn3');
        let next = document.querySelector('.next');

        if(btn3.textContent < this.nrPagini){
            this.changeContentCresc(parseInt(btn3.textContent)+1);
        }

        if(btn1.textContent ==this.nrPagini || btn2.textContent==this.nrPagini || btn3.textContent==this.nrPagini ){
            next.style.backgroundColor = 'grey';
            next.style.cursor = 'default';
        }

        if(btn1.textContent !=1){
            let prev = document.querySelector('.prev');
            prev.style.cursor = 'pointer';
            prev.style.backgroundColor = 'rgb(33, 100, 223)';
        }
    }
    
    handleButons=(arr)=>{
        let prev = document.querySelector('.prev');
        let next = document.querySelector('.next');
        prev.addEventListener("click",this.prevArrowClick);
        next.addEventListener('click',this.nextArrowClick);

    }

    butonHandle=(btn,arr)=>{
        this.pushedButton = parseInt(btn.textContent);
        let nou = this.Vfiltrat(arr,this.pushedButton,this.nrElemente);
        this.showCard(nou);
    }

    paginationCreater=()=>{
        this.pagination.innerHTML = '';

        let prev = document.createElement('a');
        prev.classList.add('prev');
        prev.textContent ='<<';
        prev.style.backgroundColor = 'grey';
        prev.style.cursor = 'default';
        this.pagination.appendChild(prev);

        let btn1 = document.createElement('a');
        btn1.classList.add('btn1');
        btn1.textContent = '1';
        btn1.classList.add('active');

        let btn2 = document.createElement('a');
        btn2.classList.add('btn2');
        btn2.textContent = '2';

        let btn3 = document.createElement('a');
        btn3.classList.add('btn3');
        btn3.textContent = '3';

        this.pagination.appendChild(btn1);
        this.pagination.appendChild(btn2);
        this.pagination.appendChild(btn3);

        let next = document.createElement('a');
        next.classList.add('next');
        next.textContent = ">>";

        this.pagination.appendChild(next);
    }

    resize=()=>{
            if(window.innerWidth < 425){
                this.nrElemente = 3;
                this.nrPagini = 17;
            }
            else if(window.innerWidth < 768){
                this.nrElemente = 4;
                this.nrPagini = 13;
            }else if(window.innerWidth < 1024 ){
                this.nrElemente = 5;
                this.nrPagini = 10;
            }
            else{
                this.nrElemente = 6;
                this.nrPagini = 9;
            }
        
    }
}