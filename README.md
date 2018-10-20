# react-lazy-img

<p align="center">
<img width="300" src="./slakoth.png"/>
</p>

Very simple drop in replacement of `<img>` with lazy loading and fade-in transition.

No frills, it just works.

Uses `IntesectionObserver` under the hood. If not available, image will be shown as is.

## Demo

TBD

## Notes

## Install

```
yarn add react-lazy-img
```

or

```
npm i react-lazy-img
```

## Simple example

```jsx
import Img from `react-lazy-img`;

// ...

<Img src="/path/to/img.png" width={200} height={100} />
```

Image will start loading when its distance to the viewport is less than 500px. Once loaded, it will fade in (0.3s ease-in).

`width` and `height` props are optional but recommended to avoid browser reflows.

## Not so simple example

```jsx
import Img from `react-lazy-img`;

// ...

<Img
  src="/path/to/img.png"
  width={200}
  height={100}
  offset={1000}
  fallback={() => <img src="/path/to/low-res-img.png">}
  transition="opacity 1s ease-in"
/>
```

That's it, there are no more options

## Special thanks

**@fdaciuk** for transferring npm package ownership

## License

MIT
