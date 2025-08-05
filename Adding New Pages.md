## 📝 **How to Add New Pages**

### **Step 1: Create Your Page Component**
Create a new file in `src/pages/` (e.g., `NewDesign.jsx`):

```jsx
import React from 'react';

const NewDesign = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white">
          Your New Design
        </h1>
        {/* Your design content here */}
      </div>
    </div>
  );
};

export default NewDesign;
```

### **Step 2: Import in App.jsx**
Add the import at the top of your `App.jsx`:
```jsx
import NewDesign from './pages/NewDesign';
```

### **Step 3: Register in Interfaces Array**
Add your component to the `interfaces` array in `App.jsx`:
```jsx
{
  id: 'new-design',
  component: NewDesign,
  title: 'New Design'
}
```

### **Step 4: Add Metadata in HomePage.jsx**
Add the interface metadata in the `interfaceData` array in `HomePage.jsx`:
```jsx
{
  id: 'new-design',
  title: 'New Design',
  description: 'Brief description of your new design',
  category: 'Your Category',
  tags: ['tag1', 'tag2', 'tag3'],
  gradient: 'bg-gradient-to-br from-blue-500 to-purple-500',
  thumbnail: null // or path to thumbnail
}
```

That's it! Your new page will automatically appear on the homepage and be navigable.

---

## 🖼️ **How to Add Thumbnails**

### **Method 1: Using Screenshots (Recommended)**
1. **Navigate to your interface** in the app
2. **Press Ctrl+S** to capture a styled screenshot
3. **Crop the screenshot** to focus on the key visual elements
4. **Resize to 400x300px** for optimal display
5. **Save in** `src/assets/thumbnails/[interface-id].png`
6. **Update the metadata** in `HomePage.jsx`:
```jsx
{
  id: 'your-interface-id',
  // ... other properties
  thumbnail: '/src/assets/thumbnails/your-interface-id.png'
}
```

### **Method 2: Custom Thumbnail Creation**
1. **Create a 400x300px image** representing your interface
2. **Use the same color palette** as your actual interface
3. **Include key visual elements** (not too detailed)
4. **Save as PNG** in `src/assets/thumbnails/`
5. **Update the thumbnail path** in the metadata

### **File Structure for Thumbnails**
```
src/
├── assets/
│   ├── logo.png (your BRAND NOVA logo)
│   └── thumbnails/
│       ├── about-us.png
│       ├── crypto-wallet.png
│       ├── hotel-booking-interface.png
│       └── ... (other thumbnails)
├── components/
├── pages/
└── App.jsx
```

### **Thumbnail Best Practices**
- **Aspect Ratio**: 4:3 (400x300px recommended)
- **Format**: PNG for transparency support
- **Quality**: High resolution but optimized file size
- **Content**: Show the most distinctive visual elements
- **Consistency**: Similar visual style across all thumbnails

---

## 🎨 **Customizing Interface Metadata**

Each interface entry supports these properties:

```jsx
{
  id: 'unique-kebab-case-id',           // Must match your component import
  title: 'Display Title',               // Shown on cards and navigation
  description: 'Brief description...',  // Shown on homepage cards
  category: 'Category Name',            // Groups related interfaces
  tags: ['tag1', 'tag2', 'tag3'],      // Searchable keywords
  gradient: 'bg-gradient-to-br from-color-500 to-color-500', // Fallback gradient
  thumbnail: '/path/to/thumbnail.png'   // null for icon fallback
}
```

---

## 🚀 **Development Workflow**

### **Adding Multiple Pages at Once**
1. Create all your page components in `src/pages/`
2. Add all imports to `App.jsx` at once
3. Add all entries to the `interfaces` array
4. Add all metadata entries to `HomePage.jsx`
5. Test navigation between all pages

### **Quick Testing**
- Use **arrow keys** to quickly navigate between interfaces
- Use **Ctrl+H** to toggle showcase mode for clean viewing
- Use **Ctrl+S** to test screenshot functionality

### **Logo Setup**
Make sure your `logo.png` is in `src/assets/logo.png` for the branding to work in screenshots.
