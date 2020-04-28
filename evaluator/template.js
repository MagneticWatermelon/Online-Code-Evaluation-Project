const data = {
    
    lang  : 'c', // a string to define language

    files : // a json array that each element has 'name' and 'content' feature 
    [
        {
            name: 'main.go',
            content:`
            
                #include <stdio.h>
                int main() {
                // printf() displays the string inside quotation
                printf("Hello, World!");
                return 0;
            }` 
        }
    ],

    inputs  : [[]], // a 2D array with inputs for each cases
    outputs : [[]], // a 2D array with outputs for each cases
}


module.exports = data;