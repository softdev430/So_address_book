# Address Book

## Introduction

You are creating the Address Book app, which enables Users to search for Contact Details of their friends, family, etc. The app is 99% ready, but there are some bugs and pieces of code missing. Fix them!

## Problem Statement

1. In order to complete the task, debug or write additional code to ensure all the unit tests pass.

2. Be aware that there isn't a real back-end behind the app. The app is communicating with an asynchronous fake HTTP API implemented in `src/httpApi/fakeHttpApi.js`.

3. Mock data is used. There are 1000 fake contacts defined in . In `src/httpApi/contacts.json`.

4. Below there are the app requirements that apply when searching for and selecting contacts. Guiding hints on how you need to develop your code can be found in the `TODOs` comments in the app production code.

### App requirements

**Searching:**

- User can type text in `<PhraseInput>`.

- HTTP request asking for top 5 matching contacts is made for every update in the search phrase typed by User, but…

- … if that request is made sooner than 300 ms than the previous request, `429 Too Many Requests` is returned in response. Every such HTTP request should be made 300 ms after User stopped typing.
  It's acceptable that no requests are made for search phrase changes before the last request in a row.

- Whenever matching contacts are fetched, `<MatchingContacts>` appears populated with contacts.

- If any error happens during search request (such as making requests too fast), `<SearchFailure>` appears below `<PhraseInput>`.
  `<SearchFailure>` disappears when the new text is typed in `<PhraseInput>`.
- User can select a contact from matching contacts by pressing enter or clicking a mouse while navigating either up or down from `<PhraseInput>` into `<MatchingContacts>`.

- Whenever User selects one of the matching contacts, the search phrase is replaced with text (name) of chosen contact.

**Contact Details:**

- When User selects a matching contact, its details are fetched with an HTTP request and displayed in `<ContactDetails>`.

- Before User selects a matching contact and during HTTP request for details of every chosen contact, placeholder is shown instead of contact details.

- If any error happens during details fetch (eg. because of `404 Not Found` response for invalid contact ID), an error appears instead of contact details, until next fetch request.

- Successfully fetched contact details are rendered: name, phone, and address. Please be aware that address is composed of multiple address lines – you have to render them as separate `<span>`s.

- We don't want to spam back-end with unnecessary contact details fetches. Let's assume contact details never change. You have to cache those details that you have already fetched in order to load them from cache later instead of making HTTP request.

## Hints

Focus on:

- `src/AddressBook` directory,
- `TODO` comments

## Setup

Follow these steps to set up the app:

1. `npm install` – install dependencies
2. `npm test` – run all tests (should fail unless you fix the app)
3. `npm start` – serve the app at [http://localhost:3000/](http://localhost:3000/) (it automatically opens the app in your default browser)

There is also the `npm run test:watch` command available to start test runner in the watch mode. It runs tests related to modified files only.
