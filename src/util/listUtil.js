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
