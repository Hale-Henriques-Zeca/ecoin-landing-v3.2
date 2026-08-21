// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Bootstrap
// ============================================================================

import BootstrapConfig from "./BootstrapConfig";
import BootstrapStorage from "./BootstrapStorage";
import BootstrapCache from "./BootstrapCache";
import BootstrapPlugins from "./BootstrapPlugins";
import BootstrapEvents from "./BootstrapEvents";
import BootstrapServices from "./BootstrapServices";
import BootstrapEngine from "./BootstrapEngine";
import BootstrapReact from "./BootstrapReact";

export interface BootstrapContext {
  config: any;
  storage: any;
  cache: any;
  plugins: any;
  events: any;
  services: any;
  engine: any;
  react: any;
}

export class Bootstrap {
  private initialized = false;

  private context!: BootstrapContext;

  initialize(): BootstrapContext {
    if (this.initialized) {
      return this.context;
    }

    const config = BootstrapConfig.load();

    const storage = BootstrapStorage.initialize(
      config
    );

    const cache = BootstrapCache.initialize(
      config
    );

    const plugins = BootstrapPlugins.initialize();

    const events = BootstrapEvents.initialize();

    const services = BootstrapServices.initialize({
      config,
      cache,
      storage,
      events,
    });

    const engine = BootstrapEngine.initialize({
      config,
      cache,
      storage,
      plugins,
      services,
      events,
    });

    const react = BootstrapReact.initialize({
      engine,
      services,
      events,
    });

    this.context = {
      config,
      storage,
      cache,
      plugins,
      events,
      services,
      engine,
      react,
    };

    this.initialized = true;

    return this.context;
  }

  getContext(): BootstrapContext {
    if (!this.initialized) {
      throw new Error(
        "Framework ainda não inicializada."
      );
    }

    return this.context;
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

export const bootstrap = new Bootstrap();

export default bootstrap;