---
description: Read any file from the WSL environment into the current workspace.
---

1. First, find the absolute path of the file in WSL.
   - If you don't know the exact path, use `run_command` with `wsl bash -c "find ~ -name <FILENAME> 2>/dev/null"`
   - Note: The common OpenClaw dev-group workspace path is usually `/home/unix_lc/.openclaw/workspace/output/dev-group`
2. Use `run_command` with `wsl bash -c "cat <WSL_PATH> > /mnt/c/Users/Administrator/Documents/openclaw-tmp.html"` to copy the file to a Windows-accessible path.
3. Read the file using `view_file` from `C:/Users/Administrator/Documents/openclaw-tmp.html`.
4. Use `write_to_file` to save the content into your current workspace.
