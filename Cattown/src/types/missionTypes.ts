export interface IMission {
  zone: string;
  type: string;
  timeInSec: number;
  xpReceived: number;
  goldReceived: number;
}

export interface IBoss {
  zone: string;
  name: string;
  mcguffinId: number;
  health: number;
  strength: number;
  fireDamage: number;
  waterDamage: number;
  shadowDamage: number;
  natureDamage: number;
}
