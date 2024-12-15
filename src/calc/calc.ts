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