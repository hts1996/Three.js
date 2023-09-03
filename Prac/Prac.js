const { Engine, Render, World, Bodies, MouseConstraint, Mouse } = Matter;

// Create a Matter.js engine
const engine = Engine.create();

// Create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1600,
        height: 1200,
        wireframes: false,
    }
});

// Create a mouse and add mouse interaction
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false,
        }
    }
});

// Add mouse constraint to the world
World.add(engine.world, mouseConstraint);

// Create ground
const ground = Bodies.rectangle(400, 600, 800, 40, { isStatic: true });

// Create cup-shaped boundary using vertices
const cupVertices = [
    { x: 100, y: 500 },
    { x: 200, y: 450 },
    { x: 300, y: 500 },
    { x: 300, y: 600 },
    { x: 100, y: 600 },
];

const cupBoundary = Bodies.fromVertices(200, 500, [cupVertices], {
    isStatic: true,
    render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
    }
});

// Create balls array
const balls = [];

// Listen for mouse clicks to create balls
render.canvas.addEventListener('mousedown', () => {
    const ball = Bodies.circle(mouse.position.x, mouse.position.y, 20, {
        restitution: 0.8,
        friction: 0.01,
        density: 0.04,
    });
    balls.push(ball);
    World.add(engine.world, ball);
});

// Add all bodies to the world
World.add(engine.world, [ground, cupBoundary]);

// Run the engine and renderer
Engine.run(engine);
Render.run(render);