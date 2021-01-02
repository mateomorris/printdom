let endpoint
async function runFbFunction(args) {
  if (endpoint) {
    // return await fbFunctions({ ...args, endpoint })
    // const foo = await fetch('http://localhost:5000/lildb-8ff35/us-central1/db', args)
    return fetch(`http://localhost:5000/lildb-8ff35/us-central1/db/foo?endpoint=${endpoint}&key=${args.key}`, {
      method: 'GET',
      // body: JSON.stringify(args)
    })
      .then(response => response.json())
  } else {
    console.error('lildb needs an endpoint')
    return {
      data: null
    }
  }
}

// an api to modify, get, and set data

export default {
  connect: (end) => {
    endpoint = end
  }, 
  get: async (key) => {
    return await fetch(`http://localhost:5000/lildb-8ff35/us-central1/db/foo?endpoint=${endpoint}&key=${key}`)
    .then(response => response.json())
  },
  set: async (key, value) => {
    return await runFbFunction({ type: 'SET', key, value })
  },
  update: async (key, value) => {
    return await fbFunctions({ type: 'UPDATE', key, value })
  }
}

