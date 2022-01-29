const colorTable = ['#e6194b', '#3cb44b', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#9a6324', '#fffac8', '#800000', '#808000', '#ffd8b1', '#000075'];

function chooseColor() {
  let index = Math.floor(Math.random() * colorTable.length);
  return colorTable[index];
}

function isIn(a, x) {
  for (let y of a) {
    if (y === x) {
      return true;
    }
  }
  return false;
}

function _chooseColor(a) {
  while (true) {
    let x = chooseColor();
    if (!isIn(a, x)) {
      return x;
    }
  }
}

let _colorTable = {
  "computer science": "#18BAFF",
  "biology": "#14F3F3",
  "history": "#00FF62",
  "physics": "#4A813F",
  "literature": "#FFBA09",
  "psychology": "#FF3D00"
};

export function getSubjectColor(x) {
  if (Object.hasOwnProperty.bind(_colorTable)(x)) {
    return _colorTable[x];
  }
  else {
    let nc = _chooseColor(Object.values(_colorTable));
    _colorTable[x] = nc;
    return nc;
  }
}

let _colorTable1 = {
  "mit": "#18BAFF",
  "harvard": "#14F3F3",
  "stanford": "#FF3D00",
  "yale": "#00FF62",
  "oxford": "#FFBA09"
};

export function getUniversityColor(x) {
  if (Object.hasOwnProperty.bind(_colorTable1)(x)) {
    return _colorTable1[x];
  }
  else {
    let nc = _chooseColor(Object.values(_colorTable1));
    _colorTable1[x] = nc;
    return nc;
  }
}