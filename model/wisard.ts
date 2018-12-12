import {Discriminator} from './discriminator';

class Wisard
{
    discriminators : Array<Discriminator>;
    classesQuantity: number;
    inputSize: number;

    constructor(classesQuantity : number, inputSize : number, addressesSize : number )
    {
        this.classesQuantity = classesQuantity;
        this.discriminators = new Array(classesQuantity); 
        this.inputSize = inputSize; 
        for(var i = 0; i < this.discriminators.length; i++)
        {
            var discriminator : Discriminator = new Discriminator()
        }       
    }

    mapping(inputSize : number, addressesSize : number) : Array<Array<number>>
    {
        var shuffledInput = this.getShuffledInput(inputSize);
        var ramQuantity = Math.ceil(inputSize/addressesSize);
        var mapping = new Array(ramQuantity);
        var start = 0;

        for (var i = 0; i < mapping.length; i++)
        {
            var end = start + addressesSize;
            if(i >= inputSize%addressesSize)
            {
                end --;
            }

            mapping[i] = shuffledInput.slice(start, end);
            start = end;
        }
        return mapping;    
    }

    getShuffledInput(inputSize : number)  : Array<number>
    {
        var input = new Array(inputSize);
        var j, x, i : number;

        for( i = 0; i< inputSize; i++)
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