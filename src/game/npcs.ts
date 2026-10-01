// Dados dos NPCs, sem dependência do Phaser (o React também usa)
export const NPCS = {
  emma: { name: "Emma", animation: "idle-down" },
  leo: { name: "Leo", animation: "idle-down" },
  mia: { name: "Mia", animation: "idle-down" },
  mr_brown: { name: "Mr. Brown", animation: "sit-left" },
  phone_customer: { name: "Customer", animation: "phone" },
} as const;

export type NpcId = keyof typeof NPCS;
