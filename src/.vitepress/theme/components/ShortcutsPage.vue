<script setup>
import { useData } from 'vitepress'
import { computed, ref } from 'vue'

const { lang } = useData()
const selectedOS = ref('windows')
const searchTerm = ref('')

// 获取当前语言，根路径使用zh-CN
const currentLang = computed(() => {
  // 如果是根路径或者zh，使用zh-CN
  if (!lang.value || lang.value === 'zh' || lang.value === 'root') {
    return 'zh-CN'
  }
  // 其他情况返回实际的语言代码
  return lang.value
})

const icons = {
  'Cursor Tab (AI 代码补全)': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <path d="M9 12h6m-6 4h6m-6-8h6"/>
  </svg>`,
  'Cmd K (内联编辑)': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z"/>
    <path d="M8 12h8"/>
    <path d="M12 8v8"/>
  </svg>`,
  '聊天界面': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>`,
  'Composer': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 20h9M3 20h3m3 0h3M3 12h18M3 4h18"/>
  </svg>`,
  '编辑器导航': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  </svg>`,
  '编辑器操作': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
  </svg>`,
  '终端和调试': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M4 17l6-6-6-6m8 14h8"/>
  </svg>`,
  'Git 操作': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="18" cy="18" r="3"/>
    <circle cx="6" cy="6" r="3"/>
    <path d="M13 6h3a2 2 0 0 1 2 2v7"/>
    <line x1="6" y1="9" x2="6" y2="21"/>
  </svg>`,
  '窗口管理': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="21" x2="9" y2="9"/>
  </svg>`,
  '搜索和替换': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>`,
}

// 多语言文本配置
const i18n = {
  'zh-CN': {
    osSwitch: '操作系统',
    search: '搜索快捷键...',
    windows: 'Windows',
    mac: 'Mac',
  },
  'en': {
    osSwitch: 'Operating System',
    search: 'Search shortcuts...',
    windows: 'Windows',
    mac: 'Mac',
  },
  'ja': {
    osSwitch: 'オペレーティングシステム',
    search: 'ショートカットを検索...',
    windows: 'Windows',
    mac: 'Mac',
  },
}

// 快捷键组的多语言配置
const groupsI18n = {
  'zh-CN': {
    'Cursor Tab (AI 代码补全)': {
      title: 'Cursor Tab (AI 代码补全)',
      description: 'AI 驱动的智能代码补全功能，更快地编写',
    },
    'Cmd K (内联编辑)': {
      title: 'Cmd K (内联编辑)',
      description: '快速进行代码编辑和重构的内联工具',
    },
    '聊天界面': {
      title: '聊天界面',
      description: '与 AI 助手进行实时对话，获取编程帮助',
    },
    'Composer': {
      title: 'Composer',
      description: '强大的 AI 代码生成和编辑工具',
    },
    '编辑器导航': {
      title: '编辑器导航',
      description: '快速在代码中导航和跳转',
    },
    '编辑器操作': {
      title: '编辑器操作',
      description: '常用的编辑和选择操作',
    },
    '终端和调试': {
      title: '终端和调试',
      description: '终端操作和调试功能',
    },
    'Git 操作': {
      title: 'Git 操作',
      description: 'Git 版本控制操作',
    },
    '窗口管理': {
      title: '窗口管理',
      description: '管理编辑器窗口和面板',
    },
    '搜索和替换': {
      title: '搜索和替换',
      description: '在文件中搜索和替换内容',
    },
  },
  'en': {
    'Cursor Tab (AI 代码补全)': {
      title: 'Cursor Tab (AI Code Completion)',
      description: 'AI-powered intelligent code completion for faster coding',
    },
    'Cmd K (内联编辑)': {
      title: 'Cmd K (Inline Edit)',
      description: 'Quick code editing and refactoring inline tool',
    },
    '聊天界面': {
      title: 'Chat Interface',
      description: 'Real-time dialogue with AI assistant for programming help',
    },
    'Composer': {
      title: 'Composer',
      description: 'Powerful AI code generation and editing tool',
    },
    '编辑器导航': {
      title: 'Editor Navigation',
      description: 'Quick navigation and jumping in code',
    },
    '编辑器操作': {
      title: 'Editor Operations',
      description: 'Common editing and selection operations',
    },
    '终端和调试': {
      title: 'Terminal and Debug',
      description: 'Terminal operations and debugging features',
    },
    'Git 操作': {
      title: 'Git Operations',
      description: 'Git version control operations',
    },
    '窗口管理': {
      title: 'Window Management',
      description: 'Manage editor windows and panels',
    },
    '搜索和替换': {
      title: 'Search and Replace',
      description: 'Search and replace content in files',
    },
  },
  'ja': {
    'Cursor Tab (AI 代码补全)': {
      title: 'Cursor Tab (AIコード補完)',
      description: 'AIパワードインテリジェントコード補完で高速なコーディング',
    },
    'Cmd K (内联编辑)': {
      title: 'Cmd K (インライン編集)',
      description: '迅速なコード編集とリファクタリングのインラインツール',
    },
    '聊天界面': {
      title: 'チャットインターフェース',
      description: 'プログラミングヘルプのためのAIアシスタントとのリアルタイム対話',
    },
    'Composer': {
      title: 'Composer',
      description: '強力なAIコード生成と編集ツール',
    },
    '编辑器导航': {
      title: 'エディタナビゲーション',
      description: 'コード内の素早いナビゲーションとジャンプ',
    },
    '编辑器操作': {
      title: 'エディタ操作',
      description: '一般的な編集と選択操作',
    },
    '终端和调试': {
      title: 'ターミナルとデバッグ',
      description: 'ターミナル操作とデバッグ機能',
    },
    'Git 操作': {
      title: 'Git操作',
      description: 'Gitバージョン管理操作',
    },
    '窗口管理': {
      title: 'ウィンドウ管理',
      description: 'エディタウィンドウとパネルの管理',
    },
    '搜索和替换': {
      title: '検索と置換',
      description: 'ファイル内のコンテンツの検索と置換',
    },
  },
}

// 快捷键操作的多语言配置
const shortcutActionsI18n = {
  'zh-CN': {
    '接受建议': {
      action: '接受建议',
      description: '接受 AI 提供的完整代码建议',
    },
    '拒绝建议': {
      action: '拒绝建议',
      description: '拒绝当前的 AI 代码建议',
    },
    '部分接受': {
      action: '部分接受',
      description: '只接受建议的一部分内容',
    },
    '触发建议': {
      action: '触发建议',
      description: '手动触发 AI 代码建议',
    },
    '打开 Cmd K': {
      action: '打开 Cmd K',
      description: '打开内联编辑工具',
    },
    '应用更改': {
      action: '应用更改',
      description: '确认并应用编辑更改',
    },
    '取消更改': {
      action: '取消更改',
      description: '取消当前的编辑更改',
    },
    '选择性应用': {
      action: '选择性应用',
      description: '选择性应用部分更改',
    },
    '打开聊天': {
      action: '打开聊天',
      description: '打开 AI 聊天窗口',
    },
    '将代码添加到聊天': {
      action: '将代码添加到聊天',
      description: '将选中的代码发送到聊天窗口',
    },
    '发送消息': {
      action: '发送消息',
      description: '发送聊天消息',
    },
    '新建聊天': {
      action: '新建聊天',
      description: '创建新的聊天会话',
    },
    '打开 Composer': {
      action: '打开 Composer',
      description: '打开 Composer 工具窗口',
    },
    '打开全屏 Composer': {
      action: '打开全屏 Composer',
      description: '以全屏模式打开 Composer',
    },
    '生成代码': {
      action: '生成代码',
      description: '生成或应用 AI 建议的代码',
    },
    '转到定义': {
      action: '转到定义',
      description: '跳转到符号定义处',
    },
    '查找所有引用': {
      action: '查找所有引用',
      description: '查找符号的所有引用',
    },
    '快速打开文件': {
      action: '快速打开文件',
      description: '快速搜索和打开文件',
    },
    '转到行': {
      action: '转到行',
      description: '跳转到指定行号',
    },
    '转到符号': {
      action: '转到符号',
      description: '在当前文件中查找符号',
    },
    '全局符号搜索': {
      action: '全局符号搜索',
      description: '在整个工作区搜索符号',
    },
    '多光标选择': {
      action: '多光标选择',
      description: '添加多个光标',
    },
    '选择所有匹配': {
      action: '选择所有匹配',
      description: '选择所有匹配的文本',
    },
    '复制行': {
      action: '复制行',
      description: '向上或向下复制当前行',
    },
    '移动行': {
      action: '移动行',
      description: '向上或向下移动当前行',
    },
    '格式化代码': {
      action: '格式化代码',
      description: '格式化当前文件或选中的代码',
    },
    '注释/取消注释': {
      action: '注释/取消注释',
      description: '切换行注释',
    },
    '打开/关闭终端': {
      action: '打开/关闭终端',
      description: '切换集成终端的显示',
    },
    '新建终端': {
      action: '新建终端',
      description: '创建新的终端实例',
    },
    '开始调试': {
      action: '开始调试',
      description: '启动调试会话',
    },
    '调试步进': {
      action: '调试步进',
      description: '调试时单步执行',
    },
    '调试步过': {
      action: '调试步过',
      description: '调试时跳过当前行',
    },
    '继续/暂停': {
      action: '继续/暂停',
      description: '继续执行或暂停调试',
    },
    '显示 Git 面板': {
      action: '显示 Git 面板',
      description: '打开源代码管理面板',
    },
    '提交更改': {
      action: '提交更改',
      description: '在源代码管理面板中提交更改',
    },
    '刷新 Git 状态': {
      action: '刷新 Git 状态',
      description: '刷新 Git 状态和更改',
    },
    '显示 Git 历史': {
      action: '显示 Git 历史',
      description: '查看文件或行的 Git 历史',
    },
    '新建窗口': {
      action: '新建窗口',
      description: '打开新的编辑器窗口',
    },
    '关闭窗口': {
      action: '关闭窗口',
      description: '关闭当前编辑器窗口',
    },
    '切换侧边栏': {
      action: '切换侧边栏',
      description: '显示/隐藏侧边栏',
    },
    '切换全屏': {
      action: '切换全屏',
      description: '切换编辑器全屏模式',
    },
    '查找': {
      action: '查找',
      description: '在当前文件中搜索',
    },
    '替换': {
      action: '替换',
      description: '在当前文件中替换',
    },
    '全局搜索': {
      action: '全局搜索',
      description: '在所有文件中搜索',
    },
    '全局替换': {
      action: '全局替换',
      description: '在所有文件中替换',
    },
  },
  'en': {
    '接受建议': {
      action: 'Accept Suggestion',
      description: 'Accept complete AI code suggestion',
    },
    '拒绝建议': {
      action: 'Reject Suggestion',
      description: 'Reject current AI code suggestion',
    },
    '部分接受': {
      action: 'Partial Accept',
      description: 'Accept only part of the suggestion',
    },
    '触发建议': {
      action: 'Trigger Suggestion',
      description: 'Manually trigger AI code suggestion',
    },
    '打开 Cmd K': {
      action: 'Open Cmd K',
      description: 'Open inline editing tool',
    },
    '应用更改': {
      action: 'Apply Changes',
      description: 'Confirm and apply edit changes',
    },
    '取消更改': {
      action: 'Cancel Changes',
      description: 'Cancel current edit changes',
    },
    '选择性应用': {
      action: 'Selective Apply',
      description: 'Selectively apply partial changes',
    },
    '打开聊天': {
      action: 'Open Chat',
      description: 'Open AI chat window',
    },
    '将代码添加到聊天': {
      action: 'Add Code to Chat',
      description: 'Send selected code to chat window',
    },
    '发送消息': {
      action: 'Send Message',
      description: 'Send chat message',
    },
    '新建聊天': {
      action: 'New Chat',
      description: 'Create new chat session',
    },
    '打开 Composer': {
      action: 'Open Composer',
      description: 'Open Composer tool window',
    },
    '打开全屏 Composer': {
      action: 'Open Fullscreen Composer',
      description: 'Open Composer in fullscreen mode',
    },
    '生成代码': {
      action: 'Generate Code',
      description: 'Generate or apply AI suggested code',
    },
    '转到定义': {
      action: 'Go to Definition',
      description: 'Jump to symbol definition',
    },
    '查找所有引用': {
      action: 'Find All References',
      description: 'Find all references of the symbol',
    },
    '快速打开文件': {
      action: 'Quick Open File',
      description: 'Quickly search and open files',
    },
    '转到行': {
      action: 'Go to Line',
      description: 'Jump to specified line number',
    },
    '转到符号': {
      action: 'Go to Symbol',
      description: 'Find symbol in current file',
    },
    '全局符号搜索': {
      action: 'Global Symbol Search',
      description: 'Search symbols in entire workspace',
    },
    '多光标选择': {
      action: 'Multi-cursor Selection',
      description: 'Add multiple cursors',
    },
    '选择所有匹配': {
      action: 'Select All Matches',
      description: 'Select all matching text',
    },
    '复制行': {
      action: 'Duplicate Line',
      description: 'Copy line up or down',
    },
    '移动行': {
      action: 'Move Line',
      description: 'Move line up or down',
    },
    '格式化代码': {
      action: 'Format Code',
      description: 'Format current file or selected code',
    },
    '注释/取消注释': {
      action: 'Toggle Comment',
      description: 'Toggle line comment',
    },
    '打开/关闭终端': {
      action: 'Toggle Terminal',
      description: 'Show/hide integrated terminal',
    },
    '新建终端': {
      action: 'New Terminal',
      description: 'Create new terminal instance',
    },
    '开始调试': {
      action: 'Start Debugging',
      description: 'Start debug session',
    },
    '调试步进': {
      action: 'Step Into',
      description: 'Step into during debugging',
    },
    '调试步过': {
      action: 'Step Over',
      description: 'Step over current line',
    },
    '继续/暂停': {
      action: 'Continue/Pause',
      description: 'Continue or pause debugging',
    },
    '显示 Git 面板': {
      action: 'Show Git Panel',
      description: 'Open source control panel',
    },
    '提交更改': {
      action: 'Commit Changes',
      description: 'Commit changes in source control panel',
    },
    '刷新 Git 状态': {
      action: 'Refresh Git Status',
      description: 'Refresh Git status and changes',
    },
    '显示 Git 历史': {
      action: 'Show Git History',
      description: 'View Git history of file or line',
    },
    '新建窗口': {
      action: 'New Window',
      description: 'Open new editor window',
    },
    '关闭窗口': {
      action: 'Close Window',
      description: 'Close current editor window',
    },
    '切换侧边栏': {
      action: 'Toggle Sidebar',
      description: 'Show/hide sidebar',
    },
    '切换全屏': {
      action: 'Toggle Full Screen',
      description: 'Toggle editor full screen mode',
    },
    '查找': {
      action: 'Find',
      description: 'Search in current file',
    },
    '替换': {
      action: 'Replace',
      description: 'Replace in current file',
    },
    '全局搜索': {
      action: 'Global Search',
      description: 'Search in all files',
    },
    '全局替换': {
      action: 'Global Replace',
      description: 'Replace in all files',
    },
  },
  'ja': {
    '接受建议': {
      action: '提案を受け入れる',
      description: 'AI コードの提案を完全に受け入れる',
    },
    '拒绝建议': {
      action: '提案を拒否',
      description: '現在の AI コードの提案を拒否',
    },
    '部分接受': {
      action: '部分的に受け入れる',
      description: '提案の一部のみを受け入れる',
    },
    '触发建议': {
      action: '提案をトリガー',
      description: 'AI コードの提案を手動でトリガー',
    },
    '打开 Cmd K': {
      action: 'Cmd K を開く',
      description: 'インライン編集ツールを開く',
    },
    '应用更改': {
      action: '変更を適用',
      description: '編集の変更を確認して適用',
    },
    '取消更改': {
      action: '変更をキャンセル',
      description: '現在の編集変更をキャンセル',
    },
    '选择性应用': {
      action: '選択的に適用',
      description: '部分的な変更を選択的に適用',
    },
    '打开聊天': {
      action: 'チャットを開く',
      description: 'AI チャットウィンドウを開く',
    },
    '将代码添加到聊天': {
      action: 'コードをチャットに追加',
      description: '選択したコードをチャットウィンドウに送信',
    },
    '发送消息': {
      action: 'メッセージを送信',
      description: 'チャットメッセージを送信',
    },
    '新建聊天': {
      action: '新規チャット',
      description: '新しいチャットセッションを作成',
    },
    '打开 Composer': {
      action: 'Composer を開く',
      description: 'Composer ツールウィンドウを開く',
    },
    '打开全屏 Composer': {
      action: 'フルスクリーン Composer を開く',
      description: 'フルスクリーンモードで Composer を開く',
    },
    '生成代码': {
      action: 'コードを生成',
      description: 'AI が提案するコードを生成または適用',
    },
    '转到定义': {
      action: '定義へ移動',
      description: 'シンボルの定義にジャンプ',
    },
    '查找所有引用': {
      action: '参照をすべて検索',
      description: 'シンボルのすべての参照を検索',
    },
    '快速打开文件': {
      action: 'クイックファイルオープン',
      description: 'ファイルをすばやく検索して開く',
    },
    '转到行': {
      action: '行へ移動',
      description: '指定した行番号へジャンプ',
    },
    '转到符号': {
      action: 'シンボルへ移動',
      description: '現在のファイル内でシンボルを検索',
    },
    '全局符号搜索': {
      action: 'グローバルシンボル検索',
      description: 'ワークスペース全体でシンボルを検索',
    },
    '多光标选择': {
      action: 'マルチカーソル選択',
      description: '複数のカーソルを追加',
    },
    '选择所有匹配': {
      action: 'すべての一致を選択',
      description: '一致するテキストをすべて選択',
    },
    '复制行': {
      action: '行を複製',
      description: '行を上下にコピー',
    },
    '移动行': {
      action: '行を移動',
      description: '行を上下に移動',
    },
    '格式化代码': {
      action: 'コードをフォーマット',
      description: '現在のファイルまたは選択したコードをフォーマット',
    },
    '注释/取消注释': {
      action: 'コメントの切り替え',
      description: '行コメントを切り替え',
    },
    '打开/关闭终端': {
      action: 'ターミナルの切り替え',
      description: '統合ターミナルの表示/非表示',
    },
    '新建终端': {
      action: '新規ターミナル',
      description: '新しいターミナルインスタンスを作成',
    },
    '开始调试': {
      action: 'デバッグを開始',
      description: 'デバッグセッションを開始',
    },
    '调试步进': {
      action: 'ステップイン',
      description: 'デバッグ中にステップイン',
    },
    '调试步过': {
      action: 'ステップオーバー',
      description: '現在の行をスキップ',
    },
    '继续/暂停': {
      action: '続行/一時停止',
      description: 'デバッグを続行または一時停止',
    },
    '显示 Git 面板': {
      action: 'Git パネルを表示',
      description: 'ソース管理パネルを開く',
    },
    '提交更改': {
      action: '変更をコミット',
      description: 'ソース管理パネルで変更をコミット',
    },
    '刷新 Git 状态': {
      action: 'Git ステータスを更新',
      description: 'Git のステータスと変更を更新',
    },
    '显示 Git 历史': {
      action: 'Git 履歴を表示',
      description: 'ファイルまたは行の Git 履歴を表示',
    },
    '新建窗口': {
      action: '新規ウィンドウ',
      description: '新しいエディタウィンドウを開く',
    },
    '关闭窗口': {
      action: 'ウィンドウを閉じる',
      description: '現在のエディタウィンドウを閉じる',
    },
    '切换侧边栏': {
      action: 'サイドバーの切り替え',
      description: 'サイドバーの表示/非表示',
    },
    '切换全屏': {
      action: '全画面表示の切り替え',
      description: 'エディタの全画面モードを切り替え',
    },
    '查找': {
      action: '検索',
      description: '現在のファイル内で検索',
    },
    '替换': {
      action: '置換',
      description: '現在のファイル内で置換',
    },
    '全局搜索': {
      action: 'グローバル検索',
      description: 'すべてのファイルで検索',
    },
    '全局替换': {
      action: 'グローバル置換',
      description: 'すべてのファイルで置換',
    },
  },
}

// 添加标题的多语言配置
const titleI18n = {
  'zh-CN': {
    title: 'Cursor 快捷键速查表',
    description: '掌握这些快捷键，显著提升您的编程效率。本速查表涵盖了 Cursor 的所有核心功能，包括 AI 代码补全、内联编辑、聊天功能等。',
  },
  'en': {
    title: 'Cursor Keyboard Shortcuts Cheatsheet',
    description: 'Master these shortcuts to significantly improve your programming efficiency. This cheatsheet covers all core features of Cursor, including AI code completion, inline editing, chat functionality, and more.',
  },
  'ja': {
    title: 'Cursor キーボードショートカット チートシート',
    description: 'これらのショートカットを習得して、プログラミング効率を大幅に向上させましょう。このチートシートは、AI コード補完、インライン編集、チャット機能など、Cursor のすべての主要機能をカバーしています。',
  },
}

const shortcutGroups = [
  {
    title: groupsI18n[currentLang.value]['Cursor Tab (AI 代码补全)'].title,
    description: groupsI18n[currentLang.value]['Cursor Tab (AI 代码补全)'].description,
    shortcuts: [
      {
        action: shortcutActionsI18n[currentLang.value]['接受建议'].action,
        shortcut: 'Tab',
        description: shortcutActionsI18n[currentLang.value]['接受建议'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['拒绝建议'].action,
        shortcut: 'Esc',
        description: shortcutActionsI18n[currentLang.value]['拒绝建议'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['部分接受'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + →' : '⌘ + →'),
        description: shortcutActionsI18n[currentLang.value]['部分接受'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['触发建议'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Space' : '⌘ + Space'),
        description: shortcutActionsI18n[currentLang.value]['触发建议'].description,
      },
    ],
  },
  {
    title: groupsI18n[currentLang.value]['Cmd K (内联编辑)'].title,
    description: groupsI18n[currentLang.value]['Cmd K (内联编辑)'].description,
    shortcuts: [
      {
        action: shortcutActionsI18n[currentLang.value]['打开 Cmd K'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + K' : '⌘ + K'),
        description: shortcutActionsI18n[currentLang.value]['打开 Cmd K'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['应用更改'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Enter' : '⌘ + Return'),
        description: shortcutActionsI18n[currentLang.value]['应用更改'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['取消更改'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Backspace' : '⌘ + Delete'),
        description: shortcutActionsI18n[currentLang.value]['取消更改'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['选择性应用'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + Enter' : '⌘ + Shift + Return'),
        description: shortcutActionsI18n[currentLang.value]['选择性应用'].description,
      },
    ],
  },
  {
    title: groupsI18n[currentLang.value]['聊天界面'].title,
    description: groupsI18n[currentLang.value]['聊天界面'].description,
    shortcuts: [
      {
        action: shortcutActionsI18n[currentLang.value]['打开聊天'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + L' : '⌘ + L'),
        description: shortcutActionsI18n[currentLang.value]['打开聊天'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['将代码添加到聊天'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + L' : '⌘ + L'),
        description: shortcutActionsI18n[currentLang.value]['将代码添加到聊天'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['发送消息'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Enter' : '⌘ + Return'),
        description: shortcutActionsI18n[currentLang.value]['发送消息'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['新建聊天'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + L' : '⌘ + Shift + L'),
        description: shortcutActionsI18n[currentLang.value]['新建聊天'].description,
      },
    ],
  },
  {
    title: groupsI18n[currentLang.value].Composer.title,
    description: groupsI18n[currentLang.value].Composer.description,
    shortcuts: [
      {
        action: shortcutActionsI18n[currentLang.value]['打开 Composer'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + I' : '⌘ + I'),
        description: shortcutActionsI18n[currentLang.value]['打开 Composer'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['打开全屏 Composer'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + I' : '⌘ + Shift + I'),
        description: shortcutActionsI18n[currentLang.value]['打开全屏 Composer'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['生成代码'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Enter' : '⌘ + Return'),
        description: shortcutActionsI18n[currentLang.value]['生成代码'].description,
      },
    ],
  },
  {
    title: groupsI18n[currentLang.value]['编辑器导航'].title,
    description: groupsI18n[currentLang.value]['编辑器导航'].description,
    shortcuts: [
      {
        action: shortcutActionsI18n[currentLang.value]['转到定义'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'F12' : 'F12'),
        description: shortcutActionsI18n[currentLang.value]['转到定义'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['查找所有引用'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Shift + F12' : 'Shift + F12'),
        description: shortcutActionsI18n[currentLang.value]['查找所有引用'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['快速打开文件'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + P' : '⌘ + P'),
        description: shortcutActionsI18n[currentLang.value]['快速打开文件'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['转到行'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + G' : '⌘ + G'),
        description: shortcutActionsI18n[currentLang.value]['转到行'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['转到符号'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + O' : '⌘ + Shift + O'),
        description: shortcutActionsI18n[currentLang.value]['转到符号'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['全局符号搜索'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + T' : '⌘ + T'),
        description: shortcutActionsI18n[currentLang.value]['全局符号搜索'].description,
      },
    ],
  },
  {
    title: groupsI18n[currentLang.value]['编辑器操作'].title,
    description: groupsI18n[currentLang.value]['编辑器操作'].description,
    shortcuts: [
      {
        action: shortcutActionsI18n[currentLang.value]['多光标选择'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Alt + Click' : '⌥ + Click'),
        description: shortcutActionsI18n[currentLang.value]['多光标选择'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['选择所有匹配'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + L' : '⌘ + Shift + L'),
        description: shortcutActionsI18n[currentLang.value]['选择所有匹配'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['复制行'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Shift + Alt + ↑/↓' : 'Shift + ⌥ + ↑/↓'),
        description: shortcutActionsI18n[currentLang.value]['复制行'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['移动行'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Alt + ↑/↓' : '⌥ + ↑/↓'),
        description: shortcutActionsI18n[currentLang.value]['移动行'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['格式化代码'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Shift + Alt + F' : 'Shift + ⌥ + F'),
        description: shortcutActionsI18n[currentLang.value]['格式化代码'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['注释/取消注释'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + /' : '⌘ + /'),
        description: shortcutActionsI18n[currentLang.value]['注释/取消注释'].description,
      },
    ],
  },
  {
    title: groupsI18n[currentLang.value]['终端和调试'].title,
    description: groupsI18n[currentLang.value]['终端和调试'].description,
    shortcuts: [
      {
        action: shortcutActionsI18n[currentLang.value]['打开/关闭终端'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + `' : '⌘ + `'),
        description: shortcutActionsI18n[currentLang.value]['打开/关闭终端'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['新建终端'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + `' : '⌘ + Shift + `'),
        description: shortcutActionsI18n[currentLang.value]['新建终端'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['开始调试'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'F5' : 'F5'),
        description: shortcutActionsI18n[currentLang.value]['开始调试'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['调试步进'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'F11' : 'F11'),
        description: shortcutActionsI18n[currentLang.value]['调试步进'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['调试步过'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'F10' : 'F10'),
        description: shortcutActionsI18n[currentLang.value]['调试步过'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['继续/暂停'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'F5' : 'F5'),
        description: shortcutActionsI18n[currentLang.value]['继续/暂停'].description,
      },
    ],
  },
  {
    title: groupsI18n[currentLang.value]['Git 操作'].title,
    description: groupsI18n[currentLang.value]['Git 操作'].description,
    shortcuts: [
      {
        action: shortcutActionsI18n[currentLang.value]['显示 Git 面板'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + G' : '⌘ + Shift + G'),
        description: shortcutActionsI18n[currentLang.value]['显示 Git 面板'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['提交更改'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Enter' : '⌘ + Return'),
        description: shortcutActionsI18n[currentLang.value]['提交更改'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['刷新 Git 状态'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + R' : '⌘ + Shift + R'),
        description: shortcutActionsI18n[currentLang.value]['刷新 Git 状态'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['显示 Git 历史'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + H' : '⌘ + Shift + H'),
        description: shortcutActionsI18n[currentLang.value]['显示 Git 历史'].description,
      },
    ],
  },
  {
    title: groupsI18n[currentLang.value]['窗口管理'].title,
    description: groupsI18n[currentLang.value]['窗口管理'].description,
    shortcuts: [
      {
        action: shortcutActionsI18n[currentLang.value]['新建窗口'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + N' : '⌘ + Shift + N'),
        description: shortcutActionsI18n[currentLang.value]['新建窗口'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['关闭窗口'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + W' : '⌘ + W'),
        description: shortcutActionsI18n[currentLang.value]['关闭窗口'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['切换侧边栏'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + B' : '⌘ + B'),
        description: shortcutActionsI18n[currentLang.value]['切换侧边栏'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['切换全屏'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'F11' : '⌃ + ⌘ + F'),
        description: shortcutActionsI18n[currentLang.value]['切换全屏'].description,
      },
    ],
  },
  {
    title: groupsI18n[currentLang.value]['搜索和替换'].title,
    description: groupsI18n[currentLang.value]['搜索和替换'].description,
    shortcuts: [
      {
        action: shortcutActionsI18n[currentLang.value]['查找'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + F' : '⌘ + F'),
        description: shortcutActionsI18n[currentLang.value]['查找'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['替换'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + H' : '⌘ + H'),
        description: shortcutActionsI18n[currentLang.value]['替换'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['全局搜索'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + F' : '⌘ + Shift + F'),
        description: shortcutActionsI18n[currentLang.value]['全局搜索'].description,
      },
      {
        action: shortcutActionsI18n[currentLang.value]['全局替换'].action,
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + H' : '⌘ + Shift + H'),
        description: shortcutActionsI18n[currentLang.value]['全局替换'].description,
      },
    ],
  },
]

const filteredGroups = computed(() => {
  return shortcutGroups.map(group => ({
    ...group,
    shortcuts: group.shortcuts.filter(
      shortcut =>
        shortcut.action.toLowerCase().includes(searchTerm.value.toLowerCase())
        || shortcut.description?.toLowerCase().includes(searchTerm.value.toLowerCase()),
    ),
  })).filter(group => group.shortcuts.length > 0)
})
</script>

<template>
  <div class="shortcuts-container">
    <div class="hero-section">
      <h1>{{ titleI18n[currentLang].title }}</h1>
      <p class="hero-description">
        {{ titleI18n[currentLang].description }}
      </p>
    </div>
    <div class="controls-wrapper">
      <div class="controls">
        <div class="os-switch">
          <span class="os-label">{{ i18n[currentLang].osSwitch }}</span>
          <div class="os-buttons">
            <button
              :class="{ active: selectedOS === 'windows' }"
              @click="selectedOS = 'windows'"
            >
              {{ i18n[currentLang].windows }}
            </button>
            <button
              :class="{ active: selectedOS === 'mac' }"
              @click="selectedOS = 'mac'"
            >
              {{ i18n[currentLang].mac }}
            </button>
          </div>
        </div>
        <div class="search">
          <input
            v-model="searchTerm"
            type="text"
            :placeholder="i18n[currentLang].search"
          >
        </div>
      </div>
    </div>

    <div class="shortcuts-grid">
      <div
        v-for="(group, index) in filteredGroups"
        :key="index"
        class="shortcut-group"
      >
        <div class="group-header">
          <div class="group-header-title">
            <div class="group-header-icon" v-html="icons[group.title]" />
            <h2>{{ group.title }}</h2>
          </div>
          <p>{{ group.description }}</p>
        </div>
        <div class="shortcuts-list">
          <div
            v-for="(shortcut, idx) in group.shortcuts"
            :key="idx"
            class="shortcut-item"
          >
            <div class="shortcut-info">
              <span class="shortcut-action">{{ shortcut.action }}</span>
              <p v-if="shortcut.description" class="shortcut-description">
                {{ shortcut.description }}
              </p>
            </div>
            <code class="shortcut-key">{{ typeof shortcut.shortcut === 'function' ? shortcut.shortcut() : shortcut.shortcut }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Override VitePress layout constraints */
:deep(.VPDoc) {
  min-height: unset !important;
  padding: 0 !important;
  max-width: 100% !important;
  width: 100% !important;
}

:deep(.VPContent) {
  min-height: unset !important;
  padding: 0 !important;
  margin-bottom: 0 !important;
}

:deep(.VPDoc.has-aside .content-container) {
  min-height: unset !important;
  max-width: 100% !important;
}

/* Hide VitePress page nav and adjust bottom spacing */
:deep(.VPDocFooter),
:deep(.next-and-prev-link),
:deep(.pager),
:deep(.VPLastUpdated),
:deep(.aside) {
  display: none !important;
}

:deep(.VPContent.is-home) {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

/* Additional overrides for VitePress layout */
:deep(.VPContent) {
  padding: 0 !important;
}

:deep(.VPContent.has-sidebar) {
  margin: 0 !important;
  padding: 0 !important;
}

:deep(.VPDoc.has-aside .content-container) {
  max-width: 100% !important;
}

:deep(.aside) {
  display: none !important;
}

:deep(.content .main) {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* Make our container full width */
.shortcuts-container {
  width: 100vw !important;
  max-width: 100vw !important;
  margin: 0 !important;
  padding: 0 !important;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw !important;
  margin-right: -50vw !important;
  background: var(--vp-c-bg);
  transform: scale(0.85);
  transform-origin: top center;
  margin-bottom: 0 !important;
}

.controls-wrapper {
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  padding: 1.5rem 0;
  margin-top: -2rem;
  border-radius: 0 0 2rem 2rem;
  position: relative;
  z-index: 1;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.15);
}

.controls {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.os-switch {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  color: white;
  min-width: 300px;
}

.os-label {
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.9;
}

.os-buttons {
  display: flex;
  gap: 0.5rem;
}

.os-switch button {
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;
  min-width: 100px;
}

.os-switch button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.os-switch button.active {
  background: white;
  color: var(--vp-c-brand-1);
  border-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.search {
  flex: 1;
  max-width: 500px;
}

.search input {
  width: 100%;
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.search input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search input:focus {
  outline: none;
  border-color: white;
  background: rgba(255, 255, 255, 0.15);
}

.shortcuts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 2rem 4rem 4rem;
  margin: 0 auto;
  max-width: 1400px;
  background: var(--vp-c-bg);
}

.shortcut-group {
  background: var(--vp-c-bg);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.shortcut-group:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
}

.group-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.group-header-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.group-header-icon {
  width: 2.25rem;
  height: 2.25rem;
  background: var(--vp-c-bg-soft);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0.5rem;
}

.group-header-icon svg {
  width: 100%;
  height: 100%;
  color: var(--vp-c-text-2);
}

.group-header h2 {
  font-size: 1.25rem;
  margin: 0;
  border: none;
  color: var(--vp-c-text-1);
  font-weight: 600;
  line-height: 1.4;
}

.group-header p {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.5;
  padding-left: 3.25rem;
}

.shortcuts-list {
  padding: 0.75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.shortcut-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  background: var(--vp-c-bg-soft);
}

.shortcut-item:hover {
  background: var(--vp-c-bg-mute);
  transform: translateX(4px);
}

.shortcut-info {
  flex: 1;
  margin-right: 1.5rem;
}

.shortcut-action {
  font-weight: 500;
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  display: block;
  margin-bottom: 0.25rem;
}

.shortcut-description {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.shortcut-key {
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.25rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  white-space: nowrap;
  color: var(--vp-c-text-1);
  min-width: 70px;
  text-align: center;
}

@media (max-width: 1280px) {
  .shortcuts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    padding: 1.5rem;
  }

  .controls h1 {
    font-size: 2.25rem;
  }
}

@media (max-width: 768px) {
  .shortcuts-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }

  .controls {
    padding: 0 1rem;
  }

  .os-buttons {
    flex-direction: column;
    width: 100%;
  }

  .os-switch button {
    width: 100%;
    min-width: 200px;
  }

  .search input {
    font-size: 0.9rem;
  }

  .shortcut-item {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .shortcut-key {
    margin-left: 0;
    width: 100%;
  }

  .shortcut-info {
    margin-right: 0;
  }

  .hero-section {
    padding: 2rem 1rem 3rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
    padding: 0 1rem;
  }

  .controls-wrapper {
    margin-top: -1.5rem;
    padding: 1rem 0;
  }

  .controls {
    flex-direction: column;
    padding: 0 1rem;
    gap: 1rem;
  }

  .os-switch {
    flex-direction: column;
    min-width: unset;
    width: 100%;
  }

  .os-buttons {
    width: 100%;
  }

  .os-switch button {
    flex: 1;
  }

  .search {
    width: 100%;
    max-width: unset;
  }
}

@media (prefers-reduced-motion: reduce) {
  .shortcut-group,
  .os-switch button,
  .shortcut-item {
    transition: none;
  }
}

/* Dark mode enhancements */
:root.dark .shortcut-group {
  background: var(--vp-c-bg-soft);
}

:root.dark .shortcut-item {
  background: var(--vp-c-bg);
}

:root.dark .shortcut-item:hover {
  background: var(--vp-c-bg-mute);
}

:root.dark .shortcut-key {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-divider);
}

/* Hide VitePress page nav */
:deep(.VPDocFooter),
:deep(.next-and-prev-link),
:deep(.pager),
:deep(.VPLastUpdated) {
  display: none !important;
}

/* Hide VitePress navigation and empty space */
:deep(.VPDocFooter),
:deep(.next-and-prev-link),
:deep(.pager),
:deep(.VPLastUpdated),
:deep(.aside),
:deep(.VPDoc .container > *:last-child),
:deep(.next-page-link),
:deep(.prev-page-link),
:deep(.VPDocAsideOutline),
:deep(.VPNavBarMenu),
:deep(.VPNavScreen),
:deep(.VPFooter),
:deep(.VPNavBar .content),
:deep(.VPDoc .container .outline),
:deep(.VPLocalNav),
:deep(.VPPageNav),
:deep(.VPPageInfo) {
  display: none !important;
}

/* Remove extra spacing */
:deep(.VPDoc .container) {
  max-width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}

:deep(.VPDoc) {
  padding-top: 0 !important;
}

:deep(.VPContent) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.hero-section {
  text-align: center;
  padding: 3rem 2rem 4rem;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 150%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% -50%, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
  pointer-events: none;
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));
  pointer-events: none;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  line-height: 1.2;
  background: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0.85));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.hero-description {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.5;
  opacity: 0.9;
  position: relative;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>
