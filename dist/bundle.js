/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/react/Component/index.js":
/*!**************************************!*\
  !*** ./src/react/Component/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function Component(props) {
  _classCallCheck(this, Component);

  this.props = props;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);

/***/ }),

/***/ "./src/react/DOM/createDOMElement.js":
/*!*******************************************!*\
  !*** ./src/react/DOM/createDOMElement.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createDOMElement)
/* harmony export */ });
/* harmony import */ var _updateDOMElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateDOMElement */ "./src/react/DOM/updateDOMElement.js");

function createDOMElement(vDOM) {
  var newElement = null;

  if (vDOM.type === 'text') {
    newElement = document.createTextNode(vDOM.props.textContent);
  } else {
    newElement = document.createElement(vDOM.type); // 给创建的元素添加属性

    (0,_updateDOMElement__WEBPACK_IMPORTED_MODULE_0__.default)(newElement, vDOM);
  }

  return newElement;
}

/***/ }),

/***/ "./src/react/DOM/index.js":
/*!********************************!*\
  !*** ./src/react/DOM/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDOMElement": () => (/* reexport safe */ _createDOMElement__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "updateDOMElement": () => (/* reexport safe */ _updateDOMElement__WEBPACK_IMPORTED_MODULE_1__.default)
/* harmony export */ });
/* harmony import */ var _createDOMElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createDOMElement */ "./src/react/DOM/createDOMElement.js");
/* harmony import */ var _updateDOMElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateDOMElement */ "./src/react/DOM/updateDOMElement.js");



/***/ }),

/***/ "./src/react/DOM/updateDOMElement.js":
/*!*******************************************!*\
  !*** ./src/react/DOM/updateDOMElement.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateDOMElement)
/* harmony export */ });
function updateDOMElement(element, vDOM) {
  var oldVirtualDOM = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // 从虚拟DOM对象中获取prop对象，遍历对象，把每个属性添加到DOM元素上
  var props = vDOM.props;
  var oldProps = oldVirtualDOM.props || {};

  if (vDOM.type === 'text') {
    if (props.textContent !== oldProps.textContent) {
      if (vDOM.parent.type !== oldVirtualDOM.parent.type) {
        // 如果文本节点的父级类型发生了变化
        vDOM.parent.stateNode.appendChild(document.createTextNode(props.textContent));
      } else {
        vDOM.parent.stateNode.replaceChild(document.createTextNode(props.textContent), oldVirtualDOM.stateNode);
      }
    }

    return;
  }

  Object.keys(props).forEach(function (key) {
    var propValue = props[key];
    var oldPropValue = oldProps[key];

    if (propValue !== oldPropValue) {
      // 事件属性
      if (key.startsWith('on')) {
        var eventName = key.toLowerCase().slice(2);
        element.addEventListener(eventName, propValue);

        if (oldPropValue) {
          // 删除原有的事件监听函数
          element.removeEventListener(eventName, oldPropValue);
        }
      } else if (key === 'value' || key === 'checked') {
        // value 和 checked 属性，不用能setAttribute方法设置
        element[key] = propValue; // 排除children
      } else if (key !== 'children') {
        // 处理class
        if (key === 'className') {
          element.setAttribute('class', props[key]);
        } else {
          element.setAttribute(key, props[key]);
        }
      }
    }
  }); // 判断时候有属性被删除，即oldPropValue中存在，而propValue中不存在的属性

  Object.keys(oldProps).forEach(function (propName) {
    var newPropValue = props[propName];

    if (!newPropValue) {
      if (propName.startsWith('on')) {
        var eventName = propName.toLowerCase().slice(2);
        element.removeEventListener(eventName, oldProps[propName]);
      } else if (propName !== 'children') {
        element.removeAttribute(propName);
      }
    }
  });
}

/***/ }),

/***/ "./src/react/Misc/arrified/index.js":
/*!******************************************!*\
  !*** ./src/react/Misc/arrified/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var arrified = function arrified(arg) {
  return Array.isArray(arg) ? arg : [arg];
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrified);

/***/ }),

/***/ "./src/react/Misc/createReactInstance/index.js":
/*!*****************************************************!*\
  !*** ./src/react/Misc/createReactInstance/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function createReactInstance(fiber) {
  var instance = null;

  if (fiber.tag === 'class_component') {
    return new fiber.type(fiber.props);
  }

  return fiber.type;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createReactInstance);

/***/ }),

/***/ "./src/react/Misc/createStateNode/index.js":
/*!*************************************************!*\
  !*** ./src/react/Misc/createStateNode/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../DOM */ "./src/react/DOM/index.js");
/* harmony import */ var _createReactInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../createReactInstance */ "./src/react/Misc/createReactInstance/index.js");



function createStateNode(fiber) {
  if (fiber.tag === 'host_component') {
    // 创建对应的dom节点
    return (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.createDOMElement)(fiber);
  } else {
    // 组件类型的stateNode，class组件是其实例对象，函数组件就是函数本身
    return (0,_createReactInstance__WEBPACK_IMPORTED_MODULE_1__.default)(fiber);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createStateNode);

/***/ }),

/***/ "./src/react/Misc/createTaskQueue/index.js":
/*!*************************************************!*\
  !*** ./src/react/Misc/createTaskQueue/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * 管理任务队列
*/
var createTaskQueue = function createTaskQueue() {
  var taskQueue = [];
  return {
    push: function push(item) {
      return taskQueue.push(item);
    },
    pop: function pop() {
      return taskQueue.shift();
    },
    isEmpty: taskQueue.length === 0
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createTaskQueue);

/***/ }),

/***/ "./src/react/Misc/getTag/index.js":
/*!****************************************!*\
  !*** ./src/react/Misc/getTag/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Component */ "./src/react/Component/index.js");


function getTag(reactElement) {
  if (typeof reactElement.type === 'string') {
    return 'host_component';
  }

  if (Object.getPrototypeOf(reactElement.type) === _Component__WEBPACK_IMPORTED_MODULE_0__.default) {
    return 'class_component';
  }

  return 'function_component';
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTag);

/***/ }),

/***/ "./src/react/Misc/index.js":
/*!*********************************!*\
  !*** ./src/react/Misc/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTaskQueue": () => (/* reexport safe */ _createTaskQueue__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "arrified": () => (/* reexport safe */ _arrified__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "createStateNode": () => (/* reexport safe */ _createStateNode__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "getTag": () => (/* reexport safe */ _getTag__WEBPACK_IMPORTED_MODULE_3__.default)
/* harmony export */ });
/* harmony import */ var _createTaskQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createTaskQueue */ "./src/react/Misc/createTaskQueue/index.js");
/* harmony import */ var _arrified__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrified */ "./src/react/Misc/arrified/index.js");
/* harmony import */ var _createStateNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createStateNode */ "./src/react/Misc/createStateNode/index.js");
/* harmony import */ var _getTag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getTag */ "./src/react/Misc/getTag/index.js");





/***/ }),

/***/ "./src/react/createElement/index.js":
/*!******************************************!*\
  !*** ./src/react/createElement/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createElement)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createElement(type, props) {
  var _ref;

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  var childrenElements = (_ref = []).concat.apply(_ref, children).reduce(function (result, child) {
    if (child !== true && child !== false && child !== null) {
      // 节点是布尔值，null时，扔掉该节点
      if (child instanceof Object) {
        result.push(child);
      } else {
        result.push(createElement('text', {
          textContent: child
        })); // 文本节点也处理成对象
      }
    }

    return result;
  }, []);

  return {
    type: type,
    props: _objectSpread(_objectSpread({}, props), {}, {
      children: childrenElements
    })
  };
}

/***/ }),

/***/ "./src/react/index.js":
/*!****************************!*\
  !*** ./src/react/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ "./src/react/createElement/index.js");
/* harmony import */ var _reconciliation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reconciliation */ "./src/react/reconciliation/index.js");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Component */ "./src/react/Component/index.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  createElement: _createElement__WEBPACK_IMPORTED_MODULE_0__.default,
  render: _reconciliation__WEBPACK_IMPORTED_MODULE_1__.render,
  Component: _Component__WEBPACK_IMPORTED_MODULE_2__.default
});

/***/ }),

/***/ "./src/react/reconciliation/index.js":
/*!*******************************************!*\
  !*** ./src/react/reconciliation/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DOM */ "./src/react/DOM/index.js");
/* harmony import */ var _Misc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Misc */ "./src/react/Misc/index.js");


/**
 * 1. 向任务队列中添加任务
 * 2. 指定在浏览器空闲时执行任务
 * 
 * 任务是指通过vdom对象构建fiber对象
*/

var taskQueue = (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.createTaskQueue)();
var subTask = null;
var pendingCommit = null; // 用来存放render阶段生成的effects

var getFirstTask = function getFirstTask() {
  // 从任务队列中获取任务
  var task = taskQueue.pop(); // 返回最外层节点的fiber对象

  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null,
    alternate: task.dom.__rootFiberContainer
  };
};

var performTask = function performTask(deadline) {
  workLoop(deadline); // 任务中断后，如果任务还未执行完，或者任务队列中还有未执行的任务，就告诉浏览器空闲时继续执行任务

  if (subTask || !taskQueue.isEmpty) {
    requestIdleCallback(performTask);
  }
};

var workLoop = function workLoop(deadline) {
  if (!subTask) {
    subTask = getFirstTask();
  } // console.log(deadline.timeRemaining)


  while (subTask && deadline.timeRemaining() > 1) {
    subTask = excuteTask(subTask); // 执行完一个子任务，要返回下一个子任务
  } // 进入commit阶段，传入第一阶段的结果


  if (pendingCommit) {
    commitAllWork(pendingCommit);
  }
}; // render阶段，遍历fiber，获取effects


var excuteTask = function excuteTask(fiber) {
  if (fiber.tag === 'class_component') {
    // class组件，第二个参数是render方法的返回值
    reconcileChildren(fiber, fiber.stateNode.render());
  } else if (fiber.tag === 'function_component') {
    // 函数组件
    reconcileChildren(fiber, fiber.stateNode(fiber.props));
  } else {
    // 原生节点
    reconcileChildren(fiber, fiber.props.children);
  } // 第一次执行完，就构建完fiberroot以及第一层子节点
  // 此时相当于处理完根节点的任务，如果根节点有子节点，就将其返回，作为下一次处理的任务，即构建子节点的子节点
  // 下面代码就是fiber树的处理过程，深度遍历，先处理子节点，再处理子节点的兄弟节点，兄弟节点处理完（子节点处理完），就返回父节点，直到回到根节点


  if (fiber.child) {
    return fiber.child;
  }

  var currentFiber = fiber;

  while (currentFiber.parent) {
    // 父节点收集子节点的effects，effect就是fiber节点本身
    currentFiber.parent.effects = currentFiber.parent.effects.concat(currentFiber.effects.concat([currentFiber])); // 如果当前节点有兄弟节点，就返回兄弟节点，进行处理

    if (currentFiber.sibling) {
      return currentFiber.sibling;
    } // 如果没有兄弟节点，就回到节点的父节点。进入下一轮while循环，看该父节点是否有兄弟节点。直到回到根节点


    currentFiber = currentFiber.parent;
  }

  pendingCommit = currentFiber; // console.log(fiber)
}; // 创建fiber节点，构建fiber节点之间的关系，最终生成fiber树


var reconcileChildren = function reconcileChildren(fiber, children) {
  // 将children转换成数组
  var arrifiedChildren = (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.arrified)(children); // 循环子元素，构建子元素对应的fiber对象

  var index = 0;
  var elementLength = arrifiedChildren.length;
  var element = null;
  var newFiber = null;
  var prevFiber = null;
  var alternate = null; // 创建节点时，如果存在老的节点，就把老的节点也找出来，添加到对应的新节点上

  if (fiber.alternate && fiber.alternate.child) {
    alternate = fiber.alternate.child; // 第一个备份子节点
  }

  while (index < elementLength) {
    element = arrifiedChildren[index]; // element是子节点的ReactElement对象

    if (element && alternate) {
      // 新节点和老节点都存在，执行更新操作
      newFiber = {
        type: element.type,
        props: element.props,
        tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.getTag)(element),
        effects: [],
        effectTag: 'update',
        // 当前节点的操作类型
        stateNode: null,
        parent: fiber,
        alternate: alternate
      };

      if (element.type === alternate.type) {
        // 如果新老节点类型相同, 不需要创建stateNode，复用老的stateNode
        newFiber.stateNode = alternate.stateNode;
      } else {
        // 新老节点不同，stateNode创建不需要diff，直接创建新stateNode替换老stateNode
        newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.createStateNode)(newFiber);
      }
    } else if (element && !alternate) {
      // 初次渲染
      newFiber = {
        type: element.type,
        props: element.props,
        tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.getTag)(element),
        effects: [],
        effectTag: 'placement',
        // 当前节点的操作类型
        stateNode: null,
        parent: fiber
      };
      newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.createStateNode)(newFiber);
    }

    console.log(newFiber); // 如果是第一个子节点，就设置为父节点的子节点；剩余的子节点，设置为第一个子节点的兄弟节点

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevFiber.sibling = newFiber;
    } // 第一个子节点备份好后，备份其他子节点


    if (alternate && alternate.sibling) {
      alternate = alternate.sibling;
    } else {
      alternate = null;
    }

    prevFiber = newFiber;
    index++;
  }
}; // 传递的参数就是整个fiber树的根节点


var commitAllWork = function commitAllWork(fiber) {
  // console.log(fiber.effects)
  fiber.effects.forEach(function (item) {
    if (item.effectTag === 'update') {
      if (item.type === item.alternate.type) {
        // 如果新老fiber节点的类型相同，复用DOM节点，只需更新DOM节点的属性
        (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.updateDOMElement)(item.stateNode, item, item.alternate);
      } else {
        // 如果新老fiber节点的类型不相同，就用新的stateNode替换老的DOM
        item.parent.stateNode.replaceChild(item.stateNode, item.alternate.stateNode);
      }
    } else if (item.effectTag === 'placement') {
      var _fiber = item;
      var parentFiber = _fiber.parent; // class和函数组件上不能添加DOM节点，需要找到当前节点最近的一个原生类型的父节点，然后挂载DOM

      while (parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component') {
        parentFiber = parentFiber.parent;
      }

      if (_fiber.tag === 'host_component') {
        parentFiber.stateNode.appendChild(_fiber.stateNode);
      }
    }
  }); // 首次渲染完成后，备份旧的fiber节点对象，备份到fiberroot对应的DOM节点上

  fiber.stateNode.__rootFiberContainer = fiber;
};

var render = function render(element, container) {
  console.log(element);
  taskQueue.push({
    dom: container,
    props: {
      children: element
    }
  }); // 在浏览器空闲时间执行任务

  requestIdleCallback(performTask);
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react */ "./src/react/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var root = document.getElementById('root');
var jsx = /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", null, "Hello React"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", null, "Hi JSX"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "123")));
console.log(jsx);
_react__WEBPACK_IMPORTED_MODULE_0__.default.render(jsx, root);
setTimeout(function () {
  var jsx = /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "Hello UUUUUUUUpdate"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", null, "Hi JSX"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "123")));
  _react__WEBPACK_IMPORTED_MODULE_0__.default.render(jsx, root);
}, 5000);

var Greating = /*#__PURE__*/function (_React$Component) {
  _inherits(Greating, _React$Component);

  var _super = _createSuper(Greating);

  function Greating(props) {
    _classCallCheck(this, Greating);

    return _super.call(this, props);
  }

  _createClass(Greating, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "classssss", /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", null, this.props.title));
    }
  }]);

  return Greating;
}(_react__WEBPACK_IMPORTED_MODULE_0__.default.Component); // React.render(<Greating title='good!' />, root)


function Hello(_ref) {
  var title = _ref.title;
  return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "hello fnCom", /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", null, title));
} // React.render(<Hello title="good!" />, root)
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map