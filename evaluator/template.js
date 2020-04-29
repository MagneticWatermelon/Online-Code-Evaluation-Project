const evaluationTemplate = {
    status:'', // correct, wrong
    given:[],         // student's answer
    answer:[],        // instructor's answer
}

const bundleTemplate = {
    
    lang  : 'java:8', // a string to define language

    files : // a json array that each element has 'name' and 'content' feature 
    [
        {
            name: 'main.java',
            content:`
                import java.util.Scanner;
                public class main{
                    public static void main(String[] args){

                        Scanner sc = new Scanner(System.in);

                        int a = sc.nextInt();
                        int b = sc.nextInt();
                        
                        System.out.println("osman");
                    }
                }` 
        }
    ],

    inputs  :   [ // a 2D array with inputs for each cases
                    ['1','2'],
                    ['0','8'],
                    ['77','6'],
                    ['9','7'],
                    ['78','52'],
                    ['3','4'],
                    ['9','-1'],
                    ['-10','9'],
                    ['5','13'],
                    ['9','47']
                ],

    outputs :   [// a 2D array with outputs for each cases
                    ['3'],
                    ['8'],
                    ['83'],
                    ['16'],
                    ['130'],
                    ['7'],
                    ['8'],
                    ['-1'],
                    ['18'],
                    ['56']
                ], 
}


const bundleTemplate2 = {
    
    lang  : 'java:8', // a string to define language

    files : // a json array that each element has 'name' and 'content' feature 
    [
        {
            name: 'main.java',
            content:`
                import java.util.Scanner;
                public class main{
                    public static void main(String[] args){

                        Scanner sc = new Scanner(System.in);

                        int a = sc.nextInt();
                        int b = sc.nextInt();
                        
                        System.out.println("nazmi");
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



const bundleTemplate3 = {
    
    lang  : 'java:8', // a string to define language

    files : // a json array that each element has 'name' and 'content' feature 
    [
        {
            name: 'main.java',
            content:`
                import java.util.Scanner;
                public class main{
                    public static void main(String[] args){

                        Scanner sc = new Scanner(System.in);

                        int a = sc.nextInt();
                        int b = sc.nextInt();
                        
                        System.out.println("yusuf");
                    }
                }` 
        }
    ],

    inputs  :   [ // a 2D array with inputs for each cases
                    ['1','2'],
                    ['0','8'],
                    ['77','6'],
                    ['9','7'],
                    ['78','52']
                ],

    outputs :   [// a 2D array with outputs for each cases
                    ['3'],
                    ['8'],
                    ['83'],
                    ['16'],
                    ['130']
                ], 
}
module.exports.bundleTemplate = bundleTemplate;
module.exports.bundleTemplate2=bundleTemplate2;
module.exports.bundleTemplate3=bundleTemplate3;
module.exports.evaluationTemplate = evaluationTemplate;