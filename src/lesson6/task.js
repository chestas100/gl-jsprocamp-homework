import fetch from 'isomorphic-fetch';

// с помощью Fetch API и swapi.co API получить следующие данные
const baseUrl = 'https://swapi.co/api';

function getArrayOfNameByUrls(arrOfUrl) {
  const promises = arrOfUrl
    .map(url => fetch(url)
      .then(data => data.json()
        .then(person => person.name)));

  return Promise.all(promises).then(arrOfName => arrOfName);
}

function dataResolver(data) {
  if (data.count === 1) {
    return { status: true, data: data.results[0] };
  } else if (data.count === 0) {
    return { status: false, data: 'Found nothing' };
  }
  return { status: false, data: 'There are more than one results, try to give more information' };
}

// Климат на любой планете по её имени
// {planetName} – String
const getClimate = function getClimate(planetName) {
  return fetch(`${baseUrl}/planets/?search=${planetName}`).then(res => res.json().then(data => {
    const resolvedData = dataResolver(data);
    return resolvedData.status ? resolvedData.data.climate : resolvedData.data;
  })).catch(err => {
    throw new Error(err);
  });
};

// Получить информацию (Object) о любом персонаже по имени
// {name} – String
const getProfile = function getProfile(name) {
  return fetch(`${baseUrl}/people/?search=${name}`).then(res => res.json().then(data => {
    const resolvedData = dataResolver(data);
    return resolvedData.data;
  })).catch(err => {
    throw new Error(err);
  });
};

// Получить список пилотов (имена в виде Array of Strings) космического корабля
// по его названию
// {starshipName} - String
const getPilots = function getPilots(starshipName) {
  return fetch(`${baseUrl}/starships/?search=${starshipName}`).then(res => res.json().then(data => {
    const resolvedData = dataResolver(data);
    return resolvedData.status ? getArrayOfNameByUrls(resolvedData.data.pilots) : resolvedData.data;
  })).catch(err => {
    throw new Error(err);
  });
};


export default {
  getClimate,
  getProfile,
  getPilots,
};
