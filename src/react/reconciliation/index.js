import { createTaskQueue, arrified, createStateNode, getTag } from "../Misc"

/**
 * 1. 向任务队列中添加任务
 * 2. 指定在浏览器空闲时执行任务
 * 
 * 任务是指通过vdom对象构建fiber对象
*/
const taskQueue = createTaskQueue()
let subTask = null

let pendingCommit = null // 用来存放render阶段生成的effects

const getFirstTask = () => {
  // 从任务队列中获取任务
  const task = taskQueue.pop()
  // 返回最外层节点的fiber对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null
  }
}

const performTask = deadline => {
  workLoop(deadline)

  // 任务中断后，如果任务还未执行完，或者任务队列中还有未执行的任务，就告诉浏览器空闲时继续执行任务
  if(subTask || !taskQueue.isEmpty) {
    requestIdleCallback(performTask)
  }
}

const workLoop = deadline => {
  if(!subTask) {
    subTask = getFirstTask()
  }
  // console.log(deadline.timeRemaining)
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = excuteTask(subTask) // 执行完一个子任务，要返回下一个子任务
  }

  // 进入commit阶段，传入第一阶段的结果
  if(pendingCommit) {
    commitAllWork(pendingCommit)
  }
}

// render阶段，遍历fiber，获取effects
const excuteTask = fiber => {
  reconcileChildren(fiber, fiber.props.children)
  // 第一次执行完，就构建完fiberroot以及第一层子节点
  // 此时相当于处理完根节点的任务，如果根节点有子节点，就将其返回，作为下一次处理的任务，即构建子节点的子节点

  // 下面代码就是fiber树的处理过程，深度遍历，先处理子节点，再处理子节点的兄弟节点，兄弟节点处理完（子节点处理完），就返回父节点，直到回到根节点
  if(fiber.child) {
    return fiber.child
  }

  let currentFiber = fiber

  while (currentFiber.parent) {
    // 父节点收集子节点的effects，effect就是fiber节点本身
    currentFiber.parent.effects = currentFiber.parent.effects.concat(
      currentFiber.effects.concat([currentFiber])
    )
    // 如果当前节点有兄弟节点，就返回兄弟节点，进行处理
    if(currentFiber.sibling) {
      return currentFiber.sibling
    }
    // 如果没有兄弟节点，就回到节点的父节点。进入下一轮while循环，看该父节点是否有兄弟节点
    currentFiber = currentFiber.parent
  }

  pendingCommit = currentFiber
  console.log(fiber)
}

// 创建fiber节点，构建fiber节点之间的关系，最终生成fiber树
const reconcileChildren = (fiber, children) => {
  // 将children转换成数组
  const arrifiedChildren = arrified(children)
  // 循环子元素，构建子元素对应的fiber对象
  let index = 0
  let elementLength = arrifiedChildren.length
  let element = null
  let newFiber = null
  let prevFiber = null

  while (index < elementLength) {
    element = arrifiedChildren[index]
    newFiber = {
      type: element.type,
      props: element.props,
      tag: getTag(element),
      effects: [],
      effectTag: 'placement', // 当前节点的操作类型
      stateNode: null,
      parent: fiber
    }

    newFiber.stateNode = createStateNode(newFiber)

    // 如果是第一个子节点，就设置为父节点的子节点；剩余的子节点，设置为第一个子节点的兄弟节点
    if(index === 0) {
      fiber.child = newFiber
    } else {
      prevFiber.sibling = newFiber
    }

    prevFiber = newFiber
    index++
  }
}

const commitAllWork = fiber => {
  console.log(fiber.effects)
  fiber.effects.forEach(item => {
    if(item.effectTag === 'placement') {
      item.parent.stateNode.appendChild(item.stateNode)
    }
  })
}

export const render = (element, container) => {

  taskQueue.push({
    dom: container,
    props: {
      children: element
    }
  })

  // 在浏览器空闲时间执行任务
  requestIdleCallback(performTask)
}