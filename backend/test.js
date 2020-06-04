let numbers = []

process.stdin.on('data',data=>{
    numbers.push(data)
    console.log(data.toString())
    if(numbers.length==2){
        //console.log(numbers.map(a=>Number.parseInt(a.toString())).reduce((a,b)=>(a+b)));
        process.exit();
    }
})