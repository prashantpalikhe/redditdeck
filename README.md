# ![RedditDeck](logo.png)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/675748d5-9667-4890-a9f6-062be4e58d62/deploy-status)](https://app.netlify.com/sites/inspiring-easley-d54e9c/deploys)

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
