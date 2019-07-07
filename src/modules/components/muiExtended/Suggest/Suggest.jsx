import React from 'react';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DefaultSuggestionsResolver from './components/DefaultSuggestionsResolver';
import DefaultInputRender from './components/DefaultInputRender';
import DefaultSuggestionRender from './components/DefaultSuggestionRender';

const useStyles = makeStyles(theme => ({
  root: {},
  container: {},
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  inputRoot: {},
  inputInput: {},
}));

const defaultItemToString = item => {
  const { label } = item || {};
  return label;
};

export const createSuggestComponent = ({
  SuggestionsResolver = DefaultSuggestionsResolver,
  SuggestionItemComponent = DefaultSuggestionRender,
  InputComponent = DefaultInputRender,
} = {}) => ({
  sourceProps,
  inputProps,
  inputFieldProps,
  ...downshiftProps
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Downshift itemToString={defaultItemToString} {...downshiftProps}>
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
        }) => (
          <div className={classes.container}>
            <InputComponent
              fullWidth={true}
              classes={classes}
              inputProps={getInputProps(inputProps)}
              {...inputFieldProps}
            />
            <div {...getMenuProps()}>
              {isOpen && (
                <Paper className={classes.paper} square={true}>
                  <SuggestionsResolver
                    inputValue={inputValue}
                    sourceProps={sourceProps}
                  >
                    {resolvedSuggestions =>
                      resolvedSuggestions.map((suggestion, index) => (
                        <SuggestionItemComponent
                          key={suggestion.label}
                          itemProps={getItemProps({
                            item: suggestion,
                          })}
                          isHighlighted={highlightedIndex === index}
                          isSelected={
                            Boolean(selectedItem) &&
                            selectedItem.label === suggestion.label
                          }
                        >
                          {suggestion}
                        </SuggestionItemComponent>
                      ))
                    }
                  </SuggestionsResolver>
                </Paper>
              )}
            </div>
          </div>
        )}
      </Downshift>
    </div>
  );
};

export default createSuggestComponent();
/*
const x = (
  <FetchContacts
    searchValue={inputValue}
    omitContacts={selectedContacts}
    onLoaded={({ contacts }) => {
      clearItems();
      if (contacts) {
        setHighlightedIndex(contacts.length ? 0 : null);
        setItemCount(contacts.length);
      }
    }}
  >
    {({ loading, contacts, error }) => (
      <div
        {...css({
          position: 'absolute',
          backgroundColor: 'white',
          width: 300,
          maxHeight: 280,
          overflow: 'scroll',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          border: '1px solid rgba(0,0,0,.2)',
        })}
      >
        {loading ? (
          <div {...css({ padding: 10 })}>loading...</div>
        ) : error ? (
          <div {...css({ padding: 10 })}>error...</div>
        ) : contacts.length ? (
          <ContactList
            highlightedIndex={highlightedIndex}
            getItemProps={getItemProps}
            contacts={contacts}
          />
        ) : (
          <div {...css({ padding: 10 })}>no results...</div>
        )}
      </div>
    )}
  </FetchContacts>
);

class FetchContacts extends React.Component {
  static initialState = { loading: false, error: null, contacts: [] };
  requestId = 0;
  state = FetchContacts.initialState;
  mounted = false;
  reset(overrides) {
    this.setState({ ...FetchContacts.initialState, ...overrides });
  }
  fetch = debounce(
    () => {
      if (!this.mounted) {
        return;
      }
      const { omitContacts, limit } = this.props;
      this.requestId++;
      fetchContacts(this.props.searchValue, {
        omitContacts,
        limit,
        requestId: this.requestId,
      }).then(
        ({ response: { data: contacts, requestId } }) => {
          if (this.mounted && requestId === this.requestId) {
            this.props.onLoaded({ contacts });
            this.setState({ loading: false, contacts });
          }
        },
        ({ response: { error, requestId } }) => {
          if (this.mounted && requestId === this.requestId) {
            this.props.onLoaded({ error });
            this.setState({ loading: false, error });
          }
        },
      );
    },
    { wait: 300 },
  );
  prepareFetch() {
    this.reset({ loading: true });
  }
  componentDidMount() {
    this.mounted = true;
    this.prepareFetch();
    this.fetch();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.searchValue !== this.props.searchValue ||
      prevProps.omitContacts !== this.props.omitContacts
    ) {
      this.prepareFetch();
      this.fetch();
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    return this.props.children(this.state);
  }
}
*/
