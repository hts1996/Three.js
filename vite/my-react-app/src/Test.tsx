import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';

function XYPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      {/* x, y 평면의 가로:세로 비율을 1:5로 만듭니다. */}
      <planeGeometry args={[1, 5]} />
      <meshBasicMaterial color="grey" />
    </mesh>
  );
}

function Ball({ position }) {
  return (
    <mesh position={position}>
      <circleGeometry args={[0.05, 32]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
}

function App() {
  const [balls, setBalls] = useState([]);
  
  const createBall = () => {
    const x = (Math.random() - 0.5) * 0.8; // -0.4부터 0.4 사이의 랜덤한 x 위치
    const y = (Math.random() - 0.5) * 2.0; // -1부터 1 사이의 랜덤한 y 위치
    setBalls((prevBalls) => [...prevBalls, { x, y }]);
  };

  return (
    <div style={{ width: '800px', height: '800px' }}>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 3, 0] }} // 카메라 설정
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <XYPlane />
        {balls.map((ball, index) => (
          <Ball key={index} position={[ball.x, ball.y, 0]} />
        ))}
      </Canvas>
      <button onClick={createBall}>Create Ball</button>
    </div>
  );
}

export default App;
