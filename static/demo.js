(function () {
  function demoName(path, params) {
    var name = path.replace(/^\/+|\/+$/g, "").replace(/\.[a-z]+$/, "") || "index";
    params.sort(function (a, b) { return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0; });
    if (params.length) name += "__" + params.map(function (p) { return p[0] + "-" + p[1]; }).join("_");
    return name.replace(/\//g, "_").replace(/[^A-Za-z0-9_.-]/g, "-") + ".html";
  }
  function note() {
    var t = document.createElement("div");
    t.className = "demo-toast";
    t.textContent = "Es una demo: los cambios no se guardan.";
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2600);
  }
  function go(form) {
    if ((form.getAttribute("method") || "get").toLowerCase() !== "get") { note(); return; }
    var params = [];
    new FormData(form).forEach(function (v, k) { params.push([k, String(v)]); });
    location.href = demoName(form.getAttribute("action"), params);
  }
  HTMLFormElement.prototype.submit = function () { go(this); };
  document.addEventListener("submit", function (e) { e.preventDefault(); e.stopImmediatePropagation(); go(e.target); }, true);
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (!a) return;
    if (a.matches(".theme-dark, .theme-light")) {
      e.preventDefault();
      document.documentElement.setAttribute("data-theme", a.matches(".theme-dark") ? "dark" : "light");
    } else if (a.hasAttribute("data-demo-off")) {
      e.preventDefault();
      note();
    }
  }, true);
})();
