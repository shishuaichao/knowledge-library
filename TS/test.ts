
interface People {
    name: string
    id: number
}

interface Dog {
    bark: number
    hand: string
}

type Animal = People | Dog

function foo(arg: Animal) {
    console.log(`arg`, arg);
}

foo({ name: '12', bark: 12, id: 12})