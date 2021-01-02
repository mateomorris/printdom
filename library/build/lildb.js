let endpoint;
async function runFbFunction(args) {
  if (endpoint) {
    return fetch("http://localhost:5000/lildb-8ff35/us-central1/db/foo").then((response) => response.json()).then((data) => {
      console.log(data);
      return data;
    });
  } else {
    console.error("lildb needs an endpoint");
    return {
      data: null
    };
  }
}
export default {
  connect: (end) => {
    endpoint = end;
  },
  get: async (key) => {
    const {data} = await runFbFunction({
      type: "GET",
      key
    });
    console.log(data);
    return data;
  },
  set: async (key, value) => {
    const {data} = await runFbFunction({
      type: "SET",
      key,
      value
    });
    console.log(data);
    return data;
  },
  update: async (key, value) => {
    const {data} = await fbFunctions({
      type: "UPDATE",
      key,
      value
    });
    return data;
  }
};
