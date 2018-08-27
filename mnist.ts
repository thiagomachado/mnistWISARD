import {Wisard} from './model/wisard';
declare var require: any;
var fs = require('fs'),
    path = require('path'),     
    mnistTrainFile : String = "mnist_train.csv";
 

class StartUp
{
    public static main() :number
    {
        var wisard = new Wisard(2);
        
        console.log(this.readMnistFile(mnistTrainFile))
        return 0;
    }

    public static  readMnistFile(fileName : String) : void
    {
        var encode = {encoding: 'utf-8'};
        var data = fs.readFile(fileName, encode, function(err : any,data : any)
        {
            console.log(data[0]);            
        } );
    }
}


StartUp.main();
