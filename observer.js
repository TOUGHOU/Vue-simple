const Observer = function (data) {
  this.data = data
  this.init()
}

Observer.prototype = {
  init: function () {
    this.walk()
  },

  walk: function () {
    Object.keys(this.data).forEach((key) => {
      this.defineReactive(key, this.data[key])
    })
  },

  defineReactive: function (key, val) {
    const dep = new Dep()
    const observeChild = observe(val)

    Object.defineProperty(this.data, key, {
      enumerable: true,
      configurable: true,

      get: function () {
        if (Dep.target) {
          dep.addSub(Dep.target)
        }

        return val
      },

      set: function (newVal) {
        if (newVal === val) {
          return
        }

        val = newVal
        dep.notify()
        observe(newVal)
      }
    })
  }
}

const observe = function (value, vm) {
  if (!value || typeof value !== 'object') {
    return
  }

  return new Observer(value)
}