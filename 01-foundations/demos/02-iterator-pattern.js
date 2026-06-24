const range = {
  start: 1,
  end: 3,
  (){
    let current = this.start;
    const end = this.end;

    return {
      next() {
      },
    };
  },
};

console.log('\nCustom iterable output:');
for (const value of range) {
  console.log(value);
}

console.log('\nGenerator boilerplate:');
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

for (const value of numbers()) {
  console.log('generator ->', value);
}
