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

async function getTree(container) {
  const ids = await get(container.id);
  for (var i = 0; i < ids.length; i++) {
    const id = ids[i];
    const childContainer = {id, children: []};
    container.children.push(childContainer);
    await getTree(childContainer);
  }
}

var result = {id: 0, children: []}

async function getResult() {
  await getTree(result);
  console.log(JSON.stringify(result));
}

getResult();