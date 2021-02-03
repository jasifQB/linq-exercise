# LINQ Exercise Project (NodeJS CLI - Typescript)

This is a NodeJS cli project which get search parameters from an end user as cli arguments and search wines from [vivino]('https:vivino.com').

## Prerequisites

To run the project, you'll need to:

* Clone this repository:

      $ git clone https://github.com/habitat-sh/sample-node-app.git
      $ cd linq-exercise

* Install dependencies:

      $ npm i

You ca run the project using `ts-node` or `node`.

To run the project using `node`. you'll have to:
* Build the project:

      $ npm run build

* Run the project:

      $ npm start -g <grapes> -r <minRating> -p <minPrice> -P <maxPrice>

To run the project using `ts-node`. you'll have to:

* Run the project:

      $ ts-node src/index.ts -g <grapes> -r <minRating> -p <minPrice> -P <maxPrice>
The only required argument is `<grapes>`

An example for the command is given below.

```
ts-node src/index.ts -g "merlot,Chardonnay" -r 3.5 -p 100 -P 500
```


Run the tests:

    $ npm run test
