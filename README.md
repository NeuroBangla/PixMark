# PixMark

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

A powerful, lightweight React component library for image annotation and markup. Built with TypeScript, PixMark provides an intuitive interface for displaying images with interactive bounding box annotations.

## ✨ Features

- 🖼️ **Image Display**: Load and display images from URLs with automatic dimension detection
- 📦 **Bounding Box Annotations**: Visualize annotations as interactive rectangles on images
- 🎯 **Interactive Selection**: Click to select/deselect annotations in the list
- 🎨 **Customizable Styling**: Support for custom colors and styling
- 📜 **Virtualized List**: Efficient rendering of large annotation lists using `rc-virtual-list`
- 🔍 **Hover Effects**: Visual feedback on hover for both image and list items
- 📱 **Responsive Design**: Flexible layout that adapts to container dimensions
- 🛠️ **TypeScript Support**: Full TypeScript definitions for better development experience

## 🚀 Installation

```bash
# Using npm
npm install pixmark

# Using yarn
yarn add pixmark

# Using pnpm
pnpm add pixmark
```

### Peer Dependencies

Make sure you have React and React DOM installed:

```bash
npm install react react-dom
```

## 📖 Usage

### Basic Example

```tsx
import React from 'react';
import { PixMark } from 'pixmark';

const MyComponent = () => {
  const annotations = [
    {
      id: '1',
      text: 'Person',
      boundingBox: { x0: 100, y0: 50, x1: 200, y1: 150 },
      color: '#00ff00'
    },
    {
      id: '2',
      text: 'Car',
      boundingBox: { x0: 300, y0: 200, x1: 450, y1: 280 },
      color: '#ff0000'
    }
  ];

  return (
    <PixMark
      src="https://example.com/image.jpg"
      annotations={annotations}
    />
  );
};

export default MyComponent;
```

### Advanced Usage with Custom Styling

```tsx
import React, { useState } from 'react';
import { PixMark } from 'pixmark';
import type { IAnnotation } from 'pixmark';

const AdvancedExample = () => {
  const [selectedAnnotations, setSelectedAnnotations] = useState<IAnnotation[]>([]);

  const annotations: IAnnotation[] = [
    {
      id: 'person-1',
      text: 'John Doe',
      boundingBox: { x0: 120, y0: 80, x1: 220, y1: 180 },
      color: '#00ff00'
    },
    {
      id: 'object-1',
      text: 'Laptop',
      boundingBox: { x0: 250, y0: 150, x1: 350, y1: 200 },
      color: '#0000ff'
    }
  ];

  const handleSelectionChange = (annotations: IAnnotation[]) => {
    setSelectedAnnotations(annotations);
    console.log('Selected annotations:', annotations);
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <PixMark
        src="https://example.com/my-image.jpg"
        annotations={annotations}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  );
};
```

## 🏗️ API Reference

### PixMark Component

The main component that combines the image viewer and annotation list.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `string` | ✅ | URL of the image to display |
| `annotations` | `IAnnotation[]` | ✅ | Array of annotations to display |

### Type Definitions

#### IAnnotation

```typescript
interface IAnnotation {
  id: string;           // Unique identifier for the annotation
  text: string;         // Display text for the annotation
  boundingBox: {
    x0: number;         // Top-left x coordinate
    y0: number;         // Top-left y coordinate
    x1: number;         // Bottom-right x coordinate
    y1: number;         // Bottom-right y coordinate
  };
  color?: string;       // Optional color for the bounding box (hex or named color)
}
```

#### IPixMark

```typescript
interface IPixMark {
  src: string;                    // Image URL
  annotations: IAnnotation[];     // Array of annotations
}
```

## 🧩 Component Architecture

### PixMarkViewer

Displays the image with annotation bounding boxes as SVG overlays.

**Features:**
- Loads images from URLs and converts to base64 for display
- Renders bounding boxes as SVG rectangles
- Handles hover interactions
- Supports custom dimensions and scrolling

### PixMarkList

Displays a scrollable list of annotations using virtual scrolling.

**Features:**
- Virtualized rendering for performance with large lists
- Click to select/deselect annotations
- Hover effects synchronized with image viewer
- Customizable item height and styling

### AnnotationEntry

Individual annotation item in the list.

**Features:**
- Click to toggle selection state
- Hover effects
- Displays annotation text and coordinates

## 🎨 Styling

PixMark uses inline styles by default but can be customized by wrapping components or using CSS-in-JS solutions.

### Default Styles

- **Selected annotations**: Green border by default, customizable via `color` prop
- **Hover effects**: Red border for hovered items
- **List items**: 30px height with padding and borders

### Custom Styling Example

```tsx
const CustomPixMark = () => (
  <div className="custom-pixmark-container">
    <PixMark
      src="image.jpg"
      annotations={annotations}
    />
    <style jsx>{`
      .custom-pixmark-container :global(.image-large) {
        border-radius: 8px;
      }
      .custom-pixmark-container :global(rect) {
        stroke-width: 2;
      }
    `}</style>
  </div>
);
```

## 🔧 Development

### Prerequisites

- Node.js 16+
- pnpm, npm, or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/maifeeulasad/pixmark.git
cd pixmark

# Install dependencies
pnpm install

# Start development
pnpm run build

# Run linting
pnpm run lint

# Format code
pnpm run format
```

### Build Scripts

| Script | Description |
|--------|-------------|
| `pnpm run build` | Build the library using tsup (ESM + CJS + DTS) |
| `pnpm run lint` | Run ESLint on source files |
| `pnpm run lint:fix` | Run ESLint with auto-fix |
| `pnpm run format` | Format code with Prettier |

### Project Structure

```
src/
├── index.ts              # Main exports
├── components/
│   ├── PixMark.tsx       # Main component
│   ├── PixMarkViewer.tsx # Image viewer with annotations
│   ├── PixMarkList.tsx   # Annotation list
│   └── types.ts          # TypeScript definitions
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add TypeScript types for new features
- Update documentation for API changes
- Add tests for new functionality
- Ensure all linting passes

## 📄 License

This project is licensed under the **AGPL-3.0 License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- Uses [rc-virtual-list](https://github.com/react-component/virtual-list) for efficient list rendering
- Inspired by various image annotation tools in the computer vision community

## 📞 Support

If you have any questions or need help:

- 📧 Email: maifeeulasad@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/maifeeulasad/pixmark/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/maifeeulasad/pixmark/discussions)

---

**Made with ❤️ by [Maifee Ul Asad](https://github.com/maifeeulasad)**