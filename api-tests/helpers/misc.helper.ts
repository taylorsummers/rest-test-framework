/**
 * A polling function that waits for a provided contition
 * @param fn a generic function that returns a result
 * @param fnCondition a function defining an exit condition for the polling
 * @param ms the amount of time to wait in between each fn() execution
 * @returns the result of fn
 */
export const poll = async (fn: Function, fnCondition: Function, ms: number) => {
  let result = await fn();
  while (fnCondition(result)) {
    await wait(ms);
    console.log(result.status);
    result = await fn();
  }
  return result;
};

export const wait = function (ms = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};
