(function () {
  "use strict";

  function el(tag, props, children) {
    const node = document.createElement(tag);
    Object.entries(props || {}).forEach(function (pair) {
      const k = pair[0], v = pair[1];
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else node.setAttribute(k, v);
    });
    (children || []).forEach(function (c) { node.append(c); });
    return node;
  }

  function renderFooter() {
    const box = document.getElementById("footer-links");
    if (!box) return;
    if (SITE.shopUrl) box.append(el("a", { href: SITE.shopUrl, text: "Buy printed copies" }));
    if (SITE.email) box.append(el("a", { href: "mailto:" + SITE.email, text: "Send feedback" }));
  }

  function renderHome() {
    const grid = document.getElementById("issues");
    ZINES.forEach(function (z) {
      const ready = Boolean(z.archiveId || z.localPages);
      const card = el(ready ? "a" : "div", ready
        ? { class: "issue", href: "zine.html?issue=" + z.issue }
        : { class: "issue soon" });

      const cover = el("div", { class: "cover" });
      if (ready) {
        let imgSrc = "";
        if (z.archiveId) {
            imgSrc = "https://archive.org/services/img/" + encodeURIComponent(z.archiveId);
        } else if (z.localPages) {
            imgSrc = "pages/zine" + z.issue + "/01.jpg";
        }
        const img = el("img", { src: imgSrc, alt: "", loading: "lazy" });
        img.addEventListener("error", function () { img.remove(); });
        cover.append(img);
      }
      cover.append(el("span", { class: "tag", text: "No. " + z.issue }));

      card.append(cover, el("h2", { class: "issue-title", text: z.title }));
      if (z.blurb) card.append(el("p", { class: "issue-blurb", text: z.blurb }));
      if (!ready) card.append(el("p", { class: "issue-note", text: "Coming soon" }));
      grid.append(card);
    });
  }

  function renderZine() {
    const main = document.getElementById("reader");
    const n = Number(new URLSearchParams(location.search).get("issue"));
    const i = ZINES.findIndex(function (z) { return z.issue === n; });
    const z = ZINES[i];

    if (!z || (!z.archiveId && !z.localPages)) {
      main.append(
        el("h1", { class: "reader-title", text: "That issue isn’t online yet" }),
        el("p", { text: "Pick another one from the shelf." })
      );
      return;
    }

    document.title = z.title + " – " + SITE.name;

    const head = el("div", { class: "reader-head" }, [
      el("span", { class: "tag", text: "No. " + z.issue }),
      el("h1", { class: "reader-title", text: z.title })
    ]);
    if (z.blurb) head.append(el("p", { class: "issue-blurb", text: z.blurb }));

    let frame;
    if (z.archiveId) {
      frame = el("div", { class: "frame" }, [
        el("iframe", {
          src: "https://archive.org/embed/" + encodeURIComponent(z.archiveId),
          title: z.title,
          loading: "lazy",
          allowfullscreen: ""
        })
      ]);
    } else if (z.localPages) {
      const book = el("div", { id: "flipbook", class: "flipbook" });
      for (let p = 1; p <= z.localPages; p++) {
        const pageDiv = el("div", { class: "page" });
        const pageNum = p < 10 ? "0" + p : p;
        pageDiv.append(el("img", { src: "pages/zine" + z.issue + "/" + pageNum + ".jpg", alt: "Page " + p }));
        book.append(pageDiv);
      }
      frame = el("div", { class: "frame local-frame" }, [book]);
    }

    const links = el("p", { class: "reader-links" });
    if (z.archiveId) {
      links.append(el("a", {
        href: "https://archive.org/details/" + encodeURIComponent(z.archiveId),
        text: "Open on archive.org to download or print"
      }));
    } else {
      links.append(el("a", {
        href: "zine-" + z.issue + ".pdf",
        text: "Download PDF to print and fold"
      }));
    }

    const nav = el("nav", { class: "pager", "aria-label": "Other issues" });
    const prev = ZINES[i - 1], next = ZINES[i + 1];
    if (prev && (prev.archiveId || prev.localPages)) nav.append(el("a", { href: "zine.html?issue=" + prev.issue, text: "Previous: No. " + prev.issue }));
    if (next && (next.archiveId || next.localPages)) nav.append(el("a", { href: "zine.html?issue=" + next.issue, text: "Next: No. " + next.issue }));

        const hint = el("p", { class: "hint", text: "Click or drag a page corner to turn the page, or swipe on a phone." });
    main.append(head, hint, frame, links, nav);

    if (z.localPages) {
      setTimeout(function() {
        const bookElem = document.getElementById("flipbook");
        const pageFlip = new St.PageFlip(bookElem, {
          width: 420,
          height: 595,
          size: "stretch",
          minWidth: 280,
          maxWidth: 600,
          minHeight: 396,
          maxHeight: 850,
          showCover: true,
          mobileScrollSupport: false
        });
        pageFlip.loadFromHTML(document.querySelectorAll(".page"));
        bookElem.style.display = "block";
      }, 100);
    }
  }

  const tl = document.getElementById("tagline");
  if (tl) tl.textContent = SITE.tagline;
  renderFooter();
  if (document.body.dataset.page === "home") renderHome();
  else renderZine();
})();
