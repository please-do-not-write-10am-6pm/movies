import ApiService from 'app_services/ApiMovies.service';

import {
  MOVIES_LIST_IS_LOADING,
  MOVIES_LIST_LOADING_SUCCESS,
  MOVIES_LIST_LOADING_ERROR,
  MOVIES_FILTER_UPDATED
} from './movies-list.constants';

function setMoviesFilter(filter) {
  return {
    type: MOVIES_FILTER_UPDATED,
    filter
  };
}

function setError(hasErrors) {
  return {
    type: MOVIES_LIST_LOADING_ERROR,
    isLoading: false,
    hasErrors
  };
}

function setSucces(data) {
  return {
    type: MOVIES_LIST_LOADING_SUCCESS,
    listWasFetched: true,
    isLoading: false,
    hasErrors: false,
    data
  };
}

function setLoading(isLoading) {
  return {
    type: MOVIES_LIST_IS_LOADING,
    isLoading
  };
}

function loadMoviesList() {
  return (dispatch, getState) => {
    const { moviesList: { filter }, } = getState();
    const url = `/movie/${filter.key}`;
    dispatch(setLoading(true));
    
    return ApiService.fetch({ url })
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => dispatch(setSucces(data)))
      .catch(({ message }) => {
        return dispatch(setError({ url, message }));
      });


  };
}

export {
  loadMoviesList,
  setMoviesFilter
};