(function(){
  "use strict";
  var SITE = window.SITE || {};
  var BRAND = SITE.brand || "Shop";
  var PRODUCTS = window.PRODUCTS || [];
  var GOLD = "#D9A93C";
  var CATS = { sarees:"Sarees", jewellery:"Silver and jewellery", food:"Food", crafts:"Handicrafts", home:"Home textiles" };
  var ORIGINS = [
    { v:"all", l:"Anywhere" }, { v:"Salem", l:"Made in Salem" }, { v:"Erode", l:"Erode" },
    { v:"Dharmapuri", l:"Dharmapuri" }, { v:"Other", l:"Elsewhere in India" }
  ];
  function originLabel(t){ return t === "Salem" ? "Salem" : t === "Other" ? "Elsewhere in India" : t; }

  var MAXP = Math.max(500, Math.ceil(Math.max.apply(null, PRODUCTS.map(function(p){ return p.price; }).concat([100])) / 500) * 500);
  var F = fresh();
  function fresh(){ return { cat:"all", origin:"all", fabric:"all", colour:"all", max:MAXP, sort:"featured" }; }
  var cart = {};
  try { var raw = localStorage.getItem("kh-cart"); if (raw) cart = JSON.parse(raw) || {}; } catch(e){}

  var INR = new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", maximumFractionDigits:0 });
  function $(s, r){ return (r || document).querySelector(s); }
  function $$(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s){ return String(s).replace(/[&<>"']/g, function(m){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]; }); }
  function byId(id){ return PRODUCTS.filter(function(p){ return p.id === id; })[0]; }
  function saveCart(){ try { localStorage.setItem("kh-cart", JSON.stringify(cart)); } catch(e){} }

  /* Brand and contact settings */
  document.title = BRAND;
  $$("[data-brand]").forEach(function(el){ el.textContent = BRAND; });
  $$("[data-operator]").forEach(function(el){ if (SITE.operatedBy) el.textContent = SITE.operatedBy; });
  function waUrl(text){ return "https://wa.me/" + (SITE.whatsapp || "") + "?text=" + encodeURIComponent(text); }
  $$("[data-wa]").forEach(function(a){ a.href = waUrl(a.getAttribute("data-wa")); });

  /* Kolam drawing */
  (function(){
    var n = 4, s = 40, cx = 220, cy = 220, out = "", dots = "";
    out += '<circle class="k-frame" cx="220" cy="220" r="216"/><circle class="k-frame" cx="220" cy="220" r="208"/>';
    for (var r = -n; r <= n; r++) {
      var k = n - Math.abs(r);
      for (var i = -k; i <= k; i += 2) {
        var x = cx + i * s, y = cy + r * s;
        out += '<circle class="k-ring" cx="' + x + '" cy="' + y + '" r="' + s + '"/>';
        dots += '<circle class="k-dot" cx="' + x + '" cy="' + y + '" r="3.6"/>';
      }
    }
    $("#kolam-art").innerHTML = out + dots;
  })();

  /* Drawings used until a real photo is added */
  function swatch(p){
    var s = '<svg viewBox="0 0 240 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
    var x, y, i, j, a, bx, by;
    if (p.cat === "sarees") {
      s += '<rect width="240" height="300" fill="' + p.hex + '"/>';
      if (p.type === "stripe") { for (x = 0; x < 240; x += 16) s += '<rect x="' + x + '" width="5" height="300" fill="' + (p.stripe || "#000") + '" opacity=".55"/>'; }
      if (p.type === "butta") {
        for (j = 0; j < 6; j++) for (i = 0; i < 5; i++) {
          x = 24 + i * 48 + (j % 2 ? 24 : 0); y = 26 + j * 30;
          s += '<path d="M' + x + ' ' + (y - 7) + 'l6 7l-6 7l-6 -7z" fill="' + GOLD + '" opacity=".6"/>';
        }
      }
      s += '<polygon points="0,0 240,0 240,46 0,100" fill="#fff" opacity=".07"/>';
      s += '<rect y="214" width="240" height="62" fill="' + (p.border || GOLD) + '"/>';
      s += '<rect y="208" width="240" height="4" fill="' + GOLD + '"/><rect y="278" width="240" height="4" fill="' + GOLD + '"/>';
      for (x = 14; x < 240; x += 28) s += '<path d="M' + x + ' 245l9 -13l9 13l-9 13z" fill="' + GOLD + '" opacity=".85"/>';
    } else if (p.type === "anklet") {
      s += '<ellipse cx="120" cy="140" rx="78" ry="92" fill="none" stroke="#9AA3AB" stroke-width="3"/>';
      for (a = 0; a < 360; a += 15) { bx = 120 + 78 * Math.cos(a * Math.PI / 180); by = 140 + 92 * Math.sin(a * Math.PI / 180); s += '<circle cx="' + bx.toFixed(1) + '" cy="' + by.toFixed(1) + '" r="6" fill="#E4E8EC" stroke="#9AA3AB" stroke-width="1.5"/>'; }
      for (a = 50; a <= 130; a += 20) { bx = 120 + 78 * Math.cos(a * Math.PI / 180); by = 140 + 92 * Math.sin(a * Math.PI / 180) + 12; s += '<circle cx="' + bx.toFixed(1) + '" cy="' + by.toFixed(1) + '" r="10" fill="#D7DCE1" stroke="#8D969E" stroke-width="2"/><circle cx="' + bx.toFixed(1) + '" cy="' + (by + 5).toFixed(1) + '" r="2" fill="#6F7880"/>'; }
    } else if (p.type === "sago") {
      s += '<circle cx="120" cy="150" r="96" fill="#E7DCC0"/>';
      [[90,120],[140,110],[170,150],[75,170],[120,160],[150,195],[100,205],[185,115],[60,130]].forEach(function(q){ s += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="26" fill="#F7F1E1" stroke="#D3C39B" stroke-width="2"/><circle cx="' + (q[0] - 6) + '" cy="' + (q[1] - 4) + '" r="2" fill="#D3C39B"/><circle cx="' + (q[0] + 7) + '" cy="' + (q[1] + 6) + '" r="2" fill="#D3C39B"/>'; });
    } else if (p.type === "turmeric") {
      s += '<ellipse cx="120" cy="214" rx="92" ry="26" fill="#9A6B2E"/>';
      s += '<path d="M28 214 Q36 120 120 112 Q204 120 212 214 Q120 244 28 214z" fill="#8A5E27"/>';
      s += '<path d="M62 168 Q120 78 178 168 Q120 192 62 168z" fill="' + p.hex + '"/><path d="M84 150 Q120 104 156 150 Q120 164 84 150z" fill="#F2BE3A"/>';
    } else if (p.type === "towel") {
      [[40,170,"#fff"],[48,128,"#fff"],[56,86,"#fff"]].forEach(function(r, k){ s += '<rect x="' + (r[0] - 10 + k * 6) + '" y="' + (r[1] + 20) + '" width="190" height="44" rx="6" fill="' + p.hex + '" opacity="' + (1 - k * 0.18) + '"/><rect x="' + (r[0] - 10 + k * 6) + '" y="' + (r[1] + 30) + '" width="190" height="5" fill="#fff" opacity=".6"/><rect x="' + (r[0] - 10 + k * 6) + '" y="' + (r[1] + 50) + '" width="190" height="5" fill="#fff" opacity=".6"/>'; });
    } else {
      s += '<ellipse cx="120" cy="120" rx="82" ry="24" fill="#C79A60" stroke="#8E6736" stroke-width="3"/>';
      s += '<path d="M38 120 L50 228 Q120 262 190 228 L202 120 Q120 150 38 120z" fill="#B88A52" stroke="#8E6736" stroke-width="3"/>';
      for (y = 150; y < 240; y += 16) s += '<path d="M46 ' + y + ' Q120 ' + (y + 28) + ' 194 ' + y + '" fill="none" stroke="#8E6736" stroke-width="2" opacity=".7"/>';
      for (x = 70; x < 180; x += 24) s += '<path d="M' + x + ' 140 L' + (x + 4) + ' 238" fill="none" stroke="#8E6736" stroke-width="2" opacity=".45"/>';
    }
    return s + '</svg>';
  }
  function pic(p){ return p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy">' : swatch(p); }

  /* Filters and grid */
  function visible(){
    var list = PRODUCTS.filter(function(p){
      return (F.cat === "all" || p.cat === F.cat) && (F.origin === "all" || p.town === F.origin) &&
        (F.fabric === "all" || p.fabric === F.fabric) && (F.colour === "all" || p.colour === F.colour) && p.price <= F.max;
    });
    if (F.sort === "low") list.sort(function(a, b){ return a.price - b.price; });
    if (F.sort === "high") list.sort(function(a, b){ return b.price - a.price; });
    return list;
  }
  function buildControls(){
    var counts = { all: PRODUCTS.length };
    PRODUCTS.forEach(function(p){ counts[p.cat] = (counts[p.cat] || 0) + 1; });
    $("#chips").innerHTML = ["all"].concat(Object.keys(CATS)).map(function(c){
      return '<button type="button" class="chip" data-cat="' + c + '" aria-pressed="false">' + (c === "all" ? "All" : CATS[c]) + '<small class="num">' + (counts[c] || 0) + '</small></button>';
    }).join("");
    $("#f-origin").innerHTML = ORIGINS.map(function(o){ return '<option value="' + o.v + '">' + o.l + '</option>'; }).join("");
    var fabrics = []; PRODUCTS.forEach(function(p){ if (fabrics.indexOf(p.fabric) < 0) fabrics.push(p.fabric); });
    $("#f-fabric").innerHTML = '<option value="all">All</option>' + fabrics.map(function(f){ return '<option>' + esc(f) + '</option>'; }).join("");
    var seen = {}, sw = "";
    PRODUCTS.forEach(function(p){ if (!seen[p.colour]) { seen[p.colour] = 1; sw += '<button type="button" class="sw" data-colour="' + esc(p.colour) + '" style="background:' + p.hex + '" aria-label="' + esc(p.colour) + '" title="' + esc(p.colour) + '" aria-pressed="false"></button>'; } });
    $("#swatches").innerHTML = sw;
    var pr = $("#f-price"); pr.max = MAXP; pr.value = F.max;
  }
  function syncControls(){
    $("#f-origin").value = F.origin; $("#f-fabric").value = F.fabric; $("#f-sort").value = F.sort; $("#f-price").value = F.max;
  }
  function renderTiles(){
    var box = $("#tiles");
    if (F.cat !== "sarees") { box.hidden = true; return; }
    box.hidden = false;
    var tiles = [
      { v:"all", cls:"", t:"All sarees", d:"Everything in one list" },
      { v:"Salem", cls:"salem", t:"Made in Salem", d:"Woven and finished in Salem" },
      { v:"Other", cls:"", t:"From across India", d:"Sarees made outside this region" }
    ];
    box.innerHTML = tiles.map(function(t){
      return '<button type="button" class="tile ' + t.cls + '" data-tile="' + t.v + '" aria-pressed="' + (F.origin === t.v) + '"><strong>' + t.t + '</strong><span>' + t.d + '</span></button>';
    }).join("");
  }
  function render(){
    $$(".chip").forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-cat") === F.cat)); });
    $$(".sw").forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-colour") === F.colour)); });
    $("#price-out").textContent = INR.format(F.max);
    renderTiles();
    var list = visible();
    $("#result-count").textContent = "Showing " + list.length + " of " + PRODUCTS.length + " sample products";
    if (!list.length) { $("#grid").innerHTML = '<p class="empty">Nothing matches those filters. Try a higher price or reset the filters.</p>'; return; }
    $("#grid").innerHTML = list.map(function(p){
      return '<article class="card"><button class="thumb" type="button" data-view="' + p.id + '" aria-label="View ' + esc(p.name) + '">' + pic(p) +
        '<span class="badge">Sample</span>' + (p.town === "Salem" ? '<span class="badge salem">Made in Salem</span>' : '') + '</button>' +
        '<h3>' + esc(p.name) + '</h3><p class="meta">' + esc(originLabel(p.town)) + ' · ' + esc(p.fabric) + '</p>' +
        '<div class="row"><span class="price num">' + INR.format(p.price) + '</span><button class="btn small" type="button" data-add="' + p.id + '">Add to cart</button></div></article>';
    }).join("");
  }
  function jump(){ var el = $("#shop"); if (el && el.scrollIntoView) el.scrollIntoView(); }

  $("#chips").addEventListener("click", function(e){ var b = e.target.closest("[data-cat]"); if (!b) return; F.cat = b.getAttribute("data-cat"); render(); });
  $("#swatches").addEventListener("click", function(e){ var b = e.target.closest("[data-colour]"); if (!b) return; var c = b.getAttribute("data-colour"); F.colour = F.colour === c ? "all" : c; render(); });
  $("#tiles").addEventListener("click", function(e){ var b = e.target.closest("[data-tile]"); if (!b) return; F.origin = b.getAttribute("data-tile"); syncControls(); render(); });
  $("#f-origin").addEventListener("change", function(e){ F.origin = e.target.value; render(); });
  $("#f-fabric").addEventListener("change", function(e){ F.fabric = e.target.value; render(); });
  $("#f-price").addEventListener("input", function(e){ F.max = Number(e.target.value); render(); });
  $("#f-sort").addEventListener("change", function(e){ F.sort = e.target.value; render(); });
  $("#reset").addEventListener("click", function(){ F = fresh(); syncControls(); render(); });
  $$("[data-origin-link]").forEach(function(a){ a.addEventListener("click", function(e){ e.preventDefault(); F = fresh(); F.origin = a.getAttribute("data-origin-link"); syncControls(); render(); jump(); }); });
  $$("[data-cat-link]").forEach(function(a){ a.addEventListener("click", function(e){ e.preventDefault(); F = fresh(); F.cat = a.getAttribute("data-cat-link"); syncControls(); render(); jump(); }); });

  var tt;
  function toast(msg){ var t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(tt); tt = setTimeout(function(){ t.hidden = true; }, 2200); }
  function openDlg(d){ try { d.showModal(); } catch(e){ d.setAttribute("open", ""); } }
  function closeDlg(d){ try { d.close(); } catch(e){ d.removeAttribute("open"); } }
  $$("dialog").forEach(function(d){ d.addEventListener("click", function(e){ if (e.target === d || e.target.closest("[data-close]")) closeDlg(d); }); });

  /* Product quick view */
  function openView(id){
    var p = byId(id); if (!p) return;
    var isSaree = p.cat === "sarees";
    $("#view-body").innerHTML =
      '<div class="pic">' + pic(p) + '</div>' +
      '<div><p class="label muted">' + esc(CATS[p.cat] || "") + ' · ' + esc(originLabel(p.town)) + '</p><h2 id="view-title" style="margin-top:8px">' + esc(p.name) + '</h2>' +
      '<p class="price num">' + INR.format(p.price) + '</p>' +
      '<dl><dt>Made in</dt><dd>' + esc(originLabel(p.town)) + '</dd><dt>Fabric</dt><dd>' + esc(p.fabric) + '</dd><dt>' + (isSaree ? "Length" : "Size") + '</dt><dd>' + esc(p.spec || "") + '</dd>' +
      '<dt>Colour</dt><dd>' + esc(p.colour) + '</dd><dt>Dispatch</dt><dd>' + esc(p.dispatch || "") + '</dd><dt>Care</dt><dd>' + esc(p.care || "") + '</dd></dl>' +
      '<p class="note">Sample listing. Photos, specifications, origin and price are placeholders until real stock is added.</p>' +
      '<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:16px"><button class="btn" type="button" data-add="' + p.id + '">Add to cart</button>' +
      '<a class="btn ghost" target="_blank" rel="noopener" href="' + waUrl("Hello " + BRAND + ", I have a question about: " + p.name) + '">Ask on WhatsApp</a></div>' +
      '<div style="margin-top:20px"><label class="lab" for="pin-in">Check delivery pin code</label>' +
      '<div class="pin"><input id="pin-in" type="text" inputmode="numeric" maxlength="6" placeholder="6-digit pin code" autocomplete="postal-code"><button class="btn ghost small" type="button" id="pin-go">Check</button></div>' +
      '<p class="note" id="pin-msg" style="margin-top:6px" aria-live="polite"></p></div></div>';
    openDlg($("#view-dlg"));
  }
  $("#view-body").addEventListener("click", function(e){
    if (e.target.id === "pin-go") {
      var v = $("#pin-in").value.trim(), m = $("#pin-msg");
      m.textContent = /^[1-9][0-9]{5}$/.test(v) ? "Pin code format is valid. Delivery time and charge appear here once courier rates are connected." : "Enter a valid 6-digit Indian pin code.";
    }
  });

  /* Cart */
  function cartItems(){ return Object.keys(cart).map(function(id){ return { p:byId(id), q:cart[id] }; }).filter(function(x){ return x.p && x.q > 0; }); }
  function cartTotal(){ return cartItems().reduce(function(t, x){ return t + x.p.price * x.q; }, 0); }
  function updateCount(){ $("#cart-count").textContent = cartItems().reduce(function(t, x){ return t + x.q; }, 0); }
  function orderText(extra){
    var lines = cartItems().map(function(x){ return "- " + x.p.name + " (" + originLabel(x.p.town) + ") x " + x.q + " = " + INR.format(x.p.price * x.q); });
    return "Hello " + BRAND + ", I would like to order:\n" + lines.join("\n") + "\nItems total: " + INR.format(cartTotal()) + (extra ? "\n" + extra : "");
  }
  var STATES = ["Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Ladakh","Lakshadweep","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Puducherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];
  function shipFor(st){ return st === "Tamil Nadu" ? SITE.shipTN : SITE.shipOther; }
  function totalsHtml(st){
    return '<div class="sub"><span>Items total (incl. GST)</span><span class="num">' + INR.format(cartTotal()) + '</span></div>' +
      '<div class="sub"><span>Shipping</span><span class="num" id="co-ship">' + INR.format(shipFor(st)) + '</span></div>' +
      '<div class="sub"><strong>Total</strong><strong class="num" id="co-total">' + INR.format(cartTotal() + shipFor(st)) + '</strong></div>';
  }
  document.addEventListener("change", function(e){
    if (e.target && e.target.id === "co-state") { window.__shipState = e.target.value; $("#co-ship").textContent = INR.format(shipFor(e.target.value)); $("#co-total").textContent = INR.format(cartTotal() + shipFor(e.target.value)); }
  });
  var rzpP = null;
  function loadRzp(){ if (window.Razorpay) return Promise.resolve(); if (!rzpP) rzpP = new Promise(function(ok, no){ var sc = document.createElement("script"); sc.src = "https://checkout.razorpay.com/v1/checkout.js"; sc.onload = ok; sc.onerror = function(){ rzpP = null; no(new Error("load")); }; document.head.appendChild(sc); }); return rzpP; }
  function payOnline(f, err){
    var btn = $("#co-submit"); btn.disabled = true; btn.textContent = "Please wait...";
    var rzpReady = loadRzp();
    var fail = function(m){ err.textContent = m; btn.disabled = false; btn.textContent = "Pay now"; };
    fetch(SITE.SUPABASE_URL + "/functions/v1/shop-create-order", { method:"POST", headers:{ "Content-Type":"application/json", apikey:SITE.SUPABASE_ANON_KEY, Authorization:"Bearer " + SITE.SUPABASE_ANON_KEY },
      body: JSON.stringify({ customer_name:f.name, customer_email:f.email, customer_mobile:f.phone, customer_state:f.state, customer_pincode:f.pin, customer_address:f.addr, items: cartItems().map(function(x){ return { id:x.p.id, qty:x.q }; }) }) })
    .then(function(r){ return r.json().then(function(d){ return { ok:r.ok, status:r.status, d:d }; }); })
    .then(function(res){
      if (!res.ok) { fail(res.status === 409 ? "Online ordering is not open yet for one of these items. Please check back soon." : "We could not start the payment. Please check your details and try again."); return; }
      return rzpReady.then(function(){
        var rz = new window.Razorpay({ key:res.d.key_id, order_id:res.d.order_id, amount:res.d.amount, currency:"INR", name:"Valaro Enterprises", description:"Order from " + BRAND,
          prefill:{ name:f.name, email:f.email, contact:f.phone },
          handler:function(){
            cart = {}; saveCart(); updateCount();
            $("#cart-body").innerHTML = '<div class="done"><strong>Payment received. Thank you!</strong><p class="muted">Your tax invoice is on its way to ' + esc(f.email) + '. We will pack your parcel and send tracking details by email.</p></div>';
            $("#cart-foot").innerHTML = '<button class="btn block" type="button" data-close>Continue shopping</button>';
          },
          modal:{ ondismiss:function(){ btn.disabled = false; btn.textContent = "Pay now"; } } });
        rz.open();
      });
    }).catch(function(){ fail("Network problem. Please try again."); });
  }
  function renderCart(mode){
    var items = cartItems(), body = $("#cart-body"), foot = $("#cart-foot");
    updateCount(); saveCart();
    if (!items.length) {
      body.innerHTML = '<p class="muted" style="padding-top:10px">Your cart is empty. Add something from the shop.</p>';
      foot.innerHTML = '<button class="btn ghost block" type="button" data-close>Keep browsing</button>'; return;
    }
    if (mode === "form") {
      var online = !!SITE.onlinePayment, st = window.__shipState || "Tamil Nadu";
      var opts = STATES.map(function(x){ return '<option' + (x === st ? ' selected' : '') + '>' + x + '</option>'; }).join("");
      body.innerHTML = '<form class="form" id="co-form" novalidate><p class="note">Guest checkout. No account needed. We deliver within India.</p>' +
        '<div><label class="lab" for="co-name">Full name</label><input id="co-name" type="text" autocomplete="name"></div>' +
        '<div><label class="lab" for="co-email">Email (invoice is sent here)</label><input id="co-email" type="email" autocomplete="email"></div>' +
        '<div class="two"><div><label class="lab" for="co-phone">Mobile (10 digits)</label><input id="co-phone" type="tel" autocomplete="tel-national"></div>' +
        '<div><label class="lab" for="co-pin">Pin code</label><input id="co-pin" type="text" inputmode="numeric" autocomplete="postal-code"></div></div>' +
        '<div><label class="lab" for="co-state">State</label><select id="co-state">' + opts + '</select></div>' +
        '<div><label class="lab" for="co-addr">Delivery address</label><textarea id="co-addr" autocomplete="street-address"></textarea></div>' +
        '<p class="err" id="co-err" aria-live="polite"></p></form>';
      foot.innerHTML = totalsHtml(st) + (online ? '<button class="btn block" type="button" id="co-submit">Pay now</button>' : '<button class="btn block" type="button" id="co-submit">Prepare my order</button>') + '<button class="btn ghost block" type="button" id="co-back">Back to cart</button>'; return;
    }
    body.innerHTML = items.map(function(x){
      return '<div class="line-item"><div class="th">' + pic(x.p) + '</div><div><div class="nm">' + esc(x.p.name) + '</div><div class="qty"><button type="button" data-dec="' + x.p.id + '" aria-label="Fewer">&minus;</button><output class="num">' + x.q + '</output><button type="button" data-inc="' + x.p.id + '" aria-label="More">+</button></div></div>' +
        '<div style="text-align:right"><div class="num" style="font-weight:600">' + INR.format(x.p.price * x.q) + '</div><button class="link-btn note" type="button" data-rm="' + x.p.id + '">Remove</button></div></div>';
    }).join("");
    foot.innerHTML = '<div class="sub"><span>Items total</span><span class="num">' + INR.format(cartTotal()) + '</span></div>' +
      '<p class="note">Prices include GST. Shipping: ' + INR.format(SITE.shipTN) + ' in Tamil Nadu, ' + INR.format(SITE.shipOther) + ' to other states.</p>' +
      '<button class="btn block" type="button" id="go-form">Checkout as guest</button>';
  }
  function addToCart(id){ cart[id] = (cart[id] || 0) + 1; renderCart(); toast("Added to cart"); }

  document.addEventListener("click", function(e){
    var t;
    if ((t = e.target.closest("[data-add]"))) { addToCart(t.getAttribute("data-add")); return; }
    if ((t = e.target.closest("[data-view]"))) { openView(t.getAttribute("data-view")); return; }
    if ((t = e.target.closest("[data-inc]"))) { cart[t.getAttribute("data-inc")]++; renderCart(); return; }
    if ((t = e.target.closest("[data-dec]"))) { var id = t.getAttribute("data-dec"); cart[id] = Math.max(0, cart[id] - 1); renderCart(); return; }
    if ((t = e.target.closest("[data-rm]"))) { delete cart[t.getAttribute("data-rm")]; renderCart(); return; }
    if (e.target.closest("#go-form")) { renderCart("form"); return; }
    if (e.target.closest("#co-back")) { renderCart(); return; }
    if (e.target.closest("#co-submit")) { submitCheckout(); return; }
  });
  $("#open-cart").addEventListener("click", function(){ renderCart(); openDlg($("#cart-dlg")); });

  function submitCheckout(){
    var f = { name:$("#co-name").value.trim(), email:$("#co-email").value.trim(), phone:$("#co-phone").value.replace(/[\s\-]/g, "").replace(/^(\+91|91|0)(?=[6-9][0-9]{9}$)/, ""), pin:$("#co-pin").value.trim(), state:$("#co-state").value, addr:$("#co-addr").value.trim() }, err = $("#co-err");
    if (f.name.length < 2) { err.textContent = "Enter your full name."; return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) { err.textContent = "Enter a valid email. Your invoice is sent there."; return; }
    if (!/^[6-9][0-9]{9}$/.test(f.phone)) { err.textContent = "Enter a 10-digit Indian mobile number."; return; }
    if (!/^[1-9][0-9]{5}$/.test(f.pin)) { err.textContent = "Enter a valid 6-digit pin code."; return; }
    if (f.addr.length < 8) { err.textContent = "Enter your full delivery address."; return; }
    err.textContent = "";
    if (SITE.onlinePayment) { payOnline(f, err); return; }
    var msg = orderText("Name: " + f.name + "\nEmail: " + f.email + "\nPhone: " + f.phone + "\nDeliver to: " + f.addr + ", " + f.state + " - " + f.pin);
    $("#cart-body").innerHTML = '<div class="done"><strong>Your order request is ready.</strong><p class="muted">Online payment is not switched on yet. Send this request to us on WhatsApp and we will confirm the payment link there.</p>' +
      '<a class="btn wa block" target="_blank" rel="noopener" href="' + waUrl(msg) + '">Send order request on WhatsApp</a></div>';
    $("#cart-foot").innerHTML = '<button class="btn ghost block" type="button" id="co-back">Back to cart</button>';
  }

  /* Sell with us */
  $("#sell-form").addEventListener("submit", function(e){
    e.preventDefault();
    var name = $("#sl-name").value.trim(), town = $("#sl-town").value, phone = $("#sl-phone").value.replace(/[\s\-+]/g, ""), what = $("#sl-what").value.trim(), err = $("#sl-err");
    if (!name) { err.textContent = "Enter your name or shop name."; return; }
    if (!/^[0-9]{8,14}$/.test(phone)) { err.textContent = "Enter a phone number with 8 to 14 digits."; return; }
    if (what.length < 4) { err.textContent = "Tell us what you make or sell."; return; }
    err.textContent = "";
    var msg = "Hello " + BRAND + ", I would like to list my products.\nName: " + name + "\nTown: " + town + "\nPhone: " + phone + "\nProducts: " + what;
    $("#sl-out").innerHTML = '<div class="done"><strong>Your request is ready.</strong><p class="muted">Send it to us on WhatsApp and we will reply there.</p><a class="btn wa block" target="_blank" rel="noopener" href="' + waUrl(msg) + '">Send on WhatsApp</a></div>';
  });

  buildControls(); syncControls(); render(); updateCount();
})();
