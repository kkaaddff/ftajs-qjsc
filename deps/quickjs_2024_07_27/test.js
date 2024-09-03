// import {performance} from 'os'

// const a = {}
// // for (let i = 0; i < 10000000; i++) {
// // a[i] = i
// }

// const start = new Date().getTime()
// a[1]
// const end = new Date().getTime()
// console.log('cost:', end - start)
// setTimeout(
//     ()=>{
//
//     },
//     100
// )
function fibonacci(n) {
  if (n === 0) return 0
  if (n === 1) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}
console.log(fibonacci(30))

function myFunction() {
  return 'Hello, World!'
}

// 在 JavaScript 环境中直接获取函数名称
console.log(myFunction.name) // 输出: myFunction
