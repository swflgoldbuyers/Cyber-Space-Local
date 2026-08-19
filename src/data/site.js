/**
 * CyberSpace Local — site configuration
 *
 * Update launch pricing, portfolio demo URLs, and the preview-form
 * endpoint here. The homepage reads these values on load so you don't
 * have to hunt through markup for the numbers that change most often.
 *
 * Portfolio URLs should stay empty until each concept site is live.
 * Empty / null URLs keep the "View Website" action disabled so visitors
 * are never sent to a broken page.
 */

export const site = {
  name: "CyberSpace Local",
  url: "https://cyberspacelocal.com",
  region: "Southwest Florida",

  /**
   * Logo files live in /public.
   * Replace public/logo.svg with the official lockup when it is added.
   * If the official file is a full horizontal lockup, set showWordmark to false.
   */
  logo: {
    src: "./logo.svg",
    showWordmark: true,
  },

  pricing: {
    website: {
      amount: 499,
      display: "$499",
      cadence: "One-time",
    },
    management: {
      amount: 149,
      display: "$149",
      cadence: "/month",
    },
  },

  /**
   * Future hosted concept sites (do not hard-code as live until they exist):
   *   pressure-washing → https://pressurewashing.cyberspacelocal.com
   *   landscaping      → https://landscaping.cyberspacelocal.com
   *   plumbing         → https://plumbing.cyberspacelocal.com
   */
  portfolio: [
    { id: "pressure-washing", url: "" },
    { id: "landscaping", url: "" },
    { id: "plumbing", url: "" },
  ],

  /**
   * Set to a Formspree, Getform, Basin, or custom endpoint when ready.
   * Leave empty to keep the polished frontend with a local success state.
   */
  formEndpoint: "",
};
