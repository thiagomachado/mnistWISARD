class wisard
{
    discriminators : Array<Discriminator>;
    classesQuantity: number;

    constructor(classesQuantity : number, )
    {
        this.classesQuantity = classesQuantity;
        this.discriminators = new Array(classesQuantity);   
    }
}