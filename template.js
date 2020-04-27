const data = {
    
    lang  : 'java:8', // a string to define language

    files : // a json array that each element has 'name' and 'content' feature 
    [
        {
            name: 'main.java',
            content:`
                import java.util.Scanner;

                public class main {

                   public static void main(String[] args) {
                     
                    Scanner sc = new Scanner(System.in);
                    
                    int a = sc.nextInt();
                    int b = sc.nextInt();
                    
                    System.out.println(a+b);
                    
                    }
                }` 
        }
    ],

    inputs  : [['8','11'],['9','7']], // a 2D array with inputs for each cases
    outputs : [[]], // a 2D array with outputs for each cases
}


module.exports = data;