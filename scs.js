// Challenge 2: Shopping Cart System 

// 1️⃣ Store items as objects inside an array
const cart = [
  { name: 'Laptop', price: 1200, category: 'Electronics' },
  { name: 'Headphones', price: 150, category: 'Electronics' },
  { name: 'Coffee Mug', price: 20, category: 'Home' },
  { name: 'Notebook', price: 5, category: 'Stationery' },
  { name: 'Pen', price: 2, category: 'Stationery' },
];

// 2️⃣ Function to apply discount
const applyDiscount = (item, discountPercent) => {
  const { price } = item; // destructuring
  const discountedPrice = price - price * (discountPercent / 100);
  const savings = parseFloat((price - discountedPrice).toFixed(2));
  return {
    ...item,
    discountedPrice: parseFloat(discountedPrice.toFixed(2)),
    savings,
  };
};

// 3️⃣ Create a discounted cart
const discountPercent = 10; // 10% discount
const discountedCart = cart.map(item => applyDiscount(item, discountPercent));

// 4️⃣ Function to calculate total using rest operator
const calculateTotal = (...items) =>
  items.reduce((sum, item) => sum + item.discountedPrice, 0).toFixed(2);

// 5️⃣ Display all items in table
console.log('\n💸 Discounted Cart Items:');
console.table(
  discountedCart.map(item => ({
    Name: item.name,
    Category: item.category,
    OriginalPrice: `$${item.price}`,
    DiscountedPrice: `$${item.discountedPrice}`,
    Savings: `$${item.savings}`,
  }))
);

// 6️⃣ Filter by category example (Electronics)
const electronicsItems = discountedCart.filter(
  item => item.category === 'Electronics'
);
console.log('\n🎧 Electronics Items:');
console.table(
  electronicsItems.map(item => ({
    Name: item.name,
    OriginalPrice: `$${item.price}`,
    DiscountedPrice: `$${item.discountedPrice}`,
    Savings: `$${item.savings}`,
  }))
);

// 7️⃣ Total price after discount
const totalPrice = calculateTotal(...discountedCart);
console.log('\n💰 Total Price after Discount:', `$${totalPrice}`);

// 8️⃣ Most expensive item after discount
const mostExpensive = discountedCart.reduce((prev, curr) =>
  curr.discountedPrice > prev.discountedPrice ? curr : prev
);
console.log('\n🔥 Most Expensive Item After Discount:');
console.table([
  {
    Name: mostExpensive.name,
    Category: mostExpensive.category,
    DiscountedPrice: `$${mostExpensive.discountedPrice}`,
  },
]);

// 9️⃣ Total savings per category
const categorySavings = {};
for (const item of discountedCart) {
  if (!categorySavings[item.category]) categorySavings[item.category] = 0;
  categorySavings[item.category] += item.savings;
}

// Display category-wise savings table
console.log('\n💵 Total Savings per Category:');
console.table(
  Object.entries(categorySavings).map(([category, savings]) => ({
    Category: category,
    TotalSavings: `$${savings.toFixed(2)}`,
  }))
);
