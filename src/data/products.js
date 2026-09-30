// 60+ products across all categories
// Each: id, name, brand, category, price, mrp, weight (variants), rating, tags, veg, nutrition, image, emoji

const img = (id) => `https://images.unsplash.com/photo-${id}?w=400&q=80`

export const products = [
  // Fruits & Veg
  { id: 'p1', name: 'Banana Robusta', brand: 'FreshFarm', category: 'fruits-veg', price: 49, mrp: 69, weight: ['500g','1kg'], rating: 4.5, tags: ['vegan'], veg: true, nutrition: { cal: 89, protein: 1.1, carbs: 23 }, image: img('1571771894821-9116d4a95a3a'), emoji: '🍌' },
  { id: 'p2', name: 'Red Apples', brand: 'FreshFarm', category: 'fruits-veg', price: 189, mrp: 240, weight: ['500g','1kg','2kg'], rating: 4.7, tags: ['vegan','high-protein'], veg: true, nutrition: { cal: 52, protein: 0.3, carbs: 14 }, image: img('1568382893015-6392e4e2f1a3'), emoji: '🍎' },
  { id: 'p3', name: 'Tomatoes Hybrid', brand: 'FreshFarm', category: 'fruits-veg', price: 39, mrp: 55, weight: ['500g','1kg'], rating: 4.3, tags: ['vegan'], veg: true, nutrition: { cal: 18, protein: 0.9, carbs: 3.9 }, image: img('1546470427-e26264be3637'), emoji: '🍅' },
  { id: 'p4', name: 'Onions', brand: 'FreshFarm', category: 'fruits-veg', price: 35, mrp: 50, weight: ['500g','1kg','2kg'], rating: 4.2, tags: ['vegan'], veg: true, nutrition: { cal: 40, protein: 1.1, carbs: 9 }, image: img('1518977676601-b53df085665a'), emoji: '🧅' },
  { id: 'p5', name: 'Potatoes', brand: 'FreshFarm', category: 'fruits-veg', price: 29, mrp: 45, weight: ['500g','1kg','2kg'], rating: 4.4, tags: ['vegan'], veg: true, nutrition: { cal: 77, protein: 2, carbs: 17 }, image: img('1518977676601-b53df085665a'), emoji: '🥔' },
  { id: 'p6', name: 'Spinach (Palak)', brand: 'FreshFarm', category: 'fruits-veg', price: 19, mrp: 30, weight: ['250g','500g'], rating: 4.6, tags: ['vegan','high-protein'], veg: true, nutrition: { cal: 23, protein: 2.9, carbs: 3.6 }, image: img('1576046579029-3718d35d1f2a'), emoji: '🥬' },
  { id: 'p7', name: 'Carrots', brand: 'FreshFarm', category: 'fruits-veg', price: 45, mrp: 60, weight: ['500g','1kg'], rating: 4.5, tags: ['vegan'], veg: true, nutrition: { cal: 41, protein: 0.9, carbs: 10 }, image: img('1592374521692-459a0d2d3f80'), emoji: '🥕' },
  { id: 'p8', name: 'Green Capsicum', brand: 'FreshFarm', category: 'fruits-veg', price: 59, mrp: 80, weight: ['250g','500g'], rating: 4.4, tags: ['vegan','keto'], veg: true, nutrition: { cal: 31, protein: 1, carbs: 6 }, image: img('1563565379253-374091c80c2c'), emoji: '🫑' },
  { id: 'p9', name: 'Pomegranate', brand: 'FreshFarm', category: 'fruits-veg', price: 149, mrp: 199, weight: ['500g','1kg'], rating: 4.8, tags: ['vegan'], veg: true, nutrition: { cal: 83, protein: 1.7, carbs: 19 }, image: img('1594055388338-47e2d2d5b4e3'), emoji: '🍎' },
  { id: 'p10', name: 'Ginger', brand: 'FreshFarm', category: 'fruits-veg', price: 25, mrp: 35, weight: ['100g','250g'], rating: 4.3, tags: ['vegan'], veg: true, nutrition: { cal: 80, protein: 1.8, carbs: 18 }, image: img('1606498681728-6637c40c5f9e'), emoji: '🫚' },

  // Dairy
  { id: 'p11', name: 'Amul Full Cream Milk', brand: 'Amul', category: 'dairy', price: 27, mrp: 30, weight: ['500ml','1L'], rating: 4.7, tags: ['high-protein'], veg: true, nutrition: { cal: 61, protein: 3.4, carbs: 4.8 }, image: img('1550583724-b5d5b1d2e3e1'), emoji: '🥛' },
  { id: 'p12', name: 'Amul Butter', brand: 'Amul', category: 'dairy', price: 56, mrp: 60, weight: ['100g','500g'], rating: 4.8, tags: ['high-protein'], veg: true, nutrition: { cal: 717, protein: 0.9, carbs: 0.1 }, image: img('1583977313238-6c9a3098f7e6'), emoji: '🧈' },
  { id: 'p13', name: 'Amul Cheese Slices', brand: 'Amul', category: 'dairy', price: 135, mrp: 165, weight: ['200g','400g'], rating: 4.6, tags: ['high-protein'], veg: true, nutrition: { cal: 280, protein: 20, carbs: 2 }, image: img('1486297678162-eb2c2c8b8b0b'), emoji: '🧀' },
  { id: 'p14', name: 'Greek Yogurt Plain', brand: 'Epigamia', category: 'dairy', price: 50, mrp: 65, weight: ['90g','200g'], rating: 4.5, tags: ['high-protein'], veg: true, nutrition: { cal: 59, protein: 10, carbs: 3.6 }, image: img('1571212515416-fefc3d8e4e3f'), emoji: '🥛' },
  { id: 'p15', name: 'Paneer Fresh', brand: 'Amul', category: 'dairy', price: 89, mrp: 110, weight: ['200g','500g'], rating: 4.7, tags: ['high-protein','vegetarian'], veg: true, nutrition: { cal: 265, protein: 18, carbs: 1.2 }, image: img('1636264103594-e1b1e5b8e3e3'), emoji: '🧀' },
  { id: 'p16', name: 'Amul Cheese Cube', brand: 'Amul', category: 'dairy', price: 95, mrp: 125, weight: ['200g'], rating: 4.6, tags: ['high-protein'], veg: true, nutrition: { cal: 280, protein: 20, carbs: 2 }, image: img('1453818562-3c8c8b8b8b8b'), emoji: '🧀' },
  { id: 'p17', name: 'Nestle Milkmaid', brand: 'Nestle', category: 'dairy', price: 110, mrp: 120, weight: ['200g','400g'], rating: 4.4, tags: ['vegetarian'], veg: true, nutrition: { cal: 322, protein: 8, carbs: 54 }, image: img('1628053205103-7e2e8c3f3e3e'), emoji: '🥛' },

  // Bakery
  { id: 'p18', name: 'Whole Wheat Bread', brand: 'Modern', category: 'bakery', price: 45, mrp: 55, weight: ['400g'], rating: 4.4, tags: ['vegetarian'], veg: true, nutrition: { cal: 247, protein: 13, carbs: 41 }, image: img('1509440159596-0c8b8c8b8b8b'), emoji: '🍞' },
  { id: 'p19', name: 'Croissant Butter', brand: 'Bakers Oven', category: 'bakery', price: 75, mrp: 99, weight: ['1pc','3pc'], rating: 4.6, tags: ['vegetarian'], veg: true, nutrition: { cal: 272, protein: 5.5, carbs: 31 }, image: img('1555507016-bc8b8b8b8b8b'), emoji: '🥐' },
  { id: 'p20', name: 'Veg Puff', brand: 'Bakers Oven', category: 'bakery', price: 30, mrp: 40, weight: ['1pc','2pc','4pc'], rating: 4.2, tags: ['vegetarian'], veg: true, nutrition: { cal: 320, protein: 6, carbs: 30 }, image: img('1606755456201-3e3e3e3e3e3e'), emoji: '🥐' },
  { id: 'p21', name: 'Chocolate Muffin', brand: 'Bakers Oven', category: 'bakery', price: 65, mrp: 85, weight: ['1pc','2pc'], rating: 4.7, tags: ['vegetarian'], veg: true, nutrition: { cal: 296, protein: 5, carbs: 42 }, image: img('1607958995336-6c3e3e3e3e3e'), emoji: '🧁' },
  { id: 'p22', name: 'Brownie Fudge', brand: 'Bakers Oven', category: 'bakery', price: 85, mrp: 110, weight: ['1pc','2pc'], rating: 4.8, tags: ['vegetarian'], veg: true, nutrition: { cal: 380, protein: 6, carbs: 48 }, image: img('1606313563200-6c3e3e3e3e3e'), emoji: '🍫' },

  // Snacks
  { id: 'p23', name: 'Lay\'s Classic Salted', brand: 'Lays', category: 'snacks', price: 20, mrp: 30, weight: ['52g','92g','150g'], rating: 4.5, tags: ['vegetarian'], veg: true, nutrition: { cal: 536, protein: 7, carbs: 53 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🥔' },
  { id: 'p24', name: 'Haldiram Bhujia', brand: 'Haldiram', category: 'snacks', price: 35, mrp: 45, weight: ['200g','400g'], rating: 4.6, tags: ['vegetarian'], veg: true, nutrition: { cal: 560, protein: 8, carbs: 40 }, image: img('1606755456201-3e3e3e3e3e3e'), emoji: '🫘' },
  { id: 'p25', name: 'Dorito Nachos Cheese', brand: 'Doritos', category: 'snacks', price: 45, mrp: 60, weight: ['90g','150g'], rating: 4.4, tags: ['vegetarian'], veg: true, nutrition: { cal: 500, protein: 6, carbs: 58 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🌽' },
  { id: 'p26', name: 'Pringles Original', brand: 'Pringles', category: 'snacks', price: 99, mrp: 130, weight: ['107g','165g'], rating: 4.5, tags: ['vegetarian'], veg: true, nutrition: { cal: 536, protein: 4, carbs: 52 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🥔' },
  { id: 'p27', name: 'Popcorn Butter', brand: 'Act II', category: 'snacks', price: 25, mrp: 35, weight: ['75g','150g'], rating: 4.3, tags: ['vegetarian'], veg: true, nutrition: { cal: 380, protein: 9, carbs: 70 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🍿' },
  { id: 'p28', name: 'Kurkure Masala', brand: 'Kurkure', category: 'snacks', price: 20, mrp: 30, weight: ['90g','180g'], rating: 4.2, tags: ['vegetarian'], veg: true, nutrition: { cal: 480, protein: 5, carbs: 60 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🌽' },

  // Beverages
  { id: 'p29', name: 'Coca-Cola 750ml', brand: 'Coca-Cola', category: 'beverages', price: 42, mrp: 50, weight: ['750ml','1.25L'], rating: 4.5, tags: ['vegetarian'], veg: true, nutrition: { cal: 140, protein: 0, carbs: 39 }, image: img('1622483268963-3e3e3e3e3e3e'), emoji: '🥤' },
  { id: 'p30', name: 'Fresh Orange Juice', brand: 'Real', category: 'beverages', price: 99, mrp: 120, weight: ['1L','200ml'], rating: 4.4, tags: ['vegan'], veg: true, nutrition: { cal: 45, protein: 0.7, carbs: 10 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🧃' },
  { id: 'p31', name: 'Red Bull Energy', brand: 'Red Bull', category: 'beverages', price: 125, mrp: 150, weight: ['250ml'], rating: 4.3, tags: ['vegetarian'], veg: true, nutrition: { cal: 110, protein: 1, carbs: 28 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '⚡' },
  { id: 'p32', name: 'Nescafe Coffee', brand: 'Nescafe', category: 'beverages', price: 175, mrp: 220, weight: ['50g','100g'], rating: 4.6, tags: ['vegetarian'], veg: true, nutrition: { cal: 2, protein: 0.3, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '☕' },
  { id: 'p33', name: 'Tata Tea Gold', brand: 'Tata', category: 'beverages', price: 285, mrp: 350, weight: ['500g','1kg'], rating: 4.7, tags: ['vegetarian'], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🍵' },
  { id: 'p34', name: 'Bisleri Water 1L', brand: 'Bisleri', category: 'beverages', price: 20, mrp: 25, weight: ['1L','2L','5L'], rating: 4.5, tags: ['vegan'], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '💧' },
  { id: 'p35', name: 'Paper Boat Aam Panna', brand: 'Paper Boat', category: 'beverages', price: 30, mrp: 40, weight: ['200ml'], rating: 4.4, tags: ['vegan'], veg: true, nutrition: { cal: 120, protein: 0, carbs: 30 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🥭' },

  // Staples
  { id: 'p36', name: 'Aashirvaad Atta', brand: 'Aashirvaad', category: 'staples', price: 245, mrp: 290, weight: ['5kg','10kg'], rating: 4.6, tags: ['vegetarian'], veg: true, nutrition: { cal: 340, protein: 12, carbs: 72 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🌾' },
  { id: 'p37', name: 'India Gate Basmati Rice', brand: 'India Gate', category: 'staples', price: 450, mrp: 550, weight: ['1kg','5kg'], rating: 4.7, tags: ['vegan'], veg: true, nutrition: { cal: 365, protein: 7, carbs: 80 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🍚' },
  { id: 'p38', name: 'Tata Salt', brand: 'Tata', category: 'staples', price: 28, mrp: 35, weight: ['500g','1kg'], rating: 4.8, tags: ['vegan'], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🧂' },
  { id: 'p39', name: 'Fortune Sunflower Oil', brand: 'Fortune', category: 'staples', price: 165, mrp: 199, weight: ['1L','2L','5L'], rating: 4.5, tags: ['vegan'], veg: true, nutrition: { cal: 900, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🫒' },
  { id: 'p40', name: 'Tata Toor Dal', brand: 'Tata', category: 'staples', price: 145, mrp: 180, weight: ['500g','1kg'], rating: 4.6, tags: ['vegan','high-protein'], veg: true, nutrition: { cal: 343, protein: 22, carbs: 63 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🫘' },
  { id: 'p41', name: 'Sugar Madhur', brand: 'Madhur', category: 'staples', price: 55, mrp: 65, weight: ['1kg','5kg'], rating: 4.5, tags: ['vegan'], veg: true, nutrition: { cal: 387, protein: 0, carbs: 100 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🍬' },
  { id: 'p42', name: 'Fortune Besan', brand: 'Fortune', category: 'staples', price: 65, mrp: 85, weight: ['500g','1kg'], rating: 4.4, tags: ['vegan','high-protein'], veg: true, nutrition: { cal: 340, protein: 22, carbs: 60 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🫘' },

  // Meat & Fish
  { id: 'p43', name: 'Chicken Breast Boneless', brand: 'FreshToHome', category: 'meat-fish', price: 189, mrp: 240, weight: ['500g','1kg'], rating: 4.7, tags: ['high-protein','keto'], veg: false, nutrition: { cal: 165, protein: 31, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🍗' },
  { id: 'p44', name: 'Mutton Curry Cut', brand: 'FreshToHome', category: 'meat-fish', price: 549, mrp: 650, weight: ['500g','1kg'], rating: 4.6, tags: ['high-protein','keto'], veg: false, nutrition: { cal: 294, protein: 25, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🍖' },
  { id: 'p45', name: 'Fresh Rohu Fish', brand: 'FreshToHome', category: 'meat-fish', price: 299, mrp: 350, weight: ['500g','1kg'], rating: 4.5, tags: ['high-protein','keto'], veg: false, nutrition: { cal: 127, protein: 20, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🐟' },
  { id: 'p46', name: 'Prawns Medium', brand: 'FreshToHome', category: 'meat-fish', price: 399, mrp: 480, weight: ['250g','500g'], rating: 4.6, tags: ['high-protein','keto'], veg: false, nutrition: { cal: 99, protein: 24, carbs: 0.2 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🦐' },
  { id: 'p47', name: 'Chicken Sausage', brand: 'FreshToHome', category: 'meat-fish', price: 165, mrp: 200, weight: ['250g','500g'], rating: 4.4, tags: ['high-protein'], veg: false, nutrition: { cal: 250, protein: 14, carbs: 3 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🌭' },

  // Frozen
  { id: 'p48', name: 'McCain French Fries', brand: 'McCain', category: 'frozen', price: 99, mrp: 130, weight: ['750g','1.5kg'], rating: 4.5, tags: ['vegetarian'], veg: true, nutrition: { cal: 312, protein: 3.4, carbs: 41 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🍟' },
  { id: 'p49', name: 'Veg Nuggets', brand: 'McCain', category: 'frozen', price: 85, mrp: 110, weight: ['400g'], rating: 4.4, tags: ['vegetarian'], veg: true, nutrition: { cal: 280, protein: 8, carbs: 30 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🧆' },
  { id: 'p50', name: 'Ice Cream Vanilla', brand: 'Amul', category: 'frozen', price: 199, mrp: 250, weight: ['1L','500ml'], rating: 4.7, tags: ['vegetarian'], veg: true, nutrition: { cal: 207, protein: 3.5, carbs: 24 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🍦' },
  { id: 'p51', name: 'Frozen Peas', brand: 'McCain', category: 'frozen', price: 75, mrp: 95, weight: ['500g','1kg'], rating: 4.5, tags: ['vegan'], veg: true, nutrition: { cal: 81, protein: 5.4, carbs: 14 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🫛' },
  { id: 'p52', name: 'Frozen Sweet Corn', brand: 'McCain', category: 'frozen', price: 89, mrp: 110, weight: ['500g'], rating: 4.6, tags: ['vegan'], veg: true, nutrition: { cal: 86, protein: 3.2, carbs: 19 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🌽' },

  // Baby
  { id: 'p53', name: 'Pampers Diapers L', brand: 'Pampers', category: 'baby', price: 299, mrp: 399, weight: ['30pcs','60pcs'], rating: 4.7, tags: [], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🍼' },
  { id: 'p54', name: 'Cerelac Stage 2', brand: 'Nestle', category: 'baby', price: 245, mrp: 295, weight: ['300g'], rating: 4.6, tags: ['vegetarian'], veg: true, nutrition: { cal: 400, protein: 15, carbs: 65 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🥣' },
  { id: 'p55', name: 'Baby Wipes', brand: 'Himalaya', category: 'baby', price: 99, mrp: 130, weight: ['72pcs'], rating: 4.5, tags: [], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🧴' },

  // Pet
  { id: 'p56', name: 'Pedigree Adult Dog Food', brand: 'Pedigree', category: 'pet', price: 499, mrp: 600, weight: ['1.2kg','3kg'], rating: 4.6, tags: [], veg: false, nutrition: { cal: 350, protein: 20, carbs: 50 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🐕' },
  { id: 'p57', name: 'Whiskas Cat Food', brand: 'Whiskas', category: 'pet', price: 350, mrp: 420, weight: ['1kg','3kg'], rating: 4.5, tags: [], veg: false, nutrition: { cal: 360, protein: 32, carbs: 40 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🐱' },
  { id: 'p58', name: 'Cat Litter', brand: 'Drools', category: 'pet', price: 199, mrp: 250, weight: ['5kg','10kg'], rating: 4.4, tags: [], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🐾' },

  // Personal Care
  { id: 'p59', name: 'Colgate Toothpaste', brand: 'Colgate', category: 'personal-care', price: 45, mrp: 60, weight: ['100g','200g'], rating: 4.5, tags: [], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🪥' },
  { id: 'p60', name: 'Dove Shampoo', brand: 'Dove', category: 'personal-care', price: 175, mrp: 220, weight: ['340ml'], rating: 4.6, tags: [], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🧴' },
  { id: 'p61', name: 'Nivea Body Lotion', brand: 'Nivea', category: 'personal-care', price: 199, mrp: 250, weight: ['200ml','400ml'], rating: 4.7, tags: [], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🧴' },
  { id: 'p62', name: 'Gillette Razor', brand: 'Gillette', category: 'personal-care', price: 149, mrp: 199, weight: ['1pc','3pc'], rating: 4.4, tags: [], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🪒' },

  // Cleaning
  { id: 'p63', name: 'Surf Excel Detergent', brand: 'Surf Excel', category: 'cleaning', price: 199, mrp: 250, weight: ['1kg','2kg','4kg'], rating: 4.6, tags: [], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🧺' },
  { id: 'p64', name: 'Vim Dishwash Bar', brand: 'Vim', category: 'cleaning', price: 30, mrp: 40, weight: ['200g','500g'], rating: 4.5, tags: [], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🧽' },
  { id: 'p65', name: 'Harpic Toilet Cleaner', brand: 'Harpic', category: 'cleaning', price: 85, mrp: 110, weight: ['500ml','1L'], rating: 4.4, tags: [], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🚽' },
  { id: 'p66', name: 'Lizol Floor Cleaner', brand: 'Lizol', category: 'cleaning', price: 95, mrp: 125, weight: ['500ml','1L'], rating: 4.5, tags: [], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🧹' },

  // Breakfast
  { id: 'p67', name: 'Kelloggs Corn Flakes', brand: 'Kelloggs', category: 'breakfast', price: 165, mrp: 200, weight: ['475g','875g'], rating: 4.5, tags: ['vegetarian'], veg: true, nutrition: { cal: 357, protein: 7, carbs: 84 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🥣' },
  { id: 'p68', name: 'Quaker Oats', brand: 'Quaker', category: 'breakfast', price: 99, mrp: 130, weight: ['500g','1kg'], rating: 4.6, tags: ['vegan','high-protein'], veg: true, nutrition: { cal: 389, protein: 13, carbs: 66 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🥣' },
  { id: 'p69', name: 'MTR Rava Idli Mix', brand: 'MTR', category: 'breakfast', price: 65, mrp: 80, weight: ['500g'], rating: 4.5, tags: ['vegetarian'], veg: true, nutrition: { cal: 350, protein: 8, carbs: 75 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🥞' },
  { id: 'p70', name: 'Maggi Noodles', brand: 'Maggi', category: 'breakfast', price: 56, mrp: 72, weight: ['4pack','8pack'], rating: 4.7, tags: ['vegetarian'], veg: true, nutrition: { cal: 400, protein: 9, carbs: 65 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🍜' },

  // Sweets
  { id: 'p71', name: 'Dairy Milk Silk', brand: 'Cadbury', category: 'sweets', price: 99, mrp: 130, weight: ['150g'], rating: 4.8, tags: ['vegetarian'], veg: true, nutrition: { cal: 535, protein: 7, carbs: 59 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🍫' },
  { id: 'p72', name: 'KitKat', brand: 'Nestle', category: 'sweets', price: 35, mrp: 45, weight: ['37g','4pack'], rating: 4.6, tags: ['vegetarian'], veg: true, nutrition: { cal: 518, protein: 6, carbs: 65 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🍫' },
  { id: 'p73', name: 'Gulab Jamun', brand: 'Haldiram', category: 'sweets', price: 120, mrp: 150, weight: ['500g','1kg'], rating: 4.7, tags: ['vegetarian'], veg: true, nutrition: { cal: 350, protein: 4, carbs: 60 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🍮' },
  { id: 'p74', name: 'Mango Halwa', brand: 'Haldiram', category: 'sweets', price: 85, mrp: 110, weight: ['500g'], rating: 4.5, tags: ['vegetarian'], veg: true, nutrition: { cal: 320, protein: 3, carbs: 55 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🍬' },

  // Organic
  { id: 'p75', name: 'Organic Honey', brand: 'Organic India', category: 'organic', price: 250, mrp: 320, weight: ['250g','500g'], rating: 4.7, tags: ['vegan','organic'], veg: true, nutrition: { cal: 304, protein: 0.3, carbs: 82 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🍯' },
  { id: 'p76', name: 'Organic Quinoa', brand: 'Organic India', category: 'organic', price: 299, mrp: 380, weight: ['500g','1kg'], rating: 4.6, tags: ['vegan','high-protein','gluten-free'], veg: true, nutrition: { cal: 368, protein: 14, carbs: 64 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🌾' },
  { id: 'p77', name: 'Organic Brown Rice', brand: 'Organic India', category: 'organic', price: 180, mrp: 220, weight: ['1kg','5kg'], rating: 4.5, tags: ['vegan','organic'], veg: true, nutrition: { cal: 370, protein: 7.5, carbs: 78 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🍚' },
  { id: 'p78', name: 'Organic Jaggery', brand: 'Organic India', category: 'organic', price: 120, mrp: 150, weight: ['500g','1kg'], rating: 4.6, tags: ['vegan','organic'], veg: true, nutrition: { cal: 383, protein: 0.4, carbs: 98 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🟤' },

  // Household
  { id: 'p79', name: 'LED Bulb 9W', brand: 'Philips', category: 'household', price: 149, mrp: 200, weight: ['1pc','4pc'], rating: 4.6, tags: [], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '💡' },
  { id: 'p80', name: 'AA Batteries', brand: 'Duracell', category: 'household', price: 99, mrp: 130, weight: ['4pcs','8pcs'], rating: 4.7, tags: [], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🔋' },
  { id: 'p81', name: 'Tissue Paper Box', brand: 'Kleenex', category: 'household', price: 65, mrp: 85, weight: ['100pcs','200pcs'], rating: 4.5, tags: [], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🧻' },
  { id: 'p82', name: 'Trash Bags', brand: 'Glad', category: 'household', price: 89, mrp: 120, weight: ['30pcs','60pcs'], rating: 4.4, tags: [], veg: true, nutrition: { cal: 0, protein: 0, carbs: 0 }, image: img('1613913978379-2c3e3e3e3e3e'), emoji: '🗑️' },
]

export const getProduct = (id) => products.find(p => p.id === id)
export const getByCategory = (catId) => products.filter(p => p.category === catId)
export const getByTag = (tag) => products.filter(p => p.tags.includes(tag))
export const searchProducts = (query) => {
  const q = query.toLowerCase().trim()
  if (!q) return []
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q))
  )
}
