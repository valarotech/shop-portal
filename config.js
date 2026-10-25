/*
  Site settings. Edit this file to rename the brand or connect WhatsApp.
  Only public values live here. Never put a Razorpay Key Secret, webhook secret or service_role key in this file.
*/
window.SITE = {
  brand: "ValaroBazaar",                 // working name, change when the domain is confirmed
  whatsapp: "",                          // digits with country code, e.g. "919XXXXXXXXX". Empty opens WhatsApp's contact picker.
  operatedBy: "Valaro Enterprises",
  onlinePayment: false,                  // set true only after GST rates are confirmed and a small real test purchase passes
  SUPABASE_URL: "https://opmpglxwltsxfmanblzk.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbXBnbHh3bHRzeGZtYW5ibHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4MTM0NzUsImV4cCI6MjEwODM4OTQ3NX0.oaLGgEWqgim-r6i81FSlPhjYf0d4iV6QgfvLFw23sic",
  shipTN: 50,                            // shown to buyers; the server recomputes the real charge
  shipOther: 80
};
