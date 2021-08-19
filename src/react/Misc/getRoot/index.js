// 根据class组件的fiber对象，向上遍历找到根fiber对象
function getRoot(instance) {
  let fiber = instance.__fiber

  while(fiber.parent){
    fiber = fiber.parent
  }

  return fiber
}

export default getRoot
