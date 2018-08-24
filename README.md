# promise-retryable

---

[![Build Status](https://travis-ci.org/nitishkr88/promise-retryable.svg?branch=master)](https://travis-ci.org/nitishkr88/promise-retryable)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Retries a function which returns a promise, with configurable backoff and attempts.

## Installation

```
npm install promise-retryable

yarn add promise-retryable
```

## Usage

- With default settings

  ```javascript
  import retry from promise-retyable

  const fn = () => fetch('http://someurl')
  retry(fn).then((value) => {
    // fulfillment
  }, (reason) => {
    // rejection
  })
  ```

- With user defined settings

  ```javascript
  import retry from promise-retyable

  const fn = () => fetch('http://someurl')

  /**
   default values:
   minWait = 1000,
   maxWait = 30000,
   attempts = 4
  **/

  const minWait = 2000,
        maxWait = 10000,
        attempts = 5

  retry(minWait, maxWait, attempts)(fn).then((value) => {
    // fulfillment
  }, (reason) => {
    // rejection
  })
  ```

You can also inject a backoff function as the last argument with the following signature.

```javascript
function customBackoff(attemptNum, min, max) {
  // calculate sleepInterval based on the arguments
  return sleepInterval
}

retry(minWait, maxWait, attempts, customBackoff)(fn).then(
  value => {
    // fulfillment
  },
  reason => {
    // rejection
  }
)
```

The default implementation backs off in multiple of 2 with max time capped at maxWait provided.

*Refer **example** folder for more details*

---
## License

MIT. See `LICENSE`