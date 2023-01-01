## How to install
The extension has 3 installation options: VSCode Marketplace, manual, and terminal. 
Check the instructions for your preferred method, although we recomend the marketplace.
	
Because the extension depends on the `freestlspserver` executable, independently of your 
installation choice, you will have to install the aformentioned executable by hand.
For this, you can either clone [this](https://github.com/freest-lang/freest-lsp-server) git repository
and follow its instructions, or download and run 
[this](https://github.com/freest-lang/freest-lsp-server/blob/main/install-lsp-server.md) script
using `./install-lsp-server`.

### Visual Studio Code Marketplace
Search for `FreeST LSP` in the `Extensions` tab in VSCode.

### Manual install from VSIX

1. Open the 'Extensions' tab of VSCode
2. Open 'Views and More Actions...' at the top
3. Select 'Install from VSIX...'
4. Choose the extension's .vsix file
5. You're all set!

### Terminal

1. Open a terminal of your choosing
2. Run the command `code --install-extension <path to extension vsix>`