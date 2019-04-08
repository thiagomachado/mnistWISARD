import {Discriminator} from './discriminator';

class Wisard
{
    discriminators : Array<Discriminator>;
    classesQuantity: number;
    inputSize: number;
    mapping : Array<Array<number>>;

    constructor(classesQuantity : number, inputSize : number, nbits : number )
    {
        this.classesQuantity = classesQuantity;
        this.discriminators = new Array(classesQuantity); 
        this.inputSize = inputSize; 
        this.mapping = this.getMapping(nbits);
        for(var i = 0; i < this.discriminators.length; i++)
        {
            var discriminator : Discriminator = new Discriminator(this.mapping);
        }       
    }

    private generateAdresses(inputSize : number) : Array<number> 
    {
        var adresses :Array<number> = [];
        

        return adresses;
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
            
            if(i >= this.inputSize%ramQuantity)
            {
                end --;
            }

            mapping[i] = shuffledInput.slice(start, end);
            start = end;
        }
        return mapping;    
    }

    getShuffledInput()  : Array<number>
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
}

export {Wisard as Wisard};