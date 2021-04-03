import StackTracey from "stacktracey"

export const reduxActionTrace = (store: any) => (next: any) => (
	action: any
) => {
	trace(action)
	let result = next(action)
	return result
}

export const trace = (action: any) => {
	const error = new Error("")
	let stack = new StackTracey(error.stack)
	let stacksWithSource = stack.withSources()

	const calleeExclude = [
		"Object.dispatch",
		"dispatch",
		"HTMLUnknownElement.callCallback",
		"Object.invokeGuardedCallbackDev",
		"invokeGuardedCallback",
		"invokeGuardedCallbackAndCatchFirstError",
		"executeDispatch",
		"processDispatchQueueItemsInOrder",
		"processDispatchQueue",
		"dispatchEventsForPlugins",
		"batchedEventUpdates$1",
		"batchedEventUpdates",
		"scheduler.development.js",
		"trace",
		"logger.ts",
		"unstable_runWithPriority",
	]

	const fileNameExclude = [
		"logger.ts",
		"react-dom.development.js",
		"serializableStateInvariantMiddleware.ts",
	]

	const filtered: StackTracey = stacksWithSource.filter(
		a =>
			!calleeExclude.includes(a.callee) &&
			!fileNameExclude.includes(a.fileName) &&
			!a.file.includes("node_modules")
	)

	const item = filtered.items[filtered.items.length - 1]
	console.log("item", item)

	const spliced = item.file.split("/")
	const splicedIndex = spliced.findIndex(a => a === "src")
	const file = spliced.splice(splicedIndex + 1, spliced.length - 1).join("/")

	// console.log(`[${action.type}]`, item.fileName, item.line)
	console.log(
		`%cRedux Action Trace\n%c[${action.type}]   %c${file} %c${item.line}`,
		"color: #999; font-size: 10px;",
		"color: green; font-weight: bold;",
		"color: white;",
		"color: orange;"
	)
}
