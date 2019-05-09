import {Discriminator} from './discriminator';

class Wisard
{
    discriminators : Map<Number,Discriminator>;
    classesQuantity: number;
    inputSize: number;
    mapping : Array<Array<number>>;

    constructor(classesQuantity : number, inputSize : number, nbits : number )
    {
        this.classesQuantity = classesQuantity;
        this.discriminators = new Map(); 
        this.inputSize = inputSize; 
        this.mapping = this.getMapping(nbits);
        for(var i = 0; i < this.classesQuantity; i++)
        {
            var discriminator : Discriminator = new Discriminator(this.mapping);
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
       // console.log(this.discriminators.get(7).rams[0] );
    }

    public retrieve(input : String) : Array<Array<Number>>
    {
        var similarityScores = new Array<Array<Number>>();
        this.discriminators.forEach(discriminator => {
            discriminator.retrieve(input);            
        });
        return similarityScores;
    }


}

export {Wisard as Wisard};