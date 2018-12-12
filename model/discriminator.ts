import {Ram} from "./ram";

class Discriminator
{    
    rams: Array<Ram>;
    
    constructor(addressesSize : Array<number>) 
    {
        
        this.rams = new Array(addressesSize.length);
        for(var i=0; i < addressesSize.length; i++)
        {
            var ram : Ram = new Ram(addressesSize[i]);
            this.rams.push(ram);
        }
    }

    //to do: metodos para treinar e classificar
        //treinamento: percorrer todas as rams incrementando as posições acessadas.
        //classificação:retornar um vetor com o conteudo acessado em cada ram
}

export {Discriminator as Discriminator};