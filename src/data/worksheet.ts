export interface WorksheetQuestion {
  title: string;
  prompt: string;
  /** [label, expected answer] for each input. Answers within 5% are accepted. */
  fields: [string, number][];
  reflect: string;
  /** Worked solution, shown on request. */
  working: string;
}

/** Questions 1, 2 and 4. Question 3 is the interactive plan builder on the worksheet page. */
export const worksheet: WorksheetQuestion[] = [
  {
    title: '1. Which GPUs can train your model?',
    prompt: 'Calculate the training memory in GB.',
    fields: [['Parameters', 2], ['Gradients', 2], ['Optimizer (Adam)', 4], ['Activations', 12], ['Total', 20]],
    reflect: 'Which part of training memory would shrink if you halved the batch size, and which parts would not?',
    working: "Parameters: 1B × 2 bytes = 2 GB. Gradients: same as the weights, 2 GB. Adam: 2 states × 2 GB = 4 GB. Activations: 12 GB. Total 20 GB, so it doesn't fit on GPU A (16 GB) as is, but fits on B and C.",
  },
  {
    title: '2. What would each option cost, and how long would it take?',
    prompt: 'Use one GPU of each type. Enter compute in units of 10²⁰ FLOPs, time in hours and cost in dollars.',
    fields: [['Compute (× 10²⁰ FLOPs)', 1.2], ['Time on A (h)', 333.3], ['Time on B (h)', 111.1], ['Time on C (h)', 33.3], ['Cost on A ($)', 333.3], ['Cost on B ($)', 444.4], ['Cost on C ($)', 333.3]],
    reflect: "Why isn't the cheapest GPU per hour necessarily the cheapest training option? What matters more for total cost: GPU price or training time?",
    working: '6 × 10⁹ × 2 × 10¹⁰ = 1.2 × 10²⁰ FLOPs. A: 1.2 × 10²⁰ ÷ 10¹⁴ = 1.2 × 10⁶ s ≈ 333 h, $333. B: 111 h, $444. C: 33 h, $333. Only C meets the 72-hour deadline and the $1,000 budget on a single GPU.',
  },
  {
    title: '4. How much memory does inference need?',
    prompt: 'No gradients or optimizer states. Temporary activations: 1 GB. int4 uses 0.5 bytes per parameter.',
    fields: [['bf16 total (GB)', 3], ['int4 total (GB)', 1.5], ['Training ÷ bf16 (×)', 6.7], ['Training ÷ int4 (×)', 13.3]],
    reflect: 'What might you sacrifice by choosing the lowest-precision option (int4) for inference?',
    working: 'bf16: 2 GB weights + 1 GB activations = 3 GB, about 7× less than training. int4: 0.5 + 1 = 1.5 GB, about 13× less. Both fit easily on GPU A, the cheapest option for serving.',
  },
];
