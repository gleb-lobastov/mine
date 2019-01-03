# Folder structure

List of folders, described below, imposes the following restrictions:

1. Modules located in folders, which placed higher in the list may import modules from subjacent folders.
1. Modules in subjacent folders must not import modules from folders above.

### packages

[:paperclip:](./packages) Modular part of App. Experimental approach, made in the name of decomposition. Aimless note: used packages is determined on app start and could be even dynamically changed.

### core

Tiny app core. At least it expected to be tiny. I will try to oversee this indicator.

Core is responsible for layout, routing, request-response transactions, state and context management.

All common components should go to modules, all package-specific logic should be in packages.

### modules

Contains utils and components which is created within app and for needs of app, but free from ties with app by design. For example GUI components.

All stuff from modules is candidate for removal from the project to externals

### configuration

Especial guest.

Plain config with no dependencies (maximum it could import some constants, but with care of recursive imports). 

Nobody can import configuration by current design, instead it passed down trough context. But, we'll see.

# Component structure

Every react component has own file named "ComponentName" in PascalCase.

Component or utility could lie in folder with same name and configured for default import through "main" property in local package.json

Or it could be reexported through index.js

First case is more applicable for single component file, second for group of modules with common purpose

Components that used other components for decomposition, i.e. that only belongs to main component and not reused in outside scope should contain such components in "block" folder. They could lie as is without wrapping folder, or use previously declared approaches. If such subcomponent became reused, it should be hoisted up within folder in file tree.

Links:

- ["Presentational and Container Components"](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
