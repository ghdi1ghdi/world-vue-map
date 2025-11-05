# World Vue Map

A Vue JS Component for displaying dynamic data on a world map.

Forked from [Ghrehh's world-map-vue](https://github.com/Ghrehh/vue-world-map.git)

Map from [amCharts](https://www.amcharts.com/svg-maps/?map=world)

## Installation

Install via npm using `npm install world-vue-map` or `yarn add world-vue-map`

## Usage

This component is most useful in creating a heat map for various countries. And
will color countries differently based on a props passed.

The component requires a prop of `countryData` to be passed to it, which is a JS
object formatted like so.

```javascript
{
  US: 100,
  CA: 120,
  UK: 400,
}
```

Where the key is a country's
[ISO 3166 Code](https://en.wikipedia.org/wiki/ISO_3166) and the value is a
numerical value associated with it.

## API

| Props                   | Description                                                                | Optional |
| ----------------------- | -------------------------------------------------------------------------- | -------- |
| countryData             | See Usage Section above for details                                        | no       |
| lowColor                | Countries with lower values will be colored more strongly with this color  | yes      |
| highColor               | Countries with higher values will be colored more strongly with this color | yes      |
| defaultCountryFillColor | Countries with no data will default to this color                          | yes      |
| countryStrokeColor      | The color of the border around countries                                   | yes      |
| adjustMapViewBox        | adjust SVG map's viewBox to control the visible area programmatically      | yes      |

## Other changes

- Resolved the problem where the overlay box was intermittently flickering
- Enhanced map legend with country flags and update styling
- Improved legend positioning to work correctly with map zoom/scale
- Legend now only appears when mouse is over actual country territories
