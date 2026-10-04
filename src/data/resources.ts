export const mainCourse = {
  title: 'Google DeepMind AI Research Foundations: Course 07',
  description: 'The official course this session is built on. Work through the full course materials and exercises.',
  url: 'https://www.skills.google/paths/3135/course_templates/1555',
};

/** Tint is one of the tile colour classes: t-blue, t-sage, t-lav, t-peach, t-pink. */
export const links = [
  { title: 'Modal GPU Glossary', description: 'A clear, illustrated glossary of GPU hardware and software terms.', url: 'https://modal.com/gpu-glossary', tint: 't-blue' },
  { title: 'Inside an AI Data Center', description: 'An interactive tour of what it takes to power AI at gigawatt scale.', url: 'https://kiankyars.github.io/gigawatt', tint: 't-peach' },
  { title: 'Inference Engineering by Philip Kiely', description: 'A practical book on making LLMs fast and affordable to serve.', url: 'https://www.baseten.co/inference-engineering/', tint: 't-sage' },
  { title: 'Inference Engineering: interactive exercises', description: 'Hands-on exercises to accompany the book.', url: 'https://inferenceengineering.tech/exercises/', tint: 't-lav' },
  { title: 'NVIDIA GPU Programming Guide', description: "NVIDIA's guide to how GPUs execute work and how to program them.", url: 'https://developer.nvidia.com/nvidia-gpu-programming-guide', tint: 't-sage' },
  { title: 'AIMS GCP Tutorial', description: 'Step-by-step guide to running your work on Google Cloud GPUs.', url: 'https://rexsimiloluwah.github.io/gcp-tutorial-aims/', tint: 't-blue' },
];

/** [title, authors, arXiv id] */
export const papers: [string, string, string][] = [
  ['Scaling Laws for Neural Language Models', 'Kaplan et al., 2020', '2001.08361'],
  ['Training Compute-Optimal Large Language Models (Chinchilla)', 'Hoffmann et al., 2022', '2203.15556'],
  ['Mixed Precision Training', 'Micikevicius et al., 2017', '1710.03740'],
  ['FlashAttention', 'Dao et al., 2022', '2205.14135'],
  ['Megatron-LM: Training Multi-Billion Parameter Models Using Model Parallelism', 'Shoeybi et al., 2019', '1909.08053'],
  ['GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism', 'Huang et al., 2018', '1811.06965'],
  ['ZeRO: Memory Optimizations Toward Training Trillion Parameter Models', 'Rajbhandari et al., 2019', '1910.02054'],
  ['Efficient Memory Management for LLM Serving with PagedAttention (vLLM)', 'Kwon et al., 2023', '2309.06180'],
  ['Fast Inference from Transformers via Speculative Decoding', 'Leviathan et al., 2022', '2211.17192'],
  ['LoRA: Low-Rank Adaptation of Large Language Models', 'Hu et al., 2021', '2106.09685'],
  ['QLoRA: Efficient Finetuning of Quantized LLMs', 'Dettmers et al., 2023', '2305.14314'],
];
