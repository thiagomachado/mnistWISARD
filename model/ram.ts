class Ram 
{
    addresses : Array<number>;

    constructor(ramInputSize : number) 
    {       
       this.addresses = new Array(ramInputSize);
       for(var i = 0; i < this.addresses.length; i++)
       {
           this.addresses[i] = 0;
       }       
    }    
}

export {Ram as Ram};
