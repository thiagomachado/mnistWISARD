import {Wisard} from './model/wisard';
declare var require: any;
var fs = require('fs'),
    path = require('path'),     
    mnistTrainFile : String = "mnist_train.csv",
    mnistTestFile : String = "mnist_test.csv",
    fileArray : Array<any> = [],
    wisard = new Wisard(10,784,4),
    threshold = 3;

class StartUp
{
    

    public static main() :void
    {                        
        fileArray = this.readMnistFile(mnistTrainFile); 
          
        for(var i = 0; fileArray.length > i; i++)
        {            
            var lineArray = fileArray[i].split(",");
            lineArray = this.applyThreshold(lineArray);
            
            if(lineArray.length > 1)
            {
                wisard.training(parseInt(lineArray[0]),this.getInputArrayInTextWithoutClass(lineArray));
            }
                                    
        }
        var testFileArray = this.readMnistFile(mnistTestFile);
        var firstLineTestFileArray = this.applyThreshold(testFileArray[0].split(","));
        wisard.retrieve(this.getInputArrayInTextWithoutClass(firstLineTestFileArray));
    }

    public static  readMnistFile(fileName : String) : Array<any>
    {
        var encode = {encoding: 'utf-8'};                
        fileArray = fs.readFileSync(fileName, encode).split("\n");
        
        return fileArray;     
    }

    public static applyThreshold( fileLineArray:Array<any>) : Array<any>
    {
        for(var j = 1; fileLineArray.length > j; j++)
        {
            if(fileLineArray[j].length==threshold)
            {
                fileLineArray[j] = "1";                
            }else
            {
                fileLineArray[j] = "0";
            }
        }
        return fileLineArray;
    }

    public static getInputArrayInTextWithoutClass(fileLineArray:Array<any>) :String
    {
        return  fileLineArray.slice(1,fileLineArray.length).join("");
    }

}


StartUp.main();
