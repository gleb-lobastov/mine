# Folder structure

List of folders, described below, imposes the following restrictions:
1. Modules located in folders, which placed higher in the list may import modules from subjacent folders.
1. Modules in subjacent folders must not import modules from folders above.

### components/app-core
App initialization and basic layout.

### components/view-containers
Container components, in meaning [described](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) by Dan Abramov. They responsible for representation of particular app views, usually for a pages.

### components/app-agnostic

Components which is created within app and for needs of app, but free from ties with app by design. For example GUI components.

**[Details about component structure](./components/readme.md)**

### utils

Any abstract piece of code that could be extracted from component logic. Consider that code as candidates to become packages or to be replaced by third-party packages.
