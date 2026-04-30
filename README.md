# chigura2

`chigura2` is a tiny TypeScript widget that puts a pixel cat inside your web page.
The cat wanders around, changes poses, and reacts to clicks.

## Features

- Small browser widget with no runtime dependencies
- Eight built-in cat breeds
- Adjustable display scale and movement speed
- Cats responds when clicked.

## Installation

```sh
npm install chigura2
```

## Quick Start

```ts
import { Chigura } from "chigura2";

const field = document.createElement("div");
field.style.position = "relative";
field.style.width = "600px";
field.style.height = "400px";

document.body.appendChild(field);

const chigura = new Chigura({
  breed: "mike",
  scale: "l",
  speed: "fast",
  balloonTexts: ["meow", "snack", "purr..."],
});

await chigura.mount(field);
```

`mount()` appends a `canvas` element and a balloon `div` to the target element.
`unmount()` removes them and stops all animation.

## Options

You can pass the following options to `new Chigura(options)`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `breed` | `"buchi" \| "hachi" \| "kuro" \| "mike" \| "saba" \| "sabi" \| "shiro" \| "tora"` | `"buchi"` | Selects the cat breed |
| `scale` | `"s" \| "m" \| "l" \| "xl"` | `"m"` | Sets the display scale |
| `speed` | `"slow" \| "normal" \| "fast" \| "faster"` | `"normal"` | Controls how often the cat moves |
| `reactions` | `readonly (ReactionName \| ReactionCallback)[]` | Built-in reactions | Built-in reactions or custom callbacks used when the cat is clicked |
| `balloonTexts` | `readonly string[]` | Built-in meow phrases | Candidate texts shown in the speech balloon |

## API

### `new Chigura(options?)`

Creates a new cat widget instance.

### `await chigura.mount(parent)`

Mounts the widget into the given element and starts animation.

- `parent` must be an `HTMLElement`
- The widget uses `parent.clientWidth` and `parent.clientHeight` as its movement bounds
- Multiple `Chigura` instances can be mounted into the same container

### `chigura.unmount()`

Stops animation and removes DOM nodes created by the widget.

## Exports

You can import the following from the package root:

```ts
import {
  Chigura,
  type BreedName,
  type ChiguraOptions,
  type ReactionCallback,
  type ReactionContext,
  type ReactionName,
  type ScaleName,
  type SpeedName,
} from "chigura2";
```

## Demo

A simple demo lives in [demo/index.html](https://aoi-ome.github.io/chigura2/demo/).

## Notes

- `chigura2` is designed for browsers and depends on DOM APIs
- Custom reaction callbacks receive `{ position, size }`
