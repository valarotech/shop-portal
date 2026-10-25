# Regional shop portal (working name: ValaroBazaar)

A static storefront for makers in Salem, Erode, Dharmapuri and nearby, with a separate Made in Salem collection and sarees from across India. It runs on GitHub Pages with no build step and no server.

Orders currently turn into a prefilled WhatsApp message. Online payment, stock and courier rates need a real platform or backend (see "Next steps").

## Files

| File | What you edit it for |
|---|---|
| `config.js` | Brand name, WhatsApp number, operator name. Renaming the brand is a one-line change. |
| `products.js` | The catalogue. Copy a block to add a product. Set `town` to `Salem` only when it is truly made in Salem. |
| `images/` | Product photos. Put a file here and set `image: "images/name.jpg"` on the product. |
| `index.html` | Page text, policies, seller details (search for the highlighted `[ ... ]` placeholders). |
| `style.css`, `app.js` | Look and behaviour. |

## Run it locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder.

## Publish on GitHub Pages

1. Push this folder to the repository's `main` branch.
2. Repository Settings, Pages, Source: Deploy from a branch, branch `main`, folder `/ (root)`.
3. The site appears at `https://<owner>.github.io/<repo>/`.

## Use your own domain

Pick one:

- Subdomain of a domain you already own, for example `shop.valarotech.com`. Add a `CNAME` DNS record `shop` pointing to `<owner>.github.io`.
- A new domain. Add four `A` records for the apex to GitHub's Pages addresses (listed in GitHub's Pages docs) and a `CNAME` for `www`.

Then add a file named `CNAME` containing only the domain, and tick "Enforce HTTPS" in Pages settings.

## Before launch checklist

- Replace every sample product and add real photos.
- Fill the highlighted seller fields in `index.html`: legal name, full address, GSTIN, grievance officer, support email.
- Set the WhatsApp number in `config.js`.
- Have a chartered accountant or lawyer review the policy drafts.
- Do not use words like pure silk, handloom, GI tag or Silk Mark unless the product is certified for it.

## Next steps

When orders grow, move checkout to a platform that handles payments, tax and stock (Shopify, or WooCommerce on existing hosting) and keep this repo as the design and content source.

## Online payments (Razorpay) and GST invoices

Checkout calls the `shop-create-order` Supabase edge function (in the valarodigital-site repo). The server recomputes prices, GST and shipping (Rs 50 Tamil Nadu, Rs 80 other states), creates the Razorpay order, and the shared `razorpay-webhook` marks it paid, issues a GST invoice (`VE/2627/NNNN`), emails the buyer and emails the shop owner to pack it.

`config.js` holds only public values (Supabase URL, anon key). Never add the Razorpay Key Secret, webhook secret or service_role key to this repo.

Ordering stays closed (`onlinePayment:false` here, and `rate_confirmed=false` per product in the `shop_products` table) until:
1. A CA confirms the HSN code and GST rate for each product, and the table is updated.
2. Real products, photos and prices replace the samples (`products.js` ids must match `shop_products.id`).
3. GST registration covers goods; FSSAI is in place for food items.
4. Grievance officer name and return window days are filled in `index.html`.
5. A small real test purchase passes; then set `onlinePayment: true`.
