import axios from "axios";
import { Depot } from "../models/Depot";
import { Vehicle } from "../models/Vehicle";
import { PriorityQueue } from "../utils/priorityQueue";
import depotsFallback from "../data/depots.json";
import vehiclesFallback from "../data/vehicles.json";

const DEPOT_API = "http://4.224.188.213/evaluation-service/depots";
const VEHICLE_API = "http://4.224.188.213/evaluation-service/vehicles";

export interface ScheduleResult {
  depotID: number;
  mechanicHoursBudget: number;
  hoursUsed: number;
  totalImpact: number;
  tasksCount: number;
  selectedTasks: Vehicle[];
}

async function fetchDepots(): Promise<Depot[]> {
  try {
    const response = await axios.get<{ depots: Depot[] }>(DEPOT_API);
    return response.data.depots;
  } catch {
    return depotsFallback.depots as Depot[];
  }
}

async function fetchVehicles(): Promise<Vehicle[]> {
  try {
    const response = await axios.get<{ vehicles: Vehicle[] }>(VEHICLE_API);
    return response.data.vehicles;
  } catch {
    return vehiclesFallback.vehicles as Vehicle[];
  }
}

function knapsack(budget: number, vehicles: Vehicle[]): Vehicle[] {
  const n = vehicles.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(budget + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const { Duration, Impact } = vehicles[i - 1];
    for (let w = 0; w <= budget; w++) {
      dp[i][w] = dp[i - 1][w];
      if (Duration <= w) {
        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - Duration] + Impact);
      }
    }
  }

  const selected: Vehicle[] = [];
  let w = budget;
  for (let i = n; i >= 1; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(vehicles[i - 1]);
      w -= vehicles[i - 1].Duration;
    }
  }

  return selected.reverse();
}

function rankByEfficiency(vehicles: Vehicle[]): Vehicle[] {
  const pq = new PriorityQueue<Vehicle>();
  for (const v of vehicles) {
    pq.enqueue(v, v.Impact / v.Duration);
  }
  const ranked: Vehicle[] = [];
  while (!pq.isEmpty()) {
    ranked.push(pq.dequeue()!);
  }
  return ranked;
}

export async function buildSchedule(): Promise<ScheduleResult[]> {
  const [depots, vehicles] = await Promise.all([fetchDepots(), fetchVehicles()]);
  const rankedVehicles = rankByEfficiency(vehicles);

  return depots.map((depot) => {
    const selected = knapsack(depot.MechanicHours, rankedVehicles);
    const hoursUsed = selected.reduce((sum, v) => sum + v.Duration, 0);
    const totalImpact = selected.reduce((sum, v) => sum + v.Impact, 0);

    return {
      depotID: depot.ID,
      mechanicHoursBudget: depot.MechanicHours,
      hoursUsed,
      totalImpact,
      tasksCount: selected.length,
      selectedTasks: selected,
    };
  });
}