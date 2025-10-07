interface Printer {
    print(): void;
}

interface Scanner {
    scan(): void;
}

interface Fax {
    fax(): void;
}

class OldPrinter implements Printer {
    print() {
        console.log("Printing document...");
    }
}

class SmartPrinter implements Printer, Scanner, Fax {
    print() {
        console.log("Printing document...");
    }
    scan() {
        console.log("Scanning document...");
    }
    fax() {
        console.log("Sending fax...");
    }
}

const oldPrinter = new OldPrinter();
oldPrinter.print();

const smartPrinter = new SmartPrinter();
smartPrinter.print();
smartPrinter.scan();
smartPrinter.fax();
