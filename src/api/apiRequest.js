const token =
  "b22230c8af120a1eb792677da7fbb4565deca1ab57339c7b1e064c4fcb332e0d";

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
      console.log(response);
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
