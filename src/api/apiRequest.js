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
