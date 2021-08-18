import { createDOMElement } from '../../DOM'
import createReactInstance from '../createReactInstance'

function createStateNode (fiber) {
  if (fiber.tag === 'host_component') {
    // 创建对应的dom节点
    return createDOMElement(fiber)
  } else {
    // 组件类型的stateNode，class组件是其实例对象，函数组件就是函数本身
    return createReactInstance(fiber)
  }
}

export default createStateNode
