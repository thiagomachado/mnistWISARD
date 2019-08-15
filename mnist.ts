import {Wisard} from './model/wisard';
declare var require: any;
var fs = require('fs'),
    path = require('path'),     
    mnistTrainFile : String = "mnist_train.csv",
    mnistTestFile : String = "mnist_test.csv",
    fileArray : Array<any> = [],
    wisard = new Wisard(10,784,40,0.125),
    threshold : number = 3,
    confusionMatrix :Array<Array<number>> = new Array(10),
    trace = 0;

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
        console.log(wisard.trainingExamplesClasses);
        var testFileArray :Array<any> = this.readMnistFile(mnistTestFile);
        this.initializeConfusionMatrix();
        var expectedClass : number;
        for(var i = 0; i < testFileArray.length - 1; i++)
        {
            expectedClass = testFileArray[i].split(",")[0];
            this.validateWisardClasses(this.applyThreshold(testFileArray[i].split(",")),expectedClass);
        }
        console.log(confusionMatrix); 
        console.log(trace);
    }
    static initializeConfusionMatrix() 
    {        
        for(var i = 0; i < 10; i++)
        {
            confusionMatrix[i] = new Array(10);
            confusionMatrix[i].fill(0,0,10);
        }
    }

    public static validateWisardClasses(firstLineTestFileArray: any, expectedClass : number) 
    {
        wisard.retrieveLog(this.getInputArrayInTextWithoutClass(firstLineTestFileArray));
        var wisardClass : number; 
        if(wisard.possibleClasses.length > 1)
        {
            wisardClass = wisard.possibleClasses[Math.floor(Math.random()*wisard.possibleClasses.length)];
        }
        else
        {
            wisardClass = wisard.possibleClasses[0];
        }

        confusionMatrix[wisardClass][expectedClass] = confusionMatrix[wisardClass][expectedClass] + 1 ;
        if (wisardClass == expectedClass)
        {
            trace = trace + 1;
        }
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
            if(fileLineArray[j].length >= threshold)
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
