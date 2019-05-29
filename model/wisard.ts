import {Discriminator} from './discriminator';

class Wisard
{
    discriminators : Map<Number,Discriminator>;
    classesQuantity: number;
    inputSize: number;
    mapping : Array<Array<number>>;
    similarityScores : Map<Number,Array<Number>>;
    possibleClasses: Array<Number>;

    constructor(classesQuantity : number, inputSize : number, nbits : number )
    {
        this.classesQuantity = classesQuantity;
        this.discriminators = new Map(); 
        this.inputSize = inputSize; 
        this.mapping = this.getMapping(nbits);
        
        for(var i = 0; i < this.classesQuantity; i++)
        {
            var discriminator : Discriminator = new Discriminator(i, this.mapping);
            this.discriminators.set(i, discriminator);
        }       
    }

    private generateAddresses(inputSize : number) : Array<number> 
    {
        var addresses :Array<number> = [];        
        return addresses;
    }

   private getMapping( addressesSize : number) : Array<Array<number>>
    {
        var shuffledInput = this.getShuffledInput();        
        var ramQuantity = Math.ceil(this.inputSize/addressesSize);
        var mapping = new Array(ramQuantity);
        var start = 0;

        for (var i = 0; i < mapping.length; i++)
        {
            var end = start + addressesSize;                    

            if(i < this.inputSize%ramQuantity)
            {
                end ++;
            }
            

            mapping[i] = shuffledInput.slice(start, end);
            start = end;
        }        
        return mapping;    
    }

    private getShuffledInput() : Array<number>
    {
        var input = new Array(this.inputSize);
        var j, x, i : number;
        
        for( i = 0; i< this.inputSize; i++)
        {
            input[i] = i;
        }

        for (i = input.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = input[i];
            input[i] = input[j];
            input[j] = x;
        }
        return input;
    }

    public training(discriminatorClass : Number, input : String )
    {        
        this.discriminators.get(discriminatorClass).training(input);       
    }

    public retrieve(input : String) : void
    {
        this.similarityScores = new Map();
        
        this.discriminators.forEach(discriminator => {
            this.similarityScores.set(discriminator.classId, discriminator.retrieve(input));            
                       
        });
        console.log(this.similarityScores);
        
        
    }

    public bleaching() : void
    {
        this.fillPossibleClassesArray();
        var count = this.discriminators.get(0).rams.length;
        while(this.possibleClasses.length > 1 && count > 0 )
        {
            //TO DO 
            /* Em cada iteração pegar o menor score de cada classe 
            e uso como limiar do bleaching o maior deles. As rams com 
            score maior ou igual a esse limiar recebem 1 e 0 se forem
            menores. A resposta de cada discriminador é a soma das quantidade
            de rams com score 1, achar a maior resposta. A menor resposta
            aceitável leva em consideração a confiança definida entre 0 e 1
            rmin = (1 - conf)rmax. Eliminar todas as classes com resposta menor
            que rmin. Repetir o processo desconsiderando os menores scores escolhidos
            anteriormente */  
            
        }        
    }

    public fillPossibleClassesArray() : Array<Number>
    {
        
        for (let i = 0; i < this.classesQuantity; i++) {
            
            this.possibleClasses.push(i);
        }
        return this.possibleClasses;
    }


}

export {Wisard as Wisard};