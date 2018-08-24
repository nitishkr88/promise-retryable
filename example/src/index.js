import retry from '../../es/index'

const sleep = (ms = 0) => new Promise(r => setTimeout(r, ms))

const random = () => Math.ceil(Math.random() * 10)

let p = () =>
  sleep(2000).then(() => {
    let n = random()
    // randomizing Promise resolution and rejection
    if (n === 4 || n === 7 || n === 2) {
      return Promise.resolve('resolved')
    } else return Promise.reject('rejected')
  })

retry(p).then(
  value => console.log('value', value),
  reason => console.log('reason', reason)
)

// override default values
retry(2000, 15000, 2)(p).then(
  value => console.log('value', value),
  reason => console.log('reason', reason)
)
