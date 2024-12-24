---
title: 用"说"来做个小产品
description: 通过一个实际的例子，展示如何使用 Cursor AI 的自然语言功能快速开发一个贪吃蛇游戏。
---

# 用"说"来做个小产品

为了帮助你快速上手这款革命性的 AI 产品，我来手把手教会你怎么写一个贪吃蛇游戏。

## 开始开发

### 1. 创建项目文件

首先我们打开 Cursor，在文件夹空白处，点击【新建文件】，并把文件命名为 "snake.py"。snake 就是贪吃蛇的意思，.py 代表这是一个 Python 的代码文件。

<!-- ![创建文件](./images/guide/create-file.png) -->

### 2. 打开对话框

我们点击右上角的按钮，打开侧边栏。

<!-- ![打开对话框](./images/guide/open-chat.png) -->

### 3. 开始对话

在对话框中，我们可以这样描述我们的需求：

```
用 Python 帮我写一个贪吃蛇游戏，但我没有任何相关的编程经验，我的 windows 电脑上除了安装了 Cursor 代码编辑器外，也没有任何相关环境，请详细的一步一步的告诉我应该怎么做，我做完一步告诉你下一步应该干什么。
```

如果你是 mac 用户，请把提示词中的 windows 电脑换成 mac 电脑。

### 4. 安装 Python 环境

这时 Cursor 会先帮我们按照 Python 环境。我们按照它的指示安装即可。

### 5. 保存代码

如果文件上有白点表示未保存状态，可以手动【Ctrl/cmd + S】，保存一下内容。

::: warning 注意
这里一定要完成一次保存，生成一个代码，保存一次，不然之后可能会出现报错。
:::

### 6. 安装游戏依赖

点击右上角的【运行 Python 文件】，即可开始运行。

根据提示，我们需要在终端里输入：

```bash
pip3 install pygame
```

### 7. 运行游戏

看，贪吃蛇已经运行了🚀

<!-- ![运行游戏](./images/guide/game-running.png) -->

## 代码解析

让我们来看看生成的代码：

```python
import pygame
import random

# 初始化 Pygame
pygame.init()

# 设置游戏窗口
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600
BLOCK_SIZE = 20

# 创建游戏窗口
screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("贪吃蛇")

# 定义颜色
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)

# 初始化蛇
snake_pos = [[100, 50], [90, 50], [80, 50]]
snake_direction = "RIGHT"

# 初始化食物
food_pos = [random.randrange(1, (WINDOW_WIDTH//BLOCK_SIZE)) * BLOCK_SIZE,
            random.randrange(1, (WINDOW_HEIGHT//BLOCK_SIZE)) * BLOCK_SIZE]

# 游戏主循环
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        
        # 处理按键事件
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP and snake_direction != "DOWN":
                snake_direction = "UP"
            if event.key == pygame.K_DOWN and snake_direction != "UP":
                snake_direction = "DOWN"
            if event.key == pygame.K_LEFT and snake_direction != "RIGHT":
                snake_direction = "LEFT"
            if event.key == pygame.K_RIGHT and snake_direction != "LEFT":
                snake_direction = "RIGHT"
    
    # 清空屏幕
    screen.fill(BLACK)
    
    # 绘制蛇和食物
    for pos in snake_pos:
        pygame.draw.rect(screen, GREEN, pygame.Rect(
            pos[0], pos[1], BLOCK_SIZE, BLOCK_SIZE))
    
    pygame.draw.rect(screen, RED, pygame.Rect(
        food_pos[0], food_pos[1], BLOCK_SIZE, BLOCK_SIZE))
    
    # 更新显示
    pygame.display.flip()

# 退出游戏
pygame.quit()
```

### 关键部分解释

1. **导入必要的库**
   ```python
   import pygame
   import random
   ```
   这里导入了 pygame 游戏库和随机数生成库。

2. **初始化游戏窗口**
   ```python
   WINDOW_WIDTH = 800
   WINDOW_HEIGHT = 600
   BLOCK_SIZE = 20
   ```
   设置游戏窗口的大小和蛇身方块的尺寸。

3. **初始化蛇和食物**
   ```python
   snake_pos = [[100, 50], [90, 50], [80, 50]]
   food_pos = [random.randrange(1, (WINDOW_WIDTH//BLOCK_SIZE)) * BLOCK_SIZE,
               random.randrange(1, (WINDOW_HEIGHT//BLOCK_SIZE)) * BLOCK_SIZE]
   ```
   设置蛇的初始位置和随机生成食物位置。

## 进阶优化

1. **添加分数系统**
   ```python
   score = 0
   font = pygame.font.Font(None, 36)
   score_text = font.render(f'分数: {score}', True, WHITE)
   ```

2. **添加游戏结束检测**
   ```python
   def check_collision(snake_head):
       # 检查是否撞墙
       if (snake_head[0] >= WINDOW_WIDTH or snake_head[0] < 0 or
           snake_head[1] >= WINDOW_HEIGHT or snake_head[1] < 0):
           return True
       # 检查是否撞到自己
       if snake_head in snake_pos[1:]:
           return True
       return False
   ```

3. **添加游戏音效**
   ```python
   pygame.mixer.init()
   eat_sound = pygame.mixer.Sound('eat.wav')
   ```

::: tip 提示
- 使用方向键控制蛇的移动
- 吃到食物会增加长度和分数
- 撞墙或撞到自己游戏结束
:::

::: warning 注意
- 保存代码后再运行
- 确保 Python 环境正确配置
- 检查 pygame 库是否安装成功
:::