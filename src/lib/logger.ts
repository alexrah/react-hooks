/**
 * avoid a well known peculiarity (an optimization) of most browser consoles :
 * the tree is only built when you open the object, with the new values of the object.
 * If you want to see the state of the object at the time of logging, supposing it's a small enough and not self referencing object,
 * you may clone it like this:
 * 
 * @see https://stackoverflow.com/questions/17320181/console-log-showing-only-the-updated-version-of-the-object-printed
 * usage as side effect:
 * import "../lib/logger"
* */

const _originalLog = console.log;

console.log = function () {
    const msg = `%c${arguments[0]}`;
    const style = 'color: yellow';
    const obj = arguments.length > 1 ? JSON.parse(JSON.stringify(arguments[1])) : '';
    _originalLog.call(this, msg, style, obj);
}

export default console.log