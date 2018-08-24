import invariant from 'invariant'

// default retry configuration
const _defaultRetryWaitMin = 1000
const _defaultRetryWaitMax = 30000
const _defaultRetryMax = 4

const _defaultBackoff = (attemptNum, min, max) => {
  let sleepInterval = Math.pow(2, attemptNum) * min
  if (sleepInterval > max) {
    sleepInterval = max
  }
  return sleepInterval
}

const _sleep = (ms = 0) => new Promise(r => setTimeout(r, ms))

const _resolveWithDelay = (p, ms = 0, attempt) =>
  _sleep(ms)
    .then(p)
    .then(value => ({ value, attempt }))

const _retry = (
  min = _defaultRetryWaitMin,
  max = _defaultRetryWaitMax,
  attempts = _defaultRetryMax,
  backoff = _defaultBackoff
) => fn => {
  invariant(
    typeof fn === 'function',
    'You need to provide a function returning a Promise'
  )
  let ps = new Array(attempts)
  ps.fill(fn)

  return ps.reduce(
    (p, next, i, arr) =>
      p.then(
        value => {
          if (i === 0) return next()
          arr.splice(1)
          return value
        },
        reason => _resolveWithDelay(next, backoff(i + 1, min, max), i + 1)
      ),
    Promise.resolve()
  )
}

const retry = (...args) => {
  if (args.length === 1) {
    invariant(
      typeof args[0] === 'function',
      'You need to provide a function returning a Promise'
    )
    return _retry()(args[0])
  }
  return _retry(...args)
}

export default retry
