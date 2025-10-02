class Person {
    walk(): void {
        console.log("Person is walking...");
    }
}

interface Coder {
    code(): void;
}

class Developer extends Person implements Coder {
    code(): void {
        console.log("Developer is coding...");
    }

    walk(): void {
        console.log("Developer is walking to the office...");
    }
}

// Create instance
const dev = new Developer();
dev.walk();  
dev.code();  
