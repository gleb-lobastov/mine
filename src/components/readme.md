# Component structure
Every react component has own folder named "ComponentName" in PascalCase.
Content of folder:
1. ComponentName.jsx (required) – component own module
1. package.json (required) – config that needed to specify entry point as "ComponentName.jsx" instead of "index.js". This approach is chosen mainly for debug convenience.
1. ComponentName.scss – component styles.
1. Other assets related to component.
1. Subcomponents. All components that used only by current component and no reused somewhere else should be located within utilizing component. Each subcomponent has own folder and follow same rules. If subcomponent became reused, it should be hoisted up within folder in file tree.
