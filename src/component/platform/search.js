import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  connectSearchBox,
  connectStateResults,
  Highlight,
  Snippet,
  InstantSearch,
  Hits,
  Index,
} from 'react-instantsearch-dom';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import { algoliaIndexPlatform as indexName } from '../../contants'

const config = require('../../../config');

const list = css`
  position: absolute;
  width: 560px;
  padding: 0.7em 1em 0.4em;
  background: #f9f9fb;
  z-index: 2;
  right: 0;
  top: 40px;
  border: 1px solid #EEE;
  box-shadow: 0px 2x 5px rgba(0,0,0,0.75);
  text-align: left;

  @media only screen and (max-width: 989px) {
    width: 100%;
  }

  li {
    margin-bottom: 14px;
    padding-bottom: 14px;
    border-bottom: 2px solid #ddd;

    div > a:first-child {
      color: #98c451;
    }

    .snippet-link {
      color: #888;
      font-weight: normal;

    }

    mark {
      background: rgba(152, 196, 81, 0.5);
    }
  }
`;

export const HitsWrapper = styled.div`
  display: ${props => (props.show ? `grid` : `none`)};
  max-height: 80vh;
  overflow-y: scroll;
  ${list};
  color: #616670;
  border-radius: 4px;


  * {
    margin-top: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  mark {
    color: #494d55;
    background: #58bbee;
  }

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      color: #494d55;
      padding: 0.1em 0.4em;
    }
  }

  h6 {
    margin: 0 0 0.5em;
  }
`;

const By = styled.span`
  font-size: 0.6em;
  text-align: end;
  padding: 20px 0 5px;
  a {
    color: #616670 !important;
  }
`;

const Input = connectSearchBox(({ refine, focused, currentRefinement, isSearchStalled, createURL, collapse }) => (
  <form className="form-inline search-form justify-content-center">
    <input
      type="text"
      className="form-control search-input"
      placeholder="Search"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      collapse={collapse}
    />
  </form>
));

const PageHit = clickHandler => ({ hit }) => (
  <div>
    <Link to={`/${hit.pagePath}`} onClick={clickHandler}>
      <h6>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h6>
    </Link>
    <Link className="snippet-link" to={`/${hit.pagePath}`} onClick={clickHandler}>
      <Snippet attribute="content" hit={hit} tagName="mark" />
    </Link>
  </div>
);

const events = ['mousedown', 'touchstart'];

const Results = connectStateResults(({ searchState: state, searchResults: res, children }) =>
  res && res.nbHits ? children : `No results for ${state.query}`
);

export default class Search extends Component {
  list = React.createRef();
  state = { query: '', focused: false };

  searchClient = config.algolia && !!config.algolia.appId && !!config.algolia.publicKey ?
    algoliasearch(config.algolia.appId, config.algolia.publicKey, {
      indexName: 'wazo-platform-development',
    }) : null;

  updateState = state => this.setState(state);

  focus = () => this.setState({ focused: true });

  disableHits = () => this.setState({ focused: false });

  handleClickOutside = event => {
    if (!this.list.current || !this.list.current.contains(event.target)) {
      this.setState({ focused: false });
    }
  };

  componentDidMount() {
    events.forEach(event => document.addEventListener(event, this.handleClickOutside));
  }

  componentWillUnmount() {
    events.forEach(event => document.removeEventListener(event, this.handleClickOutside));
  }

  render() {
    const { query, focused } = this.state;
    const { collapse, hitsAsGrid } = this.props;
    if (!this.searchClient) {
      return null;
    }

    return (
      <div className="main-search-box pt-3 pb-4 d-inline-block">
        <InstantSearch
          searchClient={this.searchClient}
          indexName={indexName}
          onSearchStateChange={this.updateState}
        >
          <Input onFocus={this.focus} {...{ collapse, focused }} />
          <HitsWrapper show={query.length > 0 && focused} hitsAsGrid={hitsAsGrid} ref={this.list}>
            <Index indexName={indexName}>
              <Results>
                <Hits hitComponent={PageHit(this.disableHits)} />
              </Results>
            </Index>
            <By>
              Powered by{' '}
              <a href="https://www.algolia.com">
                <i className="fab fa-algolia" /> Algolia
              </a>
            </By>
          </HitsWrapper>
        </InstantSearch>
      </div>
    );
  }
}
