import {Ram} from "./ram";

class Discriminator
{    
    rams: Array<Ram>;
    mapping: Array<Array<number>>
    classId: Number;
    
    constructor(classId: Number, mapping : Array<Array<number>>) 
    {
        this.mapping = mapping;   
        this.rams = [];
        this.classId = classId;
        for(var i=0; i < mapping.length; i++)
        {                
            this.rams.push(new Ram());
        }
    }

    public training(input : String)
    {
        var addresses = this.convertInputToAddresses(input); 
        for(var i = 0; this.rams.length > i; i++)
        {
            var value = 0;
            if(this.rams[i].addresses.has(addresses[i]))
            {
                value = this.rams[i].addresses.get(addresses[i]);
                
            }
            value ++;
            this.rams[i].addresses.set(addresses[i], value);
            
        }
        
    }

    private convertInputToAddresses(input : String) : Array<String>
    {
        var addresses = [];
        for(var i = 0; this.mapping.length > i; i++)
        {
            var address:String = "";
            for(var j=0; this.mapping[i].length >j; j++)
            {
               address += input[this.mapping[i][j]];
            }
            addresses.push(address);
        }
    
        return addresses;
    }

    public retrieve(input : String) : Array<Number>
    {
        var ramsContent = new Array<Number>();
        var addresses = this.convertInputToAddresses(input);
        for(var i = 0; addresses.length > i; i++)
        {
            if(this.rams[i].addresses.has(addresses[i]))
            {
                ramsContent.push(this.rams[i].addresses.get(addresses[i]));
            }
            else
            {
                ramsContent.push(0);  
            }            
        }
        return ramsContent;
    }
   
}

export {Discriminator as Discriminator};