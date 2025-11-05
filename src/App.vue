<template>
  <div class="vue-world-map">
    <Map
      @hoverCountry="onHoverCountry"
      @hoverLeaveCountry="onHoverLeaveCountry"
      :viewBox="adjustMapViewBox"
    />

    <div
      v-if="legend.name"
      class="vue-map-legend"
      :style="'left:' + position.left + 'px; top: ' + position.top + 'px'"
    >
      <div class="vue-map-legend-header">
        <img
          :alt="legend.code"
          :src="`https://flagsapi.com/${legend.code}/flat/64.png`"
          class="flag"
          style="width: 20px; margin-right: 10px"
        />
        <span>{{ legend.name }} : {{ countryData[legend.code] || 0 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import chroma from "chroma-js";
import Map from "./Map";
import {
  getDynamicMapCss,
  getBaseCss,
  getCombinedCssString,
} from "./dynamic-map-css";

let legend = {
  data: null,
  code: null,
  name: null,
};

let position = {
  left: 0,
  top: 0,
};

export default {
  name: "MapChart",
  components: { Map },
  watch: {
    countryData() {
      this.renderMapCSS();
    },
  },
  props: {
    lowColor: {
      type: String,
      default: "#fde2e2",
    },
    highColor: {
      type: String,
      default: "#d83737",
    },
    countryData: {
      type: Object,
      required: true,
    },
    defaultCountryFillColor: {
      type: String,
      default: "#dadada",
    },
    countryStrokeColor: {
      type: String,
      default: "#909090",
    },
    adjustMapViewBox: {
      type: String,
      default: "0 0 1008 650",
    },
  },
  data() {
    return {
      legend: legend,
      position: position,
      node: document.createElement("style"),
      chromaScale: chroma.scale([this.$props.lowColor, this.$props.highColor]),
      hoverTimeout: null,
    };
  },
  methods: {
    onHoverCountry(country) {
      if (this.legend.code === country.code) {
        return;
      }

      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = setTimeout(() => {
        this.legend = country;
        this.position = country.position;
        this.$emit("hoverCountry", country);
      }, 50);
    },
    onHoverLeaveCountry(country) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = setTimeout(() => {
        if (country && this.legend.code === country.code) {
          return;
        }
        this.legend = {
          data: null,
          code: null,
          name: null,
        };
        this.$emit("hoverLeaveCountry", country);
      }, 50);
    },
    renderMapCSS() {
      const baseCss = getBaseCss(this.$props);
      const dynamicMapCss = getDynamicMapCss(
        this.$props.countryData,
        this.chromaScale
      );
      this.$data.node.innerHTML = getCombinedCssString(baseCss, dynamicMapCss);
    },
  },
  mounted() {
    document.body.appendChild(this.$data.node);
    this.renderMapCSS();
  },
};
</script>

<style scoped>
.vue-world-map,
#map-svg {
  height: 100%;
}

.vue-world-map {
  position: relative;
}

.vue-map-legend {
  display: flex;
  width: auto;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 0.5rem;
  color: rgb(255, 255, 255);
  position: absolute;
}

.vue-map-legend-header {
  padding: 10px 15px;
  display: flex;
  align-items: center;
}

.vue-map-legend-content {
  padding: 10px 15px;
  background: #dadbda8f;
  border-top: 1px solid #acacad;
}
</style>
