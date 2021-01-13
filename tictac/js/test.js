!function(){
    const targetSpan = document.querySelector('body>span:nth-child(2)');
    targetSpan.textContent = 'working!!!.';
    const double_d = [ ['a', 'b', 'c'], ['g', 'h', 'i'], ['d', 'e', 'f'] ];

    let single_d = ['a','b','c','d'];
    console.log('print single d');
    for(let i=0; i<single_d.length; ++i){
        console.log(`at i = ${i}: ${single_d[i]}`);
    }
    
    console.log(`print double_d # 0`);
    for(let i=0; i<double_d[0].length; ++i){
        console.log(`at i = ${i}: ${double_d[0][i]}`);
    }

    console.log(`print double_d # 1`);
    for(let i=0; i<double_d[1].length; ++i){
        console.log(`at i = ${i}: ${double_d[1][i]}`);
    }

    console.log(`print double_d # 2`);
    for(let i=0; i<double_d[2].length; ++i){
        console.log(`at i = ${i}: ${double_d[2][i]}`);
    }
    console.log(`print double_d (using nested loop method)`);
    for(let j=0; j<double_d.length; ++j){
        for(let i=0; i<double_d[j].length; ++i){
            console.log(`at i = ${i}: ${double_d[j][i]}`);
        }
    }

    function xplainClosure() {
        let someVar = 2;
        function innerFunc(){
            console.clear();
            console.log('someVar= ' + someVar);
        
        }
        setTimeout(_ => innerFunc(), 5000);
    }

    xplainClosure();

   

}();