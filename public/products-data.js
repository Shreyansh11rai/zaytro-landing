export const PRODUCT_WEIGHTS = [
  { value: "50g", label: "50g" },
  { value: "100g", label: "100g" },
  { value: "200g", label: "200g" },
  { value: "250g", label: "250g" },
  { value: "500g", label: "500g" },
  { value: "1kg", label: "1kg" },
];

const imagePaths = (small, medium, bulk) => ({
  "50g": small,
  "100g": medium,
  "200g": bulk,
  "250g": bulk,
  "500g": bulk,
  "1kg": bulk,
});

export const PRODUCTS = [
  {
    id: "meat-masala",
    name: "Meat Masala",
    category: "Meat & curry",
    description: "A warming blend for meat and curry recipes.",
    images: imagePaths(
      "public/prod_images/meat-pd-50g.jpeg",
      "public/prod_images/meat-pd-100g.jpeg",
      "public/prod_images/meat-pd-pk.jpeg",
    ),
    featured: false,
    offer: null,
  },
  {
    id: "chicken-masala",
    name: "Chicken Masala",
    category: "Meat & curry",
    description: "A familiar spice blend for chicken dishes and everyday cooking.",
    images: imagePaths(
      "public/prod_images/chicken-pd-50g.jpeg",
      "public/prod_images/chicken-pd-100g.jpeg",
      "public/prod_images/chicken-pd-pk.jpeg",
    ),
    featured: false,
    offer: null,
  },
  {
    id: "garam-masala",
    name: "Garam Masala",
    category: "Kitchen staple",
    description: "A finishing masala for curries, dals and everyday home cooking.",
    images: imagePaths(
      "public/prod_images/garam-pd-50g.jpeg",
      "public/prod_images/garam-pd-100g.jpeg",
      "public/prod_images/garam-pd-pk.jpeg",
    ),
    featured: false,
    offer: null,
  },
  {
    id: "haldi-powder",
    name: "Haldi Powder",
    category: "Kitchen staple",
    description: "A pantry staple for everyday recipes.",
    images: imagePaths(
      "public/prod_images/haldi-pd-50g.jpeg",
      "public/prod_images/haldi-pd-100g.jpeg",
      "public/prod_images/haldi-pd-pk.jpeg",
    ),
    featured: false,
    offer: null,
  },
  {
    id: "lal-mirch",
    name: "Lal Mirch Powder",
    category: "Kitchen staple",
    description: "A familiar chilli powder for everyday cooking.",
    images: imagePaths(
      "public/prod_images/mirch-pd-pk.jpeg",
      "public/prod_images/lal-mirch-pd-100.jpeg",
      "public/prod_images/mirch-pd-pk.jpeg",
    ),
    featured: false,
    offer: null,
  },
  {
    id: "dhaniya-powder",
    name: "Dhaniya Powder",
    category: "Kitchen staple",
    description: "A versatile pantry staple for curries and home-style meals.",
    images: imagePaths(
      "public/prod_images/dhaniya-pd-50g.jpeg",
      "public/prod_images/dhaniya-pd-100g.jpeg",
      "public/prod_images/dhaniya-pd-pk.jpeg",
    ),
    featured: false,
    offer: null,
  },
];
