const evaluationTemplate = {
    status:'', // correct, wrong
    output:[],         // student's answer
    answer:[],        // instructor's answer
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
                    ['77','6']
                ],

    outputs :   [// a 2D array with outputs for each cases
                    ['3'],
                    ['8'],
                    ['83']
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

const goTemplate = {
    
    lang  : 'golang:1.13', // a string to define language

    files : // a json array that each element has 'name' and 'content' feature 
    [
        {
            name:       'main.go',
            content:    `
                        import "fmt"
 
                        func main() {
                        
                            var num1 int
                            fmt.Scanln(&num1)

                            var num2 int
                            fmt.Scanln(&num2)

                            var sum = num1 + num2

                            fmt.Print(sum)
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
module.exports.goTemplate   = goTemplate;
module.exports.cTemplate    = cTemplate;
module.exports.exerciseTemplate = exerciseTemplate;