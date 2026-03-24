---
description: Push local workspace changes to GitHub Pages using WSL Git
---

1. Use `run_command` with `wsl bash -c "cd /mnt/c/<WINDOWS_WORKSPACE_PATH> && git add ."` to stage all modified and untracked files. (Replace `<WINDOWS_WORKSPACE_PATH>` with your actual path, e.g., `Users/Administrator/.gemini/antigravity/playground/quantum-hypernova`).
2. Use `run_command` with `wsl bash -c "cd /mnt/c/<WINDOWS_WORKSPACE_PATH> && git commit -m '<COMMIT_MESSAGE>'"` to commit the staged changes. Provide a meaningful commit message.
3. Use `run_command` with `wsl bash -c "cd /mnt/c/<WINDOWS_WORKSPACE_PATH> && git push origin master"` to push the changes to your GitHub remote repository. The changes will then be deployed to GitHub Pages automatically.
