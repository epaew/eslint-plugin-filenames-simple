// Array.prototype.flat
if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth) {
    const flatten = (array: any[], depth: number): any[] => {
      return array.reduce((result, element) => {
        return result.concat(
          Array.isArray(element) && depth > 0 ? flatten(element, depth - 1) : [element],
        );
      }, []);
    };

    // @ts-ignore
    return flatten(this, Math.floor(depth) || 1);
  };
}

// Array.prototype.flatMap
if (!Array.prototype.flatMap) {
  // @ts-ignore
  Array.prototype.flatMap = function (callback, thisArg) {
    return Array.prototype.map.apply(this, [callback, thisArg]).flat(1);
  };
}
