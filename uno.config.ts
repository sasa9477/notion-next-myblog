import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerAttributifyJsx,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: '#68a2a5',
      accent: '#a56b68',
      background: '#f7f7f7',
      textPrimary: '#393939',
      link: ' #457ed7',
    },
  },
  rules: [
    // [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    // [/^p-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
    [
      /^bg-([(black|blue|green|cyan|red|magenta|brown|lightgray|darkgray|lightblue|lightgreen|lightcyan|lightred|lightmagenta|yellow|white)])$/i,
      ([_, color]) => ({ background: color }),
    ],
  ],
  presets: [
    presetUno({
      dark: 'media',
    }),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [transformerAttributifyJsx()],
})
