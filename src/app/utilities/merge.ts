export default function merge(obj1, obj2) {
  const obj3 = {};

  for (const attrname in obj1) { obj3[attrname] = obj1[attrname]; }
  for (const attrname in obj2) { obj3[attrname] = obj2[attrname]; }

  return obj3;
}
