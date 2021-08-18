function getTag(reactElement) {
  if(typeof reactElement.type === 'string') {
    return 'host_component'
  }
}

export default getTag
