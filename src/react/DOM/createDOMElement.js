import updateDOMElement from './updateDOMElement'

export default function createDOMElement(vDOM) {
  let newElement = null
  if(vDOM.type === 'text') {
    newElement = document.createTextNode(vDOM.props.textContent)
  } else {
    newElement = document.createElement(vDOM.type)
    // 给创建的元素添加属性
    updateDOMElement(newElement, vDOM)
  }

  return newElement
}