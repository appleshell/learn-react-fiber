export default function createElement (type, props, ...children) {
  const childrenElements = [].concat(...children).reduce((result, child) => {
    if (child !== true && child !== false && child !== null) { // 节点是布尔值，null时，扔掉该节点
      if (child instanceof Object) {
        result.push(child)
      } else {
        result.push(createElement('text', { textContent: child })) // 文本节点也处理成对象
      }
    }
    return result
  }, [])
  return {
    type,
    props: {...props, children: childrenElements},
  }
}