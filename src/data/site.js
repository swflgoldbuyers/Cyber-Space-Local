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

  logo: {
    src: "./logo-mark.jpg",
    lockup: "./logo.jpg",
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
   * TODO: Connect the preview form to an external submission service.
   *
   * GitHub Pages is static — there is no server-side backend here.
   * Set `formEndpoint` to a Formspree, Getform, Basin, Basin-compatible,
   * or custom HTTPS endpoint when one exists.
   *
   * The form in index.html posts JSON with:
   *   name, business, phone, email, website, type, city, help
   *
   * Leave empty until that service is ready. Do not store submissions
   * in localStorage or anywhere else in the browser.
   */
  formEndpoint: "",
};
