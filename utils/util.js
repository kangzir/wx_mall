export  function debounce(func, delay) {
  let timer = 0 //借助闭包
  return function (...args) {
    if (timer) clearTimeout(timer) 
        
    timer = setTimeout(() => {
      func.apply(this, args) //需要把他重新指向debounce函数
    }, delay)
  }
}
