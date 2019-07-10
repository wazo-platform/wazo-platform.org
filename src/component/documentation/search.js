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

const config = require('../../../config');
const indexName = 'wazo-doc-overview';

const Root = props => <div className="main-search-box pt-3 pb-4 d-inline-block">{props.children}</div>;

const list = css`
  position: absolute;
  width: 560px;
  top: calc(100% - 10px);
  padding: 0.7em 1em 0.4em;
  background: #f9f9fb;
  border: 1px solid #ccc;
  z-index: 2;
  > * + * {
    padding-top: 1em !important;
    border-top: 2px solid #ccc;
  }
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    border-top: 1px solid #ddd;
  }
`;

export const HitsWrapper = styled.div`
  display: ${props => (props.show ? `grid` : `none`)};
  max-height: 80vh;
  overflow: scroll;
  ${list};
  color: #616670;
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
  padding: 0;
  a {
    color: #616670 !important;
  }
`;

const Input = connectSearchBox(({ refine, focused, currentRefinement, isSearchStalled, createURL, ...rest }) => (
  <form className="form-inline search-form justify-content-center">
    <input
      type="text"
      className="form-control search-input"
      placeholder="Search"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      {...rest}
    />
  </form>
));

const PageHit = clickHandler => ({ hit }) => (
  <div>
    <Link to={`/documentation/overview/${hit.moduleName}.html`} onClick={clickHandler}>
      <h6>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h6>
    </Link>
    <Link className="snippet-link" to={`/documentation/overview/${hit.moduleName}.html`} onClick={clickHandler}>
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
    algoliasearch(config.algolia.appId, config.algolia.publicKey) : null;

  updateState = state => this.setState(state);

  focus = () => this.setState({ focused: true });

  disableHits = () => this.setState({ focused: false });

  handleClickOutside = event => {
    if (this.list.current && !this.list.current.contains(event.target)) {
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
      <InstantSearch
        searchClient={this.searchClient}
        indexName={indexName}
        onSearchStateChange={this.updateState}
        root={{ Root }}
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
    );
  }
}
