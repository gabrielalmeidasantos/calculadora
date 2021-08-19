function Calculadora() {
        const display = document.querySelector('.display');
        // this.btnClear = document.querySelector('.btn-clear');

        this.inicia = function(){
            this.cliqueBotoes();
            this.Enter();
        }

        this.Enter = function(){
            document.addEventListener('keypress', e => {
                if (e.keyCode === 13) {
                    this.calcula();
                    console.log('Enter');
                }
            })
        }

        this.calcula = function(){
            let conta = display.value;

            if (conta.length === 0) {
                this.btnParaDisplay('Digite algum valor');
                setTimeout(() => { this.clearDisplay() }, 3000)
                return;
            }
    
            try {
                conta = eval(conta); //  esse eval analisa a string e executa tudo q ta nela

                if (!conta) {
                    this.clearDisplay();
                    display.value = 'Calculo invalido';
                    setTimeout(() => { this.clearDisplay() }, 1000)
                    return;
                }

                display.value = conta;
            } catch (error) {
                console.log(error);
                setTimeout(() => { this.clearDisplay(); }, 2000);
                return;
            }
        }

        this.apagaUm = function(){
            display.value = display.value.slice(0, -1)
            // slice(0,-1) extrai do primeiro até o penultimo elemento ( -1 === penultimo ) e coloca no display
        }

        this.clearDisplay = function(){
            display.value = '';
        }

        this.cliqueBotoes = function(){
            // document.addEventListener('click', function(e){
            //     const el = e.target;
            //     if (el.classList.contains('btn-num')) {
            //         this.btnParaDisplay(el.innerText);
            //     }
            //     // this é sempre qm chama
            //     // nesse caso qm ta chamando  é o document não minha calculadora, ent tenho q apontar o this pra minha calculadora
            // }.bind(this)) // aq to dizendo pra usar o meu this ( minha calculadora )
            // // pra evitar isso, é só eu usar arrow function, pq nela o this sempre é cravado em quem chama

            // evitando o error
            document.addEventListener('click', (e) => {
                const el = e.target;
                if (el.classList.contains('btn-num')) this.btnParaDisplay(el.innerText);
                if (el.classList.contains('btn-clear')) this.clearDisplay();
                if (el.classList.contains('btn-del')) this.apagaUm();
                if (el.classList.contains('btn-eq')) this.calcula();

                display.focus(); // aq to mandando focar no display, pra eu poder apertar o enter e calcular
            })
        }

        this.btnParaDisplay = function(valor){
            display.value += valor;
        }        
};

const Calc = new Calculadora();
Calc.inicia();
console.log('contructor');
