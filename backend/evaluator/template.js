const evaluationTemplate = {
    status:'', // correct, wrong
    outputs:[],         // student's answer
}

const javaTemplate = {
    
    lang  : 'java:8', // a string to define language

    files : // a json array that each element has 'name' and 'content' feature 
    [
        {
            name:       'main.java',
            content:    `
                        import java.util.Scanner;
                        
                        public class main{
                            public static void main(String[] args){

                                Scanner sc = new Scanner(System.in);

                                    int a = sc.nextInt();
                                    int b = sc.nextInt();
                        
                                    System.out.println(a+b);
                            }
                        }` 
        }
    ],

    inputs  :   [ // a 2D array with inputs for each cases
                    ['1','2'],
                    ['0','8'],
                    ['77','6'],
                    ['99','77'],
                    ['3','5']
                ],

    outputs :   [// a 2D array with outputs for each cases
                    ['3'],
                    ['8'],
                    ['83'],
                    ['176'],
                    ['8']
                ], 
}

const pythonTemplate = {
    
    lang  : 'python:3', // a string to define language

    files : // a json array that each element has 'name' and 'content' feature 
    [
        {
            name:       'main.py',
            content:    `num1 = int(input())\n`+
                        `num2 = int(input())\n`+
                        `sum = num1 + num2\n`+
                        `print(sum)\n`
        }
    ],

    inputs  :   [ // a 2D array with inputs for each cases
                    ['1','2'],
                    ['0','8'],
                    ['77','6']
                ],

    outputs :   [// a 2D array with outputs for each cases
                    ['3'],
                    ['8'],
                    ['83']
                ], 
}

const cppTemplate = {
    lang  : 'c++', // a string to define language

    files : // a json array that each element has 'name' and 'content' feature 
    [
        {
            name:       'main.cpp',
            content:    `
                        #include <iostream>

                        using namespace std;
            
                        int main(){
                        
                            int first, second, sum;

                            cin >> first >> second;
            
                            sum = first + second;
                            cout << sum << endl;
               
                            return 0;
                        }` 
        }
    ],

    inputs  :   [ // a 2D array with inputs for each cases
                    ['1','2'],
                    ['0','8'],
                    ['77','6']
                ],

    outputs :   [// a 2D array with outputs for each cases
                    ['3'],
                    ['8'],
                    ['83']
                ],
}

const cTemplate = {
    lang  : 'c', // a string to define language

    files : // a json array that each element has 'name' and 'content' feature 
    [
        {
            name:       'main.c',
            content:    `
                        #include<stdio.h>
 
                        int main() {
                            int a, b, sum;
                            
                            scanf("%d %d", &a, &b);
             
                            sum = a + b;
             
                            printf("%d", sum);
             
                            return(0);
                        }` 
        }
    ],

    inputs  :   [ // a 2D array with inputs for each cases
                    ['1','2'],
                    ['0','8'],
                    ['77','6']
                ],

    outputs :   [// a 2D array with outputs for each cases
                    ['3'],
                    ['8'],
                    ['83']
                ],
}

const jsTemplate = {
    lang    : 'node:14',
    files   : [
        {
            name: 'main.js',
            content:
            `var readline = require('readline');

            var reader = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            
            reader.question('',(num1)=>{
                reader.question('',(num2)=>{
                    console.log(Number.parseInt(num1)+Number.parseInt(num2));
                    process.exit();
                })
            })
            
            `
        }
    ],

    inputs  : [
                ['1','2'],
                ['5','5'],
                ['9','3'],
                ['3','6'],
                ['7','0'],
                ['8','3']
              ],
    
    outputs : [
                ['3'],
                ['10'],
                ['12'],
                ['9'],
                ['7'],
                ['11']
              ],
    
}

const exerciseTemplate = {
    
    lang  : 'java:8', // a string to define language

    files : // a json array that each element has 'name' and 'content' feature 
    [
        {
            name: 'main.java',
            content:`
            
            public class main{
                public static void main(String[] args){
                    System.out.println("Hello World");
                    System.out.println("This file was executed by docker remote api");
                }
            }
            `
        }
    ],

    inputs  :   [],
    outputs :   [], 
}

module.exports.javaTemplate = javaTemplate;
module.exports.cppTemplate  = cppTemplate;
module.exports.pythonTemplate= pythonTemplate;
module.exports.cTemplate    = cTemplate;
module.exports.exerciseTemplate = exerciseTemplate;
module.exports.jsTemplate       = jsTemplate;