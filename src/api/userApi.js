
const URL = " http://localhost:4000";

async function callApi(endpoint, options = {}, token) {
  try {
    options.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: "Bearer " + token,
      };
    }

    let response = await fetch(URL + endpoint, options);
    if (response.ok) {
      return await response.json();
    } else {
      // Convert JSON response to Custom Error
      var error = await response.json();
      console.log(error);
    }
  } catch (ex) {
    console.log(ex)
  }
}

// function getQuery(filters) {
//   let query = "";
//   if (filters) {
//     let esc = encodeURIComponent;
//     query = Object.keys(filters)
//       .map(k => esc(k) + "=" + esc(filters[k] == null ? "" : filters[k]))
//       .join("&");
//   }

//   return query;
// }

const userApi = {
  users: {
    //get
    async getUsers(token, filters) {
      let response = await callApi("/users");
      return response;
    },
    //post
    async postUsers(user) {
      let response = await callApi("/users", {
        method: "POST",
        body: JSON.stringify(user),
      });
      return response;
    },
    //put
    async putUsers(user) {
      let response = await callApi(`/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(user),
      });
      return response;
    },
    //delete
    async deleteUsers(id) {
      let response = await callApi(`/users/${id}`, {
        method: 'DELETE'
      });
      return response;
    },
  }
};

export default userApi;
