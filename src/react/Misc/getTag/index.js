import Component from '../../Component'

function getTag (reactElement) {
  if (typeof reactElement.type === 'string') {
    return 'host_component'
  }

  if (Object.getPrototypeOf(reactElement.type) === Component) {
    return 'class_component'
  }

  return 'function_component'
}

export default getTag
