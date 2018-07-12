var fs = require('fs'),
    path = require('path'),
    mnistTrainFile : String = "mnist_train.csv";

fs.readFile(mnistTrainFile, {encoding: 'utf-8'}, function(err,data){
    console.log(data[0]);
} ); 