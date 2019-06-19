import React, { Component } from 'react';
import Downshift from 'downshift'; //package for search bar
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo'; //allows you to run queries on demand rather than page load
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/SearchStyles';

class AutoComplete extends Component {
  render() {
    return (
      <SearchStyles>
        <div>
          <input type="search" />
          <DropDown>
            <p>Items go here</p>
          </DropDown>
        </div>
      </SearchStyles>   
    )
  }
}

export default AutoComplete;

