export interface SampleData {
  id: string;
  name: string;
  description: string;
  expectedSavings: 'high' | 'medium' | 'low';
  data: object;
  toon: string; // TOON representation for reverse conversion
}

export const samples: SampleData[] = [
  {
    id: 'users',
    name: 'User List',
    description: 'Array of uniform objects - ideal for TOON (high savings)',
    expectedSavings: 'high',
    data: {
      users: [
        {
          id: 1,
          name: 'Alice Chen',
          email: 'alice@example.com',
          role: 'admin',
          active: true,
        },
        {
          id: 2,
          name: 'Bob Smith',
          email: 'bob@example.com',
          role: 'editor',
          active: true,
        },
        {
          id: 3,
          name: 'Carol Davis',
          email: 'carol@example.com',
          role: 'viewer',
          active: false,
        },
        {
          id: 4,
          name: 'Dan Wilson',
          email: 'dan@example.com',
          role: 'editor',
          active: true,
        },
        {
          id: 5,
          name: 'Eve Johnson',
          email: 'eve@example.com',
          role: 'admin',
          active: true,
        },
      ],
    },
    toon: `users[5]{id,name,email,role,active}:
  1,Alice Chen,alice@example.com,admin,true
  2,Bob Smith,bob@example.com,editor,true
  3,Carol Davis,carol@example.com,viewer,false
  4,Dan Wilson,dan@example.com,editor,true
  5,Eve Johnson,eve@example.com,admin,true`,
  },
  {
    id: 'products',
    name: 'Product Catalog',
    description: 'E-commerce product data with consistent fields',
    expectedSavings: 'high',
    data: {
      products: [
        {
          sku: 'LAPTOP-001',
          name: 'Pro Laptop 15',
          price: 1299.99,
          stock: 45,
          category: 'electronics',
        },
        {
          sku: 'MOUSE-002',
          name: 'Wireless Mouse',
          price: 49.99,
          stock: 230,
          category: 'accessories',
        },
        {
          sku: 'KEYBOARD-003',
          name: 'Mechanical Keyboard',
          price: 149.99,
          stock: 78,
          category: 'accessories',
        },
        {
          sku: 'MONITOR-004',
          name: '27" 4K Display',
          price: 599.99,
          stock: 32,
          category: 'electronics',
        },
      ],
    },
    toon: `products[4]{sku,name,price,stock,category}:
  LAPTOP-001,Pro Laptop 15,1299.99,45,electronics
  MOUSE-002,Wireless Mouse,49.99,230,accessories
  KEYBOARD-003,Mechanical Keyboard,149.99,78,accessories
  MONITOR-004,"27\\" 4K Display",599.99,32,electronics`,
  },
  {
    id: 'api-response',
    name: 'API Response',
    description: 'Typical paginated API response',
    expectedSavings: 'medium',
    data: {
      status: 'success',
      data: {
        items: [
          { id: 'a1', title: 'First Item', value: 100 },
          { id: 'a2', title: 'Second Item', value: 200 },
          { id: 'a3', title: 'Third Item', value: 150 },
        ],
        pagination: {
          page: 1,
          perPage: 10,
          total: 3,
        },
      },
      timestamp: '2024-01-15T10:30:00Z',
    },
    toon: `status: success
data:
  items[3]{id,title,value}:
    a1,First Item,100
    a2,Second Item,200
    a3,Third Item,150
  pagination:
    page: 1
    perPage: 10
    total: 3
timestamp: "2024-01-15T10:30:00Z"`,
  },
  {
    id: 'config',
    name: 'Config Object',
    description: 'Single nested config object - minimal savings expected',
    expectedSavings: 'low',
    data: {
      app: {
        name: 'MyApp',
        version: '2.1.0',
        environment: 'production',
      },
      database: {
        host: 'db.example.com',
        port: 5432,
        pool: {
          min: 5,
          max: 20,
        },
      },
      features: {
        darkMode: true,
        analytics: true,
        betaFeatures: false,
      },
    },
    toon: `app:
  name: MyApp
  version: 2.1.0
  environment: production
database:
  host: db.example.com
  port: 5432
  pool:
    min: 5
    max: 20
features:
  darkMode: true
  analytics: true
  betaFeatures: false`,
  },
  {
    id: 'nested',
    name: 'Deeply Nested',
    description: 'Complex nested structure - minimal savings expected',
    expectedSavings: 'low',
    data: {
      level1: {
        level2a: {
          level3a: {
            value: 'deep',
            items: [1, 2, 3],
          },
          level3b: {
            value: 'also deep',
            metadata: {
              created: '2024-01-01',
              updated: '2024-01-15',
            },
          },
        },
        level2b: {
          simple: 'value',
        },
      },
    },
    toon: `level1:
  level2a:
    level3a:
      value: deep
      items[3]: 1,2,3
    level3b:
      value: also deep
      metadata:
        created: 2024-01-01
        updated: 2024-01-15
  level2b:
    simple: value`,
  },
];

// Default sample to show on page load (users - shows high savings)
export const defaultJsonSample = samples[0];
