// ----------------------------------------------------------------------

const ROOTS = {
  SIGN_IN: '/sign-in',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  STATISTICS: '/statistics',
  SALES: '/sales',
  REWARD: '/reward',
  RESOURCE: '/resource',
  PROFILE: '/profile',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  signIn: ROOTS.SIGN_IN,

  // FORGOT PASSWORD
  forgotPassword: ROOTS.FORGOT_PASSWORD,

  // RESET PASSWORD
  resetPassword: ROOTS.RESET_PASSWORD,

  // STATISTICS
  statistics: { root: ROOTS.STATISTICS },

  // DASHBOARD
  dashboard: {
    root: '/',
    history: {
      root: ROOTS.DASHBOARD,
    },
    sales: {
      root: ROOTS.SALES,
      edit: (id: string) => `${ROOTS.SALES}/${id}`,
      new: `${ROOTS.SALES}/new`,
    },
    reward: {
      root: ROOTS.REWARD,
      new: `${ROOTS.REWARD}/new`,
      edit: (id: string) => `${ROOTS.REWARD}/new/${id}`,
      detail: (id: string) => `${ROOTS.REWARD}/${id}`,
      view: (id: string) => `${ROOTS.REWARD}/statistics/${id}`,
    },
    resource: { root: ROOTS.RESOURCE, view: (slug: string) => `${ROOTS.RESOURCE}/${slug}` },
    profile: {
      root: ROOTS.PROFILE,
    },
  },
  notFound: '/404',
};
