const data = {
    
    lang  : 'c++', // a string to define language

    files : // a json array that each element has 'name' and 'content' feature 
    [
        {
            name: 'main.cpp',
            content:`
            #include <iostream>
            using namespace std;
            int main(){
            cout << "Hello, world, from Visual C++!" << endl;
            }` 
        },

        {

            name: 'second.h',
            content:`
            #include <stdio.h>
                void greet() {
                printf("Hello, World!");
                }
            `

        }
    ],

    inputs  : [[]], // a 2D array with inputs for each cases
    outputs : [[]], // a 2D array with outputs for each cases
}


module.exports = data;