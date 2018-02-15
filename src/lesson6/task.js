import fetch from 'isomorphic-fetch';

// с помощью Fetch API и swapi.co API получить следующие данные
const baseUrl = 'https://swapi.co/api';

async function getUserNameByUrl(url) {
  const data = await (await fetch(url)).json();
  return data.name;
}

async function getArrayOfNameByUrls(arrOfUrl) {
  const arrOfName = [];
  await Promise.all(arrOfUrl.map(async url => {
    arrOfName.push(await getUserNameByUrl(url));
  }));
  return arrOfName;
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
const getClimate = async function getClimate(planetName) {
  const planetRes = await fetch(`${baseUrl}/planets/?search=${planetName}`).catch(err => {
    throw new Error(err);
  });
  const data = await planetRes.json();
  const resolvedData = await dataResolver(data);
  return resolvedData.status ? resolvedData.data.climate : resolvedData.data;
};

// Получить информацию (Object) о любом персонаже по имени
// {name} – String
const getProfile = async function getProfile(name) {
  const profileRes = await fetch(`${baseUrl}/people/?search=${name}`).catch(err => {
    throw new Error(err);
  });
  const data = await profileRes.json();
  const resolvedData = await dataResolver(data);
  return resolvedData.data;
};

// Получить список пилотов (имена в виде Array of Strings) космического корабля
// по его названию
// {starshipName} - String
const getPilots = async function getPilots(starshipName) {
  const starshipRes = await fetch(`${baseUrl}/starships/?search=${starshipName}`).catch(err => {
    throw new Error(err);
  });
  const data = await starshipRes.json();
  const resolvedData = await dataResolver(data);
  return resolvedData.status ? getArrayOfNameByUrls(resolvedData.data.pilots) : resolvedData.data;
};


export default {
  getClimate,
  getProfile,
  getPilots,
};
