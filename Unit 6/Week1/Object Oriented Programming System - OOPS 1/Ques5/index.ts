interface Printable {
    print(): void;
}

class Doc implements Printable {
    print(): void {
        console.log("Printing Document...");
    }
}

class Photo implements Printable {
    print(): void {
        console.log("Printing Photo...");
    }
}

const doc = new Doc();
const photo = new Photo();

const printables: Printable[] = [doc, photo];

for (const item of printables) {
    item.print();
}
