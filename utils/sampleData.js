const books = [
  {
    name: "The Art of Programming",
    description: "A deep dive into algorithms and data structures.",
    price: 49.99,
    stockQuantity: 10,
  },
  {
    name: "Mastering JavaScript",
    description:
      "Advanced concepts and best practices for JavaScript developers.",
    price: 39.99,
    stockQuantity: 15,
  },
  {
    name: "Node.js in Action",
    description:
      "A practical guide to building scalable backend applications with Node.js.",
    price: 44.99,
    stockQuantity: 20,
  },
  {
    name: "The Database Handbook",
    description: "Covers SQL, NoSQL, and database optimization techniques.",
    price: 54.99,
    stockQuantity: 8,
  },
  {
    name: "React for Beginners",
    description:
      "An introduction to React.js and component-based UI development.",
    price: 34.99,
    stockQuantity: 12,
  },
  {
    name: "Deep Learning Essentials",
    description: "Understanding neural networks and deep learning techniques.",
    price: 59.99,
    stockQuantity: 5,
  },
  {
    name: "Cybersecurity Fundamentals",
    description:
      "A comprehensive guide to security principles and best practices.",
    price: 42.99,
    stockQuantity: 7,
  },
  {
    name: "The History of Computing",
    description:
      "Exploring the evolution of computing from the early days to AI.",
    price: 29.99,
    stockQuantity: 25,
  },
  {
    name: "Full-Stack Development",
    description:
      "A hands-on guide to building web applications from frontend to backend.",
    price: 49.99,
    stockQuantity: 18,
  },
  {
    name: "AI and the Future",
    description:
      "Discussing artificial intelligence's impact on society and technology.",
    price: 55.99,
    stockQuantity: 6,
  },
];

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality noise-canceling wireless headphones.",
    price: 99.99,
    stockQuantity: 50,
    image: "https://images.unsplash.com/photo-1592928302110-3fd939d57f63?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjAwMjJ8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fDE2NTUyMjkwMTY&ixlib=rb-1.2.1&q=80&w=400",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Smartphone 12 Pro",
    description: "Latest smartphone with advanced features and powerful camera.",
    price: 799.99,
    stockQuantity: 100,
    image: "https://images.unsplash.com/photo-1612186841049-1a49c40bfa88?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjAwMjJ8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fDE2NTUyMjkwMTY&ixlib=rb-1.2.1&q=80&w=400",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Gaming Laptop",
    description: "High-performance laptop designed for gaming and content creation.",
    price: 1200.00,
    stockQuantity: 30,
    image: "https://images.unsplash.com/photo-1602822492149-b00bb244b9bb?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjAwMjJ8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fDE2NTUyMjkwMTY&ixlib=rb-1.2.1&q=80&w=400",
    category: "Computers"
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with excellent sound quality.",
    price: 49.99,
    stockQuantity: 75,
    image: "https://images.unsplash.com/photo-1584132156729-9b66ff5c97ac?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjAwMjJ8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fDE2NTUyMjkwMTY&ixlib=rb-1.2.1&q=80&w=400",
    category: "Electronics"
  },
  {
    id: 5,
    name: "Smartwatch Series 7",
    description: "Stylish smartwatch with health tracking and notifications.",
    price: 249.99,
    stockQuantity: 200,
    image: "https://images.unsplash.com/photo-1593026613510-68a7f6f74f5a?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjAwMjJ8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fDE2NTUyMjkwMTY&ixlib=rb-1.2.1&q=80&w=400",
    category: "Wearables"
  },
  {
    id: 6,
    name: "Electric Kettle",
    description: "Stainless steel electric kettle with automatic shut-off.",
    price: 39.99,
    stockQuantity: 60,
    image: "https://images.unsplash.com/photo-1612208293794-d7f651cd7717?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjAwMjJ8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fDE2NTUyMjkwMTY&ixlib=rb-1.2.1&q=80&w=400",
    category: "Home Appliances"
  },
  {
    id: 7,
    name: "Air Fryer",
    description: "Healthy air fryer that cooks food with little to no oil.",
    price: 89.99,
    stockQuantity: 40,
    image: "https://images.unsplash.com/photo-1604582277413-6d4a24e7c91f?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjAwMjJ8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fDE2NTUyMjkwMTY&ixlib=rb-1.2.1&q=80&w=400",
    category: "Home Appliances"
  },
  {
    id: 8,
    name: "Designer Sunglasses",
    description: "Stylish sunglasses with UV protection.",
    price: 129.99,
    stockQuantity: 120,
    image: "https://images.unsplash.com/photo-1616761192808-70a88de90a0d?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjAwMjJ8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fDE2NTUyMjkwMTY&ixlib=rb-1.2.1&q=80&w=400",
    category: "Accessories"
  },
  {
    id: 9,
    name: "Fitness Tracker",
    description: "Track your steps, calories burned, and heart rate.",
    price: 49.99,
    stockQuantity: 150,
    image: "https://images.unsplash.com/photo-1612192266351-cd8d5d6b0bc4?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjAwMjJ8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fDE2NTUyMjkwMTY&ixlib=rb-1.2.1&q=80&w=400",
    category: "Wearables"
  },
  {
    id: 10,
    name: "Electric Toothbrush",
    description: "Rechargeable electric toothbrush with multiple cleaning modes.",
    price: 39.99,
    stockQuantity: 80,
    image: "https://images.unsplash.com/photo-1596501209380-1cf8e01c221f?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjAwMjJ8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fDE2NTUyMjkwMTY&ixlib=rb-1.2.1&q=80&w=400",
    category: "Health"
  }
];


module.exports = { books, products };
