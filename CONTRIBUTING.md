# Contributing

Contributions are _very_ appreciated. To keep it a pleasant experience for everyone, please follow this guide.

## Git Workflow

Taggd follows [the GitHub Flow](https://guides.github.com/introduction/flow/index.html) as described by GitHub. In summary:

1. Fork the repository via GitHub
2. Create a single-purpose feature branch, regardless if you’re adding a feature or fixing a bug
3. Perform your magic!
4. Submit a pull-request via GitHub

After that, the pull-request will be reviewed and merged if it meets all requirements.

## Requirements

Before submitting a pull-request, it must meet some requirements:

- The library should contain a [build](https://github.com/timseverien/taggd/wiki/Building). The built assets are in git, so they need to be updated for every change in the source code, even a comment.
- If you add new features or solve bugs, be sure to [add tests](https://github.com/timseverien/taggd/wiki/Testing#creating-tests).
- [Test](https://github.com/timseverien/taggd/wiki/Testing) your changes before submitting a pull-request. Pull-request resulting in failed tests will not be merged.
