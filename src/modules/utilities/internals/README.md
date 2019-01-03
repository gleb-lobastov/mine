In spirit of approach preaching by [airbnb styleguide](https://github.com/airbnb/javascript/issues/1024) this module offer method alternate to "underscore dangle convention" to gain real privacy in class fields

Point is that read-only restriction is part of privacy politics. So providing only read-only api for relevant fields could solve some access issues.

JS provide Object.freeze option to make object readonly. This tool use it for all process.env exclude production.

Of course it's make restriction even for owner class of object. So field of application is not very wide. But behavior still acceptable or even desired for constructor options.

Example of usage:

```ecmascript 6
    import internals from 'internals';

    class MyClass {
        constructor(optionsObject) {
            this.internals = internals(optionsObject);
        }
    }
```

Module name reflect mentioned use case. Because purpose of module is mostly to explicitly declare idea, than reuse code. For other cases is better to use `Object.freeze` directly.
