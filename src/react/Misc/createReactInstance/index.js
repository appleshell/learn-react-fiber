function createReactInstance (fiber) {
  let instance = null
  if (fiber.tag === 'class_component') {
    return new fiber.type(fiber.props)
  }

  return fiber.type
}

export default createReactInstance
