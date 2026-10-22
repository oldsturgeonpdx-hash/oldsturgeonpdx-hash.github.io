/* ------------------------------------------------------------------
   THE ONLY FILE YOU NEED TO EDIT TO ADD A ZINE.

   1. Upload the zine's PDF to archive.org (Upload button, choose "texts").
   2. When the item page opens, copy the identifier from the address bar.
      Example: https://archive.org/details/old-sturgeon-no-2
                                              ^^^^^^^^^^^^^^^^^ identifier
   3. Paste it into archiveId below, save, and commit the change.
   
   OR FOR LOCAL FLIPBOOKS:
   Leave archiveId empty, and add `localPages: 8` (or however many pages).
   Then upload your page images to `pages/zineX/01.jpg`, etc.
------------------------------------------------------------------- */

const SITE = {
  name: "The Old Sturgeon",
  tagline: "Neighborhood walks, riddles, and puzzles in handmade mini zines.",
  shopUrl: "",   // paste your Etsy shop link here, e.g. "https://www.etsy.com/shop/..."
  email: ""      // paste a feedback address here, or leave empty to hide it
};

const ZINES = [
  {
    issue: 1,
    title: "The Sellwood Sidewalk Sleuth",
    blurb: "A neighborhood walk with riddles along the way.",
    archiveId: ""
    localPages: 8
  },
  {
    issue: 2,
    title: "Strangers in a Strange Wetland",
    blurb: "A nutria tells its own story and pushes back on the label “invasive species.”",
    archiveId: ""
  },
  {
    issue: 3,
    title: "Issue No. 3",      
    blurb: "",
    archiveId: ""
  },
  {
    issue: 4,
    title: "Up and Important in Sellwood and Moreland",
    blurb: "The Life Lessons Issue: a choose-your-own-path walk.",
    archiveId: ""
  },
  {
    issue: 5,
    title: "Issue No. 5",      
    blurb: "",
    archiveId: ""
  },
  {
    issue: 6,
    title: "Issue No. 6",     
    blurb: "Our latest release.",
    archiveId: "",
    localPages: 8              // Enables local flipbook reading for 8 images
  }
];
