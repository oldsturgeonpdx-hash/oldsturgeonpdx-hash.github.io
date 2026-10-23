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
  name: "Old Sturgeon PDX",
  tagline: "Neighborhood walks, art, myth and puzzles in handmade mini zines.",
  shopUrl: "",   // paste your Etsy shop link here, e.g. "https://www.etsy.com/shop/..."
  email: ""      // paste a feedback address here, or leave empty to hide it
};

const ZINES = [
  {
    issue: 1,
    title: "The Sellwood Sidewalk Sleuth",
    blurb: "A neighborhood walk with riddles along the way.",
    archiveId: "",
    localPages: 8
  },
  {
    issue: 2,
    title: "Strangers in a Strange Wetland",
    blurb: "A nutria tells its own story and pushes back on the label “invasive species.”",
    archiveId: "",
    localPages: 8
  },
  {
    issue: 3,
    title: "Secrets of a mole",      
    blurb: "Where does Knapp Street go when you can’t see it?",
    archiveId: "",
    localPages: 8
  },
  {
    issue: 4,
    title: "Up and Important in Sellwood and Moreland",
    blurb: "Walk 40 minutes of Sellwood pretending to be extremely important.",
    archiveId: "",
    localPages: 8
  },
  {
    issue: 5,
    title: "Honey Loaf: A Recipe for Courage",      
    blurb: "A honey-sweet recipe, with a wand-waving bee as your guide.",
    archiveId: "",
    localPages: 8
  },
  {
    issue: 6,
    title: "Cousins",     
    blurb: "Two jays, one pandemic, and a very fancy cat-print mask.",
    archiveId: "",
    localPages: 8              // Enables local flipbook reading for 8 images
  }
];
