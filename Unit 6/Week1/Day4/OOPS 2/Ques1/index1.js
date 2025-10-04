class Duck {
    swim() {
        console.log("I know swimming");
    }
}

class MallardDuck extends Duck { }

const duck = new MallardDuck();
duck.swim();
