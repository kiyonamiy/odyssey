// var a = 1;
// function outer() {
//     // 非严格模式
//     function foo() { 
//         console.log( this.a );
//     }

//     var a = 2;

//     foo();
// }

// outer();

    // 非严格模式
    function foo() { 
        console.log( this.a );
    }

    var a = 2;

    foo();