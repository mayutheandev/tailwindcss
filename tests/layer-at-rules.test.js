import { run, html, css } from './util/run'

test('custom user-land utilities', () => {
  let config = {
    content: [
      {
        raw: html`<div
          class="uppercase focus:hover:align-chocolate align-banana hover:align-banana"
        ></div>`,
      },
    ],
    corePlugins: { preflight: false },
    theme: {},
    plugins: [],
  }

  let input = css`
    @layer utilities {
      .align-banana {
        text-align: banana;
      }
    }

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer utilities {
      .align-chocolate {
        text-align: chocolate;
      }
    }
  `

  return run(input, config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      *,
      ::before,
      ::after {
        --tw-translate-x: 0;
        --tw-translate-y: 0;
        --tw-rotate: 0;
        --tw-skew-x: 0;
        --tw-skew-y: 0;
        --tw-scale-x: 1;
        --tw-scale-y: 1;
        --tw-pan-x: ;
        --tw-pan-y: ;
        --tw-pinch-zoom: ;
        --tw-scroll-snap-strictness: proximity;
        border-color: #e5e7eb;
        --tw-ordinal: ;
        --tw-slashed-zero: ;
        --tw-numeric-figure: ;
        --tw-numeric-spacing: ;
        --tw-numeric-fraction: ;
        --tw-ring-inset: ;
        --tw-ring-offset-width: 0px;
        --tw-ring-offset-color: #fff;
        --tw-ring-color: rgb(59 130 246 / 0.5);
        --tw-ring-offset-shadow: 0 0 #0000;
        --tw-ring-shadow: 0 0 #0000;
        --tw-shadow: 0 0 #0000;
        --tw-shadow-colored: 0 0 #0000;
        --tw-blur: ;
        --tw-brightness: ;
        --tw-contrast: ;
        --tw-grayscale: ;
        --tw-hue-rotate: ;
        --tw-invert: ;
        --tw-saturate: ;
        --tw-sepia: ;
        --tw-drop-shadow: ;
        --tw-backdrop-blur: ;
        --tw-backdrop-brightness: ;
        --tw-backdrop-contrast: ;
        --tw-backdrop-grayscale: ;
        --tw-backdrop-hue-rotate: ;
        --tw-backdrop-invert: ;
        --tw-backdrop-opacity: ;
        --tw-backdrop-saturate: ;
        --tw-backdrop-sepia: ;
      }

      .uppercase {
        text-transform: uppercase;
      }
      .align-banana {
        text-align: banana;
      }
      .hover\:align-banana:hover {
        text-align: banana;
      }
      .focus\:hover\:align-chocolate:hover:focus {
        text-align: chocolate;
      }
    `)
  })
})

test('comments can be used inside layers without crashing', () => {
  let config = {
    content: [
      {
        raw: html`<div class="important-utility important-component"></div>`,
      },
    ],
    corePlugins: { preflight: false },
    theme: {},
    plugins: [],
  }

  let input = css`
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer base {
      /* Important base */
      div {
        background-color: #bada55;
      }
    }

    @layer utilities {
      /* Important utility */
      .important-utility {
        text-align: banana;
      }
    }

    @layer components {
      /* Important component */
      .important-component {
        text-align: banana;
      }
    }
  `

  return run(input, config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      /* Important base */
      div {
        background-color: #bada55;
      }

      *,
      ::before,
      ::after {
        --tw-translate-x: 0;
        --tw-translate-y: 0;
        --tw-rotate: 0;
        --tw-skew-x: 0;
        --tw-skew-y: 0;
        --tw-scale-x: 1;
        --tw-scale-y: 1;
        --tw-pan-x: ;
        --tw-pan-y: ;
        --tw-pinch-zoom: ;
        --tw-scroll-snap-strictness: proximity;
        border-color: #e5e7eb;
        --tw-ordinal: ;
        --tw-slashed-zero: ;
        --tw-numeric-figure: ;
        --tw-numeric-spacing: ;
        --tw-numeric-fraction: ;
        --tw-ring-inset: ;
        --tw-ring-offset-width: 0px;
        --tw-ring-offset-color: #fff;
        --tw-ring-color: rgb(59 130 246 / 0.5);
        --tw-ring-offset-shadow: 0 0 #0000;
        --tw-ring-shadow: 0 0 #0000;
        --tw-shadow: 0 0 #0000;
        --tw-shadow-colored: 0 0 #0000;
        --tw-blur: ;
        --tw-brightness: ;
        --tw-contrast: ;
        --tw-grayscale: ;
        --tw-hue-rotate: ;
        --tw-invert: ;
        --tw-saturate: ;
        --tw-sepia: ;
        --tw-drop-shadow: ;
        --tw-backdrop-blur: ;
        --tw-backdrop-brightness: ;
        --tw-backdrop-contrast: ;
        --tw-backdrop-grayscale: ;
        --tw-backdrop-hue-rotate: ;
        --tw-backdrop-invert: ;
        --tw-backdrop-opacity: ;
        --tw-backdrop-saturate: ;
        --tw-backdrop-sepia: ;
      }

      /* Important component */
      .important-component {
        text-align: banana;
      }

      /* Important utility */
      .important-utility {
        text-align: banana;
      }
    `)
  })
})

test('comments can be used inside layers (with important) without crashing', () => {
  let config = {
    important: true,
    content: [
      {
        raw: html`<div class="important-utility important-component"></div>`,
      },
    ],
    corePlugins: { preflight: false },
    theme: {},
    plugins: [],
  }

  let input = css`
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer base {
      /* Important base */
      div {
        background-color: #bada55;
      }
    }

    @layer utilities {
      /* Important utility */
      .important-utility {
        text-align: banana;
      }
    }

    @layer components {
      /* Important component */
      .important-component {
        text-align: banana;
      }
    }
  `

  return run(input, config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      /* Important base */
      div {
        background-color: #bada55;
      }

      *,
      ::before,
      ::after {
        --tw-translate-x: 0;
        --tw-translate-y: 0;
        --tw-rotate: 0;
        --tw-skew-x: 0;
        --tw-skew-y: 0;
        --tw-scale-x: 1;
        --tw-scale-y: 1;
        --tw-pan-x: ;
        --tw-pan-y: ;
        --tw-pinch-zoom: ;
        --tw-scroll-snap-strictness: proximity;
        border-color: #e5e7eb;
        --tw-ordinal: ;
        --tw-slashed-zero: ;
        --tw-numeric-figure: ;
        --tw-numeric-spacing: ;
        --tw-numeric-fraction: ;
        --tw-ring-inset: ;
        --tw-ring-offset-width: 0px;
        --tw-ring-offset-color: #fff;
        --tw-ring-color: rgb(59 130 246 / 0.5);
        --tw-ring-offset-shadow: 0 0 #0000;
        --tw-ring-shadow: 0 0 #0000;
        --tw-shadow: 0 0 #0000;
        --tw-shadow-colored: 0 0 #0000;
        --tw-blur: ;
        --tw-brightness: ;
        --tw-contrast: ;
        --tw-grayscale: ;
        --tw-hue-rotate: ;
        --tw-invert: ;
        --tw-saturate: ;
        --tw-sepia: ;
        --tw-drop-shadow: ;
        --tw-backdrop-blur: ;
        --tw-backdrop-brightness: ;
        --tw-backdrop-contrast: ;
        --tw-backdrop-grayscale: ;
        --tw-backdrop-hue-rotate: ;
        --tw-backdrop-invert: ;
        --tw-backdrop-opacity: ;
        --tw-backdrop-saturate: ;
        --tw-backdrop-sepia: ;
      }

      /* Important component */
      .important-component {
        text-align: banana;
      }

      /* Important utility */
      .important-utility {
        text-align: banana !important;
      }
    `)
  })
})

test('layers are grouped and inserted at the matching @tailwind rule', () => {
  let config = {
    content: [
      { raw: html`<div class="input btn card float-squirrel align-banana align-sandwich"></div>` },
    ],
    plugins: [
      function ({ addBase, addComponents, addUtilities }) {
        addBase({ body: { margin: 0 } })

        addComponents({
          '.input': { background: 'white' },
        })

        addUtilities({
          '.float-squirrel': { float: 'squirrel' },
        })
      },
    ],
    corePlugins: { preflight: false },
  }

  let input = css`
    @layer vanilla {
      strong {
        font-weight: medium;
      }
    }

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer components {
      .btn {
        background: blue;
      }
    }

    @layer utilities {
      .align-banana {
        text-align: banana;
      }
    }

    @layer base {
      h1 {
        font-weight: bold;
      }
    }

    @layer components {
      .card {
        border-radius: 12px;
      }
    }

    @layer base {
      p {
        font-weight: normal;
      }
    }

    @layer utilities {
      .align-sandwich {
        text-align: sandwich;
      }
    }

    @layer chocolate {
      a {
        text-decoration: underline;
      }
    }
  `

  expect.assertions(2)

  return run(input, config).then((result) => {
    expect(result.warnings().length).toBe(0)
    expect(result.css).toMatchFormattedCss(css`
      @layer vanilla {
        strong {
          font-weight: medium;
        }
      }

      body {
        margin: 0;
      }

      h1 {
        font-weight: bold;
      }

      p {
        font-weight: normal;
      }

      *,
      ::before,
      ::after {
        --tw-translate-x: 0;
        --tw-translate-y: 0;
        --tw-rotate: 0;
        --tw-skew-x: 0;
        --tw-skew-y: 0;
        --tw-scale-x: 1;
        --tw-scale-y: 1;
        --tw-pan-x: ;
        --tw-pan-y: ;
        --tw-pinch-zoom: ;
        --tw-scroll-snap-strictness: proximity;
        border-color: #e5e7eb;
        --tw-ordinal: ;
        --tw-slashed-zero: ;
        --tw-numeric-figure: ;
        --tw-numeric-spacing: ;
        --tw-numeric-fraction: ;
        --tw-ring-inset: ;
        --tw-ring-offset-width: 0px;
        --tw-ring-offset-color: #fff;
        --tw-ring-color: rgb(59 130 246 / 0.5);
        --tw-ring-offset-shadow: 0 0 #0000;
        --tw-ring-shadow: 0 0 #0000;
        --tw-shadow: 0 0 #0000;
        --tw-shadow-colored: 0 0 #0000;
        --tw-blur: ;
        --tw-brightness: ;
        --tw-contrast: ;
        --tw-grayscale: ;
        --tw-hue-rotate: ;
        --tw-invert: ;
        --tw-saturate: ;
        --tw-sepia: ;
        --tw-drop-shadow: ;
        --tw-backdrop-blur: ;
        --tw-backdrop-brightness: ;
        --tw-backdrop-contrast: ;
        --tw-backdrop-grayscale: ;
        --tw-backdrop-hue-rotate: ;
        --tw-backdrop-invert: ;
        --tw-backdrop-opacity: ;
        --tw-backdrop-saturate: ;
        --tw-backdrop-sepia: ;
      }

      .input {
        background: white;
      }

      .btn {
        background: blue;
      }

      .card {
        border-radius: 12px;
      }

      .float-squirrel {
        float: squirrel;
      }

      .align-banana {
        text-align: banana;
      }

      .align-sandwich {
        text-align: sandwich;
      }

      @layer chocolate {
        a {
          text-decoration: underline;
        }
      }
    `)
  })
})

it('should keep `@supports` rules inside `@layer`s', () => {
  let config = {
    content: [{ raw: html`<div class="test"></div>` }],
    plugins: [],
  }

  let input = css`
    @tailwind utilities;

    @layer utilities {
      .test {
        --tw-test: 1;
      }

      @supports (backdrop-filter: blur(1px)) {
        .test {
          --tw-test: 0.9;
        }
      }
    }
  `

  return run(input, config).then((result) => {
    return expect(result.css).toMatchFormattedCss(css`
      .test {
        --tw-test: 1;
      }

      @supports (backdrop-filter: blur(1px)) {
        .test {
          --tw-test: 0.9;
        }
      }
    `)
  })
})
