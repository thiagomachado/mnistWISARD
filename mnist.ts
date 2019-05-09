import {Wisard} from './model/wisard';
declare var require: any;
var fs = require('fs'),
    path = require('path'),     
    mnistTrainFile : String = "mnist_train.csv",
    fileArray : Array<any> = [],
    wisard = new Wisard(10,784,4),
    threshold = 3;

class StartUp
{
    

    public static main() :void
    {                        
        fileArray = this.readMnistFile(mnistTrainFile); 
        console.log(fileArray[0]);      
        for(var i = 0; fileArray.length > i; i++)
        {            
            var lineArray = fileArray[i].split(",");
            for(var j = 1; lineArray.length > j; j++)
            {
                if(lineArray[j].length==threshold)
                {
                    lineArray[j] = "1";                
                }else
                {
                    lineArray[j] = "0";
                }
            }
            if(lineArray.length > 1)
            {
                wisard.training(parseInt(lineArray[0]), lineArray.slice(1,lineArray.length).join(""));
            }
                                    
        }
    }

    public static  readMnistFile(fileName : String) : Array<any>
    {
        var encode = {encoding: 'utf-8'};                
        fileArray = fs.readFileSync(fileName, encode).split("\n");
        
        return fileArray;     
    }

}


StartUp.main();
