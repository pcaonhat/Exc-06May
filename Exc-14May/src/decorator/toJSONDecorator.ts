export function toJSON(target: Function) {
    target.prototype.toJSON = function () {
        const jsonObject: any = {};
        for (const key of Object.keys(this)) {
            jsonObject[key] = this[key];
        }
        return jsonObject;
    };
}