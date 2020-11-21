import { put, takeEvery, all } from 'redux-saga/effects';

import API from '@/utils/API';
import { actionKeys, asyncActionMaps } from '@/sagas/movie-details/movie-details.actions';

// workers
function* getDetailsSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { request } = payload;
  const { movieId, lng } = request;

  yield put(actions.start(request));
  try {
    const data = yield API.fetch({
      url: `/movie/${movieId}`,
      params: { lng }
    });
    yield put(actions.success(data));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* getCreditsSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { request } = payload;
  const { movieId, lng } = request;

  yield put(actions.start(request));
  try {
    const data = yield API.fetch({
      url: `/movie/${movieId}/credits`,
      params: { lng }
    });
    yield put(actions.success(data));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* getVideosSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { request } = payload;
  const { movieId, lng } = request;

  yield put(actions.start(request));
  try {
    const data = yield API.fetch({
      url: `/movie/${movieId}/videos`,
      params: { lng }
    });
    yield put(actions.success(data.results));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* getImagesSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { request } = payload;
  const { movieId } = request;

  yield put(actions.start(request));
  try {
    const data = yield API.fetch({
      url: `/movie/${movieId}/images`,
      params: { lng: null }
    });
    yield put(actions.success(data.backdrops));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* getRecommsSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { request } = payload;
  const { movieId, lng } = request;

  yield put(actions.start(request));
  try {
    const data = yield API.fetch({
      url: `/movie/${movieId}/recommendations`,
      params: { page: 1, lng }
    });
    yield put(actions.success(data));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* resetMovieDetailsSaga({ payload }) {
  const { resetList } = payload;
  let actions;

  /* eslint-disable no-restricted-syntax */
  for (const item of resetList) {
    actions = asyncActionMaps[item];
    try {
      yield put(actions.reset());
    } catch (error) {
      yield put(actions.fail(error.message));
    }
  }
  /* eslint-enable no-restricted-syntax */
}

// watchers
export default function* watchMovieDetails() {
  yield all([
    takeEvery(actionKeys.MOVIE_DETAILS, getDetailsSaga),
    takeEvery(actionKeys.MOVIE_CREDITS, getCreditsSaga),
    takeEvery(actionKeys.MOVIE_VIDEOS, getVideosSaga),
    takeEvery(actionKeys.MOVIE_IMAGES, getImagesSaga),
    takeEvery(actionKeys.MOVIE_RECOMMS, getRecommsSaga),
    takeEvery(actionKeys.MOVIE_RESET_ALL, resetMovieDetailsSaga)
  ]);
}