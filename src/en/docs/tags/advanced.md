# Advanced Features

### Tab in Peek View

You can also use Cursor Tab in the Peek view for "Go to Definition" or "Go to Type Definition". This is particularly useful when adding new parameters to function calls, for example.

![CPP in Peek View](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/cpp/cpp-in-peek.png)

We especially like using this in combination with the `gd` command in vim, for example, to modify a function definition and fix all its usages at once.

### Cursor Prediction

Cursor can also predict where you'll go after accepting an edit. If a prediction location is available, you can jump to the next location by pressing Tab, allowing you to quickly complete a series of edits through consecutive Tab presses.

![CP](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/cpp/cp.png)

Cursor predicted the next location and provided an edit suggestion there.

### Partial Accept

You can accept the next word in a suggestion by pressing `Ctrl/⌘` and right arrow (or by mapping `editor.action.inlineSuggest.acceptNextWord` to your preferred shortcut).

To enable partial accept functionality, navigate to `Cursor Settings` > `Features` > `Cursor Tab`.
