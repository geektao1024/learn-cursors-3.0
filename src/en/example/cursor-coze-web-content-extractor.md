---
title: Cursor + Coze Workflow Creates Web Content Extraction Plugin Tutorial
description: A complete tutorial for developing a web content extraction Chrome extension using Cursor AI and Coze workflow
layout: doc
sidebar: false
---

## Project Overview

> This tutorial will guide you through developing a Chrome extension for web content extraction using Cursor AI and Coze workflow, let's explore the charm of AI-assisted development together.

Project final effect preview

### 1.1 Development Background

As a developer who often reads technical articles, I often want to find a convenient tool to extract and save the essence of the articles. This prompted me to come up with the idea of developing a browser extension. With the assistance of AI, this idea quickly came to fruition.

In response to many friends' requests, I have decided to share the complete development process this time.

---

## 2\. Introduction to the technology stack

### 2.1 Cursor: AI-driven intelligent editor

Cursor editor interface display

> Cursor is a revolutionary code editor that retains the familiar interface of VS Code while integrating powerful AI features. Its most distinctive feature is the composer function with natural language interaction.

### 2.2 Coze: A visual workflow platform

Coze Visual Workflow Interface

> The Coze workflow is a powerful visual tool that can achieve:
>
> - Complex and stable business process orchestration
> - Flexible combination of multiple functions
> - High-stability task flow processing

---

## 3\. Functional requirement analysis

### Core feature list:

1. Web page link extraction
2. Summary of web content
3. Output three key variables:

- Protagonist
- Article summary
- Golden sentence extraction

4. Search for images related to the main character
5. Aesthetic infographic summary card layout

---

## 4\. Technical architecture

> Adopting a front-end and back-end separation architecture:
>
> - Backend: Business logic built on Coze workflow
> - Front-end: Chrome browser extension, providing a lightweight interactive interface

## 5\. Workflow setup

### 5.1 Core component configuration

Workflow overall architecture diagram

#### Key configuration points:

1. **Large Model Node Prompt**:

As a senior and professional article editor, you are able to thoroughly understand the connotation of the article I provide, and then provide the following three parts of content: 1. The main character of the article (such as "Lei Jun") 2. An accurate summary of the main theme of the article 3. A precise finding of the outstanding catchphrases of the article's main character (if any)

1. Output node markdown formatting:

👤主角：{{name}}

📷主角图片：

<!-- ![照片]({{image}}) -->

{此处将显示主角图片}

📝文章内容：{{idea}}

💖金句：{{sentence}}

> ⚠️ Pay special attention: the output image variable uses **contentUrl**

## 6\. Chrome plugin development

### 6.1 How to obtain Coze key configuration

#### Step 1: Obtain authorization token

Obtain authorization token in personal settings

#### Step 2: Obtain the workflow ID

Obtain workflow ID on the workflow interface

## Interface optimization

Optimized plugin main interface

Author Information Display Page

Core Function Demonstration

---

## 8\. Summary and Outlook

> This tutorial introduces the main development process, but in actual development, you may encounter:
>
> - Icon style optimization
> - Error handling
> - Cursor coding detail issues

### Project source code

📦 Code Repository: [CozeSummarizer](https://github.com/Yeadon8888/CozeSummarizer)

<style>
.project-image img,
.tech-image img,
.workflow-image img,
.ui-showcase img {
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    margin: 20px 0;
    max-width: 100%;
}

.project-image,
.tech-image,
.workflow-image,
.ui-showcase {
    text-align: center;
    margin: 20px 0;
}

.code-block {
    background: #f6f8fa;
    padding: 16px;
    border-radius: 8px;
    margin: 16px 0;
}

.steps-container {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
}

blockquote {
    border-left: 4px solid #42b883;
    padding-left: 16px;
    margin: 16px 0;
    background: #f8f9fa;
    padding: 16px;
    border-radius: 0 8px 8px 0;
}
</style>
