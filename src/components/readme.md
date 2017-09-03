# Folder structure

List of folders, described below, imposes the following restrictions:
1. Modules located in folders, which placed higher in the list may import modules from subjacent folders.
1. Modules in subjacent folders must not import modules from folders above.

### app-core
App initialization and basic layout.

### view-containers
Container components, in meaning [described](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) by Dan Abramov. They responsible for representation of particular app views, usually for a pages.

### app-agnostic

Components which is created within app and for needs of app, but free from ties with app by design. For example GUI components.

# Component structure
Every react component has own folder named "ComponentName" in PascalCase.
Content of folder:
1. ComponentName.jsx (required) – component own module
1. package.json (required) – config that needed to specify entry point as "ComponentName.jsx" instead of "index.js". This approach is chosen mainly for debug convenience.
1. ComponentName.scss – component styles.
1. Other assets related to component.
1. Subcomponents. All components that used only by current component and no reused somewhere else should be located within utilizing component. Each subcomponent has own folder and follow same rules. If subcomponent became reused, it should be hoisted up within folder in file tree.
