const range = {
  start: 1,
  end: 3,
  [Symbol.iterator](){
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
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
