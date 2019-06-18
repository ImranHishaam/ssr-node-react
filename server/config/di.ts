'use strict';

const axios = require('axios');
const _ = require('lodash');
const config = require('../config/configs');
const serviceLocator = require('../libs/ServiceLocator');
const NodeCache = require("node-cache");

const appCache = new NodeCache();

serviceLocator.register('movieSearchService', () => {

  const MovieSearchService = require('../api/services/MovieSearchService');

  return new MovieSearchService(axios, _, config, appCache);
});

serviceLocator.register('cacheController', () => {

  const CacheController = require('../api/controllers/CacheController');

  return new CacheController(appCache);
});

serviceLocator.register('movieController', () => {

  const movieSearchService = serviceLocator.get('movieSearchService');
  const MovieController = require('../api/controllers/MovieController');

  return new MovieController(movieSearchService, appCache);
});

module.exports = serviceLocator;