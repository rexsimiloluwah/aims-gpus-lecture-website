export interface Module {
  id: string;
  n: number;
  slug: string;
  title: string;
  /** Short line under the title in the learning path. */
  tagline: string;
  /** One sentence for the home page journey cards. */
  blurb: string;
  /** First and last lecture slide covered by the module. */
  slides: [number, number];
}

export const modules: Module[] = [
  { id: 'm1', n: 1, slug: 'why-gpus', title: 'Why GPUs?', tagline: 'Parallel work at scale', blurb: 'CPUs vs GPUs, and why AI is a parallel problem.', slides: [12, 21] },
  { id: 'm2', n: 2, slug: 'measuring-compute-and-memory', title: 'Measuring Compute and Memory', tagline: 'FLOPs, bytes and cost', blurb: 'Estimate FLOPs, training time, cost and GPU memory.', slides: [22, 46] },
  { id: 'm3', n: 3, slug: 'gpu-bottlenecks', title: 'GPU Bottlenecks', tagline: 'What slows a GPU down', blurb: 'Find what limits a GPU, then see how FlashAttention moves less data.', slides: [47, 56] },
  { id: 'm4', n: 4, slug: 'single-gpu-memory-tricks', title: 'Single-GPU Memory Optimization Tricks', tagline: 'Pack the bag smarter', blurb: 'Quantization, mixed precision and gradient accumulation.', slides: [57, 68] },
  { id: 'm5', n: 5, slug: 'multi-gpu-training', title: 'Multi-GPU Training', tagline: 'Share the load', blurb: 'Data, tensor and pipeline parallelism, plus ZeRO.', slides: [69, 70] },
  { id: 'm6', n: 6, slug: 'inference-engineering', title: 'Inference Engineering', tagline: 'Serving real users', blurb: 'Prefill, decode, KV cache, batching and speculative decoding.', slides: [72, 74] },
];

export const modulePath = (m: Module) => `learn/${m.slug}/`;
