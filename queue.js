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

// code

var result = {id: 0, children: []};
var queue = [result];
function travel() {
  if (queue.length > 0) {
    const length = Math.min(5, queue.length);
    const reqObjs = queue.splice(0, length);

    Promise.all(reqObjs.map(req => get(req.id))).then((response) => {
      for (let i = 0; i < response.length; i++) {
        for (let j = 0; j < response[i].length; j++) {
          const childrenContainer = {id: response[i][j], children: []};
          reqObjs[i].children.push(childrenContainer);
          queue.push(childrenContainer);
        }
      }
      travel();
    });
  } else {
    console.log(JSON.stringify(result));
  }
}


travel();