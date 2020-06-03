// Array.prototype.flat
if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth) {
    const flattened: any[] = [];
    const flat = (array: any[], depth: number) => {
      for (const el of array) {
        if (Array.isArray(el) && depth > 0) {
          flat(el, depth - 1);
        } else {
          flattened.push(el);
        }
      }
    };

    // @ts-ignore
    flat(this, Math.floor(depth) || 1);
    return flattened;
  };
}

// Array.prototype.flatMap
if (!Array.prototype.flatMap) {
  // @ts-ignore
  Array.prototype.flatMap = function (callback, thisArg) {
    return Array.prototype.map.apply(this, [callback, thisArg]).flat(1);
  };
}
