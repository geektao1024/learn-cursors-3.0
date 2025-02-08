## Common Issues FAQ

### I see an update in the changelog, but Cursor hasn't updated.

If the update is very new, it might not have been pushed to you yet. We use staged rollouts, which means we release new updates to some randomly selected users first, then to everyone. Usually, it takes about 5 hours from the first user to reach everyone. For larger updates, it might take longer.

If you don't want to wait, you can re-download Cursor from our homepage. You might get the latest update immediately. Don't worry, all your settings, extensions, etc., will transfer to the re-downloaded version. You don't need to uninstall your existing version first.

### I'm having issues with GitHub login in Cursor / How do I log out of GitHub in Cursor?

You can try using the `Sign Out of GitHub` command from the command palette (`Ctrl/⌘ + Shift + P`).

### I can't use GitHub Codespaces.

Unfortunately, we don't support GitHub Codespaces yet.

### I'm getting errors when connecting to remote SSH.

Currently, we don't support connecting to Mac or Windows machines via SSH. If you're not trying to connect to a Mac or Windows machine, please report your issue to us in the forums. Providing some logs will help us assist you better.

### Cursor Tab and Cmd K don't work behind corporate proxy.

Cursor Tab and Cmd K use HTTP/2 by default, which allows us to use fewer resources and reduce latency. Some corporate proxies (like Zscaler in certain configurations) block HTTP/2. To fix this, you can set `"cursor.general.disableHttp2": true` in settings (`Cmd/Ctrl + ,` then search for `http2`).

### I just subscribed to Pro but I'm still on the free plan in the app.

Try signing out from the Cursor settings popup and then signing back in.

### When does my usage reset again?

If you're subscribed to Pro, you can click `Manage Subscription` in the Dashboard, and your plan renewal date will be shown at the top.

If you're a free user, check your inbox for the first email we sent you. Your usage will reset monthly from that date.

### How do I uninstall Cursor?

You can follow this guide to uninstall Cursor. Replace all occurrences of "VS Code" or "Code" with "Cursor" and ".vscode" with ".cursor".
