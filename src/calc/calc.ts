import { evaluate } from "mathjs";

const op: Array<string> = ['+', '-', '*', '/'];

export function CheckHandleError(strInput: string): boolean {
    for (let i = 0; i < op.length; i++) {
        if (strInput && strInput[strInput.length - 1] === op[i]) {
            return false;
        }
    }
    return true;
}
export function Delete(str: string): string {
    return str.slice(0, -1);
}

export function Equal(strInput: string) {
    const expression = strInput;
    const result = evaluate(expression);
    return result;
}