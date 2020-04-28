const data = {
    
    lang  : 'golang:1.13', // a string to define language

    files : // a json array that each element has 'name' and 'content' feature 
    [
        {
            name: 'main.go',
            content:`package main
            import "fmt"
            func main() {
             fmt.Println("Hello World")
            }` 
        }
    ],

    inputs  : [[]], // a 2D array with inputs for each cases
    outputs : [[]], // a 2D array with outputs for each cases
}


module.exports = data;