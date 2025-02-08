### Ignore Files

To ignore certain files in Cursor features (like codebase indexing), you can use a `.cursorignore` file in your project's root directory. It works the same way as `.gitignore` works for git.

`.cursorignore` respects `.gitignore`. If you have a `.gitignore` set up, files will be ignored by default.
If you want to ignore additional files, you can add them to the `.cursorignore` file.

Example of ignoring all files in the dist directory:

# Ignore all files in the `dist` directory

dist/

# Ignore all `.log` files

\*.log

# Ignore specific file `config.json`

config.json
