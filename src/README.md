# Folder structure

List of folders, described below, imposes the following restrictions:
1. Modules located in folders, which placed higher in the list may import modules from subjacent folders.
1. Modules in subjacent folders must not import modules from folders above.

### components/app-core
[:paperclip:](./app-core) App initialization, common layout and routing.

### components/app-components
Components designed especially for app. Folder is not dictate particular level of component usage, they could be either page or embedded block or app-specific control.

See details in [next section](#component-structure)

### components/app-agnostic

Components which is created within app and for needs of app, but free from ties with app by design. For example GUI components.

**[Details about component structure](./components/readme.md)**

### utils

Any abstract piece of code that could be extracted from component logic. Consider that code as candidates to become packages or to be replaced by third-party packages.

# Component structure
Every react component has own folder named "ComponentName" in PascalCase.

**Note:** Page components highlight by containing "Page" word in component name and also they could be grouped in one folder as any other set of resemble components. Also pages from different parts of app could lay in different dirs

Rules for content of folder:
1. ComponentName.jsx (required) – component own module
1. index.js (required) – module entry point that do only re-exporting from ComponentName.js. This approach is chosen mainly for debug convenience. Pros over package.json that this approach are less hacky, conciseness and has no gaps in devtools support.
1. ComponentName.scss – component styles.
1. Other assets related to component.
1. Subcomponents. All components that used only by current component and no reused somewhere else should be located within utilizing component. Each subcomponent has own folder and follow same rules. If subcomponent became reused, it should be hoisted up within folder in file tree.
verbose


Links:
- ["Presentational and Container Components"](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

