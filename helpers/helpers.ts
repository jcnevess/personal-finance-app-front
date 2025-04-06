import type { Transaction } from "./DTO";

function getImageURI(uri: string) {
  return uri.slice(8);
}

function sortTransactionsByCriteria(list: Transaction[], sortType: string) {
  switch (sortType) {
    case "Oldest":
      return list.toSorted(
        (t1, t2) => new Date(t1.date).valueOf() - new Date(t2.date).valueOf()
      );
    case "A to Z":
      return list.toSorted((t1, t2) => t1.name.localeCompare(t2.name));
    case "Z to A":
      return list.toSorted((t1, t2) => t2.name.localeCompare(t1.name));
    case "Highest":
      return list.toSorted((t1, t2) => t2.amount - t1.amount);
    case "Lowest":
      return list.toSorted((t1, t2) => t1.amount - t2.amount);
    default:
      return list.toSorted(
        (t1, t2) => new Date(t2.date).valueOf() - new Date(t1.date).valueOf()
      );
  }
}

export { getImageURI, sortTransactionsByCriteria };
