import { LanguageQuery } from "./language.query";
import { LanguageService } from "./language.service";
import { LanguageStore } from "./language.store";

export const localizationProviders = [
  LanguageQuery,
  LanguageService,
  LanguageStore,
];