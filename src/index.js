import React from './react'

const root = document.getElementById('root')

const jsx = <div>
  <p>Hello React</p>
  <p>Hi JSX</p>
  <div>
    <span>123</span>
  </div>
</div>

console.log(jsx)

React.render(jsx, root)