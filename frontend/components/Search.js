import React, { Component } from 'react';
import Downshift, { resetIdCounter } from 'downshift'; //package for search bar
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo'; //allows you to run queries on demand rather than page load. Exposes Apollo client so we can manually run queries
import gql from 'graphql-tag';
import debounce from 'lodash.debounce'; //prevents ddosing own site. Takes search events and fires then at appropriate times
import { DropDown, DropDownItem, SearchStyles } from './styles/SearchStyles';
import { log } from 'util';

//search is title or description contains search term. OR is from prisma
const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(
      where: {
        OR: [
          { title_contains: $searchTerm },
          { description_contains: $searchTerm }
        ],
      }
    ) {
      id
      image
      title
    }
  }
`;

//route search item to appropriate page
const routeToItem = (item) => {
  Router.push({
    pathname: '/item',
    query: {
      id: item.id,
    }
  })
}

class AutoComplete extends Component {

  state ={
    items: [],
    loading: false,
  }

  //debounce postpones execution of functions that are happening too quickly
  handleChange = debounce(async (e, client) => {
    //turn loading on
    this.setState({ loading: true })
    //manually query apollo client
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value }
    })
    this.setState({
      items: res.data.items,
      loading: false
    });
  }, 350);

  render() {
    resetIdCounter(); //gets rid of aria console error from downshift
    return (
      <SearchStyles>
        <Downshift 
          onChange={routeToItem}
          itemToString={item => (item === null ? '' : item.title)}
        >
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
          <div>
            <ApolloConsumer>
              {(client) => (
                <input 
                {...getInputProps({
                  type: 'search',
                  placeholder: "Search For an Item 🔍",
                  id: "search",
                  className: this.state.loading ? 'loading' : '',
                  onChange: e => {
                    e.persist(); //persists allows us to hold onto e.target.value
                    this.handleChange(e, client);
                  },
                })}
              />
              )}
            </ApolloConsumer>

            {isOpen && (
              <DropDown>
                {this.state.items.map((item, index) => 
                  <DropDownItem 
                    {...getItemProps({ item })} 
                    key={item.id}
                    highlighted={index === highlightedIndex}
                  >
                  <img width="50" src={item.image} alt={item.title} />
                  {item.title}
                  </DropDownItem>
                )}
                {!this.state.items.length && !this.state.loading && (
                  <DropDownItem>
                    Nothing found for {inputValue}
                  </DropDownItem>
                )}
              </DropDown>
            )}

          </div>
          )}
        </Downshift>
      </SearchStyles>   
    )
  }
}

export default AutoComplete;

