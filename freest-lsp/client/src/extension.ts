/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { commands, ExtensionContext, QuickPickItem, Terminal, window, workspace } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	
	let serverOptions: ServerOptions = {
		run: { command: 'freestlspserver',
			   args: []
			 },
		debug: {
			command: 'freestlspserver',
			args: []
		}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'FreeST' }],
		diagnosticCollectionName: 'sample',
		synchronize: {
			// Notify the server about file changes to .clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/*.fst')
		},
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'FreeSTLanguageServer',
		'FreeST Language Server',
		serverOptions,
		clientOptions
	);

	// Commands
	context.subscriptions.push(commands.registerCommand('freest.run', () => {
		const file = window.activeTextEditor.document.uri.path;
		const terminal = getFreestTerminal();

		terminal.sendText(`freest ${file}`);
		terminal.show(true);
	}));

	context.subscriptions.push(commands.registerCommand('freest.load', () => {
		const file = window.activeTextEditor.document.uri.path;
		const terminal = getFreestTerminal();

		terminal.sendText(`freesti`);
		terminal.sendText(`:l ${file}`)
		terminal.show(true);
	}));

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}

// function selectTerminal(): Thenable<Terminal | undefined> {
// 	interface TerminalQuickPickItem extends QuickPickItem {
// 		terminal: Terminal;
// 	}
// 	const terminals = <Terminal[]>(<any>window).terminals;
// 	const items: TerminalQuickPickItem[] = terminals.map(t => {
// 		return {
// 			label: `name: ${t.name}`,
// 			terminal: t
// 		};
// 	});
// 	return window.showQuickPick(items).then(item => {
// 		return item ? item.terminal : undefined;
// 	});
// }

// function ensureTerminalExists(): boolean {
// 	if ((<any>window).terminals.length === 0) {
// 		// window.showErrorMessage('No active terminals');
// 		return false;
// 	}
// 	return true;
// }

function getFreestTerminal():Terminal {
	const FREEST_TERMINAL_NAME = "FreeST";
	return getOrCreateTerminal(FREEST_TERMINAL_NAME);
}

function getOrCreateTerminal(terminalName:string):Terminal {
	var terminals = window.terminals;
	if (terminals.length === 0)
	{
		// create new terminal
		return window.createTerminal(terminalName);
	}
	else
	{
		// search for a terminal
		const maybeTerminal = terminals.find(terminal => terminal.name === terminalName);
	
		if (maybeTerminal)
		{
			// terminal found
			return maybeTerminal;
		}
		else 
		{
			// terminal not found, create new one
			return window.createTerminal(terminalName);
		}
	}
}