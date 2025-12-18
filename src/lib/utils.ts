import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const initials = (name: string) => {
	const [first, last] = name.split(" ")
	if (!first) {
		return "?"
	}
	if (!last) {
		return first[0]
	}
	return `${first[0]}${last[0]}`
}

export const camelCaseToWords = (s: string) => {
	const result = s.replace(/([A-Z])/g, " $1")
	return (result.charAt(0).toUpperCase() + result.slice(1)).replace(/Id/g, "ID")
}

export const titleCase = (s: string) => {
	if (!s) return "ERROR"
	return s
		.replaceAll("_", " ")
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.toLowerCase()
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ")
}

export const formatTime = (time: string) => {
	const [hour, minute] = time.split(":").map((x) => Number.parseInt(x))
	if ((!hour && hour !== 0) || (!minute && minute !== 0)) return time
	const suffix = hour >= 12 ? "pm" : "am"
	const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
	const minute12 = minute < 10 ? `0${minute}` : minute
	return `${hour12}:${minute12}${suffix}`
}

export const randomString = (length: number) =>
	Math.random()
		.toString(36)
		.substring(2, length + 2)

export const formatPublishedDate = (date: Date | string | number) => {
	const parsedDate = date instanceof Date ? date : new Date(date)
	return new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
		timeZone: "America/New_York"
	}).format(parsedDate)
}

/**
 * Alphabetizes an array of objects by a key in that object using a type parameter
 * @param arr An array of objects, where each object has a key that is a string, and a value that is a string.
 * @param key A key that exists on the objects in the array.
 * @returns The sorted array
 */
export const alphabetizeArray = <T extends Record<string, string>[]>(
	arr: T,
	key: keyof T[number] & string
) => {
	return arr.sort((a, b) => {
		const aKey = a[key]!
		const bKey = b[key]!
		if (aKey < bKey) return -1
		if (aKey > bKey) return 1
		return 0
	})
}
