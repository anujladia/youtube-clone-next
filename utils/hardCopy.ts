export default function hardCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}