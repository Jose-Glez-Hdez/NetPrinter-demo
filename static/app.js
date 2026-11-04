// Small progressive enhancements; every page works without them.
document.documentElement.classList.add("js");

document.addEventListener("submit", (e) => {
  const msg = e.target.dataset.confirm;
  if (msg && !confirm(msg)) e.preventDefault();
});
document.addEventListener("change", (e) => {
  if (e.target.matches("[data-autosubmit]")) e.target.form.submit();
});

// Mobile menu: the button folds and unfolds it; Escape closes it.
document.addEventListener("DOMContentLoaded", () => {
  const top = document.getElementById("top");
  const toggle = top && top.querySelector(".menu-toggle");
  if (!toggle) return;
  const setOpen = (open) => {
    top.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  toggle.addEventListener("click", () => setOpen(!top.classList.contains("open")));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && top.classList.contains("open")) {
      setOpen(false);
      toggle.focus();
    }
  });
});

// Search box filtering a table's rows as one types.
document.addEventListener("input", (e) => {
  const sel = e.target.dataset && e.target.dataset.filter;
  if (!sel) return;
  const table = document.querySelector(sel);
  const q = e.target.value.trim().toLowerCase();
  let shown = 0;
  table.querySelectorAll("tbody tr").forEach((tr) => {
    const hit = !q || tr.textContent.toLowerCase().includes(q);
    tr.hidden = !hit;
    if (hit) shown++;
  });
  const none = document.getElementById(table.id + "-none");
  if (none) none.hidden = shown > 0;
});

// Printer lists: the figures above filter them, the search box narrows
// them; sites left empty fold away. Rows of a table open their printer.
document.addEventListener("DOMContentLoaded", () => {
  const search = document.querySelector("input[data-items]");
  const items = [...document.querySelectorAll(".printer-item")];
  const buttons = [...document.querySelectorAll(".filters [data-show]")];
  if (!items.length) return;
  let show = "";
  const apply = () => {
    const q = search ? search.value.trim().toLowerCase() : "";
    let shown = 0;
    items.forEach((it) => {
      const tags = " " + (it.dataset.tags || "") + " ";
      const hit = (!show || tags.includes(" " + show + " ")) && (!q || it.dataset.search.includes(q) || it.textContent.toLowerCase().includes(q));
      it.hidden = !hit;
      if (hit) shown++;
    });
    document.querySelectorAll(".site-group").forEach((g) => {
      g.hidden = !g.querySelector(".printer-item:not([hidden])");
    });
    const none = document.getElementById("printers-none");
    if (none) none.hidden = shown > 0;
  };
  buttons.forEach((b) => b.addEventListener("click", () => {
    show = b.dataset.show === show ? "" : b.dataset.show;
    buttons.forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.show === show)));
    apply();
  }));
  if (search) search.addEventListener("input", apply);
  document.querySelectorAll("tr[data-href]").forEach((tr) => tr.addEventListener("click", (e) => {
    if (!e.target.closest("a, button, input, select")) location.href = tr.dataset.href;
  }));
});

// The user menu closes on a click elsewhere or on Escape.
document.addEventListener("click", (e) => {
  document.querySelectorAll("details.user-menu[open], details.newclient[open]").forEach((d) => {
    if (!d.contains(e.target)) d.open = false;
  });
});
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  document.querySelectorAll("details.user-menu[open]").forEach((d) => {
    d.open = false;
    d.querySelector("summary").focus();
  });
});

// Chart tooltip: one readout per month column, on hover and on keyboard
// focus. Built with textContent; every value is also in the table view.
document.addEventListener("DOMContentLoaded", () => {
  const tip = document.createElement("div");
  tip.className = "chart-tip";
  tip.hidden = true;
  tip.setAttribute("role", "status");
  document.body.appendChild(tip);

  const row = (keyClass, value, label) => {
    const r = document.createElement("div");
    r.className = "tip-row";
    if (keyClass) {
      const k = document.createElement("span");
      k.className = "line-key key " + keyClass;
      r.appendChild(k);
    }
    const v = document.createElement("strong");
    v.textContent = value;
    r.appendChild(v);
    r.appendChild(document.createTextNode(" " + label));
    return r;
  };
  const show = (col, x, y) => {
    const fig = col.closest(".chart");
    const d = col.dataset, l = fig.dataset;
    tip.replaceChildren();
    const title = document.createElement("div");
    title.className = "tip-title";
    title.textContent = d.month;
    tip.appendChild(title);
    if (!d.total) {
      tip.appendChild(row("", "", l.lNodata));
    } else {
      tip.appendChild(row("s-mono", d.mono, l.lMono));
      if (d.color) {
        tip.appendChild(row("s-color", d.color, l.lColor));
        tip.appendChild(row("", d.total, l.lTotal));
      }
    }
    tip.hidden = false;
    const w = tip.offsetWidth, h = tip.offsetHeight;
    tip.style.left = Math.max(8, Math.min(x + 14, window.innerWidth - w - 8)) + "px";
    tip.style.top = Math.max(8, y - h - 12) + "px";
  };
  const hide = () => { tip.hidden = true; };

  document.querySelectorAll(".plot .col").forEach((col) => {
    col.addEventListener("pointermove", (e) => show(col, e.clientX, e.clientY));
    col.addEventListener("pointerleave", hide);
    col.addEventListener("focus", () => {
      const r = col.getBoundingClientRect();
      show(col, r.left + r.width / 2, r.top + 20);
    });
    col.addEventListener("blur", hide);
  });
});
