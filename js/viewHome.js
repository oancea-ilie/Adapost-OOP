
import Api from "./api.js";
import Charts from "./chart.js";
import ViewLogin from "./viewLogin.js";
import ViewSign from "./viewSign.js";
import istoricController from "./istoricController.js";

export default class viewHome{
    constructor(){

        this.pushedButton=1;
        this.nrElemente = 3;
        this.nrPagini = 17;
        this.body = document.querySelector('body');
        this.setHeader();
        this.setMain();
        this.header = document.querySelector("header");
        this.main = document.querySelector('main');
        this.setContext();
        this.setFooter();

        this.select = document.querySelector("select");

        this.trafficChart = document.querySelector('.traffic-chart');
        this.nou = new Charts(this.trafficChart);

        this.homeText = document.querySelector(".home-text");
        this.homeText.addEventListener('click',this.handleHomeText);

        this.signButon = document.querySelector("#sign-up");
        this.loginButon = document.querySelector('#login');

        this.loginButon.addEventListener('click', this.handleLogin);
        this.signButon.addEventListener("click",this.handleSign);
        
        this.api = new Api();
        this.setSelect();
        this.selectImg = document.querySelector('.select-img');
        this.api.getRandomImg('affenpinscher').then(data=> this.selectImg.style.backgroundImage = `url('${data}')`);

        this.select.addEventListener('change',(e)=>{
            this.api.getRandomImg(e.target.value).then((rez)=>{
                    this.selectImg.style.backgroundImage =`url('${rez}')`;
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


        this.iController = new istoricController();
        this.table = document.querySelector('table');

        this.iController.getAllAdoptari(this.table);

    }

    setHeader=()=>{
        this.body.innerHTML = '';
        this.body.innerHTML +=
        `
        <header>
            <a class="home-text"><h1>Adapost de caini</h1></a>
        
            <section class="head-butons">
                <a href="#" id="sign-up">Sign Up</a>
                <a href="#" id="login">Login</a>
            </section>
        </header>
        `;

    }

    setMain=()=>{
        this.body.innerHTML +=
        `
        <main class="main">

        </main>
        `;
    }

    setContext=()=>{
        this.main.innerHTML += 
        `
            <a href="#" style="display: none;">Adopteaza un caine</a>
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

            </section>

            <section class="pagination">
            </section>
        `
    }

    setSelect=()=>{
        this.select.innerHTML = '';

        this.api.fetchJson('https://dog.ceo/api/breeds/list/all').then((rez)=>{
            for(let prop in rez){
                let option = document.createElement('option');
                option.textContent = prop;
                this.select.appendChild(option);
            }
        })
        
    }

    setGalerie=(n)=>{
        this.galerie.innerHTML = '';
        let i = 1;
        this.api.fetchJson('https://dog.ceo/api/breeds/list/all').then((rez)=>{
            for(let prop in rez){
                this.api.getRandomImg(prop).then((data)=>{
                    if(i <=n){
                      
                    `  this.galerie.innerHTML +=  
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

    setFooter=()=>{
        this.body.innerHTML +=
        `
        <footer>
            <h1>footer</h1>
        </footer>
        ` 
    }

    handleHomeText=()=>{
        let nou = new viewHome();
    }

    handleLogin=()=>{
        let nou = new ViewLogin();
    }

    handleSign=()=>{
        let nou = new ViewSign();
    }
    
    handleSignView=()=>{
        if(this.uController.checkSign(this.signViewName.value,this.signViewEmail.value, this.signViewPassword) == true){
            this.uController.create(this.signViewName.value,this.signViewEmail.value,this.signViewPassword);
            this.signViewEror2.textContent = 'Register complete!';
            this.signViewEror2.style.color = 'green';
            
            this.signViewName.value = '';
            this.signViewEmail.value = '';
            this.signViewPassword.value = '';

            setTimeout(()=>{
                this.signContainer.style.right = '100%';
                this.flag = 0;
                this.signViewEror2.textContent = '';
            },2000);


        }else{
            this.signViewEror2.textContent = 'You must fill all imputs!';
        }
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