/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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


function createStateNode(fiber) {
  if (fiber.tag === 'host_component') {
    // 创建对应的dom节点
    return (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.createDOMElement)(fiber);
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
function getTag(reactElement) {
  if (typeof reactElement.type === 'string') {
    return 'host_component';
  }
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  createElement: _createElement__WEBPACK_IMPORTED_MODULE_0__.default,
  render: _reconciliation__WEBPACK_IMPORTED_MODULE_1__.render
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
/* harmony import */ var _Misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Misc */ "./src/react/Misc/index.js");

/**
 * 1. 向任务队列中添加任务
 * 2. 指定在浏览器空闲时执行任务
 * 
 * 任务是指通过vdom对象构建fiber对象
*/

var taskQueue = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.createTaskQueue)();
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
    child: null
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
  reconcileChildren(fiber, fiber.props.children); // 第一次执行完，就构建完fiberroot以及第一层子节点
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
    } // 如果没有兄弟节点，就回到节点的父节点。进入下一轮while循环，看该父节点是否有兄弟节点


    currentFiber = currentFiber.parent;
  }

  pendingCommit = currentFiber;
  console.log(fiber);
}; // 创建fiber节点，构建fiber节点之间的关系，最终生成fiber树


var reconcileChildren = function reconcileChildren(fiber, children) {
  // 将children转换成数组
  var arrifiedChildren = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.arrified)(children); // 循环子元素，构建子元素对应的fiber对象

  var index = 0;
  var elementLength = arrifiedChildren.length;
  var element = null;
  var newFiber = null;
  var prevFiber = null;

  while (index < elementLength) {
    element = arrifiedChildren[index];
    newFiber = {
      type: element.type,
      props: element.props,
      tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.getTag)(element),
      effects: [],
      effectTag: 'placement',
      // 当前节点的操作类型
      stateNode: null,
      parent: fiber
    };
    newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.createStateNode)(newFiber); // 如果是第一个子节点，就设置为父节点的子节点；剩余的子节点，设置为第一个子节点的兄弟节点

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevFiber.sibling = newFiber;
    }

    prevFiber = newFiber;
    index++;
  }
};

var commitAllWork = function commitAllWork(fiber) {
  console.log(fiber.effects);
  fiber.effects.forEach(function (item) {
    if (item.effectTag === 'placement') {
      item.parent.stateNode.appendChild(item.stateNode);
    }
  });
};

var render = function render(element, container) {
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

var root = document.getElementById('root');
var jsx = /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", null, "Hello React"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", null, "Hi JSX"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "123")));
console.log(jsx);
_react__WEBPACK_IMPORTED_MODULE_0__.default.render(jsx, root);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map