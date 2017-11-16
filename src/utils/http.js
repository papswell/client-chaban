const API_URL = 'http://localhost:1337';

const encodeParameters = data =>
  Object.keys(data)
    .filter(key => {
      const value = data[key];
      return (
        value !== undefined &&
        value !== null
      );
    })
    .map(key => [key, data[key]].map(encodeURIComponent).join('='))
    .filter(val => !!val)
    .join('&');

const handleResponse = res => {

  if (res.status >= 200 && res.status <= 304) {
    return res.json();
  }

  if (res.status >= 400 && res.status < 500) {
    return res.json()
      .then((json) => {
        throw new Error(json.error);
      });
  }

  throw new Error('Internal server error :(')
};

const config = {
  credentials: 'include',
};

export const search = (query) => {

  let url = API_URL;
  if (query) {
    url = `${url}?${encodeParameters(query)}`;
  }

  return fetch(url, config)
  .then(handleResponse);
}

export const single = (id) => {
  const url = `${API_URL}/${id}`;

  return fetch(url, config)
  .then(handleResponse);
}
