/*
  Product catalogue. To add a product, copy one block and edit it.

  cat      : sarees | jewellery | food | crafts | home
  town     : Salem | Erode | Dharmapuri | Other     ("Salem" shows the Made in Salem badge, use it only when true)
  type     : drawing used until a photo is added (butta, plain, stripe, anklet, sago, basket, turmeric, towel)
  image    : optional photo path, e.g. "images/peacock-green.jpg". When set, it replaces the drawing.
  hex      : main colour (also used by the colour filter)
  border   : saree border colour. stripe: stripe colour for type "stripe".
  price    : number in rupees

  Every product below is a SAMPLE for testing the layout. Replace them with real products.
*/
window.PRODUCTS = [
  { id:"s1", cat:"sarees", type:"butta",  town:"Salem",  name:"Peacock Green Silk Saree",        fabric:"Silk",   colour:"Peacock green", hex:"#0E5A4F", border:"#A91F2E", price:8500,  spec:"5.5 m saree with 0.8 m blouse piece", dispatch:"Ships in 3 to 5 days", care:"Dry clean only. Store folded in muslin." },
  { id:"s2", cat:"sarees", type:"butta",  town:"Salem",  name:"Madder Red Silk Saree",           fabric:"Silk",   colour:"Madder red",    hex:"#9E1F2C", border:"#D9A93C", price:11200, spec:"5.5 m saree with 0.8 m blouse piece", dispatch:"Ships in 3 to 5 days", care:"Dry clean only. Store folded in muslin." },
  { id:"s3", cat:"sarees", type:"plain",  town:"Salem",  name:"Indigo Cotton Saree",             fabric:"Cotton", colour:"Indigo",        hex:"#27407A", border:"#EFE8D8", price:1950,  spec:"5.5 m saree, blouse piece to be confirmed", dispatch:"Ships in 2 to 3 days", care:"Gentle hand wash in cold water. Dry in shade." },
  { id:"s4", cat:"sarees", type:"stripe", town:"Erode",  name:"Marigold Striped Cotton Saree",   fabric:"Cotton", colour:"Marigold",      hex:"#E0A21B", border:"#7A1626", stripe:"#8A5A00", price:1650, spec:"5.5 m saree, blouse piece to be confirmed", dispatch:"Ships in 2 to 3 days", care:"Gentle hand wash in cold water. Dry in shade." },
  { id:"s5", cat:"sarees", type:"butta",  town:"Other",  name:"Ivory Silk Saree, Maroon Border", fabric:"Silk",   colour:"Ivory",         hex:"#EFE8D8", border:"#7A1626", price:7400,  spec:"5.5 m saree with 0.8 m blouse piece", dispatch:"Ships in 3 to 5 days", care:"Dry clean only. Store folded in muslin." },
  { id:"s6", cat:"sarees", type:"plain",  town:"Other",  name:"Rose Pink Cotton Saree",          fabric:"Cotton", colour:"Rose pink",     hex:"#C45A78", border:"#EFE8D8", price:2200,  spec:"5.5 m saree, blouse piece to be confirmed", dispatch:"Ships in 2 to 3 days", care:"Gentle hand wash in cold water. Dry in shade." },
  { id:"j1", cat:"jewellery", type:"anklet",   town:"Salem",      name:"Silver Kolusu Anklet Pair",  fabric:"Silver",  colour:"Silver",  hex:"#C9CED3", price:2400, spec:"Pair, length to be confirmed per piece", dispatch:"Ships in 2 to 3 days", care:"Wipe with a soft cloth. Store away from damp." },
  { id:"f1", cat:"food",      type:"sago",     town:"Salem",      name:"Javvarisi Vadam, 250 g",     fabric:"Sago",    colour:"Natural", hex:"#F2EAD6", price:160,  spec:"250 g pack", dispatch:"Ships in 1 to 2 days", care:"Keep dry in an airtight tin. Sun-dry before frying." },
  { id:"f2", cat:"food",      type:"turmeric", town:"Erode",      name:"Turmeric Powder, 200 g",     fabric:"Turmeric",colour:"Yellow",  hex:"#E0A21B", price:120,  spec:"200 g pack", dispatch:"Ships in 1 to 2 days", care:"Store in a dry airtight jar." },
  { id:"h1", cat:"crafts",    type:"basket",   town:"Dharmapuri", name:"Palm-Leaf Gift Box",         fabric:"Palm leaf",colour:"Natural",hex:"#B88A52", price:650,  spec:"Round lidded box, size to be confirmed", dispatch:"Ships in 3 to 5 days", care:"Keep dry. Wipe with a dry cloth." },
  { id:"t1", cat:"home",      type:"towel",    town:"Erode",      name:"Cotton Bath Towel Set of 2", fabric:"Cotton",  colour:"Teal",    hex:"#2F7F86", price:780,  spec:"Set of 2, size to be confirmed", dispatch:"Ships in 2 to 3 days", care:"Machine wash cold. Dry in shade." }
];
