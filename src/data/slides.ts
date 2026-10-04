/** Lecture slide titles, in order. Slide n lives at public/assets/slides/slide-NN.webp. */
export const slideTitles = [
  'GPUs and Inference Engineering', 'The Final Piece of the Puzzle', 'Most valuable company?', 'Interlude', 'Join the Mentimeter Poll',
  'NVIDIA', 'GPUs are so important!', 'The Modern AI Stack', 'Meet Ben!', 'Don’t Be Like Ben ❌',
  'Before we get started', '01. The GPU', 'The CPU', 'CPU vs GPU: who would you hire?', 'Now The GPU',
  'GPUs Are Very Important!', 'When do you need a GPU?', 'Inside the GPU system', 'GPUs Can Have Bottlenecks', 'The GPU as a factory',
  'Diagnose the bottleneck', '02. Measuring Compute & Memory', 'Scaling Laws', 'Why Measuring Compute and Memory Matters?', 'Measuring Compute',
  'Counting operations', 'FLOPs', 'How We Measure Compute: FLOPs vs. FLOPS', 'Estimating Compute for a Transformer Model', 'Worked Example',
  'Money matters', 'No free lunch', 'Measuring Memory', 'How Computers Store Numbers', 'Precision: More Bits, More Accuracy',
  'Why is bfloat16 so common?', 'What Fills GPU Memory', 'What happens during training', 'Optimizers', 'What happens during inference',
  'What Fills GPU Memory', 'Estimating Memory is Simple', 'How Do We Estimate Memory For Training and Inference?', 'GPU memory as a backpack', 'Worked Example',
  'What eats your GPU memory', '03. GPU Performance Bottlenecks', 'What Is Limiting My GPU?', 'Think About Attention', 'Think About Attention',
  'A GPU Has Two Kinds of Memory', 'Attention Builds a Big Table', 'The Table Doesn’t Fit on the Chip', 'Back and Forth, Again and Again', 'FlashAttention: Move Less Data',
  'If data movement is the problem, move less data.', '04. GPU Optimization Techniques', 'Why Do We Need to Optimize?', 'Your GPU Memory Is a Backpack', 'Three Tricks to Pack Smarter',
  'Our Brains Naturally “Quantize”', 'Quantization', 'What About Training?', 'Mixed-Precision Training', 'What Is a Batch?',
  'Large batches vs memory', 'Gradient Accumulation', 'Gradient Accumulation: An Example', 'Sometimes, One Bag Is Not Enough', 'Multi-GPU Training',
  'What Would You Do?', '05. Inference Engineering', 'Why Inference Engineering Matters', 'What Inference Engineers Optimize', '05. Using GPUs Responsibly',
  'GPU and Model Acceleration Activity', 'What Next?', 'Resources',
];

export const slideSrc = (n: number) => `assets/slides/slide-${String(n).padStart(2, '0')}.webp`;
