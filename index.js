var result = {};
// function travel(container, startID) {

//   container.id = startID;
//   container.children = [];

//   return get(startID).then((ids) => {
//     return Promise.all(ids.map(id => {
//       var childContainer = {};
//       container.children.push(childContainer);
//       return travel(childContainer, id);
//     }));
//   });
// }

function splitArrayByNum(array, num) {
  var tmp = array.slice();
  var result = [];
  while(tmp.length > 0) {
    result.push(tmp.splice(0, num));
  }
  return result;
}

function promiseFac(pContainer, ids) {
  return Promise.all(ids.map(id => {
    var childContainer = {};
    pContainer.children.push(childContainer);
    return travel(childContainer, id);
  }));
}

function travel(container, startID) {

  container.id = startID;
  container.children = [];

  return get(startID).then((ids) => {

    var result = Promise.resolve();
    splitArrayByNum(ids, 5).forEach((childIds) => {
      result = result.then(() => promiseFac(container, childIds));
    });
    return result;
  });
}

function simuServerReturn(ids) {
  return new Promise((res) => {
    setTimeout(res, 3000, ids);
  });
}

function get(id) {
  console.log(id);
  if (id === 0) return simuServerReturn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  if (id === 1) return simuServerReturn([11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]);
  if (id === 3) return simuServerReturn([22, 23, 24, 25, 26, 27, 28]);
  return simuServerReturn([]);
}

travel(result, 0).then(() => {
  console.log(JSON.stringify(result));
});