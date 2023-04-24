export function myThrottle(callback, duration) {
    let okToFire = true
  
    return function (...args) {
      if (okToFire) {
        callback.apply(this, args)
        okToFire = false
  
        setTimeout(function () {
          okToFire = true
        }, duration)
      }
    }
}


export function myDebounce(callback, duration) {
  let timeout;

  return function (...args) {
    const effect = () => {
      timeout = null
      return callback.apply(this, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(effect, duration)
  }
}