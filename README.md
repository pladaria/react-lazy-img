# react-lazy-img

Very simple drop in replacement of `<img>` with lazy loading (images outside the viewport won't be loaded) and fade-in transition.

No frills, it just works.

Uses `IntersectionObserver` under the hood (can be [polyfilled](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)). If not available, image will be shown as is.

## Demo

:zap: [Live demo](https://w7o55mqoj5.codesandbox.io/)

:wrench: [Demo in codesandbox](https://codesandbox.io/s/w7o55mqoj5)

## Install

`yarn add react-lazy-img` or `npm i react-lazy-img`

## Simple example

```jsx
import Img from `react-lazy-img`;

// ...

<Img src="/path/to/img.png" width={200} height={100} />
```

Image will start loading when its distance to the viewport is less than 500px (can be configured). Once loaded, it will fade in (by default `0.3s ease-in`, can be configured).

`width` and `height` props are optional but recommended to avoid browser reflows.

You can pass any standard `<img>` attribute.

## Full featured example

```jsx
import Img from `react-lazy-img`;

// ...

<Img
  src="/path/to/img.png"
  width={200}
  height={100}
  offset={1000}
  fallback={() => <img src="/path/to/low-res-img.png" />}
  transition="opacity 1s ease-in"
/>
```

-   `offset` - _number:_ distance to viewport to start loading
-   `fallback` - _() => React.Node:_ result of this function will be rendered while not loaded
-   `transition` - _string:_ CSS Transition property

## Special thanks

**@fdaciuk** for kindly transferring npm package name ownership

## License

MIT
