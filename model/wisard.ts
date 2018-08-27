import {Discriminator} from './discriminator';

class Wisard
{
    discriminators : Array<Discriminator>;
    classesQuantity: number;

    constructor(classesQuantity : number, )
    {
        this.classesQuantity = classesQuantity;
        this.discriminators = new Array(classesQuantity);   
    }

    public train() 
    {

    }
}

export {Wisard as Wisard};