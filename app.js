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
      const ready = Boolean(z.archiveId);
      const card = el(ready ? "a" : "div", ready
        ? { class: "issue", href: "zine.html?issue=" + z.issue }
        : { class: "issue soon" });

      const cover = el("div", { class: "cover" });
      if (ready) {
        const img = el("img", {
          src: "https://archive.org/services/img/" + encodeURIComponent(z.archiveId),
          alt: "",
          loading: "lazy"
        });
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

    if (!z || !z.archiveId) {
      main.append(
        el("h1", { class: "reader-title", text: "That issue isn\u2019t online yet" }),
        el("p", { text: "Pick another one from the shelf." })
      );
      return;
    }

    document.title = z.title + " \u2013 " + SITE.name;

    const head = el("div", { class: "reader-head" }, [
      el("span", { class: "tag", text: "No. " + z.issue }),
      el("h1", { class: "reader-title", text: z.title })
    ]);
    if (z.blurb) head.append(el("p", { class: "issue-blurb", text: z.blurb }));

    const frame = el("div", { class: "frame" }, [
      el("iframe", {
        src: "https://archive.org/embed/" + encodeURIComponent(z.archiveId),
        title: z.title,
        loading: "lazy",
        allowfullscreen: ""
      })
    ]);

    const links = el("p", { class: "reader-links" }, [
      el("a", {
        href: "https://archive.org/details/" + encodeURIComponent(z.archiveId),
        text: "Open on archive.org to download or print"
      })
    ]);

    const nav = el("nav", { class: "pager", "aria-label": "Other issues" });
    const prev = ZINES[i - 1], next = ZINES[i + 1];
    if (prev && prev.archiveId) nav.append(el("a", { href: "zine.html?issue=" + prev.issue, text: "Previous: No. " + prev.issue }));
    if (next && next.archiveId) nav.append(el("a", { href: "zine.html?issue=" + next.issue, text: "Next: No. " + next.issue }));

    main.append(head, frame, links, nav);
  }

  const tl = document.getElementById("tagline");
  if (tl) tl.textContent = SITE.tagline;
  renderFooter();
  if (document.body.dataset.page === "home") renderHome();
  else renderZine();
})();
