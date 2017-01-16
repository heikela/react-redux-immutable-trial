import cachedUnorderedReduce from './listUtil.js'
import {List, Map, Range} from '../../immutable-js/dist/immutable'

describe('cachedUnorderedReduce', () => {
  it('should behave like reduce', () => {
    const add = (a, b) => a + b;
    const data = List([1, 2, 3, 4, 5]);
    expect(cachedUnorderedReduce(add, add, 0)(data)).toEqual(15);
  });

  it('should work when the accumulator and element types are different', () => {
    const add1 = (a, b) => a.set('sum', a.get('sum') + b);
    const add2 = (a, b) => a.set('sum', a.get('sum') + b.get('sum'));
    const sum = cachedUnorderedReduce(add1, add2, Map({sum: 0}));
    const list = Range(1, 1000).toList();
    expect(sum(list)).toEqual(Map({sum: 499500}));
  });

  it('should cache results', () => {
    // Keep track of calls to combineOne and combineMany to check caching of results
    let currentOperation;
    let combineOneCalls = Map();
    let combineManyCalls = Map();
    const combineOne = (a, b) => {
      const previousCalls = combineOneCalls.get(currentOperation, List());
      const updatedCalls = previousCalls.push([a, b]);
      combineOneCalls = combineOneCalls.set(currentOperation, updatedCalls);
      return a + b;
    }
    const combineMany = (a, b) => {
      const previousCalls = combineManyCalls.get(currentOperation, List());
      const updatedCalls = previousCalls.push([a, b]);
      combineManyCalls = combineManyCalls.set(currentOperation, updatedCalls);
      return a + b;
    }
    const sum = cachedUnorderedReduce(combineOne, combineMany, 0);

    // Check results and caching behaviour in a few simple scenarios
    currentOperation = 'list1-reduce';
    const list1 = Range(1, 1000).toList();
    expect(sum(list1)).toEqual(499500);
    expect(combineOneCalls.get('list1-reduce').size).toEqual(999);

    currentOperation = 'list1-reduce2';
    expect(sum(list1)).toEqual(499500);
    // 32 because we don't cache results of the tail component
    expect(combineOneCalls.get('list1-reduce2').size).toBeLessThanOrEqual(32);

    currentOperation = 'list2-reduce';
    const list2 = list1.push(1001);
    expect(sum(list2)).toEqual(500501);
    // 33 because we don't cache results of the tail component and we've appended
    // one element
    expect(combineOneCalls.get('list2-reduce').size).toBeLessThanOrEqual(33);

    currentOperation = 'list3-reduce';
    const list3 = list1.set(0, -999);
    expect(sum(list3)).toEqual(498500);
    // 64 because we don't cache results of the tail component and one
    // 32 element VNode receied an update
    expect(combineOneCalls.get('list3-reduce').size).toBeLessThanOrEqual(64);
    // A list of < 1024 elements requires two levels of VNodes. One of the
    // leaf VNodes gets updated and it's results are recalculated with combineOne.
    // This new result is then combined with cached results from the other max 31
    // leaf level VNodes one by one.
    expect(combineManyCalls.get('list3-reduce').size).toBeLessThanOrEqual(32);
  });
});
