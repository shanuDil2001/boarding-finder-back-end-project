export default function generateId(prefix, id) {
  if (id === null) {
    const firstId = `${prefix}00001`;

    return firstId;
  } else {
    const previuosId = id;

    const previuosIdNumPart = previuosId.replace(prefix, "");

    const previuosIdNumber = Number(previuosIdNumPart);

    const newIdNumber = previuosIdNumber + 1;

    const newIdNumPart = String(newIdNumber).padStart(5, "0");

    const newId = `${prefix}${newIdNumPart}`;

    return newId;
  }
}
