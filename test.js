/**
 * Making a passed functon timeout(able) when calling in delayed timeout.
 * When wrapper timeout is bigger than @param msec-@param fn is "timedout", otherwise it's called with ...args
 * @param {*} msec - delay in milliseconds
 * @param {*} fn - source funciton
 * @returns timeout(able) function
 */
function timeout(msec, fn) {
    let timer = setTimeout(() => {
        if (timer) console.log('fn is timed out');
        timer = null;
    }, msec);
    return (...args) => {
        if (timer) {
            timer = null;
            fn(...args);
        }
    }
};

/**
 * Tried to reproduced the same approach using class, faced problm with local context of @timer
 */
// class Timeoutable {
//     constructor(msec, fn) {
//         this.fn = fn;
//         this.delay = msec;
//     }
//     run(...args) {
//         var timer = setTimeout(() => {
//             if (timer) console.log('fn is timed out');
//             timer = null;
//         }, this.delay);
//         if (timer) {
//             timer = null;
//             this.fn(...args);
//         }
//     }
// };
// ---
// USAGE
// var fn = x => console.log(x)
// var fn100 = new Timeoutable(100, fn);

// setTimeout(() => {
//     fn100.run(1);
// }, 350);
// ---

var fn = x => console.log(x);
var fn100 = timeout(100, fn);

setTimeout(() => {
    fn100(1);
}, 350);
// if timeout delay is less than fn100 timeout than output is console.log: 1.
// else the output is console.log: 'fn is timed out"

/**
 * Creates the function object which may be canceled after it has been called with source function
 * Usage maybe, for example, if we do not await it to respond anymore and/or want to call it again or with new params
 */
class Cancelale {
    constructor(fn) {
        this.fn = fn;
    }
    source(...args) {
        if (this.fn) return this.fn(...args);
    }
    cancel() { this.fn = null };
};

var cfn = new Cancelale(fn100); // based on fn100 above, so canseling will trigger additional behaviour
cfn.source(1)
cfn.cancel()
cfn.source(1)