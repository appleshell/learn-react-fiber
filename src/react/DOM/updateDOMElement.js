export default function updateDOMElement (element, vDOM, oldVirtualDOM = {}) {
  // 从虚拟DOM对象中获取prop对象，遍历对象，把每个属性添加到DOM元素上
  const props = vDOM.props
  const oldProps = oldVirtualDOM.props || {}

  if (vDOM.type === 'text') {
    if (props.textContent !== oldProps.textContent) {
      if (vDOM.parent.type !== oldVirtualDOM.parent.type) {
        // 如果文本节点的父级类型发生了变化
        vDOM.parent.stateNode.appendChild(
          document.createTextNode(props.textContent),
        )
      } else {

        vDOM.parent.stateNode.replaceChild(
          document.createTextNode(props.textContent),
          oldVirtualDOM.stateNode
        )
      }
    }
    return
  }

  Object.keys(props).forEach(key => {
    const propValue = props[key]
    const oldPropValue = oldProps[key]

    if (propValue !== oldPropValue) {
      // 事件属性
      if (key.startsWith('on')) {
        const eventName = key.toLowerCase().slice(2)
        element.addEventListener(eventName, propValue)

        if (oldPropValue) { // 删除原有的事件监听函数
          element.removeEventListener(eventName, oldPropValue)
        }
      } else if (key === 'value' || key === 'checked') {
        // value 和 checked 属性，不用能setAttribute方法设置
        element[key] = propValue

        // 排除children
      } else if (key !== 'children') {
        // 处理class
        if (key === 'className') {
          element.setAttribute('class', props[key])
        } else {
          element.setAttribute(key, props[key])
        }
      }
    }

  })

  // 判断时候有属性被删除，即oldPropValue中存在，而propValue中不存在的属性
  Object.keys(oldProps).forEach(propName => {
    const newPropValue = props[propName]

    if (!newPropValue) {
      if (propName.startsWith('on')) {
        const eventName = propName.toLowerCase().slice(2)
        element.removeEventListener(eventName, oldProps[propName])
      } else if (propName !== 'children') {
        element.removeAttribute(propName)
      }
    }
  })

}