import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PT from 'prop-types';

import { nullOrNumber, nullOrString } from '@/types';
import { isEmpty } from '@/utils/common';
import { getQueryParams, hasRequestDiffs } from '@/utils/url';
import { ToolbarBlock, PagingBlock, ListBlock, SearchResultsBlock } from '@/pages/movies-page';
import { Page, ProgressBar } from '@/layout';
import { Message, Row } from '@/markup';
import GenresContainer from '@/containers/features/GenresContainer';
import { getMovies } from '@/actions';

const mapStateToProps = ({ moviesList }) => ({ moviesList });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getMovies }, dispatch)
});

class MoviesListContainer extends Component {
  componentDidUpdate(prevProps) {
    const { moviesList, actions, location } = this.props;
    const { request } = moviesList;
    const checklist = ['lng', 'moviesType', 'page', 'search'];

    if ((location.search !== prevProps.location.search)) {
      if (hasRequestDiffs({ request, checklist })) {
        actions.getMovies(getQueryParams());
      }
    }
  }

  componentDidMount() {
    const { moviesList, actions } = this.props;
    const { data, isLoading, request } = moviesList;
    const checklist = ['lng', 'moviesType', 'page', 'search'];

    if (
      (isEmpty(data.results) && !isLoading)
      || hasRequestDiffs({ request, checklist })
    ) {
      actions.getMovies(getQueryParams());
    }
  }

  render() {
    const { moviesList } = this.props;
    const { data, error, isLoading } = moviesList;
    const {
      results, total_results, total_pages, page
    } = data;
    const { search } = getQueryParams();
    const hasMovies = !isEmpty(results);

    const pagingParams = {
      initialPage: (page - 1),
      pageCount: total_pages
    };

    return (
      <Page>
        {error && <Message cls="mb-3" text={error} />}
        {isLoading && <ProgressBar />}

        <SearchResultsBlock
          search={search}
          total={total_results}
        />

        <Row>
          {!search && (
            <div className="col-12 col-lg-auto p-0 pr-lg-2 toolbar-wrapper">
              <ToolbarBlock />
            </div>
          )}

          {(hasMovies && total_results > 20) && (
            <div className="col-12 col-lg p-0 pagination-wrapper">
              <PagingBlock
                cls="pagination-top justify-content-lg-end m-0"
                {...pagingParams}
              />
            </div>
          )}
        </Row>

        <GenresContainer>
          <ListBlock movies={results} />
        </GenresContainer>

        {(hasMovies && total_results > 20) && (
          <Row cls="pagination-wrapper mt-3">
            <PagingBlock
              cls="pagination-bottom m-0"
              {...pagingParams}
            />
          </Row>
        )}
      </Page>
    );
  }
}

MoviesListContainer.propTypes = {
  location: PT.shape({
    search: PT.string.isRequired
  }).isRequired,

  actions: PT.shape({
    getMovies: PT.func.isRequired
  }).isRequired,

  moviesList: PT.shape({
    isLoading: PT.bool.isRequired,
    error: nullOrString,
    request: PT.shape({
      moviesType: PT.string,
      page: PT.oneOfType([
        PT.number,
        PT.string
      ]),
      lng: PT.string,
      search: PT.string
    }).isRequired,
    data: PT.shape({
      page: PT.number.isRequired,
      total_pages: nullOrNumber,
      total_results: nullOrNumber,
      results: PT.array.isRequired,
    }).isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MoviesListContainer));