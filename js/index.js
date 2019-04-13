// Your code goes here

const bySelector = (selector, cb = false) => {
  const node = document.querySelector(selector);
  return cb ? cb(node) : node;
};

const bySelectorAll = (selector, cb = false) => {
  const nodeList = document.querySelectorAll(selector);
  return cb ? cb(nodeList) : nodeList;
};

const mapAll = (selector, cb) => {
  const nodeArr = Array.from(bySelectorAll(selector));
  return nodeArr.map(cb);
};

mapAll('img', element => {
  element.addEventListener('mouseenter', e => {
    e.target.classList.add('blur-image');
  });
  element.addEventListener('mouseleave', e => {
    e.target.classList.remove('blur-image');
  });
});

let lastClicked = null;
mapAll('p', element => {
  element.addEventListener('mousedown', e => {
    e.stopPropagation();
    if (lastClicked) {
      lastClicked.classList.remove('text-focus');
    }
    e.target.classList.add('text-focus');
    lastClicked = e.target;
  });
});

bySelector('body', element => {
  element.addEventListener('mousedown', () => {
    lastClicked.classList.remove('text-focus');
  });
});
