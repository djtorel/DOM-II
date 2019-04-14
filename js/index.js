// Your code goes here
// General Utility Selector Functions -- Start
const bySelector = (selector, cb = false) => {
  const node = document.querySelector(selector);
  return cb ? cb(node) : node;
};

const bySelectorAll = (selector, cb = false) => {
  const nodeList = document.querySelectorAll(selector);
  return cb ? cb(nodeList) : nodeList;
};

const forAll = (selector, cb) => {
  return bySelectorAll(selector).forEach(cb);
};
// General Utility Selector Functions -- End

/**
 * In the below section I have refactored all of the things I was doing with
 * events to reusable functional components
 */

//  Function to add an array of event listeners to a given element
const addListeners = listenerArr => element => {
  listenerArr.forEach(([event, cb]) => element.addEventListener(event, cb));
};

// Function to add a class to a given event target
const addClass = classToAdd => ({ target: { classList } }) => {
  classList.add(classToAdd);
};

// Function to remove a class from a given event target
const removeClass = classToRemove => ({ target: { classList } }) => {
  classList.remove(classToRemove);
};

// Function to toggle a style on & off for a given event target
const toggleStyle = (styleName, styleValue) => ({ target: { style } }) => {
  if (style[styleName] !== styleValue) {
    style[styleName] = styleValue;
  } else {
    style[styleName] = '';
  }
};

// Function that takes in an event and trigger key, if the event key matches
// the trigger key it calls a callback with the event
const eventKey = (triggerKey, cb) => event => {
  if (triggerKey === event.key) {
    cb(event);
  }
};

// Function to prevent the default for a given event
const preventDefault = event => {
  event.preventDefault();
};

// A closure function that stores a previous element state so that it can be
// used to toggle a class off or on an element.
// If the 'previous element' is not clicked it removes the class from the
// previous element.
// If a new class is clicked and 'removeOnly' is not false, it addes the class
// to the event target by calling the addClass helper above
const toggleClass = () => {
  let previousElement = null;
  return (className, removeOnly = false) => event => {
    event.stopPropagation();
    if (previousElement) {
      removeClass(className)(previousElement);
      previousElement = null;
    }
    if (!removeOnly) {
      addClass(className)(event);
      previousElement = event;
    }
  };
};

// Initialize the toggleClass closure for the toggleFocusClass events I use
// below
const toggleFocusClass = toggleClass();

// A function that toggles a class on when the mouse wheel is scrolled up
// and removes the class when the mouse wheel scrolls down
const wheelToggleClass = className => event => {
  if (event.deltaY < 0) {
    addClass(className)(event);
  }
  if (event.deltaY > 0) {
    removeClass(className)(event);
  }
};

// Event listeners for all 'img' tags -- Start
forAll(
  'img',
  addListeners([
    ['mouseenter', addClass('blur-image')],
    ['mouseleave', removeClass('blur-image')],
  ])
);
// Event listeners for all 'img' tags -- End

// Event listeners for all 'p' tags -- Start
forAll(
  'p',
  addListeners([
    ['mousedown', toggleFocusClass('text-focus')],
    ['wheel', wheelToggleClass('text-big')],
    ['contextmenu', preventDefault],
    ['dblclick', addClass('text-big')],
  ])
);
// Event listeners for all 'p' tags -- End

// Event listeners for the 'body' tag -- Start
bySelector(
  'body',
  addListeners([
    ['mousedown', toggleFocusClass('text-focus', true)],
    ['keydown', eventKey('r', toggleStyle('backgroundColor', 'red'))],
  ])
);
// Event listeners for the 'body' tag -- End

// Event listeners for the 'a' tags -- Start
forAll(
  'a',
  addListeners([
    ['mouseover', toggleStyle('fontSize', '2.5rem')],
    ['mouseout', toggleStyle('fontSize', '')],
  ])
);
// Event listeners for the 'a' tags -- End

// Event listeners for all h2, h3, and h4 -- Start
forAll('h2, h3, h4', addListeners([['click', toggleFocusClass('text-focus')]]));
// Event listeners for all h2, h3, and h4 -- End
