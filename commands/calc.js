exports.run = (client, message, args) => {
    var op = {
	"+": function(a, b) { return a + b; },
	"-": function(a, b) { return a - b; },
	">": function(a, b) { return a > b; },
	"<": function(a, b) { return a < b; }
    };
    let o = args[0];
    let a = parseInt(args[1]);
    let b = parseInt(args[2]);
    message.channel.send(
	op[o](a,b)
    ).catch(console.error);
}
