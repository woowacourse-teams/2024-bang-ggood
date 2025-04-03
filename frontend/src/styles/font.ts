const font = {
  title: {
    1: {
      B: {
        size: '2.8rem',
        lineHeight: '130%',
        weight: 700,
      },
      M: {
        size: '2.8rem',
        lineHeight: '130%',
        weight: 500,
      },
      R: {
        size: '2.8rem',
        lineHeight: '130%',
        weight: 400,
      },
    },

    2: {
      B: {
        size: '2.6rem',
        lineHeight: '130%',
        weight: 700,
      },
      M: {
        size: '2.6rem',
        lineHeight: '130%',
        weight: 500,
      },
      R: {
        size: '2.6rem',
        lineHeight: '130%',
        weight: 400,
      },
    },
  },

  heading: {
    1: {
      B: {
        size: '2.4rem',
        lineHeight: '130%',
        weight: 700,
      },
      M: {
        size: '2.4rem',
        lineHeight: '130%',
        weight: 500,
      },
      R: {
        size: '2.4rem',
        lineHeight: '130%',
        weight: 400,
      },
    },

    2: {
      B: {
        size: '2.2rem',
        lineHeight: '130%',
        weight: 700,
      },
      M: {
        size: '2.2rem',
        lineHeight: '130%',
        weight: 500,
      },
      R: {
        size: '2.2rem',
        lineHeight: '130%',
        weight: 400,
      },
    },
  },

  headline: {
    1: {
      B: {
        size: '2.0rem',
        lineHeight: '130%',
        weight: 700,
      },
      M: {
        size: '2.0rem',
        lineHeight: '130%',
        weight: 500,
      },
      R: {
        size: '2.0rem',
        lineHeight: '130%',
        weight: 400,
      },
    },
  },

  body: {
    1: {
      B: {
        size: '1.8rem',
        lineHeight: '140%',
        weight: 700,
      },
      M: {
        size: '1.8rem',
        lineHeight: '140%',
        weight: 500,
      },
      R: {
        size: '1.8rem',
        lineHeight: '140%',
        weight: 400,
      },
    },
    2: {
      B: {
        size: '1.6rem',
        lineHeight: '140%',
        weight: 700,
      },
      M: {
        size: '1.6rem',
        lineHeight: '140%',
        weight: 500,
      },
      R: {
        size: '1.6rem',
        lineHeight: '140%',
        weight: 400,
      },
    },
  },

  caption: {
    1: {
      B: {
        size: '1.2rem',
        lineHeight: '150%',
        weight: 700,
      },
      M: {
        size: '1.2rem',
        lineHeight: '150%',
        weight: 500,
      },
      R: {
        size: '1.2rem',
        lineHeight: '150%',
        weight: 400,
      },
    },
    2: {
      B: {
        size: '1.4rem',
        lineHeight: '150%',
        weight: 700,
      },
      M: {
        size: '1.4rem',
        lineHeight: '150%',
        weight: 500,
      },
      R: {
        size: '1.4rem',
        lineHeight: '150%',
        weight: 400,
      },
    },
  },
} as const;

export default font;

export type FontType = typeof font;
