function findOppositeNumber(n,inputNumber){
    if(inputNumber < n/2){
        return inputNumber + n/2;
    }
    else{
        if(inputNumber !== n/2){
            return inputNumber - n/2;
        }
        else return 0;
    }
}
console.log(findOppositeNumber(10,6));
