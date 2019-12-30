# morphonent-example

This is an example to-do list application written with [morphonent](https://github.com/kmruiz/morphonent). Following Domain Driven Design baselines.

## Running the application

Just do:

```
$> yarn
$> yarn start
```

Or with npm:

```
$> npm install
$> npm run start
```

## Running the tests

You can run the tests in watch mode using the test command:

```
$> yarn test
$> npm test
```

## Structure

Logic is splitten by persona, now there is a single persona, the doer of the todo list. All logic for that persona is in the [app/doer folder](https://github.com/kmruiz/morphonent-example/tree/master/app/doer).

User interactions are defined in [app/doer/index.js](https://github.com/kmruiz/morphonent-example/blob/master/app/doer/index.js), tests are in [app/doer/index.test.js](https://github.com/kmruiz/morphonent-example/blob/master/app/doer/index.test.js).

Reusable components are, also, per persona, so they are in the [app/doer/components folder](https://github.com/kmruiz/morphonent-example/tree/master/app/doer/component).

## Functionality

* Write in the input text and click on Add Item to add a new Todo Item pending to do into the list.
* Click on a todo item to toggle it done or pending.
* Click toggle all for toggling all items to done or false
* If you have more than 3 todos, and all of them are done, you will see a special easter egg.
