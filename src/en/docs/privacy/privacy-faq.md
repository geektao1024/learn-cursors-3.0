# Cursor - Build Software Faster

### What is Privacy Mode?

When `Privacy Mode` is enabled, your code will not be stored by us or any third parties. Otherwise, we may collect prompts, code snippets, and telemetry data to improve Cursor. You can read more about privacy mode [here](https://docs.cursor.com/privacy/privacy).

You can enable `Privacy Mode` during the onboarding process or under `Cursor Settings` > `General` > `Privacy Mode`.

![Privacy Mode](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/get-started/privacy-mode.png)

### Are Requests Always Routed Through Cursor Backend?

Yes! Even if you use your own API keys, your requests still go through our backend! That's where we do final prompt construction.

### Does Indexing a Codebase Require Storing Code?

No! If you choose to index your codebase, Cursor uploads your codebase in small chunks to our servers to compute embeddings, but after the request lifecycle ends, all plaintext code ceases to exist.

Embeddings and metadata about your codebase (hashes, fuzzy filenames) are stored in our database, but your code is not.

You can read more about this on our [security page](https://docs.cursor.com/privacy/privacy).

- What is Privacy Mode?
- Are Requests Always Routed Through Cursor Backend?
- Does Indexing a Codebase Require Storing Code?
