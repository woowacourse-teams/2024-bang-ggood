const font = {
  title: {
    1: {
      B: {
        size: '3.6rem',
        lineHeight: '133.4%',
        weight: 600,
        letterSpacing: '-0.027em',
      },
      M: {
        size: '3.6rem',
        lineHeight: '133.4%',
        weight: 500,
        letterSpacing: '-0.027em',
      },
      R: {
        size: '3.6rem',
        lineHeight: '133.4%',
        weight: 400,
        letterSpacing: '-0.027em',
      },
    },
    2: {
      B: {
        size: '2.8rem',
        lineHeight: '135.8%',
        weight: 600,
        letterSpacing: '-0.0236em',
      },
      M: {
        size: '2.8rem',
        lineHeight: '135.8%',
        weight: 500,
        letterSpacing: '-0.0236em',
      },
      R: {
        size: '2.8rem',
        lineHeight: '135.8%',
        weight: 400,
        letterSpacing: '-0.0236em',
      },
    },
    3: {
      B: {
        size: '2.4rem',
        lineHeight: '133.4%',
        weight: 600,
        letterSpacing: '-0.023em',
      },
      M: {
        size: '2.4rem',
        lineHeight: '133.4%',
        weight: 500,
        letterSpacing: '-0.023em',
      },
      R: {
        size: '2.4rem',
        lineHeight: '133.4%',
        weight: 400,
        letterSpacing: '-0.023em',
      },
    },
  },

  heading: {
    1: {
      B: {
        size: '2.2rem',
        lineHeight: '136.4%',
        weight: 600,
        letterSpacing: '-0.0194em',
      },
      M: {
        size: '2.2rem',
        lineHeight: '136.4%',
        weight: 500,
        letterSpacing: '-0.0194em',
      },
      R: {
        size: '2.2rem',
        lineHeight: '136.4%',
        weight: 400,
        letterSpacing: '-0.0194em',
      },
    },

    2: {
      B: {
        size: '2rem',
        lineHeight: '140%',
        weight: 600,
        letterSpacing: '-0.012em',
      },
      M: {
        size: '2rem',
        lineHeight: '140%',
        weight: 500,
        letterSpacing: '-0.012em',
      },
      R: {
        size: '2rem',
        lineHeight: '140%',
        weight: 400,
        letterSpacing: '-0.012em',
      },
    },
  },

  headline: {
    1: {
      B: {
        size: '1.8rem',
        lineHeight: '144.5%',
        weight: 600,
        letterSpacing: '-0.002em',
      },
      M: {
        size: '1.8rem',
        lineHeight: '144.5%',
        weight: 500,
        letterSpacing: '-0.002em',
      },
      R: {
        size: '1.8rem',
        lineHeight: '144.5%',
        weight: 400,
        letterSpacing: '-0.002em',
      },
    },
    2: {
      B: {
        size: '1.7rem',
        lineHeight: '141.2%',
        weight: 600,
        letterSpacing: '0',
      },
      M: {
        size: '1.7rem',
        lineHeight: '141.2%',
        weight: 500,
        letterSpacing: '0',
      },
      R: {
        size: '1.7rem',
        lineHeight: '141.2%',
        weight: 400,
        letterSpacing: '0',
      },
    },
  },

  body: {
    1: {
      B: {
        size: '1.6rem',
        lineHeight: '150%',
        weight: 600,
        letterSpacing: '0.0057em',
      },
      M: {
        size: '1.6rem',
        lineHeight: '150%',
        weight: 500,
        letterSpacing: '0.0057em',
      },
      R: {
        size: '1.6rem',
        lineHeight: '150%',
        weight: 400,
        letterSpacing: '0.0057em',
      },
    },
    2: {
      B: {
        size: '1.5rem',
        lineHeight: '146.7%',
        weight: 600,
        letterSpacing: '0.0096em',
      },
      M: {
        size: '1.5rem',
        lineHeight: '146.7%',
        weight: 500,
        letterSpacing: '0.0096em',
      },
      R: {
        size: '1.5rem',
        lineHeight: '146.7%',
        weight: 400,
        letterSpacing: '0.0096em',
      },
    },
  },

  label: {
    1: {
      B: {
        size: '1.4rem',
        lineHeight: '142.9%',
        weight: 600,
        letterSpacing: '0.0145em',
      },
      M: {
        size: '1.4rem',
        lineHeight: '142.9%',
        weight: 500,
        letterSpacing: '0.0145em',
      },
      R: {
        size: '1.4rem',
        lineHeight: '142.9%',
        weight: 400,
        letterSpacing: '0.0145em',
      },
    },
    2: {
      B: {
        size: '1.3rem',
        lineHeight: '138.5%',
        weight: 600,
        letterSpacing: '0.0194em',
      },
      M: {
        size: '1.3rem',
        lineHeight: '138.5%',
        weight: 500,
        letterSpacing: '0.0194em',
      },
      R: {
        size: '1.3rem',
        lineHeight: '138.5%',
        weight: 400,
        letterSpacing: '0.0194em',
      },
    },
  },
  caption: {
    1: {
      B: {
        size: '1.2rem',
        lineHeight: '133.4%',
        weight: 600,
        letterSpacing: '0.0252em',
      },
      M: {
        size: '1.2rem',
        lineHeight: '133.4%',
        weight: 500,
        letterSpacing: '0.0252em',
      },
      R: {
        size: '1.2rem',
        lineHeight: '133.4%',
        weight: 400,
        letterSpacing: '0.0252em',
      },
    },
  },
} as const;

export default font;

export type FontType = typeof font;
