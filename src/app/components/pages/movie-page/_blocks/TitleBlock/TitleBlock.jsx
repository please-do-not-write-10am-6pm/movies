import './TitleBlock.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';
import { withTranslation } from 'react-i18next';

function TitleBlock({ t, data }) {
  const { title, release_date, original_title } = data;
  const b = b_.with('movie-details-header');

  return (
    <>
      <h1>
        {
          title &&
          <span className={b('title')}>
            {title}
          </span>
        }

        {
          release_date &&
          <span className={b('year')}>
            {`(${release_date.split('-')[0]})`}
          </span>
        }
      </h1>

      {original_title && (
        <div className={cn(b('original'), 'mb-2')}>
          <span className={b('title')}>
            {original_title}
          </span>
          <span className="ml-1">
            {`(${t('movie_details.original_title')})`}
          </span>
        </div>
      )}
    </>
  );
}

TitleBlock.propTypes = {
  t: PT.func.isRequired,

  data: PT.shape({
    title: PT.string,
    original_title: PT.string,
    release_date: PT.string
  }).isRequired,
};

export default withTranslation()(TitleBlock);