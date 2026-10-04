/* Code for Module 4. "Try it" snippets run anywhere, even on a laptop CPU; their outputs are real, captured runs.
   The other snippets need an NVIDIA GPU (a free Google Colab T4 works). */

export const quantizationCode = [
  {
    label: 'Try it: PyTorch',
    code: `import torch

torch.manual_seed(0)
w = torch.randn(4096, 4096)  # a weight matrix in float32
print(f"float32: {w.nbytes / 1e6:.0f} MB")

for bits in (8, 4):
    q_max = 2 ** (bits - 1) - 1         # 127 for int8, 7 for int4
    s = w.abs().max() / q_max           # scale: the largest weight maps to q_max
    q = torch.round(w / s)              # quantize: q = round(x / s)
    w_hat = q * s                       # dequantize: x ≈ q × s
    size = w.numel() * bits / 8 / 1e6
    error = (w - w_hat).abs().mean()
    print(f"int{bits}:    {size:.0f} MB, average error {error:.3f}")
`,
    output: `float32: 67 MB
int8:    17 MB, average error 0.010
int4:    8 MB, average error 0.189
`,
    note: 'int4 with one scale for the whole matrix is crude. Real 4-bit formats give each small block of weights (for example 64) its own scale.',
  },
  {
    label: 'Hugging Face + bitsandbytes',
    code: `import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig

name = "Qwen/Qwen2.5-1.5B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(name)

model_16 = AutoModelForCausalLM.from_pretrained(name, dtype=torch.float16, device_map="auto")
model_4 = AutoModelForCausalLM.from_pretrained(
    name,
    device_map="auto",
    quantization_config=BitsAndBytesConfig(
        load_in_4bit=True,                     # store the weights in 4 bits
        bnb_4bit_quant_type="nf4",             # the 4-bit format QLoRA uses
        bnb_4bit_compute_dtype=torch.float16,  # turn back into 16-bit for the maths
    ),
)
print(f"16-bit: {model_16.get_memory_footprint() / 1e9:.1f} GB")
print(f"4-bit:  {model_4.get_memory_footprint() / 1e9:.1f} GB")

prompt = tokenizer("The capital of France is", return_tensors="pt").to(model_4.device)
answer = model_4.generate(**prompt, max_new_tokens=10)
print(tokenizer.decode(answer[0], skip_special_tokens=True))
`,
    note: 'Prints both sizes and a short answer. The 4-bit model is about a third of the 16-bit size, not a quarter, because the embedding table stays in 16-bit.',
  },
  {
    label: 'Unsloth (fine-tune in 4-bit)',
    code: `from unsloth import FastLanguageModel

# Load the base model in 4 bits. It stays frozen.
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/Qwen3-4B-Instruct-2507",
    max_seq_length=2048,
    load_in_4bit=True,
)

# Add small LoRA adapters. Only these are trained, in 16-bit.
model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    lora_alpha=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                    "gate_proj", "up_proj", "down_proj"],
)
model.print_trainable_parameters()
`,
    note: 'Prints how many parameters you will train: under 1% of the model. This is QLoRA: a frozen 4-bit model plus small 16-bit adapters.',
  },
];

export const mixedPrecisionCode = [
  {
    label: 'Try it: PyTorch',
    code: `import torch

device = "cuda" if torch.cuda.is_available() else "cpu"
model = torch.nn.Linear(512, 512).to(device)
x = torch.randn(64, 512, device=device)
y = torch.randn(64, 512, device=device)

with torch.autocast(device_type=device, dtype=torch.bfloat16):
    out = model(x)                              # matrix multiply: bfloat16
    loss = torch.nn.functional.mse_loss(out, y)  # loss: float32
loss.backward()

print("weights: ", model.weight.dtype)       # the master copy
print("output:  ", out.dtype)
print("loss:    ", loss.dtype)
print("gradient:", model.weight.grad.dtype)  # matches the weights
`,
    output: `weights:  torch.float32
output:   torch.bfloat16
loss:     torch.float32
gradient: torch.float32
`,
    note: 'The weights and gradients stay in float32. Only the matrix multiply ran in bfloat16.',
  },
  {
    label: 'Speed test (GPU)',
    code: `import time
import torch

a = torch.randn(4096, 4096, device="cuda")
b = torch.randn(4096, 4096, device="cuda")

for dtype in (torch.float32, torch.float16):
    x, y = a.to(dtype), b.to(dtype)
    x @ y                    # warm up
    torch.cuda.synchronize()
    start = time.perf_counter()
    for _ in range(50):
        x @ y
    torch.cuda.synchronize()  # wait for the GPU to finish
    ms = (time.perf_counter() - start) / 50 * 1000
    print(f"{dtype}: {ms:.2f} ms per matrix multiply")
`,
    note: 'Prints the time for each. On NVIDIA GPUs with Tensor Cores, including the T4, float16 is several times faster.',
  },
  {
    label: 'Training loop',
    code: `import torch

# bfloat16 on Ampere or newer (A100, H100, RTX 30 series and up). float16 on older GPUs like the T4.
use_bf16 = torch.cuda.is_bf16_supported(including_emulation=False)
dtype = torch.bfloat16 if use_bf16 else torch.float16
scaler = torch.amp.GradScaler("cuda", enabled=(dtype == torch.float16))  # loss scaling: float16 only

for step, (x, y) in enumerate(loader):
    with torch.autocast(device_type="cuda", dtype=dtype):  # forward pass in mixed precision
        loss = loss_fn(model(x), y)
    scaler.scale(loss).backward()  # backward pass, outside autocast
    scaler.step(optimizer)         # update the float32 weights
    scaler.update()
    optimizer.zero_grad()
    if step % 100 == 0:
        print(f"step {step}: loss {loss.item():.3f}, loss scale {scaler.get_scale():.0f}")
`,
    note: 'With float16, the loss scale starts at 65,536 and may drop when a step overflows: GradScaler skips that step and tries a smaller scale. That is normal. With bfloat16 it stays at 1.',
  },
  {
    label: 'Hugging Face',
    code: `from transformers import TrainingArguments

args = TrainingArguments(output_dir="out", bf16=True)  # fp16=True on a T4 or older GPU

# Hugging Face Accelerate, in your own loop:  Accelerator(mixed_precision="bf16")
# PyTorch Lightning:                          Trainer(precision="bf16-mixed")
`,
    note: 'One setting. Load the model in float32 as usual; the library handles autocast and loss scaling.',
  },
];

export const accumulationCode = [
  {
    label: 'Try it: PyTorch',
    code: `import torch

torch.manual_seed(0)
model = torch.nn.Linear(10, 1)
x, y = torch.randn(64, 10), torch.randn(64, 1)
loss_fn = torch.nn.MSELoss()

# One big batch of 64
loss_fn(model(x), y).backward()
big = model.weight.grad.clone()
model.zero_grad()

# Four micro-batches of 16: gradients add up in .grad
steps = 4
for xb, yb in zip(x.chunk(steps), y.chunk(steps)):
    loss = loss_fn(model(xb), yb) / steps  # divide so the sum is an average
    loss.backward()

print("same gradient:", torch.allclose(big, model.weight.grad))
print(f"largest difference: {(big - model.weight.grad).abs().max():.1e}")
`,
    output: `same gradient: True
largest difference: 6.7e-08
`,
    note: 'The tiny difference is floating-point rounding: the gradient is the same as the big batch.',
  },
  {
    label: 'Training loop',
    code: `accumulation_steps = 4  # 4 micro-batches of 16 = an effective batch of 64

for step, (x, y) in enumerate(loader):  # the loader yields micro-batches of 16
    loss = loss_fn(model(x), y) / accumulation_steps
    loss.backward()                     # gradients add up in .grad

    if (step + 1) % accumulation_steps == 0:
        optimizer.step()                # one update per 64 examples
        optimizer.zero_grad()
        print(f"update {(step + 1) // accumulation_steps}: loss {loss.item() * accumulation_steps:.3f}")
`,
    note: 'Prints the loss once per update, every 4 micro-batches.',
  },
  {
    label: 'Hugging Face Trainer',
    code: `from transformers import Trainer, TrainingArguments

args = TrainingArguments(
    output_dir="out",
    per_device_train_batch_size=16,  # the micro-batch: what fits in memory
    gradient_accumulation_steps=4,   # effective batch: 16 × 4 = 64 per GPU
    logging_steps=10,                # print the loss every 10 updates
)
trainer = Trainer(model=model, args=args, train_dataset=train_dataset)
trainer.train()
`,
    note: 'One setting. The Trainer divides the loss, steps the optimizer every 4 micro-batches and logs the loss.',
  },
];
