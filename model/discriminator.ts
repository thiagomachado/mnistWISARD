import {Ram} from "./ram";

class Discriminator
{
    ramQuantity : number;
    rams: Array<Ram>;
    
    constructor(ramQuantity : number) 
    {
        this.ramQuantity = ramQuantity;
        this.rams = new Array(ramQuantity);

    }

    //to do: metodos para treinar e classificar
        //treinamento: percorrer todas as rams incrementando as posições acessadas.
        //classificação:retornar um vetor com o conteudo acessado em cada ram
}

export {Discriminator as Discriminator};