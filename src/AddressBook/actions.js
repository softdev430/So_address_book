import { searchContactsActions } from './SearchContacts';
import { contactDetailsActions } from './ContactDetails';
import debounce from 'debounce-promise';
import { SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS } from '../httpApi/fakeHttpApi';

// TODO: Something is missing here
export const updateSearchPhrase = (phrase) => (dispatch, getState, { httpApi }) => {
  dispatch(searchContactsActions.updateSearchPhrase(phrase));

  const getFirst5MatchingContacts = debounce(httpApi.getFirst5MatchingContacts, SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS);
  getFirst5MatchingContacts({ namePart: phrase })
    .then(({ data }) => {
      const matchingContacts = data.map(contact => ({
        id: contact.id,
        value: contact.name,
      }));

      dispatch(searchContactsActions.updateSearchPhraseSuccess(matchingContacts));
    })
    .catch(() => {
      // TODO: Something is wrong here
      dispatch(searchContactsActions.updateSearchPhraseFailure([]));
    });
  };

export const selectMatchingContact = (selectedMatchingContact) => (dispatch, getState, { httpApi, dataCache }) => {
  const getContactDetails = ({ id }) => {
    // TODO: Something is missing here
    const existContact = (dataCache.get("contacts") || []).find(item => item.id === id);
    if(existContact) {
      return new Promise((resolve) => resolve(existContact));
    }

    return httpApi
      .getContact({ contactId: id })
      .then(({ data }) => ({
        id: data.id,
        name: data.name,
        phone: data.phone,
        addressLines: data.addressLines,
      }));
  };

  dispatch(searchContactsActions.selectMatchingContact(selectedMatchingContact));

  // TODO: Something is missing here
  const contactDetails = getState().addressBook.contactDetails;

  if(contactDetails && contactDetails.data) {
    const selectedContactId = contactDetails.data.id;
    if(selectedContactId === selectedMatchingContact.id) {
      return;
    }
  }

  dispatch(contactDetailsActions.fetchContactDetails());
    getContactDetails({ id: selectedMatchingContact.id })
      .then((contactDetails) => {
        const cacheContacts = dataCache.get("contacts") || [];
        dataCache.set("contacts", [...cacheContacts, contactDetails]);

        dispatch(contactDetailsActions.fetchContactDetailsSuccess(contactDetails));
      })
      .catch(() => {
        dispatch(contactDetailsActions.fetchContactDetailsFailure());
      });
  
};
