// Turns a Mongoose document (or a list of them, or an aggregate result) into plain JSON, virtuals included.
// The repo copy of this file was empty, which stopped the API from starting; this restores what every caller expects.
export default function Mutate(value) {
    if (value === null || value === undefined) return value;
    return JSON.parse(JSON.stringify(value));
}
