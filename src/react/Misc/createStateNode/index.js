import { createDOMElement } from '../../DOM'

function createStateNode (fiber) {
  if (fiber.tag === 'host_component') {
    // 创建对应的dom节点
    return createDOMElement(fiber)
  }
}

export default createStateNode
