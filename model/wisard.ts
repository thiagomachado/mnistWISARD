import {Discriminator} from './discriminator';

class Wisard
{
    discriminators : Map<number,Discriminator>;
    classesQuantity: number;
    inputSize: number;
    mapping : Array<Array<number>>;
    ramsContents : Map<number,Array<number>>;
    possibleClasses: Array<number>;
    possibleClassesScoreMap : Map<number, number>;
    confidence : number = 0.5; //must be a value between 0 and 1

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

    public training(discriminatorClass : number, input : String )
    {        
        this.discriminators.get(discriminatorClass).training(input);       
    }

    public retrieve(input : String) : void
    {
        this.ramsContents = new Map();
        
        this.discriminators.forEach(discriminator => {
            this.ramsContents.set(discriminator.classId, discriminator.retrieve(input));            
                       
        });
        console.log(this.ramsContents);
        this.bleaching();
        console.log(this.possibleClasses);
        
    }

    public bleaching() : void
    {
        this.fillPossibleClassesArray();        
        var lowestContentsMap : Map<number, number>;
        
        while(this.possibleClasses.length > 1 
            && this.ramsContents.values().next().value.length > 0 )
        {
            //console.log(this.ramsContents.get(this.possibleClasses[0]).length);
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

            lowestContentsMap =  this.getLowestContentMap();
            var threshold : number = this.getGreatestLowestContent(lowestContentsMap);
           
           this.getNumberOfActiveRamsPerThreshold(threshold);
           this.updatePossibleClasses(lowestContentsMap);
            
        }        
    }

    public fillPossibleClassesArray() : Array<number>
    {
        this.possibleClasses = [];
        for (let i = 0; i < this.classesQuantity; i++) {
            
            this.possibleClasses.push(i);
        }
        return this.possibleClasses;
    }

    public getLowestContentMap() : Map<number, number>
    {

        var lowestClassContentIndex : number;
        var lowestContentsMap : Map<number, number> =new Map<number,number>();
        for(var i = 0; i < this.possibleClasses.length; i++)
        {
            var ramsContent : Array<number> = this.ramsContents.get(this.possibleClasses[i]);
           
            lowestClassContentIndex = this.getLowestContentIndex(ramsContent);
            lowestContentsMap.set(this.possibleClasses[i],lowestClassContentIndex);

        }
        return lowestContentsMap;
    };

    public getLowestContentIndex(ramsContent : Array<number>) :number
    {

        var lowestContent : number = Number.MAX_SAFE_INTEGER;
        var index : number;
        for (var i = 0; i < ramsContent.length; i++)
        {            
            if(ramsContent[i]< lowestContent)
            {
                index = i;
            }
        }
        return index;
    }

    public getGreatestLowestContent(lowestContentsMap : Map<number,number>) : number
    {
        var greatestLowestContent : number = 0;
            
        lowestContentsMap.forEach((lowestContentIndex, classNumber) => 
        {
            var ramsContent : Array<number> = this.ramsContents.get(classNumber);
            var classLowestContent: number = ramsContent[lowestContentIndex];
            if(classLowestContent > greatestLowestContent)
            {
                greatestLowestContent = ramsContent[classLowestContent];
            }
        
        });
            
            
        return greatestLowestContent;
    }

    public getNumberOfActiveRamsPerThreshold(threshold : number) 
    {
        this.possibleClassesScoreMap = new Map();
        for(var i = 0; i < this.possibleClasses.length; i++)
        {
            var classNumber = this.possibleClasses[i];
            var count = 0;
            
            for(var j = 0; j < this.ramsContents.get(classNumber).length; j++)
            {
                if(this.ramsContents.get(classNumber)[j] >= threshold)
                {
                    count ++;                    
                }
            }
            this.possibleClassesScoreMap.set(classNumber,count);
        }        

    }


    public updatePossibleClasses(lowestContentsMap : Map<number,number>) : void 
    {
        var maxScore : number = this.getMaxScore();
        var minScore : number = (1 - this.confidence) * maxScore;
        this.removeClassWithLessThanMinScore( minScore, lowestContentsMap);
    
    }

    public getMaxScore(): number 
    {
        var maxScore = 0;
        this.possibleClassesScoreMap.forEach( (score, classNumber) => 
        {
            if(score > maxScore)
            {
                maxScore =score;
            }
            
        });
        return maxScore;
    }

    public removeClassWithLessThanMinScore( minScore : number, lowestContentsMap : Map<number,number>)
    {
        this.possibleClassesScoreMap.forEach( (score, classNumber) =>
        {
            if(score < minScore)
            {
                var classIndex : number = this.possibleClasses.indexOf(classNumber);
                this.possibleClasses.splice(classIndex, 1);
                this.ramsContents.delete(classNumber);
            }
            else
            {
                var index = lowestContentsMap.get(classNumber);
                this.ramsContents.get(classNumber).splice(index, 1);
            }
        });
    }

}

export {Wisard as Wisard};