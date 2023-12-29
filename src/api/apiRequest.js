// const token =
//   "b22230c8af120a1eb792677da7fbb4565deca1ab57339c7b1e064c4fcb332e0d";

// const token =
//   "ee78ffadcf0f6bb516de34557a8794f10116616bc1d73922697cc9a2deb2dad6";
const token =
  "220c707e00c0a9217b65348e57de71282ecf8a42d49d2b53bd4763d801a6b678";

export const apiRequest = async (
  url,
  body = null,
  method = "GET",
  httpErrors = {}
) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  let fetchOptions = { method, headers };
  if (method !== "GET" && body) {
    if (!(body instanceof FormData)) {
      console.log("foramdata");
      headers.append("Content-Type", "application/json");
      fetchOptions.body = JSON.stringify(body);
    } else {
      fetchOptions.body = body;
    }
  }

  try {
    const response = await fetch(url, fetchOptions);

    if (response.ok) {
      // console.log(response);
    }

    if (!response.ok) {
      const error =
        httpErrors[response.status] || `HTTP error! status: ${response.status}`;
      throw new Error(error);
    }

    return body instanceof FormData ? response : response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};
