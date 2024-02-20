/**
 * Checks if `condition` is not undefined and not falsy and returns `className` if so.
 * If `className` is undefined an empty string is returned
 *
 * @param {Boolean | String | undefined} condition This is the basis upon which a value would be return. If truthy, the `className` is returned else an empty string `''` is returned.
 * @param {String | undefined} className The className string to be returned. If it is undefined and `condition` is truthy, the condition is returned as a string instead.
 *
 * @returns {String} A string. Empty string if `condition` is falsy.
 */
export default function getClassName(
	condition?: boolean | string,
	className?: string
): string {
	if (condition) {
		return ` ${className || condition}`;
	}
	return ``;
}
