// scripts/dev.tsx
import { useUserStore } from "../src/store/useUserStore";

(async () => {
  console.time("⏱️ Fetch Trainings");
  await useUserStore.getState().getCurrentUser();
  console.timeEnd("⏱️ current users");

  const trainings = useUserStore.getState().currentUser;
  console.log("📚 Trainings:", trainings);
})();
