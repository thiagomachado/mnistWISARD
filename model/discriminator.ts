import {Ram} from "./ram";

class Discriminator
{    
    rams: Array<Ram>;
    mapping: Array<Array<number>>
    classDescription: String;
    
    constructor(mapping : Array<Array<number>>) 
    {
        this.mapping = mapping;   
        this.rams = [];
        for(var i=0; i < mapping.length; i++)
        {
            var ram : Ram = new Ram(mapping[i].length);            
            this.rams.push(ram);
        }
    }

    //to do: metodos para treinar e classificar
        //treinamento: percorrer todas as rams incrementando as posições acessadas.
        //classificação:retornar um vetor com o conteudo acessado em cada ram
}

export {Discriminator as Discriminator};