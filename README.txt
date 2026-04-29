GitHub Pages deployment folder

This folder is ready to upload for a root GitHub Pages site such as:
https://your-name.github.io/

How to deploy:
1. Create or open the repository named your-name.github.io
2. Upload every file in this folder to the repository root
3. Commit and push
4. Wait for GitHub Pages to publish

Notes:
- .nojekyll is already included
- This exported folder is assembled from the existing local Next build artifacts because Node.js is not available in the current environment
- The source project has already been updated to support a clean static export once Node.js is installed
- If you want a project-site deployment like https://your-name.github.io/repo-name/, rebuild from source after installing Node.js and set NEXT_PUBLIC_BASE_PATH to /repo-name
