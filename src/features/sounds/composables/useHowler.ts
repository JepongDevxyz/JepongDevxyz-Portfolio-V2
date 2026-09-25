import { onMounted, onUnmounted, ref, watch } from "vue";
import gsap from "gsap";
import { lerp } from "../../../utils/math";
import { Howler } from "howler";
import { isFeatureEnabled } from "../../../utils/features";
import { tick as contactTick } from "../core/contact";
import { stopSnoreRepetition } from "../core/contact";
import { tick as roomTick } from "../core/room";
import { sounds } from "../definitions/sounds";
import { getSoundsHowl } from "../utils/sounds";

import type { SoundKey } from "../types";

export const howlerUnlocked = ref(false);
export const soundsEnabled = ref(false);

Howler.volume(0);

let unlockPromise: Promise<boolean> | null = null;

export const unlockHowler = async () => {
  if (howlerUnlocked.value && Howler.ctx?.state === "running") return true;
  if (unlockPromise) return unlockPromise;

  unlockPromise = (async () => {
    try {
      if (Howler.ctx?.state !== "running") {
        await Howler.ctx?.resume();
      }
    } catch (error) {
      console.warn("Audio context could not be resumed yet:", error);
    }

    const unlocked = Howler.ctx?.state === "running";
    howlerUnlocked.value = unlocked;
    return unlocked;
  })().finally(() => {
    unlockPromise = null;
  });

  return unlockPromise;
};

export const useHowler = () => {
  const enabledVolume = ref<number>(0);

  const syncStoredPreference = () => {
    const storeItem = localStorage.getItem("portfolio-soundsEnabled");
    if (storeItem === null) {
      soundsEnabled.value = true;
      localStorage.setItem("portfolio-soundsEnabled", "true");
      return;
    }
    soundsEnabled.value = storeItem === "true";
  };

  const tick = () => {
    if (!howlerUnlocked.value) {
      if (Howler.ctx?.state !== "running") return;
      howlerUnlocked.value = true;
      syncStoredPreference();
    }

    contactTick();
    roomTick();

    const currentVolume = Howler.volume();
    if (currentVolume > 0.99 && enabledVolume.value === 1) return;

    const speed = enabledVolume.value === 1 ? 0.01 : 0.05;
    Howler.volume(lerp(currentVolume, enabledVolume.value, speed));
  };

  const handleVisibilityChange = () => {
    Howler.mute(document.visibilityState === "hidden");
  };

  const handleKeyPress = async (event: KeyboardEvent) => {
    if (event.code !== "KeyM") return;

    if (soundsEnabled.value) {
      soundsEnabled.value = false;
      return;
    }

    if (await unlockHowler()) {
      soundsEnabled.value = true;
    }
  };

  const removeUnlockListener = () => {
    window.removeEventListener("pointerdown", handleFirstInteraction);
  };

  const handleFirstInteraction = async (event: PointerEvent) => {
    const unlocked = await unlockHowler();
    if (!unlocked) return;

    // Tapping the sound button has its own toggle handler. For every other
    // first interaction, restore the saved/default sound preference.
    const target = event.target instanceof Element ? event.target : null;
    if (!target?.closest(".music-toggle")) {
      syncStoredPreference();
    }

    removeUnlockListener();
  };

  watch(soundsEnabled, (newVal) => {
    if (!isFeatureEnabled("sounds")) return;
    enabledVolume.value = newVal ? 1 : 0;
    localStorage.setItem("portfolio-soundsEnabled", newVal.toString());
  });

  const loadAllSounds = () => {
    for (const sound of Object.keys(sounds) as SoundKey[]) {
      const howl = getSoundsHowl(sound);
      howl?.load();
    }
  };

  onMounted(() => {
    if (!isFeatureEnabled("sounds")) return;

    Howler.volume(0);
    loadAllSounds();

    if (Howler.ctx?.state === "running") {
      howlerUnlocked.value = true;
      syncStoredPreference();
    } else {
      window.addEventListener("pointerdown", handleFirstInteraction, { passive: true });
    }

    gsap.ticker.add(tick);
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeyPress);
  });

  onUnmounted(() => {
    if (!isFeatureEnabled("sounds")) return;
    gsap.ticker.remove(tick);
    removeUnlockListener();
    window.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("keydown", handleKeyPress);
    stopSnoreRepetition();
  });
};
