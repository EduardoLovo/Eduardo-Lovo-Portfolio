import type { Menu } from "../types";
import menuJson from "../../data/cafe/menu.json";

export const menu = menuJson as Menu;

export interface Order {
  items: string[];
  size?: string;
  takeaway?: string;
}

/** Total em centavos. O tamanho só vale para bebidas. */
export function orderTotal(order: Order, m: Menu = menu) {
  return order.items.reduce((total, id) => {
    const item = m.items[id];
    if (!item) throw new Error(`Item "${id}" não está no cardápio`);
    const sizeExtra = item.kind === "drink" && order.size ? (m.sizes[order.size] ?? 0) : 0;
    return total + item.price + sizeExtra;
  }, 0);
}

/** Ex.: ["Medium latte (to go)", "Blueberry muffin"] */
export function describeOrder(order: Order, m: Menu = menu) {
  return order.items.map((id) => {
    const item = m.items[id];
    if (item.kind !== "drink") return item.name;
    const size = order.size ? `${capitalize(order.size)} ${item.name.toLowerCase()}` : item.name;
    return order.takeaway ? `${size} (${order.takeaway})` : size;
  });
}

export function formatMoney(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
