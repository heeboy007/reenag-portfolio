---
title: Deploying a YOLO model to ec2 for my teammates
thumbnail: Pasted image 20260622011434.png
smalltitle: How to make a simple onnx, tflite file to boost inference speed on light models
tags:
  - ultralytics
date: 2026-06-21
---
So, this is the very first English blog post I’ve ever written, and to be honest, it’s quite exciting. 

Looking back, the situation at the start wasn’t ideal. Setting up the blog took way more time than I anticipated, and I had a fairly important project meeting the next day. I needed to get this deployed fast, or I’d have nothing to show my teammates.

At the time, the model training has just kicked off. With each epoch is taking up 10 minutes, and completing 100 epochs meant a 20-hour wait. Theoretically, I had a window to work on the deployment, but it was going to be a tight race against the clock since the meeting was scheduled for 10 PM.

We have a lightweight backend powered by Flask (which runs on Python). For a seamless integration, I needed to package my code and publish it. I was initially a bit concerned about making the code public on PyPI, but the model isn't overly sensitive to leaks, and it felt like the right move for our pipeline.

---

*Fast forward to the present:* The meeting actually went great! I discovered a few neat techniques along the way and figured they were worth a quick write-up.

And also as a side note: turns out I didn't need to make a pypi library, using github is just enough for this use case.

# How to Resume Training in Ultralytics

First, let's talk about how to properly resume training with an Ultralytics YOLO model.

```python 
#this is a ultralytics
#when we resume, we need to load the last model
model = YOLO(str(ROOT / 'runs' / 'seg' / 'leaf_v2' / 'weights' / 'last.pt'))

results = model.train(
    data       = str(yaml_path),
    epochs     = 100,
    imgsz      = 640,
    batch      = 32,
    device     = DEVICE,
    project    = str(ROOT / 'runs' / 'seg'),
    name       = 'leaf_v2',
    patience   = 20,
    resume     = True,
    single_cls = True, 
    verbose    = True   
)
```

Well it's very well-known that resume option does this for us, but it's really easy to make a mistake to NOT load the last.pt model. 

So while model looks like this: 
```python
model = YOLO('yolov8n-seg.pt')
```

When resuming I should load something I've already trained:
```python
model = YOLO(str(ROOT / 'runs' / 'seg' / 'leaf_v2' / 'weights' / 'last.pt'))
```

If you don't explicitely pass the `last.pt` path, the training will silently fail to resume—meaning it will ignore the `resume=True` flag and start training the base `yolov8n-seg` model completely from scratch.
# Exporting to ONNX and TFLite

This is every easy, I used this following code:
```python
from ultralytics import YOLO

model = YOLO('../runs/seg/leaf_v2/weights/best.pt')  

#export onnx
model.export(format='onnx', imgsz=640, simplify=True)

#export tflite(faster but could be breaking)
model.export(format='tflite', imgsz=640)
```
to produce models.

However, setting up the environment proved different. The major problem was the python version was set too high for any of the dependencies.

I use uv tool to manage my python dependencies, and some of them are just not viable yet.
These are the usually needed:
```
    "onnx>=1.22.0",
    "tensorflow>=2.21.0",
    "onnx2tf>=1.28.8",
    "onnxruntime>=1.27.0",
    "onnxslim>=0.1.94",
    "tf-keras<=2.19.0",
    "sng4onnx>=2.0.1",
    "onnx_graphsurgeon>=0.3.26",
    "ai-edge-litert==1.3.0"
```
Currently, `uv` struggles to resolve and download these packages under Python 3.13 on macOS.

The fix is simple: pin the virtual environment to an older, more stable Python version:
```shell
uv venv --python 3.12 .venv-deploy
```
The `--python` option in `uv` makes this incredibly easy. It's a handy trick I'll definitely keep in mind for future deployment bottlenecks.
## Better model?

All this dependency troubleshooting happened because I wanted a TFLite export. So, I decided to benchmark them to see if the performance gain was actually worth the hassle.

The `LeafAnalyzer` class is the model that I've showed to our teammates.
```python
analyzer = LeafAnalyzer("onnx")

for name in ["sample_easy.jpg", "sample_hard.jpg"]:
	start = time.perf_counter()
	result = analyzer.analyze(name)
	elapsed = time.perf_counter() - start

print(f"[{name}] {elapsed*1000:.1f}ms | leaves: {result['leaf_count']} | total_area: {result['total_area']['ratio']:.4f}")
```
This is onnx:

![[Pasted image 20260622011320.png]]

And this is tflite:
![[Pasted image 20260622011434.png]]

And sure enough, tflite showed better results. Although, the difference didn't convinced me this was worth it.

Onnx models have their upsides, havng easier dependency managment, and export managment. And this model is certainly not gonna be running on ESP32-S3, which was the main edge device that our team worked on.

This might change however, sicne we are now opting raspberry pi zero as the edge device. It should be possible to inference this. Come to think of it, I had no intentions to make a edge AI, but I might just able to do it? It should be fun to do such challange.