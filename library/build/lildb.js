let endpoint;
export default {
  connect: (end) => {
    endpoint = end;
  },
  get: async (key) => {
    return await fetch(`http://localhost:5000/lildb-8ff35/us-central1/db/${endpoint}?key=${key}`).then((response) => response.json());
  },
  set: async (key, value) => {
    return await fetch(`http://localhost:5000/lildb-8ff35/us-central1/db/${endpoint}`, {
      method: "POST",
      body: JSON.stringify({
        key,
        value
      })
    }).then((response) => response.json());
  },
  update: async (key, value) => {
    return await fbFunctions({
      type: "UPDATE",
      key,
      value
    });
  }
};
