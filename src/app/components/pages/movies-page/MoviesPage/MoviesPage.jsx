import './MoviesPage.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';

import PTS from 'app_services/PropTypesService';
import { isNotEmpty } from 'app_services/UtilsService';
import { Row, Column } from 'app_components/layout';
import { MListContextProvider } from 'app_contexts/MListContext';
import { ToolbarBlock, PagingBlock, ListBlock } from
  'app_components/pages/movies-page/_blocks';
import { ProgressBar } from 'app_components/layout';

function MoviesPage({ data_toolbar, data_paging, data_genresContext, data_moviesList }) {

  // base component class
  const cls_base = 'movies-list';
  const b = b_.with(cls_base);

  const { isLoading, error, movies } = data_moviesList;
  const hasMovies = isNotEmpty(movies);

  return (
    <div className={b()}>

      <Row cls="mb-md-2">
        <Column
          size={6}
          smallFullWidth
          cls="p-0"
        >
          <ToolbarBlock {...data_toolbar} />
        </Column>

        {hasMovies
          ? (
            <Column
              size={6}
              smallFullWidth
              cls="p-0"
            >
              <PagingBlock
                cls="m-0 float-md-right"
                {...data_paging}
              />
            </Column>
          )
          : ''}
      </Row>

      <MListContextProvider {...data_genresContext}>
        {error && <p>{error}</p>}

        {isLoading && <ProgressBar />}

        {hasMovies
          ? <ListBlock
            cls_base={cls_base}
            movies={movies}
          />
          : ''}
      </MListContextProvider>
    </div >
  );
};

MoviesPage.propTypes = {
  data_toolbar: PT.shape({
    handleFilter: PT.func.isRequired,
    activeFilter: PT.string
  }).isRequired,

  data_paging: PT.shape({
    initialPage: PT.number.isRequired,
    pageCount: PTS.nullOrNumber,
    onPageChange: PT.func.isRequired
  }).isRequired,

  data_genresContext: PT.shape({
    genres: PT.array.isRequired,
    linkMovie: PT.func.isRequired
  }).isRequired,

  data_moviesList: PT.shape({
    isLoading: PT.bool.isRequired,
    error: PTS.nullOrString,
    movies: PT.array.isRequired
  }).isRequired,
};

export default MoviesPage;