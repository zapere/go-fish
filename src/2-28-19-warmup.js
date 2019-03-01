const sleep = async function (milliseconds) {
	return new Promise(resolve => {
		setTimeout(() => resolve(), milliseconds)
	})
}

let startTime
function log(s) {
	startTime = startTime || Math.ceil(Date.now() / 1000)
	console.log(`${Math.ceil(Date.now() / 1000) - startTime}: ${s}`);
}

async function run() {
	log(`    Hello Start run`);
	await sleep(2000)
	log(`    Done sleeping`);
}

async function runRun() {
	log(`  Start runRun`);
	run()
	log(`  End runRun.`);
}

log(`Start the App`);
runRun()
log(`Doing other stuff while sleeping.`);

// French Revolution research:
// https://www.youtube.com/watch?v=Ohom8t0O-bg