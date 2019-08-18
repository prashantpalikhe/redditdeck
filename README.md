# ![RedditDeck](logo.png)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

> TweetDeck for Reddit

<img src="redditdeck.gif" width="895">

## Use as Chrome extension

[Get here](https://chrome.google.com/webstore/detail/redditdeck/lijefbkahlhiophapoeokibmmdnfagln)

To install as Chrome extension while developing locally:

1. `npm install`
2. `npm run build`. This generates a `dist` folder
3. Open Google Chrome and go to chrome://extensions
4. Make sure `developer mode` is enabled.
5. Drag the `dist` folder from #2 into the extension page
6. All set

From this point on, while opening a new tab, you will see the `RedditDeck`. So you can stay updated with whatever you are following, with every new tab.

## Use as PWA

You can install https://redditdeck.prashantpalikhe.com/ as desktop or mobile PWA as well.

## Build setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```
