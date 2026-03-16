// Blog data structure - ready for database integration
export const blogData = {
  posts: [
    {
      id: 1,
      title: "Getting Started with IoT Development",
      slug: "getting-started-with-iot-development",
      excerpt: "Learn the fundamentals of IoT development and how to build your first connected device using ESP32 and modern web technologies.",
      content: `
# Getting Started with IoT Development

IoT (Internet of Things) development is an exciting field that combines hardware and software to create smart, connected devices. In this guide, we'll explore the fundamentals and build our first IoT project.

## What is IoT?

IoT refers to the network of physical devices embedded with sensors, software, and other technologies that connect and exchange data with other devices and systems over the internet.

## Essential Components

### Hardware
- **Microcontrollers**: ESP32, Arduino, Raspberry Pi
- **Sensors**: Temperature, humidity, motion, light sensors
- **Communication**: WiFi, Bluetooth, LoRa, NB-IoT

### Software
- **Programming**: C++, Python, JavaScript
- **Protocols**: MQTT, HTTP, CoAP
- **Cloud Platforms**: AWS IoT, Google Cloud IoT, Azure IoT

## Building Your First IoT Device

Let's create a simple temperature monitoring system using ESP32:

### Hardware Setup
1. ESP32 development board
2. DHT22 temperature and humidity sensor
3. Breadboard and jumper wires

### Software Implementation
\`\`\`cpp
#include <WiFi.h>
#include <DHT.h>
#include <PubSubClient.h>

// WiFi and MQTT configuration
const char* ssid = "your_wifi_ssid";
const char* password = "your_password";
const char* mqtt_server = "your_mqtt_broker";

DHT dht(D4, DHT22);
WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  dht.begin();
  setupWiFi();
  client.setServer(mqtt_server, 1883);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  
  // Publish sensor data
  String payload = "{\"temp\":" + String(temperature) + 
                 ",\"hum\":" + String(humidity) + "}";
  client.publish("sensors/dht22", payload.c_str());
  
  delay(5000);
}
\`\`\`

## Best Practices

1. **Security**: Always implement proper authentication
2. **Power Management**: Consider battery life for remote devices
3. **Data Validation**: Validate sensor data before processing
4. **Error Handling**: Implement robust error recovery

## Next Steps

This is just the beginning! You can expand this project by:
- Adding more sensors
- Implementing data visualization
- Creating mobile apps for monitoring
- Integrating with cloud services

Stay tuned for more IoT tutorials and advanced projects!
      `,
      author: "Felix Kumafutsa",
      category: "IoT",
      tags: ["IoT", "ESP32", "Sensors", "Tutorial"],
      publishedAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      featuredImage: "/api/placeholder/800/400",
      readingTime: "8 min read",
      status: "published"
    },
    {
      id: 2,
      title: "Building Scalable REST APIs with Node.js",
      slug: "building-scalable-rest-apis-nodejs",
      excerpt: "Discover best practices for creating robust, scalable REST APIs using Node.js, Express, and modern development patterns.",
      content: `
# Building Scalable REST APIs with Node.js

Creating REST APIs that can handle growth and maintain performance is crucial for modern applications. This comprehensive guide covers the essential patterns and practices for building scalable APIs with Node.js.

## Architecture Overview

### Layered Architecture
A well-structured API follows a layered approach:

1. **Presentation Layer**: Routes and controllers
2. **Business Logic Layer**: Services and business rules
3. **Data Access Layer**: Models and database interactions
4. **Infrastructure Layer**: Utilities and configurations

### Project Structure
\`\`\`
src/
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   └── postController.js
├── services/
│   ├── authService.js
│   ├── userService.js
│   └── postService.js
├── models/
│   ├── User.js
│   └── Post.js
├── middleware/
│   ├── auth.js
│   ├── validation.js
│   └── errorHandler.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   └── posts.js
└── utils/
    ├── database.js
    ├── logger.js
    └── validators.js
\`\`\`

## Essential Middleware

### Authentication Middleware
\`\`\`javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = auth;
\`\`\`

### Rate Limiting
\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
\`\`\`

## Database Optimization

### Connection Pooling
\`\`\`javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
\`\`\`

### Caching Strategy
\`\`\`javascript
const redis = require('redis');
const client = redis.createClient();

const cache = (duration = 300) => {
  return async (req, res, next) => {
    const key = req.originalUrl;
    const cached = await client.get(key);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      client.setex(key, duration, JSON.stringify(body));
      res.sendResponse(body);
    };
    
    next();
  };
};
\`\`\`

## Performance Optimization

### Pagination
\`\`\`javascript
const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const posts = await Post.find()
    .limit(limit)
    .skip(offset)
    .sort({ createdAt: -1 });

  const total = await Post.countDocuments();
  
  res.json({
    posts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
};
\`\`\`

### Database Indexing
\`\`\`javascript
// MongoDB indexes
db.posts.createIndex({ "title": "text", "content": "text" });
db.posts.createIndex({ "author": 1, "createdAt": -1 });
db.posts.createIndex({ "tags": 1 });

// SQL indexes
CREATE INDEX idx_posts_author_created ON posts(author_id, created_at);
CREATE INDEX idx_posts_published ON posts(published_at) WHERE published = true;
\`\`\`

## Security Best Practices

### Input Validation
\`\`\`javascript
const { body, validationResult } = require('express-validator');

const validatePost = [
  body('title').isLength({ min: 3, max: 200 }).trim().escape(),
  body('content').isLength({ min: 10 }).trim().escape(),
  body('tags').isArray({ max: 5 }),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
\`\`\`

### CORS Configuration
\`\`\`javascript
const cors = require('cors');

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
\`\`\`

## Monitoring and Logging

### Structured Logging
\`\`\`javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
\`\`\`

## Deployment Considerations

### Environment Variables
\`\`\`bash
# .env
NODE_ENV=production
PORT=3000
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
JWT_SECRET=your_jwt_secret
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
\`\`\`

### Docker Configuration
\`\`\`dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["node", "server.js"]
\`\`\`

## Testing Strategy

### Unit Tests
\`\`\`javascript
const request = require('supertest');
const app = require('../app');

describe('Posts API', () => {
  test('GET /api/posts should return all posts', async () => {
    const response = await request(app)
      .get('/api/posts')
      .expect(200);
      
    expect(response.body).toHaveProperty('posts');
    expect(Array.isArray(response.body.posts)).toBe(true);
  });

  test('POST /api/posts should create new post', async () => {
    const newPost = {
      title: 'Test Post',
      content: 'This is a test post',
      tags: ['test']
    };

    const response = await request(app)
      .post('/api/posts')
      .send(newPost)
      .expect(201);

    expect(response.body.title).toBe(newPost.title);
    expect(response.body.content).toBe(newPost.content);
  });
});
\`\`\`

## Conclusion

Building scalable REST APIs requires attention to architecture, performance, security, and maintainability. By following these patterns and best practices, you'll create APIs that can grow with your application's needs.

Remember to monitor performance, implement proper error handling, and always prioritize security in your development process.
      `,
      author: "Felix Kumafutsa",
      category: "Backend Development",
      tags: ["Node.js", "REST API", "Express", "Backend"],
      publishedAt: "2024-01-10T14:30:00Z",
      updatedAt: "2024-01-10T14:30:00Z",
      featuredImage: "/api/placeholder/800/400",
      readingTime: "12 min read",
      status: "published"
    },
    {
      id: 3,
      title: "Modern React Patterns and Best Practices",
      slug: "modern-react-patterns-best-practices",
      excerpt: "Explore advanced React patterns, hooks, and architectural approaches for building maintainable and scalable applications.",
      content: `
# Modern React Patterns and Best Practices

React has evolved significantly over the years, and with it, the patterns and best practices for building robust applications. This guide covers the most important modern React patterns you should know in 2024.

## Component Patterns

### Compound Components
Create flexible and reusable component APIs:

\`\`\`jsx
// Tab component example
const TabContext = createContext();

const TabProvider = ({ children, activeTab, setActiveTab }) => (
  <TabContext.Provider value={{ activeTab, setActiveTab }}>
    {children}
  </TabContext.Provider>
);

const Tab = ({ children, tabId }) => {
  const { activeTab, setActiveTab } = useContext(TabContext);
  const isActive = activeTab === tabId;

  return (
    <button
      className={isActive ? 'active' : ''}
      onClick={() => setActiveTab(tabId)}
    >
      {children}
    </button>
  );
};

const TabPanel = ({ children, tabId }) => {
  const { activeTab } = useContext(TabContext);
  
  return activeTab === tabId ? <div>{children}</div> : null;
};

// Usage
<TabProvider activeTab={activeTab} setActiveTab={setActiveTab}>
  <Tab tabId="profile">Profile</Tab>
  <Tab tabId="settings">Settings</Tab>
  <TabPanel tabId="profile">Profile content</TabPanel>
  <TabPanel tabId="settings">Settings content</TabPanel>
</TabProvider>
\`\`\`

### Custom Hooks for Logic Reuse
\`\`\`jsx
// useApi hook for API calls
const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Usage
const UserProfile = ({ userId }) => {
  const { data: user, loading, error } = useApi(\`/api/users/\${userId}\`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{user.name}</div>;
};
\`\`\`

## State Management Patterns

### Context API with Reducers
\`\`\`jsx
// AppContext.js
const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    loading: false,
    theme: 'light'
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
\`\`\`

### Custom Hook for Local Storage
\`\`\`jsx
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light');
\`\`\`

## Performance Optimization

### React.memo for Component Memoization
\`\`\`jsx
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function
  return prevProps.data.length === nextProps.data.length;
});
\`\`\`

### useMemo and useCallback
\`\`\`jsx
const TodoList = ({ todos, onToggle }) => {
  const expensiveCalculation = useMemo(() => {
    return todos.reduce((sum, todo) => sum + todo.value, 0);
  }, [todos]);

  const handleToggle = useCallback((id) => {
    onToggle(id);
  }, [onToggle]);

  return (
    <div>
      <p>Total: {expensiveCalculation}</p>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};
\`\`\`

### Virtual Scrolling for Large Lists
\`\`\`jsx
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </List>
  );
};
\`\`\`

## Code Splitting and Lazy Loading

### Route-based Code Splitting
\`\`\`jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </Suspense>
);
\`\`\`

### Component Lazy Loading
\`\`\`jsx
const LazyComponent = lazy(() => 
  import('./HeavyComponent').then(module => ({
    default: module.HeavyComponent
  }))
);

const App = () => (
  <div>
    <Suspense fallback={<div>Loading component...</div>}>
      <LazyComponent />
    </Suspense>
  </div>
);
\`\`\`

## Error Handling

### Error Boundaries
\`\`\`jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
\`\`\`

### Async Error Handling
\`\`\`jsx
const useAsyncError = () => {
  const [error, setError] = useState(null);

  const resetError = () => setError(null);

  const runAsync = useCallback(async (asyncFn) => {
    try {
      setError(null);
      return await asyncFn();
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  return { error, resetError, runAsync };
};

// Usage
const MyComponent = () => {
  const { error, runAsync } = useAsyncError();

  const handleSubmit = async () => {
    try {
      await runAsync(() => submitForm(formData));
    } catch (err) {
      // Error is already handled by the hook
    }
  };

  return (
    <div>
      {error && <div className="error">{error.message}</div>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
\`\`\`

## Testing Patterns

### Component Testing with React Testing Library
\`\`\`jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserCard from './UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
  };

  test('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = jest.fn();
    render(<UserCard user={mockUser} onEdit={mockOnEdit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });
});
\`\`\`

### Custom Render Function
\`\`\`jsx
import { render } from '@testing-library/react';
import { AppProvider } from '../context/AppContext';

const customRender = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <AppProvider>
      {children}
    </AppProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
\`\`\`

## Modern React Features

### Concurrent Features
\`\`\`jsx
import { startTransition } from 'react';

const SearchResults = ({ query }) => {
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (searchQuery) => {
    startTransition(() => {
      const filteredResults = expensiveFilter(searchQuery);
      setResults(filteredResults);
    });
  };

  return (
    <div>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {isPending && <div>Searching...</div>}
      {results.map(result => (
        <div key={result.id}>{result.name}</div>
      ))}
    </div>
  );
};
\`\`\`

### Server Components (React 18+)
\`\`\`jsx
// BlogPost.server.js - Server Component
import fs from 'fs/promises';
import path from 'path';

async function BlogPost({ slug }) {
  const postPath = path.join(process.cwd(), 'posts', \`\${slug}.md\`);
  const content = await fs.readFile(postPath, 'utf8');
  
  return (
    <article>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}

// App.js
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<div>Loading post...</div>}>
      <BlogPost slug="my-first-post" />
    </Suspense>
  );
}
\`\`\`

## Best Practices Summary

1. **Component Design**: Keep components small and focused
2. **State Management**: Use the right tool for the job (useState, useReducer, Context, or external libraries)
3. **Performance**: Memoize expensive operations and implement code splitting
4. **Error Handling**: Implement boundaries and handle async errors gracefully
5. **Testing**: Write tests that focus on user behavior
6. **Accessibility**: Ensure components are accessible to all users
7. **Code Organization**: Structure your project logically

## Tools and Libraries

### Essential Libraries
- **State Management**: Zustand, Redux Toolkit, Jotai
- **Routing**: React Router v6
- **Forms**: React Hook Form, Formik
- **Data Fetching**: React Query, SWR
- **Styling**: Tailwind CSS, Styled Components
- **Testing**: React Testing Library, Jest

### Development Tools
- **Linting**: ESLint with React rules
- **Type Checking**: TypeScript or PropTypes
- **Bundle Analysis**: Webpack Bundle Analyzer
- **Performance**: React DevTools Profiler

By following these patterns and best practices, you'll create React applications that are maintainable, performant, and scalable. Remember that patterns are tools, not rules - adapt them to your specific needs and project requirements.
      `,
      author: "Felix Kumafutsa",
      category: "Frontend Development",
      tags: ["React", "JavaScript", "Frontend", "Patterns"],
      publishedAt: "2024-01-05T09:00:00Z",
      updatedAt: "2024-01-05T09:00:00Z",
      featuredImage: "/api/placeholder/800/400",
      readingTime: "15 min read",
      status: "published"
    }
  ],
  
  // Categories for filtering
  categories: [
    { id: 'iot', name: 'IoT', count: 1 },
    { id: 'backend', name: 'Backend Development', count: 1 },
    { id: 'frontend', name: 'Frontend Development', count: 1 }
  ],
  
  // Tags for filtering
  tags: [
    'IoT', 'ESP32', 'Sensors', 'Tutorial',
    'Node.js', 'REST API', 'Express', 'Backend',
    'React', 'JavaScript', 'Frontend', 'Patterns'
  ]
};

// Database-ready API functions - replace with actual database calls
export const blogAPI = {
  // Get all blog posts
  getPosts: async (page = 1, limit = 10, category = null, tag = null) => {
    // Simulate API call - replace with actual database query
    let filteredPosts = blogData.posts.filter(post => post.status === 'published');
    
    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    if (tag) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
      );
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    
    return {
      posts: paginatedPosts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredPosts.length / limit),
        totalPosts: filteredPosts.length,
        hasNextPage: endIndex < filteredPosts.length,
        hasPrevPage: page > 1
      }
    };
  },

  // Get single blog post by slug
  getPostBySlug: async (slug) => {
    // Simulate API call - replace with actual database query
    const post = blogData.posts.find(p => p.slug === slug && p.status === 'published');
    return post || null;
  },

  // Get related posts
  getRelatedPosts: async (currentPost, limit = 3) => {
    // Simulate API call - replace with actual database query
    const relatedPosts = blogData.posts
      .filter(post => 
        post.id !== currentPost.id && 
        post.status === 'published' &&
        (post.category === currentPost.category || 
         post.tags.some(tag => currentPost.tags.includes(tag)))
      )
      .slice(0, limit);
    
    return relatedPosts;
  },

  // Get categories
  getCategories: async () => {
    // Simulate API call - replace with actual database query
    return blogData.categories;
  },

  // Get tags
  getTags: async () => {
    // Simulate API call - replace with actual database query
    return blogData.tags;
  },

  // Search posts
  searchPosts: async (query, page = 1, limit = 10) => {
    // Simulate API call - replace with actual database query
    const searchResults = blogData.posts.filter(post => 
      post.status === 'published' &&
      (post.title.toLowerCase().includes(query.toLowerCase()) ||
       post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
       post.content.toLowerCase().includes(query.toLowerCase()))
    );
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = searchResults.slice(startIndex, endIndex);
    
    return {
      posts: paginatedResults,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(searchResults.length / limit),
        totalPosts: searchResults.length,
        hasNextPage: endIndex < searchResults.length,
        hasPrevPage: page > 1
      }
    };
  }
};
