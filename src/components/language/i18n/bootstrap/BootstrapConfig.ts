import {
  translationConfig,
} from "../config/translation.config";

import {
  providersConfig,
} from "../config/providers.config";

import {
  cacheConfig,
} from "../config/cache.config";

import {
  openAIConfig,
} from "../config/openai.config";

import {
  geminiConfig,
} from "../config/gemini.config";

import {
  claudeConfig,
} from "../config/claude.config";

import {
  deepSeekConfig,
} from "../config/deepseek.config";

export interface BootstrapConfiguration {

  translation: typeof translationConfig;

  providers: typeof providersConfig;

  cache: typeof cacheConfig;

  ai: {

    openai: typeof openAIConfig;

    gemini: typeof geminiConfig;

    claude: typeof claudeConfig;

    deepseek: typeof deepSeekConfig;

  };

}

export class BootstrapConfig {

  static load(): BootstrapConfiguration {

    return {

      translation: translationConfig,

      providers: providersConfig,

      cache: cacheConfig,

      ai: {

        openai: openAIConfig,

        gemini: geminiConfig,

        claude: claudeConfig,

        deepseek: deepSeekConfig,

      },

    };

  }

}

export default BootstrapConfig;