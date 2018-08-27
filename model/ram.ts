class Ram {

    inputSize : number;

    //to do: utilizar map
    addresses : Array<number>;


    constructor(inputSize : number) 
    {
       this.inputSize = inputSize;
       this.addresses  = new Array(inputSize); 
    }

    public train()
    {
        
    }
    
}

export {Ram as Ram};
