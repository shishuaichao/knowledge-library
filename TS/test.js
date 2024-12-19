function a() {
    console.log(`a`);
    return new Promise((res) => {
        res('a')
    })
}

function b(x) {
    console.log(`b`, x);
    return new Promise((res) => {
        res('b')
    })
}

function c(x) {
    console.log(`c`, x);
}

a()
.then(b)
.then(c)