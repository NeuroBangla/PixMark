import React from 'react'
import { PixMark } from '../src'
import type { IAnnotation } from '../src'

const App: React.FC = () => {
  // Sample annotations for demonstration
  const sampleAnnotations: IAnnotation[] = [
    {
      id: '1',
      text: 'Person Walking',
      boundingBox: {
        x_top_left: 50,
        y_top_left: 30,
        x_bottom_right: 150,
        y_bottom_right: 200,
      },
      color: '#00ff00',
      confidence: 0.95,
    },
    {
      id: '2',
      text: 'Car',
      boundingBox: {
        x_top_left: 200,
        y_top_left: 120,
        x_bottom_right: 350,
        y_bottom_right: 220,
      },
      color: '#ff0000',
      confidence: 0.87,
    },
    {
      id: '3',
      text: 'Building',
      boundingBox: {
        x_top_left: 400,
        y_top_left: 10,
        x_bottom_right: 580,
        y_bottom_right: 180,
      },
      color: '#0000ff',
      confidence: 0.72,
    },
    {
      id: '4',
      text: 'Tree',
      boundingBox: {
        x_top_left: 300,
        y_top_left: 40,
        x_bottom_right: 380,
        y_bottom_right: 160,
      },
      color: '#ff9900',
      confidence: 0.65,
    },
    {
      id: '5',
      text: 'Sign',
      boundingBox: {
        x_top_left: 420,
        y_top_left: 180,
        x_bottom_right: 500,
        y_bottom_right: 230,
      },
      color: '#9900ff',
      confidence: 0.58,
    },
  ]

  const basicAnnotations: IAnnotation[] = [
    {
      id: 'basic-1',
      text: 'Main Subject',
      boundingBox: {
        x_top_left: 100,
        y_top_left: 80,
        x_bottom_right: 300,
        y_bottom_right: 200,
      },
      color: '#ff6b6b',
    },
    {
      id: 'basic-2',
      text: 'Background',
      boundingBox: {
        x_top_left: 350,
        y_top_left: 50,
        x_bottom_right: 550,
        y_bottom_right: 180,
      },
      color: '#4ecdc4',
    },
  ]

  return (
    <div className="container">
      <div className="header">
        <h1>PixMark Demo</h1>
      </div>

      <div className="demo-section">
        <div className="pixmark-wrapper">
          <PixMark
            src="https://picsum.photos/600/300?random=2"
            annotations={sampleAnnotations}
            enableConfidenceFilter={true}
          />
        </div>
      </div>

      <div className="demo-section">
        <h2 className="demo-title">💻 Usage</h2>
        <p className="demo-description">
          Install PixMark in your project:
        </p>
        <pre style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', overflow: 'auto' }}>
          <code>npm install pixmark</code>
        </pre>
        <p className="demo-description">
          Then use it in your React components:
        </p>
        <pre style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', overflow: 'auto', fontSize: '0.9em' }}>
          <code>{`import { PixMark } from 'pixmark';
import type { IAnnotation } from 'pixmark';

const annotations: IAnnotation[] = [
  {
    id: '1',
    text: 'Example',
    boundingBox: {
      x_top_left: 100,
      y_top_left: 100,
      x_bottom_right: 200,
      y_bottom_right: 200,
    },
    color: '#00ff00',
    confidence: 0.95,
  },
];

<PixMark src="image.jpg" annotations={annotations} />`}</code>
        </pre>
      </div>
    </div>
  )
}

export default App