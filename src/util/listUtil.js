/*
  Like reduce, except in addition to the usual reducer function of type
  A -> B -> A (here called combineOne) you need to provide
  A -> A -> A (here called combineMany) for combining (potentially cached)
  results from subtrees in the underlying data structure

  Due to the caching you should not rely on combineOne being called for
  particular elements in the list in a particular order.
*/

const cachedUnorderedReduce = (combineOne, combineMany, initial) => {
  var resultCache = new WeakMap();

  const reduceNode = (node, offset, walkFunc) => {
    if (resultCache.has(node)) {
      return resultCache.get(node);
    }
    var result = initial;
    walkFunc((elem, offset, walkFunc) => {
        if (walkFunc) {
          result = combineMany(result, reduceNode(elem, offset, walkFunc));
        } else {
          result = combineOne(result, elem)
        }
      },
      node, offset
    );
    resultCache.set(node, result);
    return result;
  }

  const reduceList = (list) => {
    var result = initial;
    list.walkTree((elem, offset, walkFunc) => {
      if (walkFunc) {
        result = combineMany(result, reduceNode(elem, offset, walkFunc));
      } else {
        result = combineOne(result, elem)
      }
    });
    return result;
  }

  return reduceList;
}

export default cachedUnorderedReduce;
